import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import path from 'path'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkFootnotes from 'remark-footnotes'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

const computedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\//, ''),
  },
  structuredData: {
    type: 'json',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.date,
      dateModified: doc.lastmod || doc.date,
      description: doc.summary,
      image: doc.images ? doc.images[0] : null,
      url: `/blog/${doc._raw.flattenedPath.replace(/^blog\//, '')}`,
      author: {
        '@type': 'Person',
        name: doc.author,
      },
    }),
  },
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.{md,mdx}',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    lastmod: {
      type: 'date',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    draft: {
      type: 'boolean',
      default: false,
    },
    summary: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    images: {
      type: 'list',
      of: { type: 'string' },
    },
    author: {
      type: 'string',
      required: true,
    },
    layout: {
      type: 'string',
    },
    bibliography: {
      type: 'string',
    },
    canonicalUrl: {
      type: 'string',
    },
  },
  computedFields,
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.{md,mdx}',
  contentType: 'mdx',
  fields: {
    name: {
      type: 'string',
      required: true,
    },
    avatar: {
      type: 'string',
    },
    occupation: {
      type: 'string',
    },
    company: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    twitter: {
      type: 'string',
    },
    linkedin: {
      type: 'string',
    },
    github: {
      type: 'string',
    },
    layout: {
      type: 'string',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^authors\//, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors],
  mdx: {
    esbuildOptions(options) {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
    remarkPlugins: [remarkGfm, remarkMath, [remarkFootnotes, { inlineNotes: true }]],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(process.cwd(), 'data') }],
      [rehypePrismPlus, { ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
})
