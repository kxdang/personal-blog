import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

// Colorful palette for tags - ordered to maximize contrast between adjacent colors
const tagColors = [
  'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:hover:bg-violet-800/60',
  'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800/60',
  'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:hover:bg-cyan-800/60',
  'bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200 dark:bg-fuchsia-900/50 dark:text-fuchsia-300 dark:hover:bg-fuchsia-800/60',
  'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-800/60',
  'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800/60',
  'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:hover:bg-orange-800/60',
  'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:hover:bg-sky-800/60',
  'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-800/60',
  'bg-lime-100 text-lime-700 hover:bg-lime-200 dark:bg-lime-900/50 dark:text-lime-300 dark:hover:bg-lime-800/60',
]

const getTagColor = (tag) => {
  // Special case: pomodoro gets tomato red
  if (tag.toLowerCase().includes('pomodoro')) {
    return 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/60'
  }
  const index = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % tagColors.length
  return tagColors[index]
}

const Tag = ({ text }) => {
  const tagClassName = `inline-flex items-center px-2.5 py-1 rounded-full transition-all text-xs font-semibold mr-1.5 mb-1 hover:scale-105 ${getTagColor(
    text
  )}`

  return (
    <Link href={`/?tag=${kebabCase(text)}`} className={tagClassName}>
      {text.split(' ').join('-')}
    </Link>
  )
}
export default Tag
