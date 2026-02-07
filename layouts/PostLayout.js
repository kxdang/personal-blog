import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import readingTimeMax from '@/lib/utils/readingTimeMaxFormatter'
import formatDate from '@/lib/utils/formatDate'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`

export default function PostLayout({ frontMatter, authorDetails, next, prev, toc, children }) {
  const { slug, fileName, date, title, tags, readingTime } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time> •{' '}
                    {readingTimeMax(readingTime.text)}
                  </dd>
                </div>
              </dl>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="hidden xl:block pt-6 xl:pt-11">
              <div className="sticky top-8 sidebar-nav">
                {/* Table of Contents */}
                {toc && toc.length > 0 && (
                  <div className="pb-4">
                    <h2 className="pb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                      On this page
                    </h2>
                    <nav>
                      <ul className="border-l border-gray-200 dark:border-gray-700">
                        {toc.map((heading) => (
                          <li key={heading.url}>
                            <a
                              href={heading.url}
                              className={`block border-l-2 border-transparent py-0.5 hover:border-primary-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors line-clamp-2 ${
                                heading.depth <= 2
                                  ? 'pl-3 text-xs font-medium text-gray-600 dark:text-gray-400'
                                  : 'pl-6 text-[11px] text-gray-400 dark:text-gray-500'
                              }`}
                            >
                              {heading.value}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Tags */}
                {tags && (
                  <div className="border-t border-gray-200 dark:border-gray-700 py-4">
                    <h2 className="pb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-y-1">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} small />
                      ))}
                    </div>
                  </div>
                )}

                {/* Prev/Next navigation */}
                {(next || prev) && (
                  <div className="border-t border-gray-200 dark:border-gray-700 py-4 space-y-3">
                    {prev && (
                      <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                          Previous Article
                        </h2>
                        <div className="text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                          Next Article
                        </h2>
                        <div className="text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Link
                    href="/"
                    className="text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; Back to blog
                  </Link>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
              <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={editUrl(fileName)}>{'Fix a typo'}</Link>
              </div>
              <Comments frontMatter={frontMatter} />
            </div>

            {/* Mobile-only footer with tags and nav */}
            <footer className="xl:hidden">
              <div className="divide-gray-200 text-sm leading-5 dark:divide-gray-700 divide-y">
                {tags && (
                  <div className="py-4">
                    <h2 className="pb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-y-1">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} small />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4">
                    {prev && (
                      <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                          Previous Article
                        </h2>
                        <div className="text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                          Next Article
                        </h2>
                        <div className="text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4">
                <Link
                  href="/"
                  className="text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
