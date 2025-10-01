import { useState } from 'react'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'

const RestaurantDetail = ({ restaurant }) => {
  const [activeImage, setActiveImage] = useState(0)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐')
    }
    if (hasHalfStar) stars.push('✨')

    return stars.join('')
  }

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          {restaurant.name}
        </h1>

        <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-6">
          <span className="flex items-center gap-2">📍 {restaurant.location}</span>
          <span className="flex items-center gap-2">🍽️ {restaurant.cuisine}</span>
          <span className="flex items-center gap-2">
            {getRatingStars(restaurant.rating)} {restaurant.rating}/5
          </span>
          <span className="flex items-center gap-2">💰 {restaurant.priceRange}</span>
          <span className="flex items-center gap-2">
            📅{' '}
            {new Date(restaurant.visitDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 p-4 rounded-xl mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-orange-600 dark:text-orange-400">✨ Vibe:</span>
            <span>{restaurant.vibe}</span>
          </div>
          {restaurant.wouldReturn && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-green-600 dark:text-green-400">
                ♻️ Would Return:
              </span>
              <span>Absolutely!</span>
            </div>
          )}
        </div>
      </header>

      <div className="mb-8">
        <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
          {restaurant.photos && restaurant.photos.length > 0 && (
            <>
              {restaurant.photos[activeImage].url.includes('cloudinary') ? (
                <CldImage
                  src={restaurant.photos[activeImage].url}
                  alt={restaurant.photos[activeImage].alt}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src={restaurant.photos[activeImage].url}
                  alt={restaurant.photos[activeImage].alt}
                  fill
                  className="object-cover"
                />
              )}

              {restaurant.photos[activeImage].caption && (
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full">
                  {restaurant.photos[activeImage].caption}
                </div>
              )}
            </>
          )}
        </div>

        {restaurant.photos && restaurant.photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {restaurant.photos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative h-20 w-32 flex-shrink-0 rounded-lg overflow-hidden ${
                  idx === activeImage ? 'ring-2 ring-orange-500' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {photo.url.includes('cloudinary') ? (
                  <CldImage src={photo.url} alt={photo.alt} fill className="object-cover" />
                ) : (
                  <Image src={photo.url} alt={photo.alt} fill className="object-cover" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6 mb-8">
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
            🍴 Must Try
          </h2>
          <div className="flex flex-wrap gap-3">
            {restaurant.mustTry.map((dish, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 rounded-full font-medium"
              >
                {dish}
              </span>
            ))}
          </div>
        </section>

        {restaurant.review && (
          <>
            <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
                🌟 The Experience
              </h2>
              <div className="space-y-4">
                {restaurant.review.atmosphere && (
                  <div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Atmosphere
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {restaurant.review.atmosphere}
                    </p>
                  </div>
                )}
                {restaurant.review.food && (
                  <div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Food</h3>
                    <p className="text-gray-600 dark:text-gray-400">{restaurant.review.food}</p>
                  </div>
                )}
                {restaurant.review.service && (
                  <div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Service</h3>
                    <p className="text-gray-600 dark:text-gray-400">{restaurant.review.service}</p>
                  </div>
                )}
                {restaurant.review.overall && (
                  <div className="pt-4 border-t border-orange-200 dark:border-orange-800">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Overall Thoughts
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{restaurant.review.overall}</p>
                  </div>
                )}
              </div>
            </section>

            {restaurant.favoriteMemory && (
              <section className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl border-l-4 border-purple-400">
                <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                  💭 Favorite Memory
                </h2>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "{restaurant.favoriteMemory}"
                </p>
              </section>
            )}
          </>
        )}

        <div className="flex flex-wrap gap-2">
          {restaurant.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default RestaurantDetail
