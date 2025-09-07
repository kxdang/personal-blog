import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export function sortedBlogPost() {
  return allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
}

export function allCoreContent(contents) {
  return contents.map((content) => ({
    slug: content.slug,
    title: content.title,
    summary: content.summary || '',
    date: content.date,
    tags: content.tags || [],
    readingTime: content.readingTime,
    draft: content.draft || false,
  }))
}
