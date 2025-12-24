# Sanity Schema Overview

This document provides an overview of the scalable and maintainable schema structure for the OLOPSC school website.

## Schema Architecture

The schema is organized into three main categories:

### 1. **Objects** (Reusable Components)
Reusable content blocks that can be used across multiple document types:

- **`seo`** - SEO metadata (title, description, keywords, OG image)
- **`hero`** - Hero sections with multiple variants (full width, split, centered, video)
- **`cta`** - Call-to-action buttons with flexible linking
- **`feature`** - Feature/highlight cards with icons and images
- **`testimonial`** - Student/parent testimonials with ratings
- **`stats`** - Statistics/numbers display
- **`imageWithCaption`** - Images with captions and alt text
- **`videoEmbed`** - Video embeds (YouTube, Vimeo, direct)
- **`section`** - Flexible content sections for storytelling
- **`storyBlock`** - Visual storytelling blocks for modern, image/video-heavy pages
  - Supports images, videos, image grids, split layouts
  - Designed for minimal text, maximum visual impact
  - Perfect for Home Page, Academic Departments, and College Programs
- **`facultyMember`** - Faculty/staff member profiles
- **`timeline`** - Timeline/milestone entries
- **`gallery`** - Image galleries with multiple layouts
- **`contactInfo`** - Contact information blocks
- **`formField`** - Form field definitions
- **`socialLink`** - Social media links
- **`portableText`** - Rich text editor with images and videos

### 2. **Documents** (Multiple Instances)

#### Academic Content
- **`academicDepartment`** - Academic departments (Preschool, Grade School, JHS, SHS, College)
  - Shared structure across all departments
  - Hero, brief intro, visual story blocks, curriculum, programs, faculty, testimonials, stats
  - **Visual-first approach**: Uses Story Blocks for visual storytelling with minimal text
  - Text fields limited to 200-300 characters to encourage concise content
  - SEO optimized

- **`collegeProgram`** - Individual college programs
  - Brief program overview, visual story blocks, curriculum, career opportunities
  - Admission requirements, faculty, testimonials
  - **Visual-first approach**: Uses Story Blocks for visual storytelling with minimal text
  - Text fields limited to 200-300 characters to encourage concise content
  - SEO optimized

#### Content
- **`news`** - News articles
  - Categories, featured articles, tags
  - Author information, related articles
  - SEO optimized

- **`event`** - Events
  - Dates, locations, registration info
  - Categories, galleries
  - SEO optimized

### 3. **Singletons** (Single Instance Pages)

- **`homePage`** - Homepage
  - Story-driven structure following AIDA framework
  - Hero, brief intro, visual story blocks, stats, departments preview, programs preview
  - Testimonials, latest news, upcoming events
  - Final CTA section
  - **Visual-first approach**: Uses Story Blocks for visual storytelling with minimal text

- **`aboutPage`** - About page
  - Mission, vision, values
  - History with timeline
  - Leadership team, accreditations
  - Stats and testimonials

- **`admissionsPage`** - Admissions page
  - Admission process steps
  - Requirements (general and department-specific)
  - Important dates, tuition & fees
  - Application form, FAQ

- **`scholarshipPage`** - Scholarship programs page
  - Multiple scholarship programs
  - Eligibility, coverage, application process
  - FAQ, testimonials, stats

- **`contactPage`** - Contact page
  - Contact information
  - Department contacts
  - Contact form
  - Map, office hours, social media

- **`jobsPage`** - Careers/jobs page
  - Job openings
  - Application process
  - Employee testimonials
  - HR contact information

- **`settings`** - Global site settings
  - Site title, logo, favicon
  - Navigation menu structure
  - Footer configuration
  - Default SEO, analytics

## Content Structure Philosophy

### Visual-First Storytelling (Modern School Website Standard)
The schema follows a **visual-first, story-driven approach** for key pages:
- **Home Page**: Visual story blocks with images/videos, minimal text
- **Academic Departments**: Visual storytelling showcasing departments through photos and videos
- **College Programs**: Visual program showcases with brief descriptions
- **Less Words, More Visuals**: Text fields are limited (200-300 chars) to encourage concise, impactful content
- **Story Blocks**: Flexible visual components (image grids, videos, split layouts) for modern presentation

### Text-Heavy Pages (Informational)
Some pages remain text-heavy for detailed information:
- **About Page**: Detailed mission, vision, history, values
- **Admissions Page**: Comprehensive admission process and requirements
- **Scholarship Page**: Detailed scholarship information and eligibility

### Story-Driven Content
The schema follows a story-driven approach, especially for:
- **Homepage**: Uses AIDA framework (Attention → Interest → Desire → Action) with visual story blocks
- **About Page**: Tells the school's story through mission, vision, history
- **Academic Departments**: Each department tells its unique story through visual blocks

### SEO Optimization
Every page and document includes:
- Comprehensive SEO fields (title, description, keywords, OG image)
- Canonical URLs
- No-index options
- Alt text for images
- Structured content for better indexing

### Scalability
- **Reusable objects** reduce duplication
- **Flexible sections** allow content editors to build custom layouts
- **Modular structure** makes it easy to add new content types
- **Type-safe** with TypeScript

### Maintainability
- **Clear organization** with objects, documents, and singletons
- **Consistent patterns** across similar content types
- **Well-documented** fields with descriptions
- **Validation rules** ensure data quality

## Usage Examples

### Creating an Academic Department
1. Navigate to **Academic → Academic Departments**
2. Create new document
3. Fill in:
   - Title and slug
   - Department type (Preschool, Grade School, etc.)
   - Hero section (visual-first)
   - Brief introduction (2-3 sentences max)
   - Brief overview (2-3 sentences max)
   - **Visual Story Blocks** - Add multiple story blocks with images/videos
     - Use image grids, videos, split layouts
     - Keep captions short (2-3 sentences)
   - Key features
   - Curriculum information (with image)
   - Programs/offerings
   - Faculty members
   - Testimonials
   - Statistics
   - SEO information

**Tip**: Focus on visual story blocks rather than long text descriptions!

### Creating a News Article
1. Navigate to **News & Events → News Articles**
2. Create new document
3. Fill in:
   - Title and slug
   - Category
   - Published date
   - Featured image
   - Excerpt
   - Content (rich text)
   - Author information
   - Tags
   - SEO information

### Editing Homepage
1. Navigate to **Pages → Home Page**
2. Edit the singleton document
3. Configure:
   - Hero section (visual-first)
   - Brief introduction (keep it short!)
   - **Visual Story Blocks** - Add multiple story blocks
     - Mix images, videos, image grids
     - Use split layouts for image + brief text
     - Keep all text concise (headlines max 100 chars, captions max 300 chars)
   - Key statistics
   - Academic departments preview
   - Programs preview
   - Testimonials
   - Latest news section
   - Final CTA

**Tip**: Think Instagram/TikTok style - visual storytelling with minimal text!

## Best Practices

### Visual-First Pages (Home, Academic Departments, College Programs)
1. **Use Story Blocks liberally** - Build visual narratives with images and videos
2. **Keep text minimal** - Headlines max 100 chars, captions max 300 chars
3. **Mix visual content** - Combine single images, image grids, videos, split layouts
4. **Tell a visual story** - Each story block should advance the narrative
5. **Use high-quality images** - Visuals are the primary content
6. **Add videos** - Showcase school life, facilities, student experiences

### General Best Practices
1. **Always fill SEO fields** - Every page should have SEO metadata
2. **Use consistent hero patterns** - Maintain visual consistency
3. **Add alt text to images** - Important for accessibility and SEO
4. **Use testimonials strategically** - Build trust and credibility
5. **Keep content fresh** - Regularly update news and events
6. **Optimize images** - Use appropriate image sizes
7. **Test CTAs** - Ensure call-to-action buttons link correctly

## Frontend Integration

The schema is designed to work seamlessly with the Astro frontend:

- **Slugs** are used for URL generation
- **Rich text** (portableText) can be rendered with custom components
- **Images** include all necessary metadata
- **SEO** fields map directly to meta tags
- **Structured data** supports JSON-LD for better SEO

## Next Steps

1. Start by configuring **Settings** singleton
2. Create **Home Page** content
3. Add **Academic Departments**
4. Create **College Programs**
5. Add **News Articles** and **Events**
6. Configure other singleton pages as needed

