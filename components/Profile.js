import React from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { HiLocationMarker } from 'react-icons/hi'
import SocialIcon from '@/components/social-icons'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { FlagIcon } from 'react-flag-kit'
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
        className="group flex gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
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
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">by {author}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
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
          <h2 className=" pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            👋 <TextGradient text="Hello" />
          </h2>

          <h2 className="sm:text-md flex pb-1 text-gray-500 dark:text-gray-400">
            Welcome to my blog, my name is <KienPronunciation />
          </h2>
          <p className="sm:text-md text-gray-500 dark:text-gray-400">
            I am a lifelong learner with a passion for solving problems via code.
          </p>
          <div className="pt-6 pb-4">
            <div className="space-y-4">
              {/* Frontend Development */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Frontend Development
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Building responsive, accessible, and performant user interfaces
                </p>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      TypeScript
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300">
                      React
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700/40 dark:text-slate-200">
                      Next.js
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300">
                      GraphQL
                    </span>
                    {showAllFrontend && (
                      <>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 animate-fadeIn">
                          Apollo
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 animate-fadeIn"
                          style={{ animationDelay: '50ms' }}
                        >
                          Redux
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 animate-fadeIn"
                          style={{ animationDelay: '100ms' }}
                        >
                          Tailwind
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 animate-fadeIn"
                          style={{ animationDelay: '150ms' }}
                        >
                          Zustand
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 animate-fadeIn"
                          style={{ animationDelay: '200ms' }}
                        >
                          JavaScript
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 animate-fadeIn"
                          style={{ animationDelay: '250ms' }}
                        >
                          Node.js
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 animate-fadeIn"
                          style={{ animationDelay: '300ms' }}
                        >
                          Figma
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 animate-fadeIn"
                          style={{ animationDelay: '350ms' }}
                        >
                          Photoshop
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setShowAllFrontend(!showAllFrontend)}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
                  >
                    {showAllFrontend ? (
                      <>
                        Show less <ChevronUpIcon className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        Show 8 more <ChevronDownIcon className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Platform Engineering */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Platform Engineering
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Building tools, improving DX, and ensuring system reliability
                </p>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      Datadog
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      CircleCI
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                      PostHog
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Playwright
                    </span>
                    {showAllPlatform && (
                      <>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 animate-fadeIn">
                          Bugsnag
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 animate-fadeIn"
                          style={{ animationDelay: '50ms' }}
                        >
                          Git
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-700/40 dark:text-zinc-200 animate-fadeIn"
                          style={{ animationDelay: '100ms' }}
                        >
                          GitHub
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 animate-fadeIn"
                          style={{ animationDelay: '150ms' }}
                        >
                          Webpack
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 animate-fadeIn"
                          style={{ animationDelay: '200ms' }}
                        >
                          Vite
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 animate-fadeIn"
                          style={{ animationDelay: '250ms' }}
                        >
                          RTL
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 animate-fadeIn"
                          style={{ animationDelay: '300ms' }}
                        >
                          Happo
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setShowAllPlatform(!showAllPlatform)}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
                  >
                    {showAllPlatform ? (
                      <>
                        Show less <ChevronUpIcon className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        Show 7 more <ChevronDownIcon className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-8 text-center md:pt-0">
          <Image
            src="/static/images/avatar.jpg"
            alt="avatar"
            width={150}
            height={150}
            className="mx-auto h-48 w-48 rounded-full object-cover"
          />
          <div className="flex flex-col justify-center text-gray-500  dark:text-gray-400">
            <div className="flex items-center justify-center pt-3">
              <HiLocationMarker className="h-18 w-18" />{' '}
              <span className="pl-1">Toronto, Canada </span>{' '}
              <FlagIcon className="ml-2" code="CA" size={24} />
            </div>
            <div className="flex justify-center space-x-3 pt-4">
              <SocialIcon kind="linkedin" href="https://www.linkedin.com/in/kien-dang/" size="6" />
              <SocialIcon kind="github" href="https://github.com/kxdang" size="6" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          <h1 className="hidden xs:block">Currently Reading</h1>
          <h1 className="block xs:hidden">Reading</h1>
          <hr className="mx-3 mt-6 flex-grow border-gray-300 pb-2 dark:border-gray-700 sm:mt-6 md:mt-8" />

          <div className="flex items-end pb-1 text-sm text-gray-500 dark:text-gray-400 sm:pb-1 md:pb-4">
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
