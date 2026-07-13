import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const cellColor = (count) => {
  if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
  if (count === 1) return 'bg-primary-200 dark:bg-primary-900'
  if (count === 2) return 'bg-primary-400 dark:bg-primary-700'
  return 'bg-primary-600 dark:bg-primary-500'
}

export default function CadenceModal({ isOpen, onClose, posts }) {
  const router = useRouter()
  const [selectedCell, setSelectedCell] = useState(null)

  // Group posts by year-month
  const postsByMonth = {}
  posts.forEach((post) => {
    const d = new Date(post.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!postsByMonth[key]) postsByMonth[key] = []
    postsByMonth[key].push(post)
  })

  const postYears = posts.map((p) => new Date(p.date).getFullYear())
  const minYear = Math.min(...postYears)
  const maxYear = Math.max(...postYears)
  const years = []
  for (let y = maxYear; y >= minYear; y--) years.push(y)

  // Longest streak of consecutive months with at least one post
  let longestStreak = 0
  let currentStreak = 0
  for (let y = minYear; y <= maxYear; y++) {
    for (let m = 0; m < 12; m++) {
      if (postsByMonth[`${y}-${m}`]) {
        currentStreak++
        longestStreak = Math.max(longestStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    }
  }
  const activeMonths = Object.keys(postsByMonth).length

  // Reset selection when the modal opens
  useEffect(() => {
    if (isOpen) setSelectedCell(null)
  }, [isOpen])

  // Global escape key listener
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape, true)
    return () => document.removeEventListener('keydown', handleEscape, true)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const selectedPosts = selectedCell
    ? postsByMonth[`${selectedCell.year}-${selectedCell.month}`] || []
    : []

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative min-h-screen flex items-start justify-center pt-[10vh] px-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Writing Cadence</h3>
            </div>
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
              ESC
            </kbd>
          </div>

          {/* Heatmap */}
          <div className="px-5 py-4 overflow-x-auto">
            <div className="min-w-[420px]">
              {/* Month header row */}
              <div className="grid grid-cols-[2.5rem_repeat(12,1fr)] gap-1 mb-1">
                <div />
                {MONTH_LABELS.map((label, m) => (
                  <div
                    key={m}
                    className="text-center text-[10px] text-gray-400 dark:text-gray-500 font-medium"
                  >
                    {label}
                  </div>
                ))}
              </div>
              {years.map((year) => (
                <div key={year} className="grid grid-cols-[2.5rem_repeat(12,1fr)] gap-1 mb-1">
                  <div className="flex items-center text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                    {year}
                  </div>
                  {MONTH_LABELS.map((_, month) => {
                    const count = (postsByMonth[`${year}-${month}`] || []).length
                    const isSelected =
                      selectedCell && selectedCell.year === year && selectedCell.month === month
                    return (
                      <button
                        key={month}
                        title={`${MONTH_NAMES[month]} ${year} · ${count} post${
                          count === 1 ? '' : 's'
                        }`}
                        onClick={() =>
                          count > 0 && setSelectedCell(isSelected ? null : { year, month })
                        }
                        className={`aspect-square rounded transition-all ${cellColor(count)} ${
                          count > 0 ? 'cursor-pointer hover:scale-110' : 'cursor-default'
                        } ${
                          isSelected
                            ? 'ring-2 ring-primary-500 ring-offset-1 dark:ring-offset-gray-900'
                            : ''
                        }`}
                      />
                    )
                  })}
                </div>
              ))}

              {/* Legend */}
              <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-gray-400 dark:text-gray-500">
                <span className="mr-1">Less</span>
                {[0, 1, 2, 3].map((count) => (
                  <div key={count} className={`h-3 w-3 rounded ${cellColor(count)}`} />
                ))}
                <span className="ml-1">More</span>
              </div>
            </div>
          </div>

          {/* Selected month posts */}
          {selectedCell && (
            <div className="border-t border-gray-200 dark:border-gray-700 max-h-[30vh] overflow-y-auto">
              <div className="px-5 py-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                {MONTH_NAMES[selectedCell.month]} {selectedCell.year}
              </div>
              {selectedPosts.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => {
                    router.push(`/blog/${post.slug}`)
                    onClose()
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {post.title}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Footer stats */}
          <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-400">
            <span>{posts.length} posts</span>
            <span>{activeMonths} active months</span>
            <span>{longestStreak}-month longest streak</span>
          </div>
        </div>
      </div>
    </div>
  )
}
