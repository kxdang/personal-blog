import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import '@/css/globals.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Snowfall from 'react-snowfall'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import { PHProvider } from '@/components/analytics/PosthogProvider'
import { useRouter } from 'next/router'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET
const isDecemberOrJanuary = [11, 0].includes(new Date().getMonth())

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const currentPathname = router.pathname

  const shouldSnow =
    ['/', '/blog', '/tags', '/about'].includes(currentPathname) && isDecemberOrJanuary

  return (
    <>
      {shouldSnow ? (
        <Snowfall
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
          }}
          color="white"
          snowflakeCount={28}
        />
      ) : null}

      <PHProvider>
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
          <Head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
          </Head>
          {isDevelopment && isSocket && <ClientReload />}
          <Analytics />
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </ThemeProvider>
      </PHProvider>
    </>
  )
}
