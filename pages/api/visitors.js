// PostHog API endpoint to get unique visitors
// Requires POSTHOG_PERSONAL_API_KEY env variable

// In-memory cache (persists across requests in the same serverless instance)
const cache = {}
const CACHE_TTL = 60 * 60 * 1000 // 1 hour in milliseconds

const PERIODS = ['today', 'week', 'month', 'year', 'all']

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
      dateFrom = new Date('2025-01-01')
      break
    default:
      dateFrom = new Date(now.getFullYear(), now.getMonth(), 1)
  }

  return {
    dateFrom: dateFrom.toISOString().split('T')[0],
    dateTo: now.toISOString().split('T')[0],
  }
}

async function fetchVisitorsForPeriod(apiKey, projectId, period) {
  const { dateFrom, dateTo } = getDateRange(period)

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
    throw new Error(`PostHog API error: ${response.status}`)
  }

  const data = await response.json()
  const visitors = data.results?.[0]?.[0] || 0

  return {
    visitors: Math.round(visitors),
    period,
    dateFrom,
    dateTo,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY
  const projectId = process.env.POSTHOG_PROJECT_ID
  const fetchAll = req.query.all === 'true'
  const period = req.query.period || 'month'

  if (!apiKey || !projectId) {
    return res.status(500).json({
      error: 'PostHog API credentials not configured',
      visitors: null,
    })
  }

  const now = Date.now()

  // Fetch all periods at once
  if (fetchAll) {
    const cacheKey = 'visitors_all'
    if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
      res.setHeader('X-Cache', 'HIT')
      return res.status(200).json(cache[cacheKey].data)
    }

    try {
      const results = await Promise.all(
        PERIODS.map((p) => fetchVisitorsForPeriod(apiKey, projectId, p))
      )

      const responseData = {}
      results.forEach((result) => {
        responseData[result.period] = result.visitors
      })

      cache[cacheKey] = {
        data: responseData,
        timestamp: now,
      }

      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
      res.setHeader('X-Cache', 'MISS')
      return res.status(200).json(responseData)
    } catch (error) {
      console.error('Error fetching all PostHog data:', error)
      return res.status(500).json({
        error: 'Internal server error',
        visitors: null,
      })
    }
  }

  // Fetch single period
  const cacheKey = `visitors_${period}`
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.setHeader('X-Cache', 'HIT')
    return res.status(200).json(cache[cacheKey].data)
  }

  try {
    const result = await fetchVisitorsForPeriod(apiKey, projectId, period)

    cache[cacheKey] = {
      data: result,
      timestamp: now,
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.setHeader('X-Cache', 'MISS')
    return res.status(200).json(result)
  } catch (error) {
    console.error('Error fetching PostHog data:', error)
    return res.status(500).json({
      error: 'Internal server error',
      visitors: null,
    })
  }
}
