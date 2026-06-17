# Dailymotion — Video Browsing

A small two-page video browsing experience built on the public
[Dailymotion API](https://developers.dailymotion.com/api/): search and browse
videos, then open one to watch it with its details and a like toggle.

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
    ├── search/       # SearchPage + SearchBar, VideoGrid, VideoCard, useVideoSearch
    └── video/        # VideoPage + VideoPlayer, VideoMeta, LikeButton, useVideo, useLikes
```

Two ideas drive it:

- **A domain model decoupled from the API.** Components only ever see `Video` /
  `VideoDetails` (`lib/types.ts`); the mapping from Dailymotion's raw JSON lives
  in `lib/dailymotion.ts`. A change in the API never ripples into the UI.
- **The search query lives in the URL** (`/?q=…`). It's the single source of
  truth, which makes searches shareable and the back button work for free.

## Key decisions & tradeoffs

- **Data layer:** TanStack Query handles caching, loading/error states, and
  `keepPreviousData` so results don't flash while typing. Hand-rolled `useEffect`
  fetching would have re-implemented all of that, worse.
- **Default feed:** an empty search page would feel broken, so the landing shows
  a *Trending now* feed (`sort=trending`); searching swaps to relevance-sorted
  results.
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
- **`useVideoSearch`** — the data layer, with `fetch` mocked: verifies the
  default-vs-search branching, the request URL, and the API → domain mapping.

I deliberately skipped pixel/markup tests on presentational components — low
value and brittle. With more time I'd add a Playwright smoke test for the
search → open video → like flow end to end.

## With more time

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
