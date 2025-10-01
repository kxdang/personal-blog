import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import RestaurantGallery from '@/components/RestaurantGallery'

export default function RestaurantLayout({ restaurants }) {
  return (
    <>
      <PageSEO
        title={`Restaurants - ${siteMetadata.author}`}
        description="My culinary adventures - restaurant reviews, food photography, and dining experiences"
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Restaurants
              </span>
            </h1>
            <div className="text-6xl animate-bounce">🍴</div>
          </div>
          <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
            My journey through different cuisines and dining experiences 😋
          </p>
        </div>
        <div className="py-12">
          <RestaurantGallery restaurants={restaurants} />
        </div>
      </div>
    </>
  )
}
