// Server-side only MDX utilities - not imported by client code
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkFootnotes from 'remark-footnotes'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import { isPublished, sortByDate } from './mdx-content'

const BLOG_DIR = path.join(process.cwd(), 'data/blog')
const AUTHORS_DIR = path.join(process.cwd(), 'data/authors')

/**
 * Get all MDX/MD files from a directory
 */
function getMdxFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((file) => /\.(mdx?|md)$/.test(file))
}

/**
 * Serialize date objects to ISO strings for JSON serialization
 */
function serializeDates(obj) {
  const result = { ...obj }
  for (const key of Object.keys(result)) {
    if (result[key] instanceof Date) {
      result[key] = result[key].toISOString()
    }
  }
  return result
}

/**
 * Parse a single MDX file (without bundling - for listing)
 */
function parseMdxFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)
  const filename = path.basename(filePath)
  const slug = filename.replace(/\.(mdx?|md)$/, '')
  const extension = filename.split('.').pop()

  // Serialize dates to strings for JSON serialization
  const serializedData = serializeDates(data)

  return {
    ...serializedData,
    body: content,
    _sys: {
      filename: slug,
      extension,
      relativePath: filename,
    },
  }
}

/**
 * Bundle MDX content with plugins
 */
export async function bundleMdxContent(source) {
  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: process.cwd(),
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkMath,
        [remarkFootnotes, { inlineNotes: true }],
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypePrismPlus, { ignoreMissing: true }],
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      // Add path alias resolution
      options.define = {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      }
      // Resolve @/ alias to the root directory
      options.alias = {
        '@/components': path.join(process.cwd(), 'components'),
        '@/data': path.join(process.cwd(), 'data'),
        '@/layouts': path.join(process.cwd(), 'layouts'),
        '@/lib': path.join(process.cwd(), 'lib'),
        '@/css': path.join(process.cwd(), 'css'),
      }
      return options
    },
  })

  return { code, frontmatter }
}

/**
 * Get all blog posts (raw, not bundled)
 */
export function getAllBlogPosts() {
  const files = getMdxFiles(BLOG_DIR)
  return files.map((file) => parseMdxFile(path.join(BLOG_DIR, file)))
}

/**
 * Get sorted and filtered blog posts (published only)
 */
export function getSortedBlogPosts() {
  return sortByDate(getAllBlogPosts().filter(isPublished))
}

/**
 * Get a single blog post by slug (raw content, not bundled)
 */
export function getBlogPostBySlug(slug) {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const mdPath = path.join(BLOG_DIR, `${slug}.md`)

  if (fs.existsSync(mdxPath)) {
    return parseMdxFile(mdxPath)
  }
  if (fs.existsSync(mdPath)) {
    return parseMdxFile(mdPath)
  }
  return null
}

/**
 * Get a blog post with bundled MDX code for rendering
 */
export async function getBundledBlogPost(slug) {
  const post = getBlogPostBySlug(slug)
  if (!post) return null

  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const mdPath = path.join(BLOG_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath
  const source = fs.readFileSync(filePath, 'utf-8')

  const { code } = await bundleMdxContent(source)

  return {
    ...post,
    code,
  }
}

/**
 * Get all author files
 */
export function getAllAuthors() {
  const files = getMdxFiles(AUTHORS_DIR)
  return files.map((file) => parseMdxFile(path.join(AUTHORS_DIR, file)))
}

/**
 * Get author by name
 */
export function getAuthorByName(name) {
  const authors = getAllAuthors()
  return authors.find((a) => a.name === name)
}
