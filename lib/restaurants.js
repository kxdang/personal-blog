import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import { generateNumberedPhotos } from './cloudinary'

const restaurantsDirectory = path.join(process.cwd(), 'data', 'restaurants')

export async function getRestaurantBySlug(slug) {
  const fullPath = path.join(restaurantsDirectory, `${slug}.mdx`)

  // Check if MDX file exists
  if (!fs.existsSync(fullPath)) {
    // Fallback to restaurantsData.js
    const { default: restaurantsData } = await import('@/data/restaurantsData')
    return restaurantsData.find((r) => r.id === slug)
  }

  const source = fs.readFileSync(fullPath, 'utf8')
  const { content, data } = matter(source)

  // Process MDX content
  const { code } = await bundleMDX({
    source: content,
    cwd: restaurantsDirectory,
  })

  // Generate photos based on the photos field
  let photos = []
  if (data.photos === 'auto') {
    // This will be handled at build time
    photos = 'auto'
  } else if (typeof data.photos === 'number') {
    photos = generateNumberedPhotos(data.photos, {
      folder: data.id,
      altPrefix: data.name,
    })
  } else if (Array.isArray(data.photos)) {
    photos = data.photos
  }

  // Convert date to string if it's a Date object
  if (data.visitDate instanceof Date) {
    data.visitDate = data.visitDate.toISOString().split('T')[0]
  }

  return {
    ...data,
    photos,
    content: code,
    source: 'mdx',
  }
}

export async function getAllRestaurants() {
  // Get MDX restaurants
  const mdxRestaurants = []
  if (fs.existsSync(restaurantsDirectory)) {
    const files = fs.readdirSync(restaurantsDirectory)

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace(/\.mdx$/, '')
        const restaurant = await getRestaurantBySlug(slug)
        mdxRestaurants.push(restaurant)
      }
    }
  }

  // Get JS restaurants
  const { default: restaurantsData } = await import('@/data/restaurantsData')

  // Merge, with MDX taking precedence
  const mdxIds = mdxRestaurants.map((r) => r.id)
  const jsRestaurants = restaurantsData.filter((r) => !mdxIds.includes(r.id))

  return [...mdxRestaurants, ...jsRestaurants]
}
