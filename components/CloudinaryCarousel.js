/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { CldImage } from 'next-cloudinary'

export function CloudinaryCarousel({
  images,
  maxInlineVh = 95, // inline viewer max height in vh
  maxModalVh = 95, // modal viewer max height in vh
}) {
  const [index, setIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const touchStartX = useRef(null)
  const autoplayId = useRef(null)

  const length = images.length
  if (!length) return null

  const goTo = useCallback(
    (i) => {
      setIndex(((i % length) + length) % length)
    },
    [length]
  )

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % length)
  }, [length])

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + length) % length)
  }, [length])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') setIsModalOpen(false)
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  useEffect(() => {
    if (isModalOpen) {
      if (autoplayId.current) {
        window.clearInterval(autoplayId.current)
        autoplayId.current = null
      }
      return
    }

    if (autoplayId.current) {
      window.clearInterval(autoplayId.current)
    }

    autoplayId.current = window.setInterval(() => {
      next()
    }, 5000)

    return () => {
      if (autoplayId.current) {
        window.clearInterval(autoplayId.current)
        autoplayId.current = null
      }
    }
  }, [next, isModalOpen])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const swipeThreshold = 40

    if (deltaX > swipeThreshold) {
      prev()
    } else if (deltaX < -swipeThreshold) {
      next()
    }

    touchStartX.current = null
  }

  const current = images[index]

  return (
    <>
      {/* Inline carousel */}
      <div
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '32px auto',
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            borderRadius: '12px',
            cursor: 'zoom-in',
          }}
          onClick={() => setIsModalOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <CldImage
            src={current.src}
            alt={current.alt ?? ''}
            width={1800}
            height={1200}
            sizes="(max-width: 900px) 100vw, 900px"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: `${maxInlineVh}vh`,
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '8px',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          {index + 1} / {length}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '6px',
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goTo(i)
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '999px',
                border: 'none',
                padding: 0,
                background: i === index ? '#0ea5e9' : '#e5e7eb',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            prev()
          }}
          aria-label="Previous image"
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            borderRadius: '999px',
            border: 'none',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            fontSize: '20px',
          }}
        >
          ‹
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            next()
          }}
          aria-label="Next image"
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            borderRadius: '999px',
            border: 'none',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            fontSize: '20px',
          }}
        >
          ›
        </button>
      </div>

      {/* Fullscreen modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close button pinned to viewport */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close"
            style={{
              position: 'fixed',
              top: '16px',
              right: '16px',
              borderRadius: '999px',
              border: 'none',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontSize: '18px',
              zIndex: 1001,
            }}
          >
            ×
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh',
              position: 'relative',
            }}
          >
            <CldImage
              src={current.src}
              alt={current.alt ?? ''}
              width={2200}
              height={1500}
              sizes="95vw"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '95vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
