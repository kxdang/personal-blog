import Link from '@/components/Link'
import Image from 'next/image'

const RestaurantCard = ({ restaurant }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const mainPhoto = restaurant.photos?.[0]

  return (
    <li className="py-12">
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          <dt className="sr-only">Visited on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-300">
            <time dateTime={restaurant.visitDate}>{formatDate(restaurant.visitDate)}</time>
            <div className="mt-1">
              <span className="text-sm">{restaurant.cuisine}</span>
            </div>
            <div className="mt-1">
              <span className="text-sm">{restaurant.priceRange}</span>
            </div>
          </dd>
        </dl>

        <div className="space-y-3 xl:col-span-3">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <Link
                  href={`/restaurants/${restaurant.id}`}
                  className="text-gray-900 dark:text-gray-100"
                >
                  {restaurant.name}
                </Link>
              </h2>
              <div className="flex items-center gap-3 mt-2 text-gray-500 dark:text-gray-300">
                <span className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  {restaurant.rating}/5
                </span>
                <span>•</span>
                <span>{restaurant.location}</span>
                {restaurant.vibe && (
                  <>
                    <span>•</span>
                    <span>{restaurant.vibe}</span>
                  </>
                )}
              </div>
            </div>

            {mainPhoto && (
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image src={mainPhoto.url} alt={mainPhoto.alt} fill className="object-cover" />
              </div>
            )}

            {restaurant.review?.overall && (
              <div className="prose max-w-none text-gray-600 dark:text-gray-300">
                {restaurant.review.overall.length > 200
                  ? `${restaurant.review.overall.substring(0, 200)}...`
                  : restaurant.review.overall}
              </div>
            )}

            <div className="text-base font-medium leading-6">
              <Link
                href={`/restaurants/${restaurant.id}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more about "${restaurant.name}"`}
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}

export default RestaurantCard
