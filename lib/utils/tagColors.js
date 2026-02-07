const TAG_COLOR_MAP = {
  pomodoro: {
    label: '\u{1F345} pomodoro',
    colors:
      'bg-gradient-to-r from-red-100 to-orange-100 text-red-700 hover:from-red-200 hover:to-orange-200 dark:from-red-900/50 dark:to-orange-900/50 dark:text-red-300 dark:hover:from-red-800/60 dark:hover:to-orange-800/60 ring-red-500/20',
  },
  life: {
    label: 'life',
    colors:
      'bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700 hover:from-sky-200 hover:to-cyan-200 dark:from-sky-900/50 dark:to-cyan-900/50 dark:text-sky-300 dark:hover:from-sky-800/60 dark:hover:to-cyan-800/60 ring-sky-500/20',
  },
  biochemistry: {
    label: 'biochemistry',
    colors:
      'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:from-emerald-200 hover:to-teal-200 dark:from-emerald-900/50 dark:to-teal-900/50 dark:text-emerald-300 dark:hover:from-emerald-800/60 dark:hover:to-teal-800/60 ring-emerald-500/20',
  },
  productivity: {
    label: 'productivity',
    colors:
      'bg-gradient-to-r from-green-100 to-lime-100 text-green-700 hover:from-green-200 hover:to-lime-200 dark:from-green-900/50 dark:to-lime-900/50 dark:text-green-300 dark:hover:from-green-800/60 dark:hover:to-lime-800/60 ring-green-500/20',
  },
  code: {
    label: 'code',
    colors:
      'bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 hover:from-violet-200 hover:to-fuchsia-200 dark:from-violet-900/50 dark:to-fuchsia-900/50 dark:text-violet-300 dark:hover:from-violet-800/60 dark:hover:to-fuchsia-800/60 ring-violet-500/20',
  },
  ai: {
    label: 'AI',
    colors:
      'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 hover:from-cyan-200 hover:to-blue-200 dark:from-cyan-900/50 dark:to-blue-900/50 dark:text-cyan-300 dark:hover:from-cyan-800/60 dark:hover:to-blue-800/60 ring-cyan-500/20',
  },
  'year-end': {
    label: '🎉 year-end',
    colors:
      'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-300 dark:hover:from-blue-800/60 dark:hover:to-indigo-800/60 ring-blue-500/20',
  },
}

const FALLBACK_COLOR =
  'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700/60 ring-gray-500/20'

export function getTagColor(tag) {
  const entry = TAG_COLOR_MAP[tag.toLowerCase()]
  return entry ? entry.colors : FALLBACK_COLOR
}

export function getTagLabel(tag) {
  const entry = TAG_COLOR_MAP[tag.toLowerCase()]
  return entry ? entry.label : tag
}

export default TAG_COLOR_MAP
