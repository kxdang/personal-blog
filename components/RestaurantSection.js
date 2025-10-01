import Link from '@/components/Link'
import Image from 'next/image'

const RestaurantSection = ({ restaurants }) => {
  // Only show the most recent 3 restaurants
  const displayRestaurants = restaurants.slice(0, 3)

  if (!displayRestaurants || displayRestaurants.length === 0) {
    return null
  }

  return (
    <div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-2">
          <h3 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            🍽️ Dining Adventures
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            I really like to eat food and enjoy dining experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-3">
          {displayRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.id}`}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Image */}
              {restaurant.photos && restaurant.photos.length > 0 ? (
                <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={restaurant.photos[0].url}
                    alt={restaurant.photos[0].alt || restaurant.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Rating badge */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm">
                    <span className="text-yellow-400">★</span>
                    <span className="text-xs font-medium text-white">{restaurant.rating}</span>
                  </div>
                </div>
              ) : restaurant.comingSoon ? (
                <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">📸</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Coming Soon
                    </span>
                  </div>
                  {/* Rating badge */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm">
                    <span className="text-yellow-400">★</span>
                    <span className="text-xs font-medium text-white">{restaurant.rating}</span>
                  </div>
                </div>
              ) : null}

              {/* Content */}
              <div className="p-4">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {restaurant.name}
                </h4>

                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{restaurant.cuisine}</span>
                  <span>•</span>
                  <span>{restaurant.location}</span>
                </div>

                {restaurant.excerpt && (
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {restaurant.excerpt}
                  </p>
                )}

                {/* Tags */}
                {restaurant.vibe && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {restaurant.vibe}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {restaurant.priceRange}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="flex justify-end pt-4">
        <Link
          href="/restaurants"
          className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          View all restaurants &rarr;
        </Link>
      </div>
    </div>
  )
}

export default RestaurantSection
