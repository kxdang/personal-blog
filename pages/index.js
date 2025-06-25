import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Profile from '@/components/Profile'
import PostCard from '@/components/PostCard'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { QueryClient, QueryClientProvider } from 'react-query'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
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
        <div className="grid grid-cols-1 gap-5 pt-10 sm:grid-cols-2 md:grid-cols-3">
          <PostCard posts={posts} />
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
