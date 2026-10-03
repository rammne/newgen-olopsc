# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Headless monorepo for the OLOPSC (Our Lady of Peace School - College) official website. Content is managed in Sanity (`apps/studio`) and rendered by a static Astro site (`apps/web`). The two apps are decoupled: `web` only ever reads from Sanity's published dataset via GROQ queries, it never writes to it.

## Commands

All commands run from the repo root via Turborepo, which fans out to workspaces in `apps/*`.

```bash
npm run dev      # turbo run dev — runs Astro dev server (localhost:4321) and Sanity Studio (localhost:3333) together
npm run build    # turbo run build — builds web (Astro static output) and studio
npm run format   # prettier --write "**/*.{ts,tsx,md}" across the whole repo
```

Per-workspace commands (run inside `apps/web` or `apps/studio`, or via `npm run <script> -w web` / `-w studio`):

```bash
# apps/web
npm run dev              # astro dev
npm run build             # astro build (static output, output: 'static', build.format: 'file')
npm run preview           # astro preview
npm run sanity:typegen    # sanity typegen generate — regenerate types from schema/queries

# apps/studio
npm run dev       # sanity dev
npm run build      # sanity build
npm run deploy      # sanity deploy — publishes Studio to sanity.studio
npm run deploy-graphql
```

There is no test suite in this repo. `npm run lint` is wired at the root (turbo) but neither workspace currently defines a `lint` script — turbo will no-op for those workspaces.

### Sanity singleton bootstrap

`init-singletons.bat` (Windows) creates the singleton documents for the six college pages (computingStudies, tourismManagement, hospitalityManagement, businessAdmin, educationLiberalArts, psychology) via `sanity documents create --replace`. Run it once against a fresh dataset before those college pages will resolve any content.

## Architecture

### Two-app split

- **`apps/studio`** — Sanity Studio (schema + admin UI). `projectId: 6b5ln4gy`, `dataset: production` (see `sanity.config.ts`). Content authoring only; no frontend rendering happens here.
- **`apps/web`** — Astro site that fetches from Sanity at build time (`useCdn: true`, `apiVersion: 2024-01-01` in `src/lib/sanity/client.ts`) and produces a fully static build (`output: 'static'`, deployed as a Dockerized Nginx site via Coolify).

### Content model shape (`apps/studio/schemaTypes`)

- `singletons/` — one-off pages fetched by a fixed document ID (e.g. `homePage`, `aboutPage`, `admissionsPage`, `contactPage`, `scholarshipPage`, `jobsPage`, `alumniPage`, `sdgPage`, `settings`).
- `college/` — one singleton per college (`tourismManagement`, `hospitalityManagement`, `businessAdmin`, `educationLiberalArts`, `computingStudies`, `psychology`), each with a fixed document ID matching the type name.
- `documents/` — repeatable, listable content types (`news`, `event`, `sdg`, `academicDepartment`, `collegeProgram`, `admissionAnnouncement`).
- `objects/` — reusable field groups embedded into the above (`hero`, `seo`, `cta`, `stats`, `testimonial`, `timeline`, `gallery`, `facultyMember`, `contactInfo`, `portableText`, etc). These are not standalone documents.
- `structure.ts` defines the custom Studio desk structure (grouping singletons under "Pages", colleges under "Academic", etc.) — when adding a new singleton or document type, register it here too, and add its type name to the exclusion filter at the bottom (`S.documentTypeListItems().filter(...)`) so it doesn't also show up in the generic "All Documents" fallback list.

Singleton document IDs match their schema type name exactly (e.g. the `aboutPage` singleton always has `_id: "aboutPage"`) — queries and `structure.ts` both rely on this convention.

### Data flow in `apps/web`

- `src/lib/sanity/client.ts` — the single Sanity client instance (CDN-backed, read-only).
- `src/lib/sanity/queries.ts` — one `get*Page()` function per page/singleton, each a hand-written GROQ projection. There's no auto-generated query layer; when a schema field is added in Studio, the corresponding query in this file must be updated to project it, or it won't reach the page.
- `src/lib/utils/sanity.ts` — `getSanityImageUrl()` and related helpers for building Sanity CDN image URLs (wraps `@sanity/image-url`).
- `src/lib/utils/seoUtils.ts` — `buildCmsTitle()` centralizes `<title>` construction/truncation (60-char cap, ` | OLOPSC` suffix) from CMS `seo` data with a fallback.
- Pages under `src/pages/**/*.astro` call the relevant `get*Page()` at the top of the frontmatter, derive `pageTitle`/`pageDescription`/`ogImage`/`canonicalUrl` from the result's `seo` object (falling back to hardcoded defaults when a field is missing), and pass those into `src/layouts/Layout.astro` (which renders `SEOHead.astro`).
- `[slug].astro` routes (`news/[slug]`, `events/[slug]`, `sdg/[slug]`) resolve individual documents from the corresponding repeatable document type.
- `src/lib/validation/` — Zod schemas for the site's forms (`contactFormSchema`, `admissionsFormSchema`, `scholarshipFormSchema`, `jobApplicationSchema`, `newsletterSchema`, `eventRegistrationSchema`, `searchSchema`) plus shared `validate`/`validateFormData`/`formatZodErrors` helpers — used by Astro API routes/components handling form submissions.

### Styling & UI

Tailwind CSS v4 via `@tailwindcss/vite` (no separate `tailwind.config` — v4 is configured through `src/styles/global.css` and the Vite plugin). Components are organized by page section under `src/components/<section>/` (`homepage/`, `about/`, `admissions/`, `college/`, `departments/`, `contact/`, `scholarship/`, `sdg/`, `forms/`), plus `common/` for cross-page pieces (`SEOHead.astro`, `CtaButton.astro`, `LocationMap.astro`, scroll-reveal wrappers) and `layout/` for header/footer/nav. Most components are `.astro`; a few interactive/animated pieces (scroll reveal, using `framer-motion`) are `.tsx` React islands loaded via `@astrojs/react`.

### Path alias

`@` is aliased to `apps/web/src` (set in `astro.config.mjs`'s Vite `resolve.alias`, mirrored in `tsconfig.json`).

- Our main goal is to refactor and clean the codebase and file structure.
- One of the goal is to make sure that all contents are being uploaded via the sanity studio. there are multiple sections and web pages where the contents are hard coded and i want to fix that from being hard coded to using the sanity studio. you can always visit and check the sanity schema on the apps/studio/.
- Do not write a new comment when editing.
