import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import { sortedBlogPost } from '@/lib/contentlayer'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((post) => ({
      params: {
        slug: post.slug.split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join('/')
  const allPosts = sortedBlogPost()
  const postIndex = allPosts.findIndex((post) => post.slug === slug)
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = allBlogs.find((p) => p.slug === slug)

  const authorList = post.author ? [post.author] : ['default']
  const authorDetails = authorList.map((author) => {
    const authorData = allAuthors.find((a) => a.name === author)
    return authorData || { name: author }
  })

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return {
    props: {
      post,
      authorDetails,
      prev: prev ? { slug: prev.slug, title: prev.title } : null,
      next: next ? { slug: next.slug, title: next.title } : null,
    },
  }
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { body, ...frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={body.code}
          toc={[]}
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
