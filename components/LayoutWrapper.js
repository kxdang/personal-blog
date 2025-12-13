import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }) => {
  const router = useRouter()

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="hidden items-center justify-between sm:block">
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => {
                const isActive =
                  router.pathname === link.href || router.pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group relative inline-block p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4 transition-colors hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    <span className="relative inline-block pb-1">
                      {link.title}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5 bg-primary-500 dark:bg-primary-400 transition-all duration-300 ease-out ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </span>
                  </Link>
                )
              })}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
