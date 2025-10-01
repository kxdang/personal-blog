// Server-side only - fetches images from Cloudinary at BUILD TIME
// This runs during Next.js build, not in the browser

/**
 * Fetches all images from a Cloudinary folder at build time with performance optimizations
 * @param {string} folder - The folder name in Cloudinary (e.g., 'akin-restaurant')
 * @returns {Array} Array of photo objects with optimized URLs
 */
export async function fetchCloudinaryFolder(folder) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kiendang'
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!apiKey || !apiSecret) {
    console.warn(
      'Cloudinary API credentials not found. Using fallback method. Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local'
    )
    return []
  }

  try {
    // Cloudinary Admin API endpoint
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`

    const searchUrl = `${url}?type=upload&prefix=${folder}/&max_results=100`
    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    if (!searchResponse.ok) {
      console.error('Failed to fetch from Cloudinary:', searchResponse.status)
      return []
    }

    const data = await searchResponse.json()

    // Sort resources by number in filename
    const sortedResources = data.resources.sort((a, b) => {
      const numA = parseInt(a.public_id.split('/').pop()) || 999
      const numB = parseInt(b.public_id.split('/').pop()) || 999
      return numA - numB
    })

    // Transform with Cloudinary optimizations for performance
    return sortedResources.map((resource, index) => {
      const publicId = resource.public_id

      // Main image: optimized for quality and format
      // f_auto: automatic format (WebP/AVIF where supported)
      // q_auto:eco: automatic quality (eco mode for faster loading)
      // c_limit,w_2000: limit width to 2000px max
      // dpr_auto: automatic DPR for retina displays
      const optimizedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:eco,c_limit,w_2000,dpr_auto/${publicId}`

      // Thumbnail: small, square crop for gallery
      const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:low,c_fill,w_400,h_400,g_auto/${publicId}`

      // Placeholder: tiny base64 for blur-up effect
      const placeholderUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:low,c_scale,w_50,e_blur:1000/${publicId}`

      return {
        url: optimizedUrl,
        alt: `${folder.replace(/-/g, ' ')} photo ${index + 1}`,
        caption: '',
        thumbnailUrl,
        placeholderUrl,
        width: resource.width,
        height: resource.height,
        publicId: resource.public_id,
      }
    })
  } catch (error) {
    console.error('Error fetching from Cloudinary:', error)
    return []
  }
}

/**
 * Alternative: Fetch using folder tags if you tag your images
 */
export async function fetchCloudinaryByTag(tag) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!apiKey || !apiSecret) {
    return []
  }

  try {
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/tags/${tag}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch by tag from Cloudinary:', response.status)
      return []
    }

    const data = await response.json()

    return data.resources.map((resource, index) => ({
      url: resource.secure_url || resource.url,
      alt: `${tag} image ${index + 1}`,
      caption: '',
    }))
  } catch (error) {
    console.error('Error fetching from Cloudinary:', error)
    return []
  }
}

/**
 * Fetches numbered images - tries to use API first, falls back to URL generation
 * @param {number} maxCount - Maximum number of images to try (will return actual count found)
 * @param {string} folder - Folder name in Cloudinary
 */
export async function fetchNumberedImages(maxCount, folder = '') {
  // If we have API credentials, use the proper fetch method
  if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    const images = await fetchCloudinaryFolder(folder)
    if (images.length > 0) {
      return images
    }
  }

  // Fallback: generate optimized URLs without API verification
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kiendang'
  const photos = []

  for (let i = 1; i <= maxCount; i++) {
    const publicId = folder ? `${folder}/${i}` : `${i}`

    // Use same optimizations as fetchCloudinaryFolder
    photos.push({
      url: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:eco,c_limit,w_2000,dpr_auto/${publicId}`,
      alt: `${folder.replace(/-/g, ' ')} photo ${i}`,
      caption: '',
      thumbnailUrl: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:low,c_fill,w_400,h_400,g_auto/${publicId}`,
      placeholderUrl: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:low,c_scale,w_50,e_blur:1000/${publicId}`,
    })
  }

  return photos
}
