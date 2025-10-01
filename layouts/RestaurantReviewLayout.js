import Image from 'next/image'
import Link from '@/components/Link'
import { useState } from 'react'
import ImageModal from '@/components/ImageModal'

const RestaurantReviewLayout = ({ restaurant }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const RatingBar = ({ label, score, maxScore = 5 }) => {
    const percentage = (score / maxScore) * 100
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {score}/{maxScore}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <header className="pb-8">
        <div className="space-y-1 text-center">
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {restaurant.name}
            </h1>
          </div>
          <dl className="space-y-2">
            <div>
              <dt className="sr-only">Location</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-300">
                {restaurant.location} • {restaurant.cuisine} • {restaurant.priceRange}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Visit date</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-300">
                Visited on {formatDate(restaurant.visitDate)}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="pb-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:pt-8">
        <div className="col-span-2">
          {restaurant.photos && restaurant.photos.length > 0 && (
            <div className="mb-8">
              <div
                className="relative w-full overflow-hidden rounded-lg cursor-pointer group bg-gray-100 dark:bg-gray-800"
                onClick={() => setIsModalOpen(true)}
                style={{ height: '400px' }}
              >
                <Image
                  src={restaurant.photos[activePhotoIndex].url}
                  alt={restaurant.photos[activePhotoIndex].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority={activePhotoIndex === 0}
                  quality={85}
                />

                {/* Click to expand indicator */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-6 h-6 inline-block mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                    Click to expand
                  </div>
                </div>
              </div>

              {restaurant.photos.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {restaurant.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePhotoIndex(index)}
                      className={`relative h-20 overflow-hidden rounded-lg ${
                        index === activePhotoIndex
                          ? 'ring-2 ring-primary-500'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={photo.url} alt={photo.alt} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="prose max-w-none pb-8 dark:prose-dark">
            {restaurant.review && (
              <div className="space-y-6">
                {restaurant.review.atmosphere && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Atmosphere
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {restaurant.review.atmosphere}
                    </p>
                  </div>
                )}

                {restaurant.review.food && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      The Food
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {restaurant.review.food}
                    </p>
                  </div>
                )}

                {restaurant.review.service && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Service</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {restaurant.review.service}
                    </p>
                  </div>
                )}

                {restaurant.favoriteMemory && (
                  <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 my-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      A Memory to Remember
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "{restaurant.favoriteMemory}"
                    </p>
                  </div>
                )}

                {restaurant.review.overall && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Final Thoughts
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {restaurant.review.overall}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <div className="sticky top-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Rating Breakdown
              </h3>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Overall Score
                  </span>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-yellow-500 mr-1">★</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {restaurant.rating}
                    </span>
                    <span className="text-lg text-gray-500 dark:text-gray-300">/5</span>
                  </div>
                </div>
              </div>

              {restaurant.ratings && (
                <div className="space-y-2">
                  <RatingBar
                    label="Food Quality"
                    score={restaurant.ratings.food || restaurant.rating}
                  />
                  <RatingBar
                    label="Service"
                    score={restaurant.ratings.service || restaurant.rating}
                  />
                  <RatingBar
                    label="Atmosphere"
                    score={restaurant.ratings.atmosphere || restaurant.rating}
                  />
                  <RatingBar label="Value" score={restaurant.ratings.value || restaurant.rating} />
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Info</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-300">Cuisine</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {restaurant.cuisine}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-300">Price Range</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {restaurant.priceRange}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-300">Vibe</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {restaurant.vibe}
                    </dd>
                  </div>
                  {restaurant.wouldReturn !== undefined && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500 dark:text-gray-300">Would Return?</dt>
                      <dd className="text-sm font-medium">
                        {restaurant.wouldReturn ? (
                          <span className="text-green-600 dark:text-green-400">Yes!</span>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-300">Maybe</span>
                        )}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {restaurant.mustTry && restaurant.mustTry.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Must Try</h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.mustTry.map((dish, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {restaurant.tags && restaurant.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full dark:bg-primary-900/30 dark:text-primary-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300">
        <Link
          href="/restaurants"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          &larr; Back to all restaurants
        </Link>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={restaurant.photos || []}
        currentIndex={activePhotoIndex}
        onNavigate={(index) => setActivePhotoIndex(index)}
      />
    </div>
  )
}

export default RestaurantReviewLayout
