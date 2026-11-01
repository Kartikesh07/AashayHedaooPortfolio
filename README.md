# Aashay Hedaoo — Game & Level Designer

Single-page Next.js portfolio: **PLAY/FORM — The Interactive Game Design Zine**. Built with TypeScript, Tailwind CSS, Motion for React, Lucide, and the original project media.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

Checks: `npm run typecheck`, `npm run lint`, `npm run build`, then `npm run verify:content`. Production builds use Next.js's supported Webpack option to avoid a Windows Turbopack worker crash observed in this environment. Development retains Turbopack.

Content lives in `src/data/portfolio.ts`, `src/data/source.json`, and `src/data/assets.json`. The original Canva text, external links, gameplay videos, sketches, and design documents are retained. Images use the standard Next.js image optimizer. The site has no hosting integration or automatic publishing workflow.

Home, Work, Process, About, and Contact use anchors on `/`. All seven case studies expand in place. Old page URLs redirect to their corresponding anchors; project anchors open the matching case study. Gallery dialogs support Escape, arrow keys, focus trapping, and return focus. Gameplay is user-initiated with posters and `preload="none"`; case-study media mounts on first expansion and pauses when closed.

The content audit checks the home page alone, so legacy routes cannot conceal missing content. It also checks the seven case studies, local media, document links, and single-page navigation. Original spelling and repeated source wording are intentionally retained.

The visual direction is documented in `DESIGN_DIRECTION.md`; preservation and browser QA are documented in `CONTENT_AUDIT.md`. The project exhibition supports hover, focus, arrow keys, and user-controlled gameplay. The design desk supports bounded mouse dragging, arrow-key movement, reset and image expansion; mobile uses a static arrangement and vertical project panels.
