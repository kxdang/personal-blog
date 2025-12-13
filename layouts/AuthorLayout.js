import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Timeline from '@/components/Timeline'
import { useState, useEffect, useRef } from 'react'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, linkedin, github } = frontMatter

  const [showTimeline, setShowTimeline] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const quoteRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const timelineObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTimeline(true)
          // Delay the animation slightly for a smoother effect
          setTimeout(() => setIsVisible(true), 100)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -200px 0px',
      }
    )

    if (timelineRef.current) {
      timelineObserver.observe(timelineRef.current)
    }

    return () => {
      if (timelineRef.current) {
        timelineObserver.unobserve(timelineRef.current)
      }
    }
  }, [])

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full object-cover"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
            </div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">{children}</div>

          {/* Quote Section */}
          <div className="xl:col-span-3 pt-16 pb-8 flex flex-col items-center justify-center">
            <div className="relative max-w-4xl mx-auto px-4">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 text-6xl text-primary-500/20 dark:text-primary-400/20 font-serif">
                "
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl text-primary-500/20 dark:text-primary-400/20 font-serif transform rotate-180">
                "
              </div>

              {/* Quote */}
              <blockquote className="relative text-center py-8">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-relaxed">
                  Journey before destination
                </p>
                <footer className="mt-6 text-sm md:text-base text-gray-500 dark:text-gray-400 italic">
                  — IYKYK 📖
                </footer>
              </blockquote>

              {/* Scroll indicator */}
              {!showTimeline && (
                <div className="flex flex-col items-center mt-8 animate-bounce">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Scroll to explore my journey
                  </p>
                  <svg
                    className="w-6 h-6 text-primary-500 dark:text-primary-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Timeline Trigger Point */}
          <div ref={timelineRef} className="xl:col-span-3 h-32" />

          {/* Timeline with fade-in animation */}
          <div className="xl:col-span-3">
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {showTimeline && <Timeline />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
