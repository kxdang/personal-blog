import formatDate from '@/lib/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'

import { useState } from 'react'
import Pagination from '@/components/Pagination'

// Expanded colorful palette for tags
const tagColors = [
  'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800/60',
  'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800/60',
  'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-800/60',
  'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/50 dark:text-rose-300 dark:hover:bg-rose-800/60',
  'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:hover:bg-cyan-800/60',
  'bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200 dark:bg-fuchsia-900/50 dark:text-fuchsia-300 dark:hover:bg-fuchsia-800/60',
  'bg-lime-100 text-lime-700 hover:bg-lime-200 dark:bg-lime-900/50 dark:text-lime-300 dark:hover:bg-lime-800/60',
  'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:hover:bg-orange-800/60',
  'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:hover:bg-violet-800/60',
  'bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900/50 dark:text-teal-300 dark:hover:bg-teal-800/60',
]

const getTagColor = (tag) => {
  const index = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % tagColors.length
  return tagColors[index]
}

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
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                !selectedTag
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag
              const shouldFade = selectedTag && !isSelected

              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${getTagColor(
                    tag
                  )} ${isSelected ? 'scale-110 shadow-md ring-2 ring-inset' : ''} ${
                    shouldFade ? 'opacity-40 hover:opacity-70' : ''
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              aria-label="Search articles"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles..."
              className="block w-full rounded-xl border-0 bg-gray-100 dark:bg-gray-800 px-4 py-2.5 pl-10 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 transition-all"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Active filter indicator */}
          {(selectedTag || searchValue) && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 text-xs font-bold">
                  {displayPosts.length}
                </span>
                {displayPosts.length === 1 ? 'post' : 'posts'} found
                {selectedTag && (
                  <span className="inline-flex items-center gap-1">
                    in{' '}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${getTagColor(
                        selectedTag
                      )}`}
                    >
                      {selectedTag}
                    </span>
                  </span>
                )}
                {searchValue && (
                  <span>
                    matching "<span className="font-semibold">{searchValue}</span>"
                  </span>
                )}
              </span>
              <button
                onClick={() => {
                  setSearchValue('')
                  setSelectedTag(null)
                }}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium underline underline-offset-2"
              >
                Clear all
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
