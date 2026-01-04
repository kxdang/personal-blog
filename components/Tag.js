import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  const colorClasses = [
    'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60',
    'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:hover:bg-amber-900/60',
    'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60',
    'bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-900/60',
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
