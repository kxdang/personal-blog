import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import GithubSlugger from 'github-slugger'

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

/**
 * Extracts headings from markdown content and generates table of contents
 * @param {string} markdown - The markdown content
 * @returns {Array} Array of heading objects with value, url, and depth
 */
export function extractTocHeadings(markdown) {
  const slugger = new GithubSlugger()
  // Matches markdown headings: # Heading, ## Heading, etc.
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length
    const value = match[2]
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Remove markdown links but keep the text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove inline code backticks
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
