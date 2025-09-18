// This endpoint combines both Hardcover and Goodreads APIs
// It tries Hardcover first, then falls back to Goodreads if needed

import axios from 'axios'
import * as cheerio from 'cheerio'

async function fetchFromHardcover() {
  const HARDCOVER_API_URL = 'https://api.hardcover.app/v1/graphql'
  const HARDCOVER_TOKEN = process.env.HARDCOVER_API_TOKEN

  if (!HARDCOVER_TOKEN) {
    throw new Error('Hardcover API token not configured')
  }

  // GraphQL query - adjust based on actual Hardcover API schema
  // You may need to check their documentation for the exact query structure
  const query = `
    query GetUserBooks {
      me {
        stats {
          booksRead
        }
        currentlyReading {
          books {
            title
            author {
              name
            }
            coverImageUrl
            hardcoverUrl
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

  if (!response.ok) {
    throw new Error(`Hardcover API responded with status: ${response.status}`)
  }

  const data = await response.json()

  if (data.errors) {
    throw new Error('GraphQL query failed')
  }

  // Transform the data to match the existing format
  return {
    numOfReadBooks: `(${data.data?.me?.stats?.booksRead || 0})`,
    currentlyReading:
      data.data?.me?.currentlyReading?.books?.map((book) => ({
        title: book.title,
        author: book.author?.name || 'Unknown Author',
        imageUrl: book.coverImageUrl,
        url: book.hardcoverUrl || '#',
      })) || [],
    source: 'hardcover',
  }
}

async function fetchFromGoodreads() {
  const url = 'https://www.goodreads.com/review/list/63733680-kien-dang?shelf=currently-reading'
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
  }
  const response = await axios.get(url, { headers })
  const html = response.data
  const $ = cheerio.load(html)

  const numOfBooksRead = 'a.actionLinkLite[href*="/review/list/"][href*="?shelf=read"]'

  const scrapedNumber = $(numOfBooksRead).text()
  const currentlyReading = []

  $('tr.bookalike.review').each((index, element) => {
    const $element = $(element)

    const title = $element.find('td.field.title a').text().replace(/\n/g, '').trim()
    const author = $element.find('td.field.author a').text().trim()
    const url = $element.find('td.field.title a').attr('href')
    const originalUrl = $element.find('td.field.cover img').attr('src')
    const imageUrl = originalUrl?.replace(/_S[XY]\d+_/i, '_SY275_')

    currentlyReading.push({ title, author, url, imageUrl })
  })

  return {
    numOfReadBooks: scrapedNumber,
    currentlyReading,
    source: 'goodreads',
  }
}

export default async function handler(req, res) {
  try {
    // Try Hardcover first
    try {
      const hardcoverData = await fetchFromHardcover()
      console.log('Successfully fetched from Hardcover')
      return res.status(200).json(hardcoverData)
    } catch (hardcoverError) {
      console.log('Hardcover API failed, falling back to Goodreads:', hardcoverError.message)

      // Fall back to Goodreads
      const goodreadsData = await fetchFromGoodreads()
      console.log('Successfully fetched from Goodreads')
      return res.status(200).json(goodreadsData)
    }
  } catch (error) {
    console.error('Error fetching book data:', error)
    res.status(500).json({
      error: 'An error occurred while fetching book data.',
      details: error.message,
    })
  }
}
