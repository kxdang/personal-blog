import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const TimelineItem = ({ children, index }) => {
  const [isVisible, setIsVisible] = useState(false)
  const itemRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation based on index
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current)
      }
    }
  }, [index])

  return (
    <li
      ref={itemRef}
      className={`mb-10 ml-6 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
    >
      {children}
    </li>
  )
}

export default function Timeline() {
  const [lineHeight, setLineHeight] = useState(0)
  const timelineRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const timelineRect = timelineRef.current.getBoundingClientRect()
      const timelineTop = timelineRect.top + window.scrollY
      const timelineHeight = timelineRect.height
      const scrollPosition = window.scrollY + window.innerHeight

      // Calculate how much of the timeline should be visible
      const scrolledPast = scrollPosition - timelineTop
      const percentScrolled = Math.min(Math.max(scrolledPast / timelineHeight, 0), 1)

      setLineHeight(percentScrolled * 100)
    }

    // Initial calculation
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="xl:col-span-2 xl:col-start-2">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent py-2">
          My Journey
        </h2>
        <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
      </div>
      <div className="relative" ref={timelineRef}>
        {/* Background timeline line (gray/faded) */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 rounded-full" />

        {/* Animated gradient timeline line */}
        <div
          className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-150 ease-out"
          style={{ height: `${lineHeight}%` }}
        />
        <ol className="relative pl-0">
          <TimelineItem index={0}>
            <span className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-3xl ring-8 ring-white dark:bg-blue-700 dark:ring-gray-900 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              🏫
            </span>
            <div className="ml-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  Education
                </span>
              </div>
              <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                University of Waterloo{' '}
              </h3>
              <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                2011-2016
              </time>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                🧪{' '}
                <Link
                  href="/blog/biochemistry-story"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  My Biochemistry Story
                </Link>{' '}
                <br />
                Graduated a 5 year co-op program with a Bachelors of Science in Honours Biochemistry
                (B.Sc.)
              </p>
            </div>
          </TimelineItem>
          <TimelineItem index={1}>
            <span className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-3xl ring-8 ring-white dark:bg-indigo-700 dark:ring-gray-900 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              🏢
            </span>
            <div className="ml-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  Career
                </span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                First Job
              </h3>
              <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                2017-2019
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                💻 Costing Technologist <br /> <br /> After graduating, I worked at a chemical
                company specializing in polyurethane for the automotive industry for over 2 years. I{' '}
                <Link
                  href="/blog/automated-job-process"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  automated
                </Link>{' '}
                a portion of my work using VBA which sparked my interest in programming. Thus, I
                decided to{' '}
                <Link
                  href="/blog/new-chapter-2019"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  resign
                </Link>{' '}
                to pursue my passion and start my programming journey.
              </p>
            </div>
          </TimelineItem>
          <TimelineItem index={2}>
            <span className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-3xl ring-8 ring-white dark:bg-purple-700 dark:ring-gray-900 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              🚀
            </span>
            <div className="ml-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  Personal Growth
                </span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                The Leap of Faith
              </h3>
              <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                May 3rd 2019
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                🌿{' '}
                <Link
                  href="/blog/the-jump"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Begins the self-taught journey
                </Link>{' '}
                <br /> <br /> I had plans to dedicate 100% of my time studying and learning HTML,
                CSS, JS and React as my framework of choice for web development.
              </p>
            </div>
          </TimelineItem>
          <TimelineItem index={3}>
            <span className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-3xl ring-8 ring-white dark:bg-purple-700 dark:ring-gray-900 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              🏥
            </span>
            <div className="ml-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                  Challenge
                </span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">The Fall</h3>
              <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                June 2019 - October 2019
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                💊{' '}
                <Link
                  href="/tags/biochemistry"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Antibiotics galore
                </Link>{' '}
                <br />
                <br />A month later, I encountered a health issue that required several
                hospitalizations. I was unable to focus due to my long recovery. <br />
                <br /> Through this difficult period, I began writing a blog and decided to embrace
                the opportunity to document my journey, finding solace in the activity.
                <br />
                <br /> I started to change my perspective and draw inspiration from my negative
                experience and wrote about my prescribed medications.
              </p>
            </div>
          </TimelineItem>
          <TimelineItem index={4}>
            <span className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-100 text-2xl ring-8 ring-white dark:bg-fuchsia-700 dark:ring-gray-900 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              🧗
            </span>
            <div className="ml-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Recovery
                </span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                The Recovery
              </h3>
              <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                December 2019
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                💉{' '}
                <Link
                  href="/blog/propofol"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  2 surgeries,
                </Link>{' '}
                <br />
                💊{' '}
                <Link
                  href="/tags/biochemistry"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  9 antibiotics,
                </Link>{' '}
                <br />
                🌺{' '}
                <Link
                  href="/blog/opioids"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  4 painkillers later
                </Link>{' '}
                <br />
                <br />
                Nearing the end of 2019, I had slowly worked my way back on my feet, using the
                momentum I built from creating this blog and writing about my journey. <br /> <br />
                <Link
                  href="/blog/year-end-summary-2019"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  My 2019 year end Pomodoro blog post
                </Link>
              </p>
            </div>
          </TimelineItem>
          <TimelineItem index={5}>
            <span className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-3xl ring-8 ring-white dark:bg-pink-700 dark:ring-gray-900 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              🥳
            </span>
            <div className="ml-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                  Milestone
                </span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Employment Found
              </h3>
              <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                May 2020
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                🎉{' '}
                <Link
                  href="/blog/new-chapter"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Software Developer at Coveo
                </Link>{' '}
                <br />
                <br />
                Honestly, 2019 hasn't been a kind year, but neither was 2020. After a year of
                studying, I accomplished my goal in becoming a developer after 🍅
                <Link
                  href="/blog/year-journey-summary"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  1031 Pomdoro's
                </Link>
              </p>
            </div>
          </TimelineItem>
          <TimelineItem index={6}>
            <span className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-2xl ring-8 ring-white dark:bg-pink-700 dark:ring-gray-900 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              🙌
            </span>
            <div className="ml-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  Career
                </span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                New Chapter
              </h3>
              <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                January 2022
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                🎯
                <Link
                  href="https://thescore.bet/"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Software Engineer at theScore
                </Link>{' '}
                <br />
                <br />
              </p>
            </div>
          </TimelineItem>
          {/* Branching Timeline - Current Roles */}
          <TimelineItem index={7}>
            <span className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-xl ring-8 ring-white dark:bg-pink-700 dark:ring-gray-900 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              🌿
            </span>

            <div className="mb-6 ml-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
                  Current
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center flex-wrap gap-2">
                Dual Career Path
                <span className="rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-2.5 py-0.5 text-sm font-medium text-white animate-pulse">
                  {new Date().getFullYear()}
                </span>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Balancing two exciting roles simultaneously
              </p>
            </div>

            {/* Fork visualization */}
            <div className="relative">
              {/* Parallel branches container */}
              <div className="relative pt-4">
                {/* Desktop: Side by side layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 md:items-end">
                  {/* Left branch - theScore */}
                  <div className="relative">
                    <div className="ml-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-5 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">🎯</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            <Link
                              href="https://thescore.bet/"
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              Software Engineer
                            </Link>
                          </h4>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            theScore (under the umbrella of PENN Entertainment)
                          </p>
                        </div>
                      </div>
                      <time className="text-xs text-gray-500 dark:text-gray-400 block mb-3">
                        January 2022 - Present
                      </time>

                      {/* Role progression */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-xs mt-0.5">📱</span>
                          <div>
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                              Web Platform Developer
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Jan 2022 - Mar 2024
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="text-xs mt-0.5">⚡</span>
                          <div>
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                              Sportsbook Experience Developer
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Mar 2024 - Jan 2026
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="text-xs mt-0.5">📈</span>
                          <div>
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                              Sportsbook Growth Team
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Jan 2026 - Present
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right branch - Collingwood Hospital */}
                  <div className="relative">
                    <div className="ml-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-5 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">🏥</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            <Link
                              href="https://www.cgmh.on.ca/"
                              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            >
                              Data Engineer
                            </Link>
                          </h4>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Collingwood General & Marine Hospital
                          </p>
                        </div>
                      </div>
                      <time className="text-xs text-gray-500 dark:text-gray-400 block mb-2">
                        September 2025 - Present
                      </time>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Leveraging data to improve healthcare outcomes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TimelineItem>
        </ol>
      </div>
    </div>
  )
}
