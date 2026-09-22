import { useEffect, useRef, useState } from 'react'

/**
 * Reading typeface control, rendered in the post meta line. Long-form posts
 * are the only place the choice means anything, but the preference itself is
 * site-wide: data-font on <html> plus one localStorage key.
 *
 * The actual type scale
 * lives in CSS custom properties in globals.css, so this component only ever
 * writes one attribute and one localStorage key.
 *
 * Webfonts for non-default choices are fetched on demand, so a reader who
 * never opens this menu downloads nothing extra. The matching before-paint
 * script in _document.js handles the stored-preference case.
 */

const NEWSREADER_HREF =
  'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..500&display=swap'

const OPTIONS = [
  {
    id: 'original',
    label: 'Original',
    note: 'Work Sans and Fraunces',
    preview: "'Fraunces', Georgia, serif",
  },
  {
    id: 'reader',
    label: 'Reader',
    note: 'Newsreader, larger, for long posts',
    preview: "'Newsreader', ui-serif, Georgia, serif",
    href: NEWSREADER_HREF,
  },
  {
    id: 'system',
    label: 'System',
    note: 'Your device font, nothing to download',
    preview: '-apple-system, BlinkMacSystemFont, sans-serif',
  },
]

function ensureFont(href) {
  if (!href || typeof document === 'undefined') return
  if (document.querySelector(`link[data-font-href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.setAttribute('data-font-href', href)
  document.head.appendChild(link)
}

const FontSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [font, setFont] = useState('original')
  const wrapRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('font-pref')
      if (stored && OPTIONS.some((o) => o.id === stored)) setFont(stored)
    } catch (e) {
      /* storage unavailable, keep the default */
    }
  }, [])

  // Close on outside click or Escape, and return focus to the button.
  useEffect(() => {
    if (!open) return undefined
    const onPointer = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (option) => {
    ensureFont(option.href)
    if (option.id === 'original') {
      document.documentElement.removeAttribute('data-font')
    } else {
      document.documentElement.setAttribute('data-font', option.id)
    }
    try {
      localStorage.setItem('font-pref', option.id)
    } catch (e) {
      /* storage unavailable, the choice still applies for this page view */
    }
    setFont(option.id)
    setOpen(false)
    buttonRef.current?.focus()
  }

  return (
    <div className="relative inline-block align-middle" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Change reading typeface"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="ml-1.5 flex h-6 w-6 items-center justify-center rounded text-gray-500 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          {/* Aa: the universal mark for type settings */}
          <path d="M5.03 4.5h1.79l3.06 8.62H8.4l-.66-2.02H4.08l-.66 2.02H1.95L5.03 4.5zm.9 1.86L4.5 9.86h2.86L5.93 6.36z" />
          <path d="M14.06 7.3c1.7 0 2.7.84 2.7 2.42v3.4h-1.4v-.83c-.38.62-1.06.95-1.94.95-1.24 0-2.07-.73-2.07-1.8 0-1.12.83-1.74 2.42-1.84l1.55-.1v-.13c0-.72-.44-1.1-1.28-1.1-.72 0-1.2.3-1.33.84l-1.32-.3c.26-1 1.2-1.51 2.67-1.51zm1.26 3.2l-1.3.09c-.8.05-1.19.32-1.19.83 0 .48.38.78 1 .78.89 0 1.49-.53 1.49-1.36v-.34z" />
        </svg>
      </button>

      {mounted && open && (
        <div
          role="menu"
          aria-label="Reading typeface"
          className="absolute right-1/2 z-50 mt-2 w-60 translate-x-1/2 text-left overflow-hidden rounded-md border border-gray-200 bg-gray-50 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <p className="border-b border-gray-200 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.13em] text-gray-400 dark:border-gray-700 dark:text-gray-400">
            Reading typeface
          </p>
          {OPTIONS.map((option) => {
            const active = font === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => choose(option)}
                className={`flex w-full items-baseline justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <span className="min-w-0">
                  <span
                    className="block text-[15px] leading-tight text-gray-900 dark:text-gray-100"
                    style={{ fontFamily: option.preview }}
                  >
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-gray-400">
                    {option.note}
                  </span>
                </span>
                {active && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-primary-500 dark:text-primary-400"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FontSwitch
