import { defineConfig } from 'tinacms'

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'master'

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'static',
      publicFolder: 'public',
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'data/blog',
        match: {
          include: '*',
          exclude: '',
        },
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return `${
                values?.title
                  ?.toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[^a-z0-9-]/g, '') || 'untitled'
              }`
            },
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
          },
          {
            type: 'datetime',
            name: 'lastmod',
            label: 'Last Modified',
          },
          {
            type: 'datetime',
            name: 'publishDate',
            label: 'Publish Date',
            description:
              'Schedule post for future publication. Leave empty to publish immediately.',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            options: ['pomodoro', 'life', 'biochemistry', 'productivity', 'code', 'AI', 'year-end'],
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft',
          },
          {
            type: 'string',
            name: 'summary',
            label: 'Summary',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'image',
            name: 'images',
            label: 'Images',
            list: true,
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
            required: true,
            ui: {
              defaultValue: 'Kien Dang',
            },
          },
          {
            type: 'string',
            name: 'layout',
            label: 'Layout',
            options: ['PostLayout', 'PostSimple', 'PostBanner'],
          },
          {
            type: 'string',
            name: 'bibliography',
            label: 'Bibliography',
          },
          {
            type: 'string',
            name: 'slug',
            label: 'URL Slug',
            description:
              'Custom URL slug. If empty, the filename is used. E.g. "my-custom-url" → /blog/my-custom-url',
          },
          {
            type: 'string',
            name: 'canonicalUrl',
            label: 'Canonical URL',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
            templates: [
              {
                name: 'CloudinaryCarousel',
                label: 'Cloudinary Carousel',
                fields: [
                  {
                    name: 'folder',
                    label: 'Folder',
                    type: 'string',
                    required: true,
                  },
                  {
                    name: 'count',
                    label: 'Image Count',
                    type: 'number',
                  },
                ],
              },
              {
                name: 'TOCInline',
                label: 'Table of Contents',
                fields: [
                  {
                    name: 'toc',
                    label: 'TOC',
                    type: 'object',
                    list: true,
                    fields: [
                      { name: 'value', type: 'string' },
                      { name: 'url', type: 'string' },
                      { name: 'depth', type: 'number' },
                    ],
                  },
                  {
                    name: 'exclude',
                    label: 'Exclude',
                    type: 'string',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'authors',
        label: 'Authors',
        path: 'data/authors',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Name',
            isTitle: true,
            required: true,
          },
          {
            type: 'image',
            name: 'avatar',
            label: 'Avatar',
          },
          {
            type: 'string',
            name: 'occupation',
            label: 'Occupation',
          },
          {
            type: 'string',
            name: 'company',
            label: 'Company',
          },
          {
            type: 'string',
            name: 'email',
            label: 'Email',
          },
          {
            type: 'string',
            name: 'twitter',
            label: 'Twitter',
          },
          {
            type: 'string',
            name: 'linkedin',
            label: 'LinkedIn',
          },
          {
            type: 'string',
            name: 'github',
            label: 'GitHub',
          },
          {
            type: 'string',
            name: 'layout',
            label: 'Layout',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
})
