import Link from '@/components/Link'

const RestaurantListItem = ({ restaurant }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="py-3 pr-4">
        <Link
          href={`/restaurants/${restaurant.id}`}
          className="font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {restaurant.name}
        </Link>
      </td>
      <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">{restaurant.cuisine}</td>
      <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">{restaurant.location}</td>
      <td className="px-3 py-3 text-sm">
        <span className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-gray-700 dark:text-gray-300">{restaurant.rating}</span>
        </span>
      </td>
      <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">
        {formatDate(restaurant.visitDate)}
      </td>
    </tr>
  )
}

export default RestaurantListItem
