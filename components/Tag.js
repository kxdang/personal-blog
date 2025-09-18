import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  const colorClasses = [
    'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50',
    'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50',
    'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50',
    'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50',
    'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:hover:bg-pink-900/50',
    'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:hover:bg-cyan-900/50',
  ]

  // Use a consistent hash to assign colors to tags
  const colorIndex =
    text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colorClasses.length
  const tagClassName = `inline-flex items-center px-2 py-0.5 rounded-full transition-colors text-xs font-medium mr-1.5 mb-1 ${colorClasses[colorIndex]}`

  return (
    <Link href={`/tags/${kebabCase(text)}`} className={tagClassName}>
      {text.split(' ').join('-')}
    </Link>
  )
}
export default Tag
