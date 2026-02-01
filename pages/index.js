import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Profile from '@/components/Profile'
import PostCard from '@/components/PostCard'
import RestaurantSection from '@/components/RestaurantSection'
import siteMetadata from '@/data/siteMetadata'
import { getSortedBlogPosts } from '@/lib/mdx-server'
import { getCoreContent } from '@/lib/mdx-content'
import { QueryClient, QueryClientProvider } from 'react-query'
import { getAllRestaurants } from '@/lib/restaurants'
import { generateNumberedPhotos } from '@/lib/cloudinary'
import { fetchCloudinaryFolder } from '@/lib/cloudinary-server'
import kebabCase from '@/lib/utils/kebabCase'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const MAX_DISPLAY = 6
const POSTS_PER_PAGE = 10

// Colorful palette for tags - ordered to maximize contrast between adjacent colors
const tagColors = [
  'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:hover:bg-violet-800/60 ring-violet-500/20',
  'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800/60 ring-amber-500/20',
  'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:hover:bg-cyan-800/60 ring-cyan-500/20',
  'bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200 dark:bg-fuchsia-900/50 dark:text-fuchsia-300 dark:hover:bg-fuchsia-800/60 ring-fuchsia-500/20',
  'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-800/60 ring-emerald-500/20',
  'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800/60 ring-indigo-500/20',
  'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:hover:bg-orange-800/60 ring-orange-500/20',
  'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:hover:bg-sky-800/60 ring-sky-500/20',
  'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-800/60 ring-pink-500/20',
  'bg-lime-100 text-lime-700 hover:bg-lime-200 dark:bg-lime-900/50 dark:text-lime-300 dark:hover:bg-lime-800/60 ring-lime-500/20',
]

const getTagColor = (tag) => {
  // Special case: pomodoro gets tomato red
  if (tag.toLowerCase().includes('pomodoro')) {
    return 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/60 ring-red-500/20'
  }
  const index = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % tagColors.length
  return tagColors[index]
}

export async function getStaticProps() {
  // Get all blog posts from MDX files
  const posts = getSortedBlogPosts()
  const simplifiedPosts = getCoreContent(posts)

  // Get restaurants for the homepage
  const allRestaurants = await getAllRestaurants()

  // Process restaurant images
  const restaurantsWithImages = await Promise.all(
    allRestaurants.map(async (restaurant) => {
      let photos = []

      if (restaurant.photos === 'auto') {
        photos = await fetchCloudinaryFolder(restaurant.id)
      } else if (typeof restaurant.photos === 'number') {
        photos = generateNumberedPhotos(restaurant.photos, {
          folder: restaurant.id,
          altPrefix: restaurant.name,
        })
      } else if (Array.isArray(restaurant.photos)) {
        photos = restaurant.photos
      }

      return {
        ...restaurant,
        photos: photos.slice(0, 1), // Only need first image for homepage
      }
    })
  )

  // Sort by visit date (most recent first)
  const sortedRestaurants = restaurantsWithImages.sort((a, b) => {
    return new Date(b.visitDate) - new Date(a.visitDate)
  })

  return {
    props: {
      posts: simplifiedPosts,
      restaurants: sortedRestaurants,
    },
  }
}

const queryClient = new QueryClient()

export default function Home({ posts, restaurants }) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Handle tag from URL query (for /tags/[tag] redirects)
  useEffect(() => {
    if (router.query.tag) {
      setSelectedTag(router.query.tag)
    }
  }, [router.query.tag])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchValue, selectedTag, showAll])

  const selectedTitles = [
    '☃️ 2025 Year End Reflection',
    '🎒My Portfolio Career Era',
    "🇨🇦 How I Built a Canadian Recalls website (While Staying on Vercel's Free Tier)",
  ]

  const pinnedPosts = posts.filter((post) => selectedTitles.includes(post.title))

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort()

  // Filter posts based on search and tag
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ')
    const matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase())
    const matchesTag =
      !selectedTag || post.tags.map((t) => kebabCase(t)).includes(kebabCase(selectedTag))
    return matchesSearch && matchesTag
  })

  // Show filtered posts when searching/filtering, otherwise show latest 6
  const isFiltering = searchValue || selectedTag || showAll

  // Pagination logic
  const totalFilteredPosts = isFiltering ? filteredBlogPosts : posts
  const totalPages = Math.ceil(totalFilteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE

  // When not filtering, show first 6. When filtering/showAll, paginate
  const displayPosts = isFiltering
    ? filteredBlogPosts.slice(startIndex, endIndex)
    : posts.slice(0, MAX_DISPLAY)

  return (
    <QueryClientProvider client={queryClient}>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Profile />
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

      {/* Restaurant Section */}
      {restaurants && restaurants.length > 0 && <RestaurantSection restaurants={restaurants} />}

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-4 pt-6 pb-4">
          <h3 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            ✍️ {isFiltering ? 'Search Results' : 'Latest Blog Posts'}
          </h3>
          <p className="sm:text-md flex text-gray-500 dark:text-gray-400">
            {siteMetadata.description} <span className="ml-2 text-[8px]">lol</span>
          </p>

          {/* Colorful Tag Filter */}
          <div className="flex flex-wrap gap-2 items-center pt-2">
            <button
              onClick={() => {
                setSelectedTag(null)
                setSearchValue('')
                setShowAll(false)
                // Remove tag from URL if present
                if (router.query.tag) {
                  router.push('/', undefined, { shallow: true })
                }
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                !selectedTag && !searchValue && !showAll
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => {
              const isSelected = selectedTag && kebabCase(selectedTag) === kebabCase(tag)
              const shouldFade = selectedTag && !isSelected

              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ring-1 ring-inset ${getTagColor(
                    tag
                  )} ${isSelected ? 'scale-110 shadow-md ring-2' : ''} ${
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
          {isFiltering && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>
                {totalFilteredPosts.length} {totalFilteredPosts.length === 1 ? 'post' : 'posts'}
              </span>
              {(selectedTag || searchValue) && (
                <button
                  onClick={() => {
                    setSearchValue('')
                    setSelectedTag(null)
                    setShowAll(false)
                    if (router.query.tag) {
                      router.push('/', undefined, { shallow: true })
                    }
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>
        <div className="pt-6">
          {displayPosts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg">No posts found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchValue('')
                  setSelectedTag(null)
                  setShowAll(false)
                }}
                className="mt-4 text-primary-500 hover:text-primary-600 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            displayPosts.map((post) => (
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
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedTag(tag)
                            }}
                            className={`inline-flex items-center px-2 py-0.5 rounded-full transition-all font-semibold text-[10px] hover:scale-105 ${getTagColor(
                              tag
                            )}`}
                          >
                            {tag.split(' ').join('-')}
                          </button>
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
            ))
          )}
        </div>
      </div>
      {/* Pagination */}
      {isFiltering && totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 text-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`transition-colors ${
              currentPage === 1
                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            ← Prev
          </button>
          <span className="text-gray-400 dark:text-gray-500">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`transition-colors ${
              currentPage === totalPages
                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            Next →
          </button>
        </div>
      )}
      {!isFiltering && posts.length > MAX_DISPLAY && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-md hover:shadow-lg"
          >
            View All {posts.length} Posts
          </button>
        </div>
      )}
    </QueryClientProvider>
  )
}
