import RestaurantLayout from '@/layouts/RestaurantLayout'
import { getAllRestaurants } from '@/lib/restaurants'
import { fetchNumberedImages, fetchCloudinaryFolder } from '@/lib/cloudinary-server'
import { generateNumberedPhotos } from '@/lib/cloudinary'

export async function getStaticProps() {
  // Get all restaurants from both MDX and JS sources
  const allRestaurants = await getAllRestaurants()

  // Process each restaurant to fetch images
  const restaurantsWithImages = await Promise.all(
    allRestaurants.map(async (restaurant) => {
      let photos = []

      // Handle different photo configurations
      if (restaurant.photos === 'auto') {
        // Fetch all images from Cloudinary folder
        photos = await fetchCloudinaryFolder(restaurant.id)
      } else if (typeof restaurant.photos === 'number') {
        // Generate numbered photos
        photos = generateNumberedPhotos(restaurant.photos, {
          folder: restaurant.id,
          altPrefix: restaurant.name,
        })
      } else if (Array.isArray(restaurant.photos)) {
        photos = restaurant.photos
      }

      // For the list view, only use the first image
      return {
        ...restaurant,
        photos: photos.slice(0, 1),
      }
    })
  )

  return {
    props: {
      restaurants: restaurantsWithImages,
    },
  }
}

export default function Restaurants({ restaurants }) {
  return <RestaurantLayout restaurants={restaurants} />
}
