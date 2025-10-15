import { useEffect, useState, useRef } from 'react'

/**
 * @typedef TocHeading
 * @prop {string} value
 * @prop {number} depth
 * @prop {string} url
 */

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {{
 *  toc: TocHeading[],
 *  indentDepth?: number,
 *  fromHeading?: number,
 *  toHeading?: number,
 *  asDisclosure?: boolean,
 *  exclude?: string|string[]
 * }} props
 *
 */
const TOCInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
}) => {
  const [isSticky, setIsSticky] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )
  const [isDark, setIsDark] = useState(false)
  const tocRef = useRef(null)
  const placeholderRef = useRef(null)

  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  useEffect(() => {
    const handleScroll = () => {
      if (!tocRef.current || !placeholderRef.current) return

      const placeholderTop = placeholderRef.current.getBoundingClientRect().top
      setIsSticky(placeholderTop < 80)
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-80px 0px -80% 0px',
    })

    // Observe all headings
    filteredToc.forEach((heading) => {
      const id = heading.url.slice(1) // Remove the # from the url
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Watch for dark mode changes
    const darkModeObserver = new MutationObserver(checkDarkMode)
    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleScroll() // Check initial state
    checkDarkMode() // Check initial dark mode state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      darkModeObserver.disconnect()
    }
  }, [filteredToc])

  const tocList = (
    <ul className="list-none space-y-2">
      {filteredToc.map((heading) => {
        const isActive = activeId === heading.url.slice(1)
        return (
          <li
            key={heading.value}
            className={`${heading.depth >= indentDepth && 'ml-6'} transition-colors`}
          >
            <a
              href={heading.url}
              className={`no-underline hover:text-primary-500 dark:hover:text-primary-400 ${
                isActive
                  ? 'font-medium text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {heading.value}
            </a>
          </li>
        )
      })}
    </ul>
  )

  const content = asDisclosure ? (
    <details open>
      <summary className="ml-6 pt-2 pb-2 text-xl font-bold cursor-pointer">
        Table of Contents
      </summary>
      <div className="ml-6">{tocList}</div>
    </details>
  ) : (
    tocList
  )

  return (
    <>
      {/* Placeholder to maintain space when TOC becomes fixed */}
      <div ref={placeholderRef} className={isSticky ? 'h-auto' : ''}>
        <div
          ref={tocRef}
          className={`transition-all duration-300`}
          style={
            isSticky
              ? {
                  position: 'fixed',
                  top: '5rem',
                  left: '2rem',
                  zIndex: 40,
                  width: '24rem',
                  borderRadius: '0.5rem',
                  border: '1px solid',
                  borderColor: isDark ? 'rgb(115, 115, 115)' : 'rgb(229, 231, 235)',
                  backgroundColor: isDark ? 'rgba(40, 40, 40, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  padding: '1rem',
                  fontSize: '0.875rem',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  backdropFilter: 'blur(12px)',
                  display: windowWidth >= 1347 ? 'block' : 'none',
                }
              : {}
          }
        >
          {content}
        </div>
      </div>
    </>
  )
}

export default TOCInline
