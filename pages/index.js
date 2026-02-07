import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Profile from '@/components/Profile'
import PostCard from '@/components/PostCard'
import SearchModal from '@/components/SearchModal'
import siteMetadata from '@/data/siteMetadata'
import { getSortedBlogPosts } from '@/lib/mdx-server'
import { getCoreContent } from '@/lib/mdx-content'
import { QueryClient, QueryClientProvider } from 'react-query'
import { getTagColor, getTagLabel } from '@/lib/utils/tagColors'
import kebabCase from '@/lib/utils/kebabCase'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'

const MAX_DISPLAY = 6

export async function getStaticProps() {
  // Get all blog posts from MDX files
  const posts = getSortedBlogPosts()
  const simplifiedPosts = getCoreContent(posts)

  return {
    props: {
      posts: simplifiedPosts,
    },
  }
}

const queryClient = new QueryClient()

export default function Home({ posts }) {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState(null)

  const selectedTitles = [
    '☃️ 2025 Year End Reflection',
    '🎒My Portfolio Career Era',
    '🇨🇦 How I Built a Canadian Recalls website (While Staying on Vercel\u2019s Free Tier)',
  ]

  const pinnedPosts = posts.filter((post) => selectedTitles.includes(post.title))

  // Tag filtering
  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))].sort()
  const filteredPosts = selectedTag
    ? posts.filter((p) => (p.tags || []).includes(selectedTag))
    : posts.slice(0, MAX_DISPLAY)

  // Read tag from URL on mount
  useEffect(() => {
    if (router.query.tag) {
      const match = allTags.find((t) => kebabCase(t) === router.query.tag)
      if (match) setSelectedTag(match)
    }
  }, [router.query.tag]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcut: Cmd/Ctrl + K to open search
  const handleKeyDown = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsSearchOpen(true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <QueryClientProvider client={queryClient}>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Profile />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} posts={posts} />

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-2">
          <h3 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            📌 Pinned Posts
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-5 pt-10 sm:grid-cols-2 md:grid-cols-3">
          <PostCard posts={pinnedPosts} />
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-4 pt-6 pb-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
              ✍️ Latest Blog Posts
            </h3>

            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="hidden sm:inline">Search articles...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] text-gray-400 bg-gray-200 dark:bg-gray-700 rounded">
                ⌘K
              </kbd>
            </button>
          </div>
          <p className="sm:text-md text-gray-500 dark:text-gray-400">{siteMetadata.description}</p>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => {
                setSelectedTag(null)
                router.push('/', undefined, { shallow: true, scroll: false })
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                !selectedTag
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag
              const shouldFade = selectedTag && !isSelected
              return (
                <button
                  key={tag}
                  onClick={() => {
                    const newTag = isSelected ? null : tag
                    setSelectedTag(newTag)
                    if (newTag) {
                      router.push(`/?tag=${kebabCase(newTag)}`, undefined, {
                        shallow: true,
                        scroll: false,
                      })
                    } else {
                      router.push('/', undefined, { shallow: true, scroll: false })
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${getTagColor(
                    tag
                  )} ${isSelected ? 'scale-110 shadow-md ring-2 ring-inset' : ''} ${
                    shouldFade ? 'opacity-40 hover:opacity-70' : ''
                  }`}
                >
                  {getTagLabel(tag)}
                </button>
              )
            })}
          </div>
        </div>
        <div className="pt-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              onClick={(e) => {
                if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                  router.push(`/blog/${post.slug}`)
                }
              }}
              className="group py-5 px-3 -mx-3 border-b border-gray-100 dark:border-gray-800 last:border-0 rounded-lg hover:bg-[#f0ebe3] dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <Link href={`/blog/${post.slug}`}>
                      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h1>
                    </Link>
                    <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <time
                      className="text-[11px] text-gray-400 dark:text-gray-500 font-medium"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
                <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-[11px]">
                  <span className="text-gray-400 dark:text-gray-500 font-medium inline-flex items-center gap-1.5">
                    <span>{post.readingTime.text}</span>
                    <span className="text-sm">
                      {'☕'.repeat(Math.ceil(parseInt(post.readingTime.text) / 3) || 1)}
                    </span>
                  </span>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`pointer-events-none inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mr-1 mb-0.5 ${getTagColor(
                            tag
                          )}`}
                        >
                          {getTagLabel(tag)}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-gray-400 dark:text-gray-600 font-medium">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {posts.length > MAX_DISPLAY && !selectedTag && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-md hover:shadow-lg"
          >
            Browse All {posts.length} Posts
          </button>
        </div>
      )}
    </QueryClientProvider>
  )
}
