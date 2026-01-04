import formatDate from '@/lib/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'

import { useState } from 'react'
import Pagination from '@/components/Pagination'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)

  // Get all unique tags from posts
  const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort()

  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    const matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase())
    const matchesTag = !selectedTag || frontMatter.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  // If initialDisplayPosts exist, display it if no searchValue or selectedTag is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue && !selectedTag
      ? initialDisplayPosts
      : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-4 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by tag:
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                !selectedTag
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => {
              const colorClasses = [
                'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60',
                'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:hover:bg-amber-900/60',
                'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60',
                'bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-900/60',
              ]
              const colorIndex =
                tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
                colorClasses.length
              const isSelected = selectedTag === tag
              const shouldGrayscale = selectedTag && !isSelected

              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isSelected ? 'scale-105' : ''
                  } ${shouldGrayscale ? 'grayscale opacity-50' : ''} ${colorClasses[colorIndex]}`}
                >
                  {tag}
                </button>
              )
            })}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Active filter indicator */}
          {(selectedTag || searchValue) && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>
                Showing {displayPosts.length} {displayPosts.length === 1 ? 'post' : 'posts'}
                {selectedTag && (
                  <span>
                    {' '}
                    tagged with <span className="font-semibold">{selectedTag}</span>
                  </span>
                )}
                {searchValue && (
                  <span>
                    {' '}
                    matching <span className="font-semibold">"{searchValue}"</span>
                  </span>
                )}
              </span>
              <button
                onClick={() => {
                  setSearchValue('')
                  setSelectedTag(null)
                }}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, readingTime } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-300">
                      <div className="flex xl:hidden">
                        <time className="pr-2" dateTime={date}>
                          {formatDate(date)}
                        </time>{' '}
                        • <p className="pl-1">{readingTime.text}</p>
                      </div>
                      <div className="hidden xl:flex">
                        <div className="flex flex-col">
                          <time dateTime={date}>{formatDate(date)}</time>
                          <p>{readingTime.text}</p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h2>
                      <div className="mt-2 flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-600 dark:text-gray-300">
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
