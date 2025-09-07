import { sortedBlogPost, allCoreContent } from '@/lib/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = sortedBlogPost()
  const simplifiedPosts = allCoreContent(posts)
  const initialDisplayPosts = simplifiedPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(simplifiedPosts.length / POSTS_PER_PAGE),
  }

  console.log('pagination', pagination)

  return { props: { initialDisplayPosts, posts: simplifiedPosts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
