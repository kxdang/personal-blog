import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  const techStack = [
    { name: 'Next.js', url: 'https://nextjs.org' },
    { name: 'React', url: 'https://react.dev' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
    { name: 'MDX', url: 'https://mdxjs.com' },
    { name: 'Cloudinary', url: 'https://cloudinary.com' },
    { name: 'Tina CMS', url: 'https://tina.io' },
  ]

  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <a href="https://kiendang.ca" target="__blank">
              {siteMetadata.author}
            </a>
          </div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-4 mb-8">
          <p className="mb-2 text-center text-xs text-gray-400 dark:text-gray-500">Built with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                {tech.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
