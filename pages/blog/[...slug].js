import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import {
  getAllBlogPosts,
  getSortedBlogPosts,
  getBundledBlogPost,
  getAuthorByName,
} from '@/lib/mdx-server'
import { extractTocHeadings, getReadingTime } from '@/lib/mdx-content'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const posts = getAllBlogPosts()

  return {
    paths: posts.map((post) => ({
      params: {
        slug: [post.slug],
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join('/')

  // Get the current post with bundled MDX
  const post = await getBundledBlogPost(slug)

  if (!post) {
    return { notFound: true }
  }

  // Get all posts for prev/next navigation and RSS
  const allPosts = getSortedBlogPosts()

  const postIndex = allPosts.findIndex((p) => p.slug === slug)
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null

  // Get author details
  const authorName = post.author || 'Kien Dang'
  const author = getAuthorByName(authorName)
  const authorDetails = author ? [author] : [{ name: authorName }]

  // Generate RSS
  const rssData = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    summary: p.summary,
    tags: p.tags,
  }))

  if (rssData.length > 0) {
    const rss = generateRss(rssData)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  // Extract TOC from raw body
  const toc = extractTocHeadings(post.body || '')

  return {
    props: {
      post: {
        ...post,
        body: null, // Don't pass raw body to client
      },
      toc,
      authorDetails,
      prev: prev ? { slug: prev.slug, title: prev.title } : null,
      next: next ? { slug: next.slug, title: next.title } : null,
    },
  }
}

export default function Blog({ post, toc, authorDetails, prev, next }) {
  const readingTime = getReadingTime(post.code || '')

  const frontMatter = {
    title: post.title,
    date: post.date,
    lastmod: post.lastmod,
    tags: post.tags || [],
    draft: post.draft || false,
    summary: post.summary,
    description: post.description,
    images: post.images,
    author: post.author,
    layout: post.layout,
    bibliography: post.bibliography,
    canonicalUrl: post.canonicalUrl,
    slug: post.slug,
    fileName: `${post._sys.filename}.${post._sys.extension}`,
    readingTime,
  }

  return (
    <>
      {!frontMatter.draft || process.env.NODE_ENV === 'development' ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={post.code}
          toc={toc}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
