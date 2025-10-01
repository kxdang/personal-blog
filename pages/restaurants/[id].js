import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import RestaurantReviewLayout from '@/layouts/RestaurantReviewLayout'
import RestaurantMDXLayout from '@/layouts/RestaurantMDXLayout'
import { fetchCloudinaryFolder, fetchNumberedImages } from '@/lib/cloudinary-server'
import { getRestaurantBySlug, getAllRestaurants } from '@/lib/restaurants'

export async function getStaticPaths() {
  const allRestaurants = await getAllRestaurants()
  const paths = allRestaurants.map((restaurant) => ({
    params: { id: restaurant.id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // Get restaurant from MDX or JS data
  const restaurant = await getRestaurantBySlug(params.id)

  if (!restaurant) {
    return {
      notFound: true,
    }
  }

  let photos = []

  // Check if restaurant uses automatic photo detection
  if (restaurant.photos === 'auto' || restaurant.autoDetectPhotos) {
    // Fetch ALL images from the restaurant's Cloudinary folder
    // This works with any naming pattern (IMG_****, 1.jpg, DSC_****, etc.)
    photos = await fetchCloudinaryFolder(restaurant.id)

    // If API fetch worked, use those photos
    if (photos && photos.length > 0) {
      console.log(`Auto-detected ${photos.length} images for ${restaurant.id}`)
    } else {
      // Fallback: try numbered images
      photos = await fetchNumberedImages(20, restaurant.id)
    }
  } else if (Array.isArray(restaurant.photos)) {
    // Use manually specified photos
    photos = restaurant.photos
  } else if (typeof restaurant.photos === 'object' && restaurant.photos.count) {
    // Use numbered photos with specified count
    photos = await fetchNumberedImages(restaurant.photos.count, restaurant.id)
  } else {
    // Default: use photos from restaurantsData
    photos = restaurant.photos || []
  }

  return {
    props: {
      restaurant: {
        ...restaurant,
        photos, // Use the fetched photos
      },
      // Pass MDX content separately if it exists
      content: restaurant.content || null,
    },
  }
}

export default function RestaurantReview({ restaurant, content }) {
  const description =
    restaurant.excerpt ||
    restaurant.review?.overall ||
    `Review of ${restaurant.name} in ${restaurant.location}`

  return (
    <>
      <PageSEO
        title={`${restaurant.name} - Restaurant Review - ${siteMetadata.author}`}
        description={description}
      />
      {content ? (
        <RestaurantMDXLayout restaurant={restaurant} content={content} />
      ) : (
        <RestaurantReviewLayout restaurant={restaurant} />
      )}
    </>
  )
}
