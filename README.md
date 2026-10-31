# Aashay Hedaoo — Designed to Play

A responsive game designer portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React, Lucide, and `next/font`.

## Run locally

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000.

## Verify and build

```sh
npm run typecheck
npm run lint
npm run build
python scripts/verify-content.py
```

The static export is written to `out/`. Every project route is generated at build time. No backend, authentication service, or contact form is needed; email and phone links use their native protocols.

## Content

- `src/data/source.json`: verbatim text, URLs, and media references from all 28 original Canva sections.
- `src/data/portfolio.ts`: structured project routing and presentation metadata.
- `src/data/assets.json`: original asset IDs, local files, dimensions, and source URLs.
- `src/data/retention.json`: original chart series, without invented or interpolated values.
- `public/images` and `public/videos`: downloaded originals; full quality retained.
- `public/optimized`: responsive WebP derivatives used through a custom Next Image loader. `predev` and `prebuild` generate these from the originals.
- `public/documents`: complete DOCX exports of the three public Google design documents, including embedded images. The original Google Docs and OneDrive links also remain on the project pages.
- `audit`: original public Canva source and text exports used during the audit.

The source contains spelling mistakes, repeated text, a Spotify link, and store search URLs. These are intentionally preserved. See `CONTENT_AUDIT.md` for provenance and verification limits.

## Accessibility and interaction

Keyboard-accessible navigation and filters; native modal image galleries with arrow keys, Escape, and focus restoration; native video controls; accessible chart toggles and data table; visible focus styles; reduced-motion support; touch-safe layouts; desktop-only spring cursor; sticky project section navigation.

## Hosting

`.openai/hosting.json` declares the existing private Sites project and `out` as its static directory. Keep the project ID unchanged when publishing updates. The site can also be hosted by any static hosting service that supports directory-index URLs.
