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
    // Initialize PostHog if we have an analytics ID
    if (siteMetadata.analytics.posthogAnalyticsId) {
      console.log('Initializing PostHog with key:', siteMetadata.analytics.posthogAnalyticsId)
      console.log('Environment:', process.env.NODE_ENV)

      posthog.init(siteMetadata.analytics.posthogAnalyticsId, {
        api_host: 'https://us.i.posthog.com',
        loaded: (posthog) => {
          console.log('PostHog loaded successfully')
          if (isDevelopment) {
            // In development, we can check if PostHog is working
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
    const handleRouteChange = () => {
      if (siteMetadata.analytics.posthogAnalyticsId && typeof window !== 'undefined') {
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
