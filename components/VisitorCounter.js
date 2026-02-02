import { useState, useEffect, useCallback } from 'react'

const PERIODS = [
  { key: 'today', label: 'today' },
  { key: 'week', label: 'this week' },
  { key: 'month', label: 'this month' },
  { key: 'year', label: 'this year' },
  { key: 'all', label: 'since 2025' },
]

const CYCLE_INTERVAL = 6000 // 6 seconds

export default function VisitorCounter() {
  const [periodIndex, setPeriodIndex] = useState(2) // Start with 'month'
  const [visitorsData, setVisitorsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentPeriod = PERIODS[periodIndex]
  const visitors = visitorsData?.[currentPeriod.key]

  // Fetch all periods at once
  useEffect(() => {
    async function fetchAllVisitors() {
      try {
        const response = await fetch('/api/visitors?all=true')
        const data = await response.json()

        if (data && !data.error) {
          setVisitorsData(data)
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

    fetchAllVisitors()
  }, [])

  // Cycle to next period with blur transition
  const cycleToNext = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setPeriodIndex((prev) => (prev + 1) % PERIODS.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 150)
    }, 150)
  }, [])

  // Auto-cycle every 6 seconds
  useEffect(() => {
    if (loading || error) return

    const interval = setInterval(cycleToNext, CYCLE_INTERVAL)
    return () => clearInterval(interval)
  }, [loading, error, cycleToNext])

  // Manual click handler
  const handleClick = () => {
    cycleToNext()
  }

  // Don't render anything if there's an error or no data
  if (error || (!loading && !visitorsData)) {
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
            className={`font-medium text-gray-700 dark:text-gray-300 transition-all duration-150 ${
              loading || isTransitioning ? 'blur-sm opacity-50' : 'group-hover:blur-[2px]'
            }`}
          >
            {loading ? '---' : visitors?.toLocaleString() ?? '---'}
          </span>{' '}
          unique visitors{' '}
          <span
            className={`transition-all duration-150 ${
              loading || isTransitioning ? 'blur-sm opacity-50' : 'group-hover:blur-[2px]'
            }`}
          >
            {currentPeriod.label}
          </span>
        </span>
      </span>
    </button>
  )
}
