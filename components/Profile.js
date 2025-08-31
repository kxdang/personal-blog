import React from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import LoadingSkeletonBooks from '@/components/LoadingSkeletonBooks'
import { HiLocationMarker } from 'react-icons/hi'
import SocialIcon from '@/components/social-icons'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { FlagIcon } from 'react-flag-kit'

import { KienPronunciation } from './KienPronunciation'
import TextGradient from '@/components/TextGradient'

const fetchBookData = async () => {
  const response = await fetch('/api/goodReads')
  const data = await response.json()
  return data
}

export default function Profile() {
  const [bookData, setBookData] = useState(undefined)

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

  const BookTitleAndAuthor = ({ title, author, url }) => (
    <Link
      className="text-center text-gray-500 hover:underline dark:text-gray-400"
      href={`https://www.goodreads.com${url}`}
      target="__blank"
    >
      <p>
        {title} - {author}
      </p>
    </Link>
  )

  const BookCover = ({ title, author, imageUrl, url }) => {
    return (
      <Link href={`https://www.goodreads.com${url}`} target="__blank">
        <Image alt={`${title} - ${author}`} height={140} width={90} src={imageUrl} />
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
          <p className="sm:text-md mb-2 pt-4 text-gray-500 dark:text-gray-400">Developer stack</p>
          <div className="flex flex-wrap gap-y-2 pb-6">
            <span className="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
              JavaScript
            </span>
            <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              TypeScript
            </span>
            <span className="mr-2 rounded bg-sky-100 px-2.5 py-0.5 text-sm font-medium text-sky-800 dark:bg-sky-900 dark:text-sky-300">
              Reactjs
            </span>
            <span className="mr-2 rounded bg-purple-100 px-2.5 py-0.5 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              GraphQL
            </span>
            <span className="mr-2 rounded bg-pink-100 px-2.5 py-0.5 text-sm font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300">
              Apollo
            </span>
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
              <SocialIcon kind="mail" href={`mailto:hello@kien.dev`} size="6" />
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
            <Link
              href="https://www.goodreads.com/review/list/63733680-kien-dang?shelf=read"
              target="_blank"
            >
              <p className="hover:underline">
                {isFetching ? ' Read ( - books)' : `Read (${bookData.numOfReadBooks} books)`}
              </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center gap-2 pb-2">
          {isFetching ? (
            <div className="flex h-[147px] w-[90px] animate-pulse items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
              <svg
                className="h-10 w-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          ) : (
            <>
              {bookData.currentlyReading.map((book, idx) => (
                <BookCover
                  key={idx}
                  title={book.title}
                  author={book.author}
                  imageUrl={book.imageUrl}
                  url={book.url}
                />
              ))}
            </>
          )}
        </div>

        {isFetching ? (
          <LoadingSkeletonBooks row={2} />
        ) : (
          <div className="mx-auto w-full p-4">
            {bookData.currentlyReading.map((book, idx) => (
              <BookTitleAndAuthor
                key={idx}
                title={book.title}
                author={book.author}
                url={book.url}
              />
            ))}{' '}
          </div>
        )}
      </div>
    </div>
  )
}
