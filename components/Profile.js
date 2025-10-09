import React from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import { KienPronunciation } from './KienPronunciation'
import TextGradient from '@/components/TextGradient'

const fetchBookData = async () => {
  // Using Hardcover API exclusively
  const response = await fetch('/api/hardcover')
  const data = await response.json()
  return data
}

export default function Profile() {
  const [bookData, setBookData] = useState(undefined)
  const [showAllFrontend, setShowAllFrontend] = useState(false)
  const [showAllPlatform, setShowAllPlatform] = useState(false)

  const { data, isLoading } = useQuery('bookData', fetchBookData)

  useEffect(() => {
    if (data) {
      const { numOfReadBooks, currentlyReading } = data
      const numOfReadBooksExtracted = parseInt(numOfReadBooks?.match(/\(\s*(\d+)\s*\)/)[1])
      setBookData({
        numOfReadBooks: numOfReadBooksExtracted,
        currentlyReading: currentlyReading ?? [],
      })
    }
  }, [data])

  const BookCard = ({ title, author, imageUrl, url }) => {
    return (
      <Link
        href={url}
        target="__blank"
        className="group flex gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-[#f0ebe3] dark:hover:bg-gray-800/50"
      >
        <div className="flex-shrink-0">
          <Image
            alt={`${title} - ${author}`}
            height={120}
            width={80}
            src={imageUrl}
            className="rounded shadow-md transition-shadow duration-300 group-hover:shadow-xl"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1 truncate group-hover:text-primary-500 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-300 truncate">by {author}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>Reading now</span>
            <svg
              className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    )
  }

  const isFetching = isLoading || !bookData
  return (
    <div>
      <h1 className="text-center text-3xl font-bold sm:hidden">Kien Dang</h1>
      <div className="flex flex-col-reverse pt-8 pb-2 md:flex-row">
        <div className="mr-auto">
          <p className=" pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            👋 <TextGradient text="Hello" />
          </p>

          <p className="sm:text-md flex pb-1 text-gray-600 dark:text-gray-300">
            Welcome to my blog, my name is <KienPronunciation />
          </p>
          <p className="sm:text-md text-gray-600 dark:text-gray-300">
            I am a lifelong learner with a passion for solving problems via code.
          </p>
          <p className="sm:text-md text-gray-600 dark:text-gray-300">
            Here is where I write my technical thoughts, document my learning journey and
            introspection with my career growth. Also, I give honest reviews of my dining
            experiences.
          </p>
          <div className="pt-6 pb-4">
            <div className="space-y-4">
              {/* Frontend Development */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Frontend Development
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Building responsive, accessible, and performant user interfaces
                </p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200">
                      TypeScript
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-900 dark:bg-cyan-900/40 dark:text-cyan-200">
                      React
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-900 dark:bg-slate-700/50 dark:text-slate-200">
                      Next.js
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-900 dark:bg-pink-900/40 dark:text-pink-200">
                      GraphQL
                    </span>
                    {showAllFrontend && (
                      <>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-200 animate-fadeIn">
                          Apollo
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200 animate-fadeIn"
                          style={{ animationDelay: '50ms' }}
                        >
                          Redux
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-200 animate-fadeIn"
                          style={{ animationDelay: '100ms' }}
                        >
                          Tailwind
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-200 animate-fadeIn"
                          style={{ animationDelay: '150ms' }}
                        >
                          Zustand
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-200 animate-fadeIn"
                          style={{ animationDelay: '200ms' }}
                        >
                          JavaScript
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200 animate-fadeIn"
                          style={{ animationDelay: '250ms' }}
                        >
                          Node.js
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-900 dark:bg-violet-900/40 dark:text-violet-200 animate-fadeIn"
                          style={{ animationDelay: '300ms' }}
                        >
                          Figma
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200 animate-fadeIn"
                          style={{ animationDelay: '350ms' }}
                        >
                          Photoshop
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setShowAllFrontend(!showAllFrontend)}
                    className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 flex items-center gap-1 transition-colors font-medium mt-2"
                  >
                    {showAllFrontend ? (
                      <>
                        Show less <ChevronUpIcon className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show 8 more <ChevronDownIcon className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Platform Engineering */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Platform Engineering
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Building tools, improving DX, and ensuring system reliability
                </p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200">
                      Datadog
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200">
                      CircleCI
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-200">
                      PostHog
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200">
                      Playwright
                    </span>
                    {showAllPlatform && (
                      <>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-200 animate-fadeIn">
                          Bugsnag
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-200 animate-fadeIn"
                          style={{ animationDelay: '50ms' }}
                        >
                          Git
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-900 dark:bg-zinc-700/50 dark:text-zinc-200 animate-fadeIn"
                          style={{ animationDelay: '100ms' }}
                        >
                          GitHub
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-200 animate-fadeIn"
                          style={{ animationDelay: '150ms' }}
                        >
                          Webpack
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200 animate-fadeIn"
                          style={{ animationDelay: '200ms' }}
                        >
                          Vite
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-200 animate-fadeIn"
                          style={{ animationDelay: '250ms' }}
                        >
                          RTL
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200 animate-fadeIn"
                          style={{ animationDelay: '300ms' }}
                        >
                          Happo
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setShowAllPlatform(!showAllPlatform)}
                    className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 flex items-center gap-1 transition-colors font-medium mt-2"
                  >
                    {showAllPlatform ? (
                      <>
                        Show less <ChevronUpIcon className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show 7 more <ChevronDownIcon className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Data Engineering */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Data Engineering
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Building data solutions in healthcare at CGMH. Leading projects and expanding into
                  a new domain after 7 years in web development—follow my blog for the journey!
                </p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200">
                      Python
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-200">
                      SQL
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-900 dark:bg-cyan-900/40 dark:text-cyan-200">
                      ETL
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200">
                      Data Pipelines
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-8 text-center md:pt-0 flex-shrink-0">
          <Image
            src="/static/images/avatar.jpg"
            alt="avatar"
            width={150}
            height={150}
            className="mx-auto h-48 w-48 rounded-full object-cover"
          />
          <div className="flex flex-col justify-center text-gray-600  dark:text-gray-300">
            <div className="flex items-center justify-center pt-3"></div>
            <div className="flex justify-center space-x-3 pt-4">
              <SocialIcon kind="linkedin" href="https://www.linkedin.com/in/kien-dang/" size="6" />
              <SocialIcon kind="github" href="https://github.com/kxdang" size="6" />
              <SocialIcon kind="website" href="https://kien.dev" size="6" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          <h1 className="hidden xs:block">Currently Reading</h1>
          <h1 className="block xs:hidden">Reading</h1>
          <hr className="mx-3 mt-6 flex-grow border-gray-300 pb-2 dark:border-gray-700 sm:mt-6 md:mt-8" />

          <div className="flex items-end pb-1 text-sm text-gray-600 dark:text-gray-300 sm:pb-1 md:pb-4">
            <Link href="https://hardcover.app/@kien/books/read" target="_blank">
              <p className="hover:underline">
                {isFetching ? ' Read ( - books)' : `Read (${bookData.numOfReadBooks} books)`}
              </p>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          {isFetching ? (
            <div className="space-y-3">
              <div className="flex gap-4 p-4 animate-pulse">
                <div className="h-[120px] w-[80px] bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="flex-1 space-y-2 py-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {bookData.currentlyReading.map((book, idx) => (
                <BookCard
                  key={idx}
                  title={book.title}
                  author={book.author}
                  imageUrl={book.imageUrl}
                  url={book.url}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
