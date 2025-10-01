import { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import RestaurantListItem from './RestaurantListItem'

const RestaurantGallery = ({ restaurants }) => {
  const [viewMode, setViewMode] = useState('card') // 'card' or 'list'

  const stats = {
    totalVisits: restaurants.length,
    averageRating: (restaurants.reduce((acc, r) => acc + r.rating, 0) / restaurants.length).toFixed(
      1
    ),
    topCuisine:
      Object.entries(
        restaurants.reduce((acc, r) => {
          acc[r.cuisine] = (acc[r.cuisine] || 0) + 1
          return acc
        }, {})
      ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A',
    citiesVisited: new Set(restaurants.map((r) => r.location.split(',')[1]?.trim() || r.location))
      .size,
  }

  const sortedRestaurants = restaurants.sort(
    (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 flex-1">
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.totalVisits}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">Places Visited</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              <span className="text-yellow-500">★</span> {stats.averageRating}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">Avg Rating</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.topCuisine}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">Favourite Cuisine</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.citiesVisited}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">Cities Explored</div>
          </div>
        </div>

        <div className="flex gap-2 self-start sm:self-center">
          <button
            onClick={() => setViewMode('card')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'card'
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
            aria-label="Card view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
            aria-label="List view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === 'card' ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedRestaurants.length === 0 ? (
            <li className="py-12 text-center text-gray-500 dark:text-gray-300">
              No restaurants yet. Start adding your culinary adventures!
            </li>
          ) : (
            sortedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          )}
        </ul>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 pr-4 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                  Restaurant
                </th>
                <th className="px-3 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                  Cuisine
                </th>
                <th className="px-3 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                  Location
                </th>
                <th className="px-3 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                  Rating
                </th>
                <th className="px-3 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                  Price
                </th>
                <th className="px-3 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                  Visited
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRestaurants.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500 dark:text-gray-300">
                    No restaurants yet. Start adding your culinary adventures!
                  </td>
                </tr>
              ) : (
                sortedRestaurants.map((restaurant) => (
                  <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default RestaurantGallery
