# Content and asset audit

Source: https://aashayhedaooportfolio.my.canva.site/ . Inspected 31 October 2026.

## Inventory and destination

| Original section indices | Content | Destination |
|---|---|---|
| 0 | Hello, introduction, Your next designer. | Home |
| 1–2 | Complete biography and skills | About |
| 3–4 | Game Wise and MindYourLogic Studios, dates, locations, roles, all responsibilities | About timeline |
| 5 | All six achievements, including original numeric claims | About |
| 6–7 | Krishna stories, artwork, three gameplay videos, Mini Games labels, store and original media links | `/projects/krishna-stories/` |
| 8 | Detective IQ 3, original artwork and contribution text, store links | `/projects/detective-iq-3/` |
| 9–13 | Detetive IQ 2, Erase, Cut Rope, Bullet, four videos, two OneDrive documents, original retention data | `/projects/detective-iq-2/` |
| 14–17 | Detective IQ, Cases and Flashback, Bullet gameplay (DIQ1), Draw to save, four videos | `/projects/detective-iq/` |
| 18–19 | Pizza IQ, gameplay video, eight rough level design images, all source links | `/projects/pizza-iq/` |
| 20–21 | All expertise groups, disciplines, and tools | About |
| 22 | Persnol Project, Wobble Bomber, complete description, both Google documents | `/projects/wobble-bomber/` |
| 23 | DreamLink: The Fractured Timeline, complete description, Google document | `/projects/dreamlink/` |
| 24 | Passion, Intrest and Hobbies, all three complete paragraphs | About |
| 25–26 | All ten sketches | About, expandable gallery |
| 27 | Thankyou, Aashay Hedaoo, original email, phone, LinkedIn | Contact and footer |

## Preservation

All source text blocks and external links are compared against the generated HTML by `scripts/verify-content.py`, with whitespace normalized only for comparison. Source spelling, repeated words, punctuation, and factual claims have not been corrected or rewritten. All seven projects and all twelve gameplay videos are retained. The original chart's three populated series are reproduced directly and can be inspected in a data table.

44 distinct source asset records were downloaded, including original artworks, videos, tool/contact graphics, sketches, rough designs, and the decorative Canva animation. The redesign uses original project imagery and gallery media. Canva-specific decorative graphics are retained in the asset inventory rather than copied into the new layout. Original files remain alongside optimized derivatives.

The two personal projects have document-led covers because the source portfolio supplies descriptions and documents, rather than game screenshots. No replacement game artwork, portrait, projects, employment, education, statistics, or testimonials was invented.

## Linked materials

The three Google design documents were opened and inspected. Complete DOCX exports with embedded images are included as additional downloads. Text-only Markdown exports in `audit/document-text` are audit aids; they omit embedded images and are not offered as complete visitor downloads.

Both OneDrive documents were opened in the Word viewer and inspected. The Cut Rope download attempt did not complete through the browser, so the original OneDrive documents remain externally linked rather than being presented as local archival copies. Their content has not been paraphrased into the case studies.

The source Mini Games section includes a Spotify URL. Pizza IQ includes an extra Detective IQ store-search link. Those URLs are deliberately preserved; destinations have not been silently substituted. Store availability and third-party account or geographic restrictions are outside this rebuild.

## Validation

Production build, TypeScript check, ESLint, generated-HTML content/link comparison, and production dependency audit. Browser QA covers mobile navigation, category filters, gallery arrow keys/Escape/focus restoration, native gameplay playback, chart series toggles, and responsive layouts. Lighthouse scores have not been measured.
