// Turns Hardcover's crowd-sourced genre tags into a small set of clean shelves.
//
// The raw vocabulary is noisy: 265 distinct tags across ~125 books, with
// duplicates ('Self-Help' / 'Self help'), BISAC paths ('Fiction / Fantasy /
// Epic'), and plenty of non-genre bookkeeping ('Audiobook', 'to-read',
// 'physical-tbr'). So we score each book against every shelf, weighting each
// matched tag by how many Hardcover users applied it, and take the winner.

// Tags that describe a format, a shelf, or a reading intention, never a genre.
const NOT_A_GENRE =
  /audiobook|hörbuch|to-read|tbr|did-not-finish|book.?club|read next|read \d{4}|large type|general$|^general|^fiction$|^nonfiction$|^non-fiction$|^adult$|^literature$|^genre fiction$|^classics$|^contemporary$|^spanish$|^japanese$|^russian$|^tee$|^world$|^drama$|^essay$|^novella$|^comics?$/i

const SHELVES = [
  {
    id: 'fantasy',
    name: 'Fantasy',
    blurb: 'Where I go when I want a world to disappear into.',
    match:
      /fantasy|magic|cosmere|mythology|alchemy|dragon|sword|wizard|witch|elves|epic(?!.*sci)|lovecraft|weirdfiction|cosmic horror/i,
  },
  {
    id: 'scifi',
    name: 'Science Fiction',
    blurb: 'Big ideas, bad decisions, and the occasional alien.',
    match:
      /science.?fiction|sci-?fi|space|alien|dystopi|extraterrestrial|first contact|time travel|artificial intelligence|technological|technothriller|robot|cyber|alternative history/i,
  },
  {
    id: 'mystery',
    name: 'Mystery & Thriller',
    blurb: 'Read too fast, usually in one sitting.',
    match:
      /mystery|thriller|suspense|crime|detective|murder|police|espionage|criminal investigation|psychological$|traditional british|hercule/i,
  },
  {
    id: 'fiction',
    name: 'Fiction & Beyond',
    blurb: 'Novels that are not trying to be anything but good.',
    match:
      /literary fiction|romance|historical ?fiction|coming of age|women'?s? fiction|horror|humou?r|comedy|magical realism|realistic fiction|japanese (literature|fiction)|world literature|feel good|short stories|books about books/i,
  },
  {
    id: 'business',
    name: 'Business & Money',
    blurb: 'The reading behind the career change.',
    match:
      /business|econom|entrepreneur|管理|management|finance|financial|money|investing|career|employment|small business|success|negotiat|strategic|industries|construction industry|productivity|time management|meetings|bisnis/i,
  },
  {
    id: 'mind',
    name: 'Psychology & Self-Help',
    blurb: 'Trying to understand the machinery, including my own.',
    match:
      /psychology|self.?help|self.?esteem|self.?management|personal (development|growth|success|finance)?|motivation|happiness|mental health|mood disorder|psychopatholog|adhd|neurodiverse|wellness|health & |relationships|parenting|communication|conduct of life|spiritual|meditation|religion|philosophy/i,
  },
  {
    id: 'ideas',
    name: 'Science & Ideas',
    blurb: 'Non-fiction that rearranged something in my head.',
    match:
      /^science$|science & |physics|biolog|evolution|genetics|anthropolog|civilization|history|historical(?! fiction)|politic|public policy|social science|social psychology|education|technology|computers|automation|writing|language arts|books about books|biograph|memoir|autobiography/i,
  },
]

// Seven books carry no Genre tags at all on Hardcover, so no amount of scoring
// will place them. Shelve those by hand rather than dumping them in the
// fallback pile.
const OVERRIDES = {
  'change-your-paradigm-change-your-life': 'mind',
  'car-leasing-done-right': 'business',
  'the-software-engineers-guidebook': 'ideas',
  'debugging-the-9-indispensable-rules-for-finding-even-the-most-elusive-software-and-hardware-problems':
    'ideas',
  'pomodoro-technique-illustrated': 'mind',
  'millionaire-teacher': 'business',
  'agatha-christie-murder-on-the-orient-express': 'mystery',
}

const FALLBACK = {
  id: 'other',
  name: 'Everything Else',
  blurb: 'One-offs, oddities, and books that refused a category.',
}

/** Hardcover nests genres under cached_tags.Genre; be defensive about shape. */
function genreTags(book) {
  const tags = book?.cached_tags?.Genre
  if (!Array.isArray(tags)) return []
  return tags
    .filter((t) => t?.tag && !NOT_A_GENRE.test(t.tag))
    .map((t) => ({ tag: t.tag, weight: Number(t.count) || 1 }))
}

/**
 * Score a book against every shelf. A shelf's score is the summed user-count of
 * the tags it matches, so a book tagged 'Fantasy' by 50 people and 'Space' by 2
 * scores far higher for Fantasy than for Science Fiction.
 */
function scoreBook(book) {
  const scores = {}
  for (const { tag, weight } of genreTags(book)) {
    for (const shelf of SHELVES) {
      if (shelf.match.test(tag)) scores[shelf.id] = (scores[shelf.id] || 0) + weight
    }
  }
  return scores
}

function bestShelf(scores) {
  let best = null
  let bestScore = 0
  // SHELVES order breaks ties deterministically.
  for (const shelf of SHELVES) {
    const score = scores[shelf.id] || 0
    if (score > bestScore) {
      bestScore = score
      best = shelf.id
    }
  }
  return best || FALLBACK.id
}

/** Pick the single best shelf for one book, ignoring any series it belongs to. */
export function shelfFor(book) {
  if (book?.slug && OVERRIDES[book.slug]) return OVERRIDES[book.slug]
  return bestShelf(scoreBook(book))
}

/**
 * Shelve a whole collection, keeping every book in a series together.
 *
 * Crowd tags are often near-tied between two shelves, which is enough to split
 * a trilogy: The Reckoners scored Science Fiction for Steelheart and Firefight
 * but Fantasy for Calamity. Summing each series' scores across all its books
 * and shelving the series as a unit settles those ties consistently.
 *
 * Takes the raw Hardcover book objects and returns a slug -> shelf id map.
 */
export function assignShelves(books) {
  const seriesScores = {}
  for (const book of books) {
    const series = book?.featured_book_series?.series?.name
    if (!series || OVERRIDES[book.slug]) continue
    const totals = (seriesScores[series] ||= {})
    for (const [id, score] of Object.entries(scoreBook(book))) {
      totals[id] = (totals[id] || 0) + score
    }
  }

  const seriesShelf = {}
  for (const [series, totals] of Object.entries(seriesScores)) {
    seriesShelf[series] = bestShelf(totals)
  }

  const assignment = {}
  for (const book of books) {
    const series = book?.featured_book_series?.series?.name
    assignment[book.slug] =
      OVERRIDES[book.slug] || (series && seriesShelf[series]) || shelfFor(book)
  }
  return assignment
}

export const SHELF_ORDER = [...SHELVES, FALLBACK]

export { SHELVES, FALLBACK }
