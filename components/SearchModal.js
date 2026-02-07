import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import kebabCase from '@/lib/utils/kebabCase'
import { getTagColor, getTagLabel } from '@/lib/utils/tagColors'

export default function SearchModal({ isOpen, onClose, posts }) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap((post) => post.tags || []))].sort()

  // Filter posts based on search and tag
  const filteredPosts = posts.filter((post) => {
    const searchContent = (post.title + post.summary + (post.tags || []).join(' ')).toLowerCase()
    const matchesSearch = searchContent.includes(searchValue.toLowerCase())
    const matchesTag =
      !selectedTag || (post.tags || []).map((t) => kebabCase(t)).includes(kebabCase(selectedTag))
    return matchesSearch && matchesTag
  })

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchValue, selectedTag])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setSearchValue('')
      setSelectedTag(null)
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && filteredPosts.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex]
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex, filteredPosts.length])

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

    document.addEventListener('keydown', handleEscape, true) // Use capture phase
    return () => document.removeEventListener('keydown', handleEscape, true)
  }, [isOpen, onClose])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredPosts.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === 'Enter' && filteredPosts.length > 0) {
        e.preventDefault()
        const selectedPost = filteredPosts[selectedIndex]
        if (selectedPost) {
          router.push(`/blog/${selectedPost.slug}`)
          onClose()
        }
      }
    },
    [filteredPosts, selectedIndex, router, onClose]
  )

  // Handle clicking a result
  const handleResultClick = (slug) => {
    router.push(`/blog/${slug}`)
    onClose()
  }

  // Handle tag selection
  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  if (!isOpen) return null

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
          {/* Search Input */}
          <div className="flex items-center px-5 border-b border-gray-200 dark:border-gray-700">
            <svg
              className="h-5 w-5 text-gray-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search articles..."
              className="w-full px-4 py-5 bg-transparent border-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
              ESC
            </kbd>
          </div>

          {/* Tags */}
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  !selectedTag
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedTag === tag
                      ? 'ring-2 ring-primary-500 ring-offset-1 dark:ring-offset-gray-900'
                      : ''
                  } ${getTagColor(tag)}`}
                >
                  {getTagLabel(tag)}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto">
            {filteredPosts.length === 0 ? (
              <div className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
                <p>No articles found</p>
                {(searchValue || selectedTag) && (
                  <button
                    onClick={() => {
                      setSearchValue('')
                      setSelectedTag(null)
                    }}
                    className="mt-2 text-primary-500 hover:text-primary-600 text-sm"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              filteredPosts.slice(0, 20).map((post, index) => (
                <button
                  key={post.slug}
                  onClick={() => handleResultClick(post.slug)}
                  className={`w-full px-5 py-4 flex items-start gap-3 text-left transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-medium truncate ${
                        index === selectedIndex
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {post.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${getTagColor(tag)}`}
                        >
                          {getTagLabel(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                  {index === selectedIndex && (
                    <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded flex-shrink-0">
                      ↵
                    </kbd>
                  )}
                </button>
              ))
            )}
            {filteredPosts.length > 20 && (
              <div className="px-5 py-3 text-center text-xs text-gray-400">
                Showing 20 of {filteredPosts.length} results
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd>
                <span>Open</span>
              </span>
            </div>
            <span>{filteredPosts.length} articles</span>
          </div>
        </div>
      </div>
    </div>
  )
}
