import { assignShelves, SHELF_ORDER } from './bookshelf'

const HARDCOVER_API_URL = 'https://api.hardcover.app/v1/graphql'

const READ_BOOKS_QUERY = `
  {
    me {
      user_books(where: {status_id: {_eq: 3}}, order_by: {last_read_date: desc_nulls_last}, limit: 500) {
        rating
        last_read_date
        book {
          title
          slug
          pages
          release_year
          cached_tags
          image {
            url
          }
          contributions(limit: 1) {
            author {
              name
            }
          }
          featured_book_series {
            position
            series {
              name
            }
          }
        }
      }
    }
  }
`

/**
 * Series books should sit together on the shelf, in publication order. Books
 * with no series sort after them, newest read first. Hardcover exposes a
 * featured series but no reliable position, so release_year stands in for it.
 */
function shelfSort(a, b) {
  if (a.series && b.series) {
    if (a.series !== b.series) return a.series.localeCompare(b.series)
    // Hardcover's release_year is unreliable (Calamity is recorded as 2001),
    // so order within a series by its real position.
    return (a.position ?? Infinity) - (b.position ?? Infinity)
  }
  if (a.series) return -1
  if (b.series) return 1
  return (b.readDate || '').localeCompare(a.readDate || '')
}

/** Fetches the read shelf and reshapes it for the page. Server-side only. */
export async function getReadingList() {
  const token = process.env.HARDCOVER_API_TOKEN
  if (!token) {
    console.error(
      '[hardcover] HARDCOVER_API_TOKEN is not set — /read will build with an empty shelf.'
    )
    return { shelves: [], stats: null }
  }

  const response = await fetch(HARDCOVER_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query: READ_BOOKS_QUERY }),
  })

  const payload = await response.json()

  if (!response.ok || payload.errors) {
    console.error(
      `[hardcover] /read fetch failed (${response.status}):`,
      payload.error_description || JSON.stringify(payload.errors)
    )
    return { shelves: [], stats: null }
  }

  const userBooks = payload.data?.me?.[0]?.user_books || []

  // Shelve everything in one pass so series stay together.
  const shelfBySlug = assignShelves(userBooks.map((userBook) => userBook.book))

  const books = userBooks.map((userBook) => {
    const book = userBook.book
    return {
      title: book.title,
      author: book.contributions?.[0]?.author?.name || 'Unknown author',
      // Two books have no cover on Hardcover; the card renders a typographic
      // fallback when imageUrl is null rather than a broken image.
      imageUrl: book.image?.url || null,
      url: `https://hardcover.app/books/${book.slug}`,
      pages: book.pages || null,
      year: book.release_year || null,
      readDate: userBook.last_read_date || null,
      series: book.featured_book_series?.series?.name || null,
      position: book.featured_book_series?.position ?? null,
      shelf: shelfBySlug[book.slug],
    }
  })

  const shelves = SHELF_ORDER.map((shelf) => ({
    id: shelf.id,
    name: shelf.name,
    blurb: shelf.blurb,
    books: books.filter((b) => b.shelf === shelf.id).sort(shelfSort),
  })).filter((shelf) => shelf.books.length > 0)

  const totalPages = books.reduce((sum, b) => sum + (b.pages || 0), 0)
  const readYears = books.map((b) => b.readDate?.slice(0, 4)).filter(Boolean)
  const perYear = readYears.reduce((acc, y) => ({ ...acc, [y]: (acc[y] || 0) + 1 }), {})
  const bestYear = Object.entries(perYear).sort((a, b) => b[1] - a[1])[0]
  const topShelf = [...shelves].sort((a, b) => b.books.length - a.books.length)[0]

  return {
    shelves,
    stats: {
      total: books.length,
      totalPages,
      bestYear: bestYear ? { year: bestYear[0], count: bestYear[1] } : null,
      topShelf: topShelf ? { name: topShelf.name, count: topShelf.books.length } : null,
      thisYear: perYear[String(new Date().getFullYear())] || 0,
    },
  }
}
