import { useState, useEffect } from 'react'

const PERIODS = [
  { key: 'today', label: 'today' },
  { key: 'week', label: 'this week' },
  { key: 'month', label: 'this month' },
  { key: 'year', label: 'this year' },
  { key: 'all', label: 'all time' },
]

export default function VisitorCounter() {
  const [periodIndex, setPeriodIndex] = useState(2) // Start with 'month'
  const [visitors, setVisitors] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const currentPeriod = PERIODS[periodIndex]

  useEffect(() => {
    async function fetchVisitors() {
      setLoading(true)
      try {
        const response = await fetch(`/api/visitors?period=${currentPeriod.key}`)
        const data = await response.json()

        if (data.visitors !== null) {
          setVisitors(data.visitors)
          setError(false)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Failed to fetch visitor count:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitors()
  }, [currentPeriod.key])

  const handleClick = () => {
    setPeriodIndex((prev) => (prev + 1) % PERIODS.length)
  }

  // Don't render anything if there's an error or no data
  if (error || (!loading && visitors === null)) {
    return null
  }

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer"
      title="Click to change time period"
    >
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-2 w-2 flex-shrink-0 translate-y-[1px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        <span>
          <span
            className={`font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 ${
              loading ? 'blur-sm' : 'group-hover:blur-[2px]'
            }`}
          >
            {loading ? '---' : visitors.toLocaleString()}
          </span>{' '}
          unique visitors{' '}
          <span
            className={`transition-all duration-200 ${
              loading ? 'blur-sm' : 'group-hover:blur-[2px]'
            }`}
          >
            {currentPeriod.label}
          </span>
        </span>
      </span>
    </button>
  )
}
