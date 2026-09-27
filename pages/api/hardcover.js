// Currently-reading changes at most a few times a week, so let Vercel's CDN
// serve this to visitors and refresh it in the background at most hourly.
// Failures are never cached — a transient 401 should not stick for an hour.
const CACHE_OK = 'public, s-maxage=3600, stale-while-revalidate=86400'
const CACHE_FAIL = 'no-store'

export default async function handler(req, res) {
  try {
    const HARDCOVER_API_URL = 'https://api.hardcover.app/v1/graphql'
    const HARDCOVER_TOKEN = process.env.HARDCOVER_API_TOKEN

    if (!HARDCOVER_TOKEN) {
      console.error(
        '[hardcover] AUTH FAILURE: HARDCOVER_API_TOKEN is not set. The currently-reading ' +
          'shelf will render empty. Set it in .env.local and in the Vercel project env.'
      )
      // Return empty data structure when no token
      res.setHeader('Cache-Control', CACHE_FAIL)
      return res.status(200).json({
        numOfReadBooks: '(0)',
        currentlyReading: [],
        source: 'hardcover',
        message: 'API token not configured',
      })
    }

    // Hardcover GraphQL query - this works in their playground
    const query = `
      {
        me {
          user_books(where: {status_id: {_eq: 2}}) {
            book {
              contributions {
                author {
                  name
                }
              }
              image {
                url
              }
              title
              slug
            }
            user_book_reads(
              where: {finished_at: {_is_null: true}}
              order_by: {started_at: desc}
              limit: 1
            ) {
              progress
            }
          }
          user_books_aggregate(where: {status_id: {_eq: 3}}) {
            aggregate {
              count
            }
          }
        }
      }
    `

    const response = await fetch(HARDCOVER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HARDCOVER_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    })

    const responseText = await response.text()
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse response:', responseText)
      throw new Error('Invalid JSON response from Hardcover API')
    }

    if (response.status === 401 || response.status === 403) {
      // Auth failures are silent in the UI (we still return 200 with an empty
      // shelf), so make them impossible to miss in the logs.
      console.error(
        `[hardcover] AUTH FAILURE ${response.status}: ${
          data?.error_description || data?.error || 'unknown'
        }. The HARDCOVER_API_TOKEN is revoked, expired, or missing the read:me scope. ` +
          'Mint a new token at https://hardcover.app/account/api (scope: read:me) and update ' +
          'HARDCOVER_API_TOKEN in .env.local and in the Vercel project env, then redeploy.'
      )
      res.setHeader('Cache-Control', CACHE_FAIL)
      return res.status(200).json({
        numOfReadBooks: '(0)',
        currentlyReading: [],
        source: 'hardcover',
        authFailed: true,
        error: data?.error_description || `Hardcover API responded with status: ${response.status}`,
      })
    }

    if (!response.ok) {
      console.error('Hardcover API error:', response.status, data)
      throw new Error(`Hardcover API responded with status: ${response.status}`)
    }

    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2))
      // Return empty data on GraphQL errors but don't fail completely
      res.setHeader('Cache-Control', CACHE_FAIL)
      return res.status(200).json({
        numOfReadBooks: '(0)',
        currentlyReading: [],
        source: 'hardcover',
        error: 'GraphQL query error',
      })
    }

    // Transform the data to match the existing format
    // Note: me returns an array, so we take the first element
    const userData = data.data?.me?.[0]
    const booksReadCount = userData?.user_books_aggregate?.aggregate?.count || 0
    const transformedData = {
      numOfReadBooks: `(${booksReadCount})`,
      currentlyReading:
        userData?.user_books?.map((userBook) => {
          const book = userBook.book
          const authorName = book.contributions?.[0]?.author?.name || 'Unknown Author'
          return {
            title: book.title,
            author: authorName,
            imageUrl: book.image?.url || '/static/images/book-placeholder.png',
            url: `https://hardcover.app/books/${
              book.slug || book.title.toLowerCase().replace(/ /g, '-')
            }`,
            progress: userBook.user_book_reads?.[0]?.progress ?? null,
          }
        }) || [],
      source: 'hardcover',
    }

    console.log('Hardcover data fetched successfully:', transformedData)
    res.setHeader('Cache-Control', CACHE_OK)
    res.status(200).json(transformedData)
  } catch (error) {
    console.error('Error fetching Hardcover data:', error.message)
    // Return empty data structure on error
    res.setHeader('Cache-Control', CACHE_FAIL)
    res.status(200).json({
      numOfReadBooks: '(0)',
      currentlyReading: [],
      source: 'hardcover',
      error: error.message,
    })
  }
}
