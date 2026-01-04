import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Profile from '@/components/Profile'
import PostCard from '@/components/PostCard'
import RestaurantSection from '@/components/RestaurantSection'
import siteMetadata from '@/data/siteMetadata'
import { sortedBlogPost, allCoreContent } from '@/lib/contentlayer'
import { QueryClient, QueryClientProvider } from 'react-query'
import { getAllRestaurants } from '@/lib/restaurants'
import { generateNumberedPhotos } from '@/lib/cloudinary'
import { fetchCloudinaryFolder } from '@/lib/cloudinary-server'
import kebabCase from '@/lib/utils/kebabCase'
import { useRouter } from 'next/router'

const MAX_DISPLAY = 6

export async function getStaticProps() {
  const posts = sortedBlogPost()
  const simplifiedPosts = allCoreContent(posts)

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
  const selectedTitles = [
    '☃️ 2025 Year End Reflection',
    '🎒My Portfolio Career Era',
    '🇨🇦 How I Built a Canadian Recalls website (While Staying on Vercel’s Free Tier)',
  ]

  const filteredPosts = posts.filter((post) => selectedTitles.includes(post.title))

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
          <PostCard posts={filteredPosts} />
        </div>
      </div>

      {/* Restaurant Section */}
      {restaurants && restaurants.length > 0 && <RestaurantSection restaurants={restaurants} />}

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-2">
          <h3 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            ✍️ Latest Blog Posts
          </h3>
          <p className="sm:text-md flex text-gray-500 dark:text-gray-400">
            {siteMetadata.description} <span className="ml-2 text-[8px]">lol</span>
          </p>
        </div>
        <div className="pt-8">
          {posts.slice(0, 6).map((post) => (
            <article
              key={post.slug}
              onClick={(e) => {
                // Don't navigate if clicking on a link
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
                        year:
                          new Date(post.date).getFullYear() !== new Date().getFullYear()
                            ? 'numeric'
                            : undefined,
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
                      {post.tags.slice(0, 2).map((tag) => {
                        const colorClasses = [
                          'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60',
                          'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:hover:bg-amber-900/60',
                          'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60',
                          'bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-900/60',
                        ]
                        // Use a simple hash to consistently assign colors to tags
                        const colorIndex =
                          tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
                          colorClasses.length
                        return (
                          <Link
                            key={tag}
                            href={`/tags/${kebabCase(tag)}`}
                            className={`inline-flex items-center px-2 py-0.5 rounded-full transition-colors font-semibold text-[10px] ${colorClasses[colorIndex]}`}
                          >
                            {tag.split(' ').join('-')}
                          </Link>
                        )
                      })}
                      {post.tags.length > 2 && (
                        <span className="text-gray-400 dark:text-gray-600 font-medium">
                          +{post.tags.length - 2}
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
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="mt-4 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </QueryClientProvider>
  )
}
