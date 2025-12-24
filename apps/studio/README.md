# Sanity Content Studio - Content Guide

This guide helps content administrators understand what content fields need to be filled for each page type in the Sanity CMS.

## Table of Contents

- [Singleton Pages](#singleton-pages)
  - [Home Page](#home-page)
  - [About Page](#about-page)
  - [Admissions Page](#admissions-page)
  - [Contact Page](#contact-page)
  - [Scholarship Programs Page](#scholarship-programs-page)
  - [Jobs/Careers Page](#jobscareers-page)
  - [Site Settings](#site-settings)
- [Document Types](#document-types)
  - [Academic Department](#academic-department)
  - [College Program](#college-program)
  - [News Article](#news-article)
  - [Event](#event)

---

## Singleton Pages

### Home Page

**Location:** Pages → Home Page

**Content Fields:**

1. **Hero Section** (Required)
   - Main hero section - first impression (ATTENTION)
   - Uses `hero` object type

2. **Introduction Section** (INTEREST)
   - Headline
   - Subheadline
   - Content (rich text)
   - Featured Image
   - Video (optional)

3. **Key Statistics**
   - Array of statistics (max 6)
   - Showcase impressive numbers (CREDIBILITY)
   - Uses `stats` object type

4. **Academic Departments Preview** (DESIRE)
   - Section Title
   - Subtitle
   - Featured Departments (references to Academic Departments)

5. **Programs Preview**
   - Section Title
   - Subtitle
   - Featured Programs (references to College Programs)
   - Call-to-Action button

6. **Testimonials Section** (CREDIBILITY)
   - Section Title
   - Testimonials (array of `testimonial` objects)

7. **Key Features/Highlights**
   - Array of feature cards
   - Uses `feature` object type

8. **Latest News Section**
   - Section Title
   - Number of Articles (1-6, default: 3)
   - View All News CTA button

9. **Upcoming Events Section**
   - Section Title
   - Number of Events (1-6, default: 3)
   - View All Events CTA button

10. **Final Call-to-Action** (ACTION)
    - Headline
    - Subheadline
    - Primary CTA button
    - Secondary CTA button
    - Background Image

11. **Additional Content Sections**
    - Flexible sections for storytelling
    - Uses `section` object type

12. **SEO**
    - SEO metadata (title, description, keywords, OG image)
    - Uses `seo` object type

---

### About Page

**Location:** Pages → About Page

**Content Fields:**

1. **Hero Section** (Required)
   - Uses `hero` object type

2. **Mission Section**
   - Section Title
   - Mission Statement (rich text)
   - Image

3. **Vision Section**
   - Section Title
   - Vision Statement (rich text)
   - Image

4. **Core Values**
   - Section Title
   - Values (array):
     - Value Title (required)
     - Description
     - Icon

5. **History Section**
   - Section Title
   - History Content (rich text)
   - Timeline/Milestones (array of `timeline` objects)
   - Historical Gallery (uses `gallery` object)

6. **Leadership Team**
   - Section Title
   - Leadership Members (array of `facultyMember` objects)

7. **Key Statistics**
   - Array of statistics
   - Showcase school achievements and numbers
   - Uses `stats` object type

8. **Testimonials**
   - Array of testimonials
   - Uses `testimonial` object type

9. **Accreditations & Recognitions**
   - Section Title
   - Accreditations (array):
     - Name (required)
     - Logo
     - Description

10. **Additional Content Sections**
    - Flexible sections for storytelling
    - Uses `section` object type

11. **Call-to-Action**
    - CTA to encourage engagement (e.g., schedule a visit)
    - Uses `cta` object type

12. **SEO**
    - SEO metadata
    - Uses `seo` object type

---

### Admissions Page

**Location:** Pages → Admissions Page

**Content Fields:**

1. **Hero Section** (Required)
   - Uses `hero` object type

2. **Introduction**
   - Headline
   - Content (rich text)

3. **Admission Process**
   - Section Title
   - Process Steps (array):
     - Step Number (required)
     - Step Title (required)
     - Description
     - Icon

4. **General Requirements**
   - Section Title
   - Content (rich text)
   - Requirements List (array of strings)

5. **Department-Specific Requirements**
   - Section Title
   - Departments (array):
     - Department (reference to Academic Department)
     - Requirements (array of strings)
     - Additional Information (rich text)

6. **Important Dates & Deadlines**
   - Section Title
   - Important Dates (array):
     - Event Label (required)
     - Date (required)
     - Description

7. **Tuition & Fees**
   - Section Title
   - Content (rich text)
   - Fee Structure (array):
     - Category (required)
     - Amount (e.g., "₱50,000", "Contact for details")
     - Description
   - CTA (link to scholarship programs or contact)

8. **Application Form**
   - Section Title
   - Description (rich text)
   - Form Fields (array of `formField` objects)
   - Submit Button Text (default: "Submit Application")
   - Success Message

9. **Frequently Asked Questions**
   - Section Title
   - Questions (array):
     - Question (required)
     - Answer (required, rich text)

10. **Testimonials**
    - Array of testimonials from current students or parents
    - Uses `testimonial` object type

11. **Admissions Contact Information**
    - Uses `contactInfo` object type

12. **Call-to-Action**
    - Uses `cta` object type

13. **SEO**
    - SEO metadata
    - Uses `seo` object type

---

### Contact Page

**Location:** Pages → Contact Page

**Content Fields:**

1. **Hero Section** (Required)
   - Uses `hero` object type

2. **Introduction**
   - Headline
   - Content (rich text)

3. **Main Contact Information** (Required)
   - Uses `contactInfo` object type

4. **Department Contacts**
   - Array of department contacts:
     - Department (required)
     - Contact Information (uses `contactInfo` object)

5. **Contact Form**
   - Form Title
   - Description (rich text)
   - Form Fields (array of `formField` objects)
   - Submit Button Text (default: "Send Message")
   - Success Message

6. **Social Media Links**
   - Section Title
   - Social Links (array of `socialLink` objects)

7. **Map Section**
   - Section Title
   - Map Embed URL (Google Maps embed URL)
   - Map Image (Fallback)

8. **Office Hours**
   - Section Title
   - Hours (array):
     - Day (Monday-Sunday)
     - Hours (e.g., "8:00 AM - 5:00 PM")
     - Closed (boolean)

9. **SEO**
    - SEO metadata
    - Uses `seo` object type

---

### Scholarship Programs Page

**Location:** Pages → Scholarship Programs Page

**Content Fields:**

1. **Hero Section** (Required)
   - Uses `hero` object type

2. **Introduction**
   - Headline
   - Content (rich text)

3. **Scholarship Programs**
   - Array of scholarship programs:
     - Scholarship Name (required)
     - Scholarship Type (Academic Excellence, Athletic, Arts & Culture, Financial Need, Merit-Based, Community Service, Alumni, Other)
     - Description (required, rich text)
     - Coverage:
       - Percentage Coverage (e.g., "100%", "50%", "Full Tuition")
       - Amount (e.g., "₱50,000 per semester")
       - Details
     - Eligibility Requirements:
       - Requirements (array of strings)
       - Minimum GPA
       - Income Requirements
     - Application Process (rich text)
     - Application Deadline (date)
     - Required Documents (array of strings)
     - Contact Information:
       - Contact Person
       - Email
       - Phone
     - Image

4. **Scholarship Application Form**
   - Section Title
   - Description (rich text)
   - Form Fields (array of `formField` objects)

5. **Frequently Asked Questions**
   - Section Title
   - Questions (array):
     - Question (required)
     - Answer (required, rich text)

6. **Scholarship Recipient Testimonials**
   - Array of testimonials
   - Uses `testimonial` object type

7. **Scholarship Statistics**
   - Array of statistics
   - e.g., number of scholarships awarded, total amount
   - Uses `stats` object type

8. **Call-to-Action**
   - Uses `cta` object type

9. **SEO**
    - SEO metadata
    - Uses `seo` object type

---

### Jobs/Careers Page

**Location:** Pages → Jobs/Careers Page

**Content Fields:**

1. **Hero Section** (Required)
   - Uses `hero` object type

2. **Introduction**
   - Headline
   - Content (rich text)

3. **Why Work Here Section**
   - Section Title
   - Content (rich text)
   - Benefits (array of `feature` objects)

4. **Job Openings**
   - Array of job openings:
     - Job Title (required)
     - Department
     - Employment Type (Full-time, Part-time, Contract, Internship)
     - Location
     - Job Description (required, rich text)
     - Requirements (array of strings)
     - Key Responsibilities (array of strings)
     - Qualifications (array of strings)
     - Posted Date (defaults to current date)
     - Application Deadline (date)
     - Application Email
     - Application Link (URL)
     - Active (boolean - is this position currently open?)

5. **Application Process**
   - Section Title
   - Process Steps (array):
     - Step Number (required)
     - Step Title (required)
     - Description

6. **Employee Testimonials**
   - Array of testimonials
   - Uses `testimonial` object type

7. **HR Contact Information**
   - Uses `contactInfo` object type

8. **Call-to-Action**
   - Uses `cta` object type

9. **SEO**
    - SEO metadata
    - Uses `seo` object type

---

### Site Settings

**Location:** Pages → Site Settings

**Content Fields:**

1. **Site Title** (Required)
   - Main site title

2. **Tagline**
   - Short tagline or slogan

3. **Logo**
   - Main logo image

4. **Logo (Dark Mode)**
   - Logo for dark mode

5. **Favicon**
   - Site favicon image

6. **Global Contact Information**
   - Uses `contactInfo` object type

7. **Social Media Links**
   - Array of social media links
   - Uses `socialLink` object type

8. **School Address**
   - Street Address
   - City
   - State/Province
   - ZIP/Postal Code
   - Country

9. **Navigation**
   - Main Menu Items (array):
     - Label (required)
     - Link:
       - Link Type (Internal Page, External URL, Anchor)
       - Internal Page (reference) - if internal
       - External URL - if external
       - Anchor ID - if anchor
     - Submenu Items (optional array):
       - Label (required)
       - Link (Internal Page or External URL)

10. **Footer**
    - Copyright Text
    - Footer Columns (array):
      - Column Title
      - Links (array):
        - Label
        - URL

11. **Default SEO**
    - Default SEO settings for the site
    - Uses `seo` object type

12. **Analytics**
    - Google Analytics ID
    - Google Tag Manager ID
    - Facebook Pixel ID

---

## Document Types

### Academic Department

**Location:** Academic → Academic Departments

**Content Fields:**

1. **Department Title** (Required)
   - e.g., "Preschool", "Grade School", "College Department"

2. **Slug** (Required)
   - URL-friendly identifier (auto-generated from title)

3. **Department Type** (Required)
   - Preschool
   - Grade School
   - Junior High School
   - Senior High School
   - College Department

4. **Hero Section** (Required)
   - Uses `hero` object type

5. **Introduction Section**
   - Headline
   - Content (rich text)
   - Featured Image

6. **Overview**
   - Main content describing the department (rich text)

7. **Key Features/Highlights**
   - Array of feature cards
   - What makes this department special
   - Uses `feature` object type

8. **Curriculum Section**
   - Section Title
   - Description (rich text)
   - Curriculum Highlights (array of strings)

9. **Programs/Offerings**
   - Array of programs:
     - Program Title (required)
     - Description
     - Link to Program Page (reference to College Program)

10. **Featured Faculty**
    - Array of faculty members
    - Uses `facultyMember` object type

11. **Testimonials**
    - Array of testimonials
    - Uses `testimonial` object type

12. **Statistics**
    - Array of statistics
    - Key statistics about this department
    - Uses `stats` object type

13. **Photo Gallery**
    - Uses `gallery` object type

14. **Admission Information**
    - Section Title
    - Content (rich text)
    - Requirements (array of strings)
    - Call-to-Action button

15. **Additional Content Sections**
    - Flexible sections for storytelling
    - Uses `section` object type

16. **SEO**
    - SEO metadata
    - Uses `seo` object type

---

### College Program

**Location:** Academic → College Programs

**Content Fields:**

1. **Program Title** (Required)
   - e.g., "Bachelor of Science in Computer Science"

2. **Slug** (Required)
   - URL-friendly identifier (auto-generated from title)

3. **Short Title/Abbreviation**
   - e.g., "BSCS", "BSIT"

4. **Program Category**
   - Engineering
   - Business
   - Education
   - Arts & Sciences
   - Health Sciences
   - Technology
   - Other

5. **Hero Section** (Required)
   - Uses `hero` object type

6. **Program Overview** (Required)
   - Main description of the program (rich text)

7. **Duration**
   - e.g., "4 years", "2 years"

8. **Degree Awarded**
   - e.g., "Bachelor of Science", "Associate Degree"

9. **Career Opportunities**
   - Section Title
   - Description (rich text)
   - Career Paths (array of strings)

10. **Curriculum**
    - Description (rich text)
    - Key Courses (array):
      - Year Level (1st Year, 2nd Year, 3rd Year, 4th Year)
      - Courses (array of strings)

11. **Admission Requirements**
    - Section Title
    - Requirements (array of strings)
    - Additional Information (rich text)

12. **Program Faculty**
    - Array of faculty members
    - Uses `facultyMember` object type

13. **Student/Alumni Testimonials**
    - Array of testimonials
    - Uses `testimonial` object type

14. **Program Features**
    - Array of feature cards
    - Uses `feature` object type

15. **Program Gallery**
    - Uses `gallery` object type

16. **Additional Content Sections**
    - Flexible sections for storytelling
    - Uses `section` object type

17. **Call-to-Action**
    - CTA for applying or learning more
    - Uses `cta` object type

18. **SEO**
    - SEO metadata
    - Uses `seo` object type

---

### News Article

**Location:** News & Events → News Articles

**Content Fields:**

1. **Title** (Required)
   - Article title

2. **Slug** (Required)
   - URL-friendly identifier (auto-generated from title)

3. **Category**
   - Announcements
   - Events
   - Achievements
   - News
   - Updates

4. **Published At** (Required)
   - Publication date and time (defaults to current date/time)

5. **Featured Article**
   - Boolean - Show this article prominently

6. **Featured Image** (Required)
   - Main article image

7. **Excerpt**
   - Short summary for previews (150-200 characters recommended)

8. **Content** (Required)
   - Main article content (rich text)

9. **Author**
   - Name
   - Photo

10. **Tags**
    - Array of tags (strings)

11. **Related Articles**
    - Array of references to other news articles

12. **Image Gallery**
    - Uses `gallery` object type

13. **SEO**
    - SEO metadata
    - Uses `seo` object type

---

### Event

**Location:** News & Events → Events

**Content Fields:**

1. **Event Title** (Required)
   - Name of the event

2. **Slug** (Required)
   - URL-friendly identifier (auto-generated from title)

3. **Category**
   - Academic
   - Sports
   - Cultural
   - Community Service
   - Workshop
   - Seminar
   - Other

4. **Start Date & Time** (Required)
   - When the event starts

5. **End Date & Time**
   - When the event ends

6. **Location**
   - Venue
   - Address
   - Online Event (boolean)
   - Online Event Link (if online)

7. **Featured Image**
   - Main event image

8. **Excerpt**
   - Short summary

9. **Description** (Required)
   - Main event description (rich text)

10. **Registration Information**
    - Registration Required (boolean)
    - Registration Deadline (date/time)
    - Registration Link (URL)
    - Contact for Registration

11. **Event Gallery**
    - Uses `gallery` object type

12. **SEO**
    - SEO metadata
    - Uses `seo` object type

---

## Reusable Object Types

These object types are used across multiple pages:

- **`hero`** - Hero sections with multiple variants
- **`cta`** - Call-to-action buttons
- **`feature`** - Feature/highlight cards
- **`testimonial`** - Student/parent testimonials
- **`stats`** - Statistics/numbers display
- **`facultyMember`** - Faculty/staff profiles
- **`gallery`** - Image galleries
- **`section`** - Flexible content sections
- **`contactInfo`** - Contact information blocks
- **`formField`** - Form field definitions
- **`socialLink`** - Social media links
- **`timeline`** - Timeline/milestone entries
- **`portableText`** - Rich text editor
- **`seo`** - SEO metadata

---

## Getting Started

1. **Start with Site Settings** - Configure global site information first
2. **Create Home Page** - Set up the main landing page
3. **Add Academic Departments** - Create department pages
4. **Create College Programs** - Add individual programs
5. **Add News Articles and Events** - Keep content fresh
6. **Configure Other Pages** - Complete About, Admissions, Contact, Scholarship, and Jobs pages

For detailed information about the schema structure, see [SCHEMA_OVERVIEW.md](./SCHEMA_OVERVIEW.md).
