import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Profile from '@/components/Profile'
import PostCard from '@/components/PostCard'
import siteMetadata from '@/data/siteMetadata'
import { sortedBlogPost, allCoreContent } from '@/lib/contentlayer'
import { QueryClient, QueryClientProvider } from 'react-query'

const MAX_DISPLAY = 6

export async function getStaticProps() {
  const posts = sortedBlogPost()
  const simplifiedPosts = allCoreContent(posts)

  return { props: { posts: simplifiedPosts } }
}

const queryClient = new QueryClient()

export default function Home({ posts }) {
  const selectedTitles = [
    '🇨🇦 How I Built a Canadian Recalls website (While Staying on Vercel’s Free Tier)',
    '♠️ Five Years as an IC - A Blink and a Lifetime in Tech',
    '📊My Year Journey in Becoming a Developer',
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
              className="py-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <time className="text-xs text-gray-500 dark:text-gray-500" dateTime={post.date}>
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
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-500 dark:text-gray-500">{post.readingTime.text}</span>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span className="text-gray-400 dark:text-gray-600">•</span>
                      <div className="flex gap-1.5">
                        {post.tags.slice(0, 2).map((tag) => {
                          const colorClasses = [
                            'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50',
                            'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50',
                            'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50',
                            'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50',
                            'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:hover:bg-pink-900/50',
                            'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:hover:bg-cyan-900/50',
                          ]
                          // Use a simple hash to consistently assign colors to tags
                          const colorIndex =
                            tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
                            colorClasses.length
                          return (
                            <Link
                              key={tag}
                              href={`/tags/${tag}`}
                              className={`inline-flex items-center px-2 py-0.5 rounded-full transition-colors text-xs font-medium ${colorClasses[colorIndex]}`}
                            >
                              {tag}
                            </Link>
                          )
                        })}
                        {post.tags.length > 2 && (
                          <span className="text-gray-400 dark:text-gray-600">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
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
