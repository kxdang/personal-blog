import { compareDesc } from 'date-fns'
import readingTime from 'reading-time'
import GithubSlugger from 'github-slugger'

/**
 * Check if a post should be published based on publishDate and draft status
 */
export function isPublished(post) {
  if (post.draft) return false
  if (!post.publishDate) return true
  return new Date(post.publishDate) <= new Date()
}

/**
 * Extract headings from markdown content for TOC
 */
export function extractTocHeadings(markdown) {
  const slugger = new GithubSlugger()
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length
    const value = match[2]
      .replace(/<[^>]*>/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .trim()

    headings.push({
      value,
      depth,
      url: '#' + slugger.slug(value),
    })
  }

  return headings
}

/**
 * Get core content for list views (simplified post data)
 */
export function getCoreContent(posts) {
  return posts.map((post) => ({
    slug: post.slug || post._sys?.filename,
    title: post.title,
    summary: post.summary || '',
    date: post.date,
    tags: post.tags || [],
    readingTime: readingTime(post.body || ''),
    draft: post.draft || false,
  }))
}

/**
 * Get reading time for content
 */
export function getReadingTime(content) {
  return readingTime(content || '')
}

/**
 * Sort posts by date (newest first)
 */
export function sortByDate(posts) {
  return posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
}
