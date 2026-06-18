# Dailymotion — Video Browsing

A small two-page video browsing experience built on the public
[Dailymotion API](https://developers.dailymotion.com/api/): search and browse
videos by category, then open one to watch it with its details and a like
toggle. Coded With all my heart.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit + integration tests
npm run build      # typecheck + production build
```

No API key is required.

## Stack

- **React + TypeScript** (Vite)
- **React Router** — routing
- **TanStack Query** — data fetching, caching, request states
- **CSS Modules** — styling
- **Vitest + React Testing Library** — tests

### Why Vite, not Next.js

The data comes from a public API and is fetched client-side: no SSR/SEO
requirement, no server secret to protect. Vite keeps the project lean and the
focus on the React code. Next.js would be the right call if I needed server
rendering, a BFF to hide credentials, or file-based routing at scale.

## Architecture

Feature-based — each domain owns its components, hooks and styles and exposes a
single entry point:

```
src/
├── lib/              # API client, domain types, helpers
├── components/ui/    # shared primitives (Button, Spinner, EmptyState)
└── features/
    ├── header/       # brand wordmark
    ├── search/       # SearchPage + SearchBar, Filters, VideoGrid, VideoCard, useVideoSearch, useCategoryFilter
    └── video/        # VideoPage + VideoPlayer, VideoMeta, LikeButton, useVideo, useLikes
```

### What to check first ?

The 'SearchPage' feature is the home page, so make sure to check the code first, it's good starting point

Two ideas drive it:

- **A domain model decoupled from the API.** Components only ever see `Video` /
  `VideoDetails` (`lib/types.ts`); the mapping from Dailymotion's raw JSON lives
  in `lib/dailymotion.ts`. A change in the API never ripples into the UI.
- **The search query lives in the URL** (`/?q=…`). It's the single source of
  truth, which makes searches shareable and the back button work for free.

## UI touches

A few things added because a "considered" UI felt like part of the brief, not
just a working one:

- The video grid is a **masonry layout** (CSS `column-width`, no JS) — closer
  to a Pinterest feed than a uniform grid. 🧱 With mode time, i will 3 differents
  height for the card to match a perfect "Pinterest style"
- Check the filters if you wanna have fun
- The header and search bar + category filter pills both have a **frosted-glass
  treatment**
  ✨ All purely decorative — `prefers-reduced-motion` turns
  it off, and `aria-pressed` (not color) is the real source of truth for which
  filter is active.
- **Responsive header, mobile-first:** below 920px the search bar moves out of
  the header and sits under the "Find something worth watching" title; the
  header keeps just the logo and a search icon that scrolls down to it. From
  920px up, the bar moves back into the header, centered.

## Key decisions & tradeoffs

- **Data layer:** TanStack Query handles caching, loading/error states, and
  `keepPreviousData` so results don't flash while typing. Hand-rolled `useEffect`
  fetching would have re-implemented all of that, worse.
- **Default feed:** an empty search page would feel broken, so the landing shows
  a *Trending now* feed (`sort=trending`); searching swaps to relevance-sorted
  results.
- **Category filters:** the API's `channel` parameter doubles as a category
  filter (verified against the [official list](https://developers.dailymotion.com/reference/video-categories) —
  e.g. there's no `food`, the closest real value is `lifestyle`). Search text
  and category compose into one request rather than being two separate
  fetch functions. The active category is local state persisted to
  `localStorage` (one at a time; clicking it again clears it), so it survives
  a refresh — same pattern as the like toggle.
- **Embedding:** the video page uses Dailymotion's iframe player
  (`geo.dailymotion.com/player.html?video=…`) — zero configuration. The JS Player
  SDK would allow listening to player events and controlling playback
  programmatically, at the cost of a player ID and more setup; not needed here.
- **Likes:** local state only, per the brief (no API call). Persisted to
  `localStorage` so a like survives a reload — still purely client-side.
- **Debounced search** (350 ms) avoids firing a request on every keystroke.

## Testing — what and why

I tested where bugs are most likely and most costly, not for coverage's sake:

- **`formatDuration`** — pure function, exact output matters (padding,
  off-by-one). Fast and deterministic.
- **`useLikes`** — the core stateful logic of the feature, including persistence
  across hook instances.
- **`useCategoryFilter`** — same shape as `useLikes`: toggle on/off, only one
  active at a time, persists across instances.
- **`useVideoSearch`** — the data layer, with `fetch` mocked: verifies the
  default-vs-search branching, the category filter composing into the request,
  and the API → domain mapping.

I deliberately skipped pixel/markup tests on presentational components — low
value and brittle. With more time I'd add a Playwright smoke test for the
search → open video → like flow end to end.

I also skipped the onHover preview on the video item list because i tried to
reach the API with `preview_480p_url` but i get a `403`. It seems that all the
brut medias links (preview, HLS, MP4) are protected and asks for an OAuth,
Which is out from 'API publique sans clé'. To go further, it could be fun to
get a partner api link or a fallback iframe on Hover, but the Iframe is heavy.

## With more time

- Using api premium to make a preview on "Hover" of the grid item ?
- Pagination / infinite scroll (the API exposes `has_more` + `page`).
- Skeleton loaders instead of a spinner.
- Explicit handling of non-embeddable / geo-blocked videos.
- A11y: focus management on route change (reduced motion is already respected).

## API notes

- No key needed for public reads.
- The data API serves CORS for public `GET`, so the app calls it directly from
  the browser. If that ever changed, a thin proxy / serverless route is the
  fallback.
- `views_*` fields are being deprecated, so the UI surfaces `likes_total` instead.
