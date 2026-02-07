const TAG_COLOR_MAP = {
  pomodoro: {
    label: '\u{1F345} pomodoro',
    colors:
      'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/60 ring-red-500/20',
  },
  life: {
    label: 'life',
    colors:
      'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:hover:bg-sky-800/60 ring-sky-500/20',
  },
  biochemistry: {
    label: 'biochemistry',
    colors:
      'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-800/60 ring-emerald-500/20',
  },
  productivity: {
    label: 'productivity',
    colors:
      'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800/60 ring-amber-500/20',
  },
  code: {
    label: 'code',
    colors:
      'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:hover:bg-violet-800/60 ring-violet-500/20',
  },
  ai: {
    label: 'AI',
    colors:
      'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:hover:bg-cyan-800/60 ring-cyan-500/20',
  },
  'year-end': {
    label: 'year-end',
    colors:
      'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/50 dark:text-rose-300 dark:hover:bg-rose-800/60 ring-rose-500/20',
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
