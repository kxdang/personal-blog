// PostHog API endpoint to get unique visitors
// Requires POSTHOG_PERSONAL_API_KEY env variable

// In-memory cache (persists across requests in the same serverless instance)
const cache = {}
const CACHE_TTL = 60 * 60 * 1000 // 1 hour in milliseconds

function getDateRange(period) {
  const now = new Date()
  let dateFrom

  switch (period) {
    case 'today':
      dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      break
    case 'week':
      dateFrom = new Date(now)
      dateFrom.setDate(now.getDate() - 7)
      break
    case 'month':
      dateFrom = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    case 'year':
      dateFrom = new Date(now.getFullYear(), 0, 1)
      break
    case 'all':
      dateFrom = new Date('2020-01-01') // Far back enough to capture all data
      break
    default:
      dateFrom = new Date(now.getFullYear(), now.getMonth(), 1)
  }

  return {
    dateFrom: dateFrom.toISOString().split('T')[0],
    dateTo: now.toISOString().split('T')[0],
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY
  const projectId = process.env.POSTHOG_PROJECT_ID
  const period = req.query.period || 'month'

  if (!apiKey || !projectId) {
    return res.status(500).json({
      error: 'PostHog API credentials not configured',
      visitors: null,
    })
  }

  // Return cached data if still valid
  const now = Date.now()
  const cacheKey = `visitors_${period}`
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.setHeader('X-Cache', 'HIT')
    return res.status(200).json(cache[cacheKey].data)
  }

  try {
    const { dateFrom, dateTo } = getDateRange(period)

    // Query PostHog using the new Query API (HogQL)
    const response = await fetch(`https://us.posthog.com/api/projects/${projectId}/query/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: `
            SELECT count(DISTINCT person_id) as unique_visitors
            FROM events
            WHERE event = '$pageview'
              AND timestamp >= '${dateFrom}'
              AND timestamp <= '${dateTo} 23:59:59'
          `,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('PostHog API error:', response.status, errorText)
      return res.status(response.status).json({
        error: 'Failed to fetch from PostHog',
        details: errorText,
        visitors: null,
      })
    }

    const data = await response.json()

    // Extract unique visitor count from HogQL response
    const visitors = data.results?.[0]?.[0] || 0

    const responseData = {
      visitors: Math.round(visitors),
      period,
      dateFrom,
      dateTo,
    }

    // Update cache
    cache[cacheKey] = {
      data: responseData,
      timestamp: now,
    }

    // Cache response for 1 hour at CDN level too
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.setHeader('X-Cache', 'MISS')

    return res.status(200).json(responseData)
  } catch (error) {
    console.error('Error fetching PostHog data:', error)
    return res.status(500).json({
      error: 'Internal server error',
      visitors: null,
    })
  }
}
