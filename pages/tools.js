import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'

const sections = [
  {
    emoji: '📚',
    title: 'Learning & Retention',
    intro:
      'The biggest shift in how I learn. Claude Code runs directly on my Obsidian vault, turning rough notes into pedagogical explainers and pressure-testing what I think I know. Every day I resurface a random old note, so past learning keeps coming back instead of quietly rotting.',
    tools: [
      {
        name: 'Obsidian',
        description:
          'My notetaking and learning hub. A daily random note resurfaces something I wrote months ago, which has done more for retention than any rereading ever did.',
        url: 'https://obsidian.md',
      },
      {
        name: 'Claude Code',
        description:
          'CLI-based AI pair programmer that also works directly on my notes, generating explainers and quizzing me on concepts I captured but never fully digested.',
        url: 'https://claude.com/claude-code',
      },
    ],
  },
  {
    emoji: '🏠',
    title: 'Self-Hosted & Homelab',
    intro:
      'The tools I am proudest of are the ones I built myself. These run as Docker containers on my Proxmox homelab, served from a mini PC in my living room behind Cloudflare Zero Trust.',
    tools: [
      {
        name: 'Budget Tracker',
        description:
          'Real-time budget tracker built with Next.js, PocketBase, n8n, and a local LLM. Transactions appear minutes after a card is charged, and no financial data ever leaves my network.',
        url: '/blog/building-budget-tracker',
      },
      {
        name: 'DeskOS',
        description:
          'My own take on Obsidian meets Notion: AI note-taking with visual explainers, backed by a custom MCP server that saves and retrieves notes RAG-style with pgvector. Like the paper agenda we all had in school, just supercharged.',
      },
      {
        name: 'Tempo',
        description:
          'My own time and habit tracking app. Built for exactly how I want to track my days, no subscription, no feature bloat.',
      },
      {
        name: 'n8n',
        description:
          'Self-hosted workflow automation that glues everything together: email scraping, local AI categorization, and Telegram alerts, all without writing pipeline code.',
        url: 'https://n8n.io',
      },
    ],
  },
  {
    emoji: '⚡',
    title: 'Building',
    tools: [
      {
        name: 'Cursor',
        description:
          'Primary coding IDE paired with Claude CLI for scaffolding, debugging, and exploring ideas',
        url: 'https://cursor.sh',
      },
    ],
  },
  {
    emoji: '🎙️',
    title: 'Capturing Ideas',
    intro:
      'Most of my ideas show up while I am nowhere near a keyboard. Dictation turns scattered thoughts into notes before they evaporate. I type at roughly 80 to 100 words per minute, but with dictation I can get thoughts down at around 150. Once you get used to that speed, going back to typing everything out feels painfully slow.',
    tools: [
      {
        name: 'SuperWhisper',
        description: 'Offline voice dictation for work (privacy-focused)',
        url: 'https://superwhisper.com',
      },
      {
        name: 'WisprFlow',
        description:
          'Voice-to-text for personal use, turning scattered thoughts into organized notes',
        url: 'https://wisprflow.com',
      },
    ],
  },
]

function ToolCard({ tool }) {
  const cardClasses =
    'group p-5 rounded-lg border border-gray-200 dark:border-gray-700 transition-all bg-white dark:bg-gray-800'
  const content = (
    <>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors flex items-center gap-1.5">
        {tool.name}
        {tool.url && (
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
        )}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
    </>
  )

  if (!tool.url) {
    return <div className={cardClasses}>{content}</div>
  }

  return (
    <Link
      href={tool.url}
      className={`${cardClasses} hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-md`}
    >
      {content}
    </Link>
  )
}

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
              This is less a list of apps and more the system behind how I stay productive: how I
              learn and actually retain things, how I capture ideas before they disappear, and the
              apps I have built for myself when nothing off the shelf fit.
            </p>
          </div>
        </div>

        <div className="py-12">
          {sections.map((section) => (
            <div key={section.title} className="mb-12 last:mb-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="text-2xl">{section.emoji}</span>
                {section.title}
              </h2>
              {section.intro && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-3xl">
                  {section.intro}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
