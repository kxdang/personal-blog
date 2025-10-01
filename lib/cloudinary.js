// Simplified Cloudinary helpers - only what's actually needed

// Helper to generate numbered photos with automatic Cloudinary optimizations
export function generateNumberedPhotos(totalCount, options = {}) {
  const {
    cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kiendang',
    folder = '', // Optional folder path (e.g., 'le-bernardin')
    startFrom = 1, // Start numbering from
    captions = {}, // Optional captions for specific images { 1: 'Main dish', 2: 'Interior' }
    altPrefix = 'Restaurant photo', // Alt text prefix
  } = options

  const photos = []

  for (let i = startFrom; i <= totalCount + startFrom - 1; i++) {
    const path = folder ? `${folder}/${i}` : `${i}`

    // Apply automatic optimizations for performance
    // f_auto: automatic format (WebP/AVIF where supported)
    // q_auto:eco: automatic quality optimization
    // c_limit,w_2000: limit width to 2000px
    // dpr_auto: automatic device pixel ratio
    const optimizedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:eco,c_limit,w_2000,dpr_auto/${path}`

    photos.push({
      url: optimizedUrl,
      alt: `${altPrefix} ${i}`,
      caption: captions[i] || '',
    })
  }

  return photos
}
