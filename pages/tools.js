import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'

const tools = [
  {
    name: 'ChatGPT',
    description: 'Quick research, brainstorming, and general writing tasks',
    url: 'https://chat.openai.com',
  },
  {
    name: 'Gemini',
    description: 'Research and exploring different perspectives on topics',
    url: 'https://gemini.google.com',
  },
  {
    name: 'NotebookLM',
    description: 'Deep research, writing refinement, and learning new concepts',
    url: 'https://notebooklm.google.com',
  },
  {
    name: 'Cursor',
    description:
      'Primary coding IDE powered by Claude - scaffolding, debugging, and exploring ideas',
    url: 'https://cursor.sh',
  },
  {
    name: 'SuperWhisper',
    description: 'Offline voice dictation for work (privacy-focused)',
    url: 'https://superwhisper.com',
  },
  {
    name: 'WisprFlow',
    description: 'Voice-to-text for personal use - turning scattered thoughts into organized notes',
    url: 'https://wisprflow.com',
  },
  {
    name: 'Perplexity',
    description: 'Product research and comparison shopping',
    url: 'https://perplexity.ai',
  },
]

export default function Tools() {
  return (
    <>
      <PageSEO title={`Tools - ${siteMetadata.author}`} description="My productivity stack" />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            🛠️ My Stack
          </h1>
          <div className="max-w-3xl space-y-4">
            <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
              I believe in using the right tool for the specific job. Rather than forcing everything
              through one AI, I match the tool to the task, whether that's quick research, deep
              thinking, coding, or capturing fleeting thoughts.
            </p>
            <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
              Here's what's in my rotation and how I actually use them:
            </p>
          </div>
        </div>

        <div className="py-12">
          {/* Thinking & Research */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              Thinking & Research
            </h2>
            <div className="space-y-6 max-w-4xl">
              {tools.slice(0, 3).map((tool) => (
                <div
                  key={tool.name}
                  className="group flex flex-col sm:flex-row sm:gap-6 gap-2 pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div className="flex-shrink-0 sm:w-40">
                    <Link
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      {tool.name}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </div>
                  <p className="flex-1 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Building */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Building
            </h2>
            <div className="space-y-6 max-w-4xl">
              {tools.slice(3, 4).map((tool) => (
                <div
                  key={tool.name}
                  className="group flex flex-col sm:flex-row sm:gap-6 gap-2 pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div className="flex-shrink-0 sm:w-40">
                    <Link
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      {tool.name}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </div>
                  <p className="flex-1 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Capturing Ideas */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <span className="text-2xl">🎙️</span>
              Capturing Ideas
            </h2>
            <div className="space-y-6 max-w-4xl">
              {tools.slice(4, 6).map((tool) => (
                <div
                  key={tool.name}
                  className="group flex flex-col sm:flex-row sm:gap-6 gap-2 pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div className="flex-shrink-0 sm:w-40">
                    <Link
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      {tool.name}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </div>
                  <p className="flex-1 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Researching */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <span className="text-2xl">🔎</span>
              Researching
            </h2>
            <div className="space-y-6 max-w-4xl">
              {tools.slice(6, 7).map((tool) => (
                <div key={tool.name} className="group flex flex-col sm:flex-row sm:gap-6 gap-2">
                  <div className="flex-shrink-0 sm:w-40">
                    <Link
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      {tool.name}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </div>
                  <p className="flex-1 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
