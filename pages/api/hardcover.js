export default async function handler(req, res) {
  try {
    const HARDCOVER_API_URL = 'https://api.hardcover.app/v1/graphql'
    const HARDCOVER_TOKEN = process.env.HARDCOVER_API_TOKEN

    if (!HARDCOVER_TOKEN) {
      console.log('No Hardcover API token configured')
      // Return empty data structure when no token
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

    if (!response.ok) {
      console.error('Hardcover API error:', response.status, data)
      throw new Error(`Hardcover API responded with status: ${response.status}`)
    }

    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2))
      // Return empty data on GraphQL errors but don't fail completely
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
          }
        }) || [],
      source: 'hardcover',
    }

    console.log('Hardcover data fetched successfully:', transformedData)
    res.status(200).json(transformedData)
  } catch (error) {
    console.error('Error fetching Hardcover data:', error.message)
    // Return empty data structure on error
    res.status(200).json({
      numOfReadBooks: '(0)',
      currentlyReading: [],
      source: 'hardcover',
      error: error.message,
    })
  }
}
