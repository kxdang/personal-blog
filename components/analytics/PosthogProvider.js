'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'

// Allow testing in development
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

export function PHProvider({ children }) {
  const router = useRouter()

  useEffect(() => {
    // Allow opting out via ?optout=true URL param
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('optout') === 'true') {
        localStorage.setItem('ph_optout', 'true')
      }
    }

    const isOptedOut = typeof window !== 'undefined' && localStorage.getItem('ph_optout') === 'true'

    // Initialize PostHog if we have an analytics ID and user hasn't opted out
    if (siteMetadata.analytics.posthogAnalyticsId && !isOptedOut) {
      posthog.init(siteMetadata.analytics.posthogAnalyticsId, {
        api_host: 'https://us.i.posthog.com',
        loaded: (posthog) => {
          if (isDevelopment) {
            posthog.debug()
          }
        },
        autocapture: true,
        capture_pageview: false, // We'll handle this manually for better control
        capture_pageleave: true,
      })
    }
  }, [])

  // Track page views on route change
  useEffect(() => {
    const isOptedOut = typeof window !== 'undefined' && localStorage.getItem('ph_optout') === 'true'

    const handleRouteChange = () => {
      if (siteMetadata.analytics.posthogAnalyticsId && !isOptedOut) {
        posthog.capture('$pageview')
      }
    }

    // Capture initial page view
    handleRouteChange()

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  if (!siteMetadata.analytics.posthogAnalyticsId) {
    return <>{children}</>
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
