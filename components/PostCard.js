import React from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'

export default function PostCard({ posts, maxDisplay = 3 }) {
  return (
    <>
      {!posts.length && 'No posts found.'}
      {posts.slice(0, maxDisplay).map((frontMatter) => {
        const { slug, date, title, summary, tags, readingTime } = frontMatter
        return (
          <div
            key={slug}
            className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 first:sm:col-span-2 first:md:col-span-1"
          >
            <div className="flex h-full flex-col p-5">
              <div className="mb-auto">
                <Link href={`/blog/${slug}`}>
                  <h5 className="text-1xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                  </h5>
                </Link>
                <div className=" mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {' '}
                  <time dateTime={date}>{formatDate(date)}</time> • <span>{readingTime.text}</span>
                </div>
                <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                  {summary}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap text-sm">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
              <div className="flex justify-end">
                <Link
                  href={`/blog/${slug}`}
                  className="mt-4 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
