---
trigger: always_on
---

# Frontend Development Rules
## Technology Stack
- **AstroJS**: Use for static UI and page structure. Astro components should be the default choice for most UI elements.
- **ReactJS**: Only use React components when interactivity is required (state management, complex interactions, client-side logic).
- **TailwindCSS**: Primary styling framework. Use utility classes for all styling.
- **Lucide**: Use for all icons. Import icons from `lucide-react` or `lucide-astro` as appropriate.
- **ShadCN**: Use ShadCN components when needed for complex UI elements (forms, dialogs, dropdowns, etc.).
- **Framer Motion**: Use for animations and transitions. Import from `framer-motion` for React components.
- **Sanity CMS**: Content management system. All content structure must follow Sanity schema types defined in `apps/studio/schemaTypes/`.

## URL Routing & Page Structure (SEO Preservation)

### Required Static Pages
The following pages **MUST** be created as static `.astro` files in `apps/web/src/pages/` to preserve SEO from the original website:

**Main Pages:**
- `index.astro` → `/` (Homepage)
- `about.astro` → `/about`
- `admissions.astro` → `/admissions`
- `scholarship-programs.astro` → `/scholarship-programs`
- `contact.astro` → `/contact`
- `jobs-section.astro` → `/jobs-section`

**Academic Department Pages:**
- `preschool.astro` → `/preschool`
- `grade-school.astro` → `/grade-school`
- `junior-high-school.astro` → `/junior-high-school`
- `senior-high-school.astro` → `/senior-high-school`
- `college-department.astro` → `/college-department`

**College Program Pages:**
- `college-programs.astro` → `/college-programs` (main listing page)
- `computing-studies.astro` → `/computing-studies`
- `hospitality-management.astro` → `/hospitality-management`
- `tourism-management.astro` → `/tourism-management`
- `business-administration-and-entrepreneurship.astro` → `/business-administration-and-entrepreneurship`
- `education-and-liberal-arts.astro` → `/education-and-liberal-arts`
- `entrepreneurship.astro` → `/entrepreneurship`

### Routing Rules
1. **Static Pages**: All URLs listed above must be static pages (`.astro` files), NOT dynamic routes
2. **Dynamic Routes**: Only use dynamic routes (`[slug].astro`) for:
   - News articles: `/news/[slug]`
   - Events: `/event/[slug]`
   - Additional content types that are NOT in the required list above
3. **File Naming**: File names must match the URL path exactly (e.g., `grade-school.astro` for `/grade-school`)
4. **Case Sensitivity**: URLs are case-sensitive - use lowercase with hyphens
5. **No Redirects Needed**: Since we're using the exact same URLs, no redirects are needed for these pages

### Implementation Example
```astro
---
// apps/web/src/pages/preschool.astro
import Layout from '../layouts/Layout.astro'
import { getAcademicDepartmentBySlug } from '../lib/sanity/queries'

// Fetch data from Sanity using the department slug
const department = await getAcademicDepartmentBySlug('preschool')
const pageTitle = department?.seo?.title || 'Preschool'
---

<Layout title={pageTitle}>
  <!-- Page content -->
</Layout>
```
### Adding New Pages
When adding new pages that are NOT in the required list:
- Consider SEO impact
- Use descriptive, keyword-rich URLs
- Use hyphens for word separation
- Keep URLs short and readable
- Use lowercase URLs
- If the page might need dynamic content in the future, consider using a dynamic route pattern

## Sanity Schema Compliance

### Schema Structure Adherence
- **MUST** follow the exact structure and field names defined in Sanity schema types.
- Schema types are located in `apps/studio/schemaTypes/` directory.
- Reference schema files when building frontend components to ensure data structure alignment.

### Schema Types Overview
The Sanity schema includes:

**Objects (Reusable Components):**
- `hero` - Hero sections with multiple variants
- `cta` - Call-to-action buttons
- `feature` - Feature/highlight cards
- `testimonial` - Student/parent testimonials
- `stats` - Statistics/numbers display
- `section` - Flexible content sections
- `facultyMember` - Faculty/staff profiles
- `gallery` - Image galleries
- `portableText` - Rich text content
- `seo` - SEO metadata
- And more (see `apps/studio/SCHEMA_OVERVIEW.md`)

**Documents (Multiple Instances):**
- `academicDepartment` - Academic departments (Preschool, Grade School, JHS, SHS, College)
- `collegeProgram` - Individual college programs
- `news` - News articles
- `event` - Events

**Singletons (Single Instances):**
- `homePage`, `aboutPage`, `admissionsPage`, `scholarshipPage`, `contactPage`, `jobsPage`, `settings`

### Implementation Rules
1. **Field Names**: Use exact field names from Sanity schemas when querying and accessing data.
   - Example: If schema has `hero.title`, use `hero.title` in frontend, not `hero.heading` or `heroTitle`.

2. **Type Safety**: Ensure TypeScript types match Sanity schema types.
   - Generate or maintain type definitions that align with schema structures.
   - Use proper types for arrays, objects, references, and portable text.

3. **Component Mapping**: Create frontend components that directly map to Sanity schema objects.
   - `hero` schema → Hero component
   - `feature` schema → Feature card component
   - `testimonial` schema → Testimonial component
   - etc.

4. **Required Fields**: Respect required field validations from schemas.
   - Always check for required fields before rendering.
   - Handle optional fields gracefully with fallbacks.

5. **Portable Text**: Use proper portable text renderers for `portableText` fields.
   - Render rich text content with proper formatting, links, and embedded content.

6. **References**: Handle Sanity references correctly.
   - Resolve references when querying (use GROQ joins or separate queries).
   - Handle cases where referenced documents may not exist.

7. **Image Handling**: Use Sanity image URLs correctly.
   - Use Sanity's image CDN with proper transformations.
   - Include alt text from schema `alt` fields.
   - Use hotspot data when available for responsive images.

8. **Slug Usage**: Use slug fields for routing and URLs.
   - All document types with slugs should use them for page routes.
   - Format: `/department/[slug]`, `/news/[slug]`, etc.

### Query Best Practices
- Use GROQ queries that match the schema structure.
- Include all necessary fields in queries to avoid missing data.
- Use projections to fetch only needed data for performance.
- Handle null/undefined values from optional schema fields.

### Example: Academic Department Component
```astro
---
// Example: Following academicDepartment schema structure
import { getAcademicDepartment } from '@/lib/sanity/queries';

const { slug } = Astro.params;
const department = await getAcademicDepartment(slug);

// Use exact field names from schema:
// - department.title (not department.name)
// - department.hero (hero object)
// - department.keyFeatures (array of feature objects)
// - department.curriculum.title, department.curriculum.description
---

<section class="h-screen">
  <h1>{department.title}</h1>
  <!-- Render hero using department.hero schema structure -->
  <!-- Render features using department.keyFeatures array -->
</section>
```
## Pre-defined Styles (DO NOT REDEFINE)
The following are already defined in `global.css` and should be used directly:
- **Font Family**: 
  - Headings (h1, h2, h3): 'Playfair Display', serif
  - Body text (p, small): 'Inter', sans-serif
- **Font Sizes**: Use the CSS custom properties defined in global.css:
  - Hero headers: `text-hero-header-desktop` / `text-hero-header-mobile`
  - Section headers: `text-section-header-desktop` / `text-section-header-mobile`
  - Card titles: `text-card-title-desktop` / `text-card-title-mobile`
  - Main text: `text-main-desktop` / `text-main-mobile`
  - Small text: `text-small-desktop` / `text-small-mobile`
- **Button Components**: Use `.btn-primary` and `.btn-secondary` classes directly. Do not create custom button styles.

## Mobile-First Approach
- **ALWAYS** design and code for mobile first (375px width is the base mobile viewport).
- Use Tailwind's responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Mobile breakpoint: `375px` (base, no prefix)
- Above mobile: `> 375px` (use `sm:` prefix or higher)
- Test and verify mobile experience before adding desktop enhancements.

## Section Layout Rules

### Hero Section
- **MUST** always be `100vh` (full viewport height).
- Use `min-h-screen` or `h-screen` in Tailwind.
- Hero sections should be visually impactful and immediately communicate the school's value proposition.

### All Other Sections (Visual Tease Rule)
- **MUST** have `min-height: 60vh` (use `min-h-[60vh]` in Tailwind).
- This ensures content is always visible and encourages scrolling.

### Section Padding
Apply padding consistently across all sections (except Hero):

**Mobile (≤375px):**
- Horizontal padding: `px-5` (20px left/right)
- Vertical padding: `py-10` (40px top/bottom)

**Above Mobile (>375px):**
- Horizontal padding: `px-[60px]` or use custom spacing
- Vertical padding: `py-[100px]` or use custom spacing

**Example Pattern:**
```astro
<section class="min-h-[60vh] px-5 py-10 sm:px-[60px] sm:py-[100px]">
  <!-- Section content -->
</section>
```
## Design Principles

### Premium & Trustworthy Design
- Use clean, spacious layouts with generous white space.
- Maintain consistent visual hierarchy using the predefined typography scale.
- Ensure high contrast for readability (especially for parents and students).
- Use the brand colors from global.css:
  - Primary: `--color-primary` (#0a095f)
  - Accent: `--color-accent` (#ffa600)
  - Neutral: `--color-neutral` (#e4e4e4)

### Color Distribution (60-30-10 Rule)
- **MUST** follow the 60-30-10 color distribution rule for all designs:
  - **60% Neutral** (`--color-neutral` / #e4e4e4): Use for backgrounds, large areas, and base elements
  - **30% Primary** (`--color-primary` / #0a095f): Use for headings, key text, borders, and important UI elements
  - **10% Accent/CTA** (`--color-accent` / #ffa600): Use sparingly for call-to-action buttons, highlights, and emphasis
- This creates visual balance and guides user attention effectively.
- Apply this rule at the section level and page level for consistency.
- Neutral colors should dominate the visual space, primary color provides structure, and accent color draws attention to actions.

### School Website Context
- Prioritize clarity and ease of navigation.
- Make information easily accessible (academic programs, admissions, contact info).
- Use clear call-to-action buttons for important actions (apply, contact, learn more).
- Ensure the design feels professional and trustworthy to parents making important decisions.
- Use imagery and content that reflects the school's values and community.

### Modern UI/UX Standards
- Implement smooth, purposeful animations (use Framer Motion).
- Ensure touch targets are at least 44x44px on mobile.
- Use consistent spacing and alignment.
- Implement proper focus states for accessibility.
- Ensure color contrast meets WCAG AA standards minimum.
- Use progressive disclosure for complex information.

## Component Guidelines

### Astro Components
- Use for static content, layouts, and server-rendered UI.
- Keep Astro components simple and focused on presentation.
- Use Astro's `<slot />` for composition.
### React Components
- Use only when needed for:
  - Interactive forms
  - State management
  - Client-side interactions
  - Dynamic content updates
- Mark React components with `client:load` or appropriate hydration strategy.
- Keep React components lightweight and focused.
### Icons (Lucide)
- Always use Lucide icons for consistency.
- Import from `lucide-react` for React components or `lucide-astro` for Astro.
- Use appropriate icon sizes: `size={16}`, `size={20}`, `size={24}`, etc.
- Ensure icons have proper color contrast.
### ShadCN Components
- Use ShadCN for complex UI patterns:
  - Forms and form con