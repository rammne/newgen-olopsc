# SANITY SETUP FINISHED, BUT NOT YET FINALIZED.

# New Gen Monorepo

This project is a Headless Hybrid Monorepo designed for the OLOPSC official website. It decouples content management from the presentation layer to ensure high performance, security, and scalability.

## Tech Stack
- ### Architecture: Monorepo (NPM Workspaces + TurboRepo)

 - ### Frontend (Web): AstroJS (SSG) + React (Islands) + TailwindCSS

- ### Content (CMS): Sanity.io (Headless CMS)

- ### Styling: Shadcn UI + TailwindCSS

- ### Deployment: Dockerized Static Site (Nginx) via Coolify

# Project Structure
## We use a Monorepo strategy to manage both the Website and the CMS in a single repository

```
/olopsc-monorepo
├── package.json          # Root "Headquarters" (Manages workspaces & scripts)
├── turbo.json            # Build pipeline configuration
├── apps/
│   ├── web/              # 🚀 The Astro Frontend (Static Site)
│   │   ├── src/pages     # File-based Routing (Maps 1:1 to URL)
│   │   ├── src/lib       # Sanity Client & Data Fetching logic
│   │   └── astro.config  # Astro Configuration
│   │
│   └── studio/           # 🧠 The Sanity CMS (Admin Dashboard)
│       ├── schemaTypes   # Content Models (Courses, News, Teachers)
│       └── sanity.config # CMS Configuration
```
- ### Shared Linting & Tooling: We install tools like prettier and turbo once at the root.

- ### Unified Dev Server: Running npm run dev starts both the Website (localhost:4321) and the CMS (localhost:3333) simultaneously.

- ### Atomic Deploys: Changes to Content Models and Frontend Components are committed together, preventing sync issues.
