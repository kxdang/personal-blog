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
      {restaurant.comingSoon ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-700 min-h-screen">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {restaurant.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                {restaurant.rating}/5
              </span>
              <span>•</span>
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>{restaurant.location}</span>
              <span>•</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </div>
          <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0 pt-8">
            <div className="xl:col-span-3">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg p-12 text-center">
                <span className="text-8xl mb-6 block">🍽️</span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Review Coming Soon
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {restaurant.excerpt ||
                    `I'm still working on the full review for ${restaurant.name}. Check back soon for detailed thoughts, photos, and recommendations!`}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : content ? (
        <RestaurantMDXLayout restaurant={restaurant} content={content} />
      ) : (
        <RestaurantReviewLayout restaurant={restaurant} />
      )}
    </>
  )
}
