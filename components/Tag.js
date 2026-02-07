import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import { getTagColor, getTagLabel } from '@/lib/utils/tagColors'

const Tag = ({ text, small }) => {
  const tagClassName = small
    ? `inline-flex items-center px-2 py-0.5 rounded-full transition-all text-[10px] font-semibold mr-1 mb-0.5 hover:scale-105 ${getTagColor(
        text
      )}`
    : `inline-flex items-center px-2.5 py-1 rounded-full transition-all text-xs font-semibold mr-1.5 mb-1 hover:scale-105 ${getTagColor(
        text
      )}`

  return (
    <Link href={`/?tag=${kebabCase(text)}`} className={tagClassName}>
      {getTagLabel(text)}
    </Link>
  )
}
export default Tag
