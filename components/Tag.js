import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  let tagClassName = ''

  switch (text.toLowerCase()) {
    case 'react':
      tagClassName =
        'bg-blue-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded text-sky-800 dark:bg-sky-900 dark:text-sky-300'
      break
    case 'books':
      tagClassName =
        'bg-pink-100 text-violet-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-violet-900 dark:text-violet-300'
      break
    case 'biochemistry':
      tagClassName =
        'bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300'
      break
    case 'neetcode':
      tagClassName =
        'bg-green-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
      break
    case 'pomodoro':
      tagClassName =
        'bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
      break
    case 'productivity':
      tagClassName =
        'bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
      break
    case 'life':
      tagClassName =
        'bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300'
      break
    case 'python':
      tagClassName =
        'bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'
      break
    case 'webdev':
      tagClassName =
        'bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'
      break
    default:
      tagClassName =
        'bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-300'
  }

  return (
    <Link href={`/tags/${kebabCase(text)}`} className={tagClassName}>
      {text.split(' ').join('-')}
    </Link>
  )
}
export default Tag
