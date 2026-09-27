import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Comments from '@/components/comments'
import { getReadingList } from '@/lib/readingList'

const numberFormat = new Intl.NumberFormat('en-US')

function BookSpine({ book }) {
  return (
    <Link
      href={book.url}
      target="_blank"
      className="group relative block w-[84px] shrink-0 sm:w-[96px]"
      aria-label={`${book.title} by ${book.author}`}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-sm bg-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.25)] ring-1 ring-black/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.35)] dark:bg-gray-700">
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
            unoptimized
          />
        ) : (
          // No cover on Hardcover — set the title instead of showing a gap.
          <div className="flex h-full w-full flex-col justify-center bg-gray-600 p-2 dark:bg-gray-800">
            <span className="font-serif text-[10px] leading-tight text-gray-100">{book.title}</span>
          </div>
        )}
        {/* a hint of spine curvature */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Detail on hover / focus, so the wall of covers stays clean at rest. */}
      <div className="pointer-events-none absolute -top-2 left-1/2 z-20 hidden w-44 -translate-x-1/2 -translate-y-full rounded-md bg-gray-800 p-3 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block dark:bg-gray-900">
        <p className="font-serif text-sm font-semibold leading-snug text-gray-50">{book.title}</p>
        <p className="mt-1 text-xs text-gray-300">{book.author}</p>
        {(book.year || book.pages) && (
          <p className="mt-1 text-[11px] text-gray-400">
            {[book.year, book.pages && `${book.pages} pages`].filter(Boolean).join(' · ')}
          </p>
        )}
        {book.series && <p className="mt-1 text-[11px] italic text-primary-300">{book.series}</p>}
      </div>
    </Link>
  )
}

function Shelf({ shelf }) {
  // Group consecutive books from the same series so a trilogy reads as a unit.
  const groups = []
  for (const book of shelf.books) {
    const last = groups[groups.length - 1]
    if (book.series && last?.series === book.series) last.books.push(book)
    else groups.push({ series: book.series, books: [book] })
  }

  return (
    <section className="mb-14">
      <div className="mb-1 flex flex-wrap items-baseline gap-x-3">
        <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-100">
          {shelf.name}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{shelf.books.length} books</span>
      </div>
      <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">{shelf.blurb}</p>

      <div className="flex flex-wrap items-end gap-x-5 gap-y-6 pb-4">
        {groups.map((group, i) => (
          <div
            key={`${group.series || 'single'}-${i}`}
            // Six-book series (Stormlight, Red Rising) are wider than a phone
            // screen, so the cluster has to be allowed to wrap.
            className={group.books.length > 1 ? 'flex max-w-full flex-wrap items-end gap-1' : ''}
          >
            {group.books.map((book) => (
              <BookSpine key={book.url} book={book} />
            ))}
          </div>
        ))}
      </div>

      {/* the shelf itself */}
      <div className="h-2 rounded-sm bg-gradient-to-b from-primary-600 to-primary-800 shadow-[0_4px_8px_rgba(0,0,0,0.25)] dark:from-primary-800 dark:to-primary-900" />
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </div>
  )
}

export default function Read({ shelves, stats }) {
  const commentsEnabled = Boolean(siteMetadata.comment?.giscusConfig?.repo)

  // How lopsided the shelf is, used to frame the ask for recommendations.
  const genreHeavy = shelves
    .filter((s) => ['fantasy', 'scifi', 'mystery'].includes(s.id))
    .reduce((sum, s) => sum + s.books.length, 0)
  const skew = stats?.total ? Math.round((genreHeavy / stats.total) * 100) : null

  return (
    <>
      <PageSEO
        title={`Bookshelf - ${siteMetadata.author}`}
        description="Every book I have finished, arranged by shelf."
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="font-serif text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            📚 Bookshelf
          </h1>
          <figure className="max-w-2xl border-l-2 border-primary-400 pl-4 dark:border-primary-600">
            <blockquote className="font-serif text-lg italic leading-7 text-gray-700 dark:text-gray-200">
              &ldquo;A book is a dream that you hold in your hands.&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Neil Gaiman
            </figcaption>
          </figure>

          <p className="max-w-3xl text-lg leading-7 text-gray-600 dark:text-gray-300">
            Everything I have finished reading, pulled live from{' '}
            <Link
              href="https://hardcover.app/@kien"
              target="_blank"
              className="text-primary-500 hover:text-primary-600"
            >
              Hardcover
            </Link>{' '}
            and sorted onto shelves. Hover a cover for the details.
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
            <Stat value={stats.total} label="Books finished" />
            <Stat value={numberFormat.format(stats.totalPages)} label="Pages read" />
            {stats.bestYear && (
              <Stat value={stats.bestYear.count} label={`Best year (${stats.bestYear.year})`} />
            )}
            {stats.topShelf && <Stat value={stats.topShelf.count} label={stats.topShelf.name} />}
          </div>
        )}

        <div className="pt-12">
          {shelves.length === 0 ? (
            <p className="py-8 text-gray-500 dark:text-gray-400">
              The shelf could not be loaded right now.
            </p>
          ) : (
            shelves.map((shelf) => <Shelf key={shelf.id} shelf={shelf} />)
          )}
        </div>

        {/* Giscus needs its repo IDs in the environment; without them the widget
            would render a button that silently does nothing, so hide it. */}
        {commentsEnabled && (
          <div className="pt-10">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-100">
              Recommend me something
            </h2>
            <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
              {skew
                ? `Fantasy, science fiction and thrillers are ${skew}% of this shelf, which tells you
                   exactly where my blind spots are.`
                : 'This shelf has some obvious blind spots.'}{' '}
              If you have read something outside these genres that stayed with you, I want to hear
              about it. Comments run on GitHub Discussions.
            </p>
            <div className="mt-6">
              <Comments />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { shelves, stats } = await getReadingList()
  // Rebuilt hourly, so finishing a book shows up without a deploy.
  return { props: { shelves, stats }, revalidate: 3600 }
}
