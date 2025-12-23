# Zod & Lucide Integration Guide

This guide explains how Zod validation and Lucide icons have been integrated into the project.

## Zod Validation

### Installation

Zod has been installed in the `apps/web` package:

```bash
npm install zod
```

### Structure

Validation schemas and utilities are located in `apps/web/src/lib/validation/`:

```
lib/validation/
├── schemas.ts      # Zod schemas for all forms
├── utils.ts        # Validation utility functions
├── index.ts        # Main exports
├── examples.ts     # Usage examples
└── README.md       # Detailed documentation
```

### Available Schemas

1. **Contact Form** (`contactFormSchema`)
   - Name, email, phone, subject, message
   - Used in contact page

2. **Admissions Form** (`admissionsFormSchema`)
   - Personal info, contact, academic info, documents
   - Used in admissions page

3. **Scholarship Form** (`scholarshipFormSchema`)
   - Scholarship selection, student info, GPA, reason
   - Used in scholarship page

4. **Job Application** (`jobApplicationSchema`)
   - Job selection, personal info, cover letter, resume
   - Used in jobs/careers page

5. **Newsletter** (`newsletterSchema`)
   - Email, name, interests
   - Used for newsletter subscriptions

6. **Event Registration** (`eventRegistrationSchema`)
   - Event selection, attendee info, special requests
   - Used for event registrations

7. **Search** (`searchSchema`)
   - Query, type, pagination
   - Used for search functionality

### Usage in Components

```astro
---
// In an Astro component or API route
import {contactFormSchema, validateFormData, formatZodErrors} from '@/lib/validation'

if (Astro.request.method === 'POST') {
  const formData = await Astro.request.formData()
  const result = validateFormData(contactFormSchema, formData)
  
  if (!result.success) {
    const errors = formatZodErrors(result.error)
    // Handle errors
  } else {
    // Use validated data
    const data = result.data
  }
}
---
```

### Usage in API Routes

```typescript
// apps/web/src/pages/api/contact.ts
import {contactFormSchema, validateFormData} from '@/lib/validation'

export async function POST({request}: {request: Request}) {
  const formData = await request.formData()
  const result = validateFormData(contactFormSchema, formData)
  
  if (!result.success) {
    return new Response(JSON.stringify({errors: result.error}), {
      status: 400,
    })
  }
  
  // Process validated data
  // ...
  
  return new Response(JSON.stringify({success: true}), {
    status: 200,
  })
}
```

## Lucide Icons

### Installation

Lucide Astro has been installed:

```bash
npm install lucide-astro
```

### Structure

Icon components are located in `apps/web/src/components/icons/`:

```
components/icons/
├── Icon.astro          # Dynamic icon component
├── IconButton.astro    # Icon button component
├── SocialIcons.astro   # Social media icons
├── IconWrapper.astro  # Documentation
├── index.ts           # Exports
└── README.md          # Detailed documentation
```

### Usage Methods

#### Method 1: Direct Import (Recommended)

```astro
---
import { User, Mail, Phone, ArrowRight } from 'lucide-astro'
---

<User size={24} />
<Mail size={24} color="#3b82f6" />
<Phone size={24} stroke-width={2} />
```

#### Method 2: Icon Component

```astro
---
import Icon from '@/components/icons/Icon.astro'
---

<Icon name="user" size={24} />
<Icon name="mail" size={24} color="#3b82f6" />
```

#### Method 3: IconButton Component

```astro
---
import IconButton from '@/components/icons/IconButton.astro'
---

<IconButton 
  name="search" 
  label="Search" 
  variant="primary"
/>
```

#### Method 4: Social Icons

```astro
---
import SocialIcons from '@/components/icons/SocialIcons.astro'

const links = [
  { platform: 'facebook', url: 'https://facebook.com/school' },
  { platform: 'twitter', url: 'https://twitter.com/school' },
]
---

<SocialIcons links={links} />
```

## Form Components

Pre-built form components with validation are available in `apps/web/src/components/forms/`:

- **ContactForm.astro** - Contact form with Zod validation
- **FormField.astro** - Reusable form field component

### Using Form Components

```astro
---
import ContactForm from '@/components/forms/ContactForm.astro'
---

<ContactForm action="/api/contact" method="POST" />
```

## Sanity Integration

Zod schemas for validating Sanity data are in `apps/web/src/lib/sanity/validation.ts`:

- `sanityDocumentSchema` - Base Sanity document
- `seoSchema` - SEO object validation
- `heroSchema` - Hero section validation
- `newsArticleSchema` - News article validation
- `academicDepartmentSchema` - Department validation
- `collegeProgramSchema` - Program validation

## Best Practices

### Validation

1. **Always validate on the server** - Client-side validation is for UX only
2. **Use type-safe schemas** - Leverage TypeScript inference from Zod
3. **Format errors consistently** - Use `formatZodErrors` utility
4. **Validate early** - Validate as soon as data enters your system

### Icons

1. **Use direct imports** when possible - Better tree-shaking
2. **Provide accessible labels** - Always include `aria-label` or `label` prop
3. **Consistent sizing** - Use a size scale (16, 20, 24, 32px)
4. **Semantic HTML** - Use `<button>` or `<a>` for interactive icons

## Examples

See `apps/web/src/lib/validation/examples.ts` for complete usage examples.

## Next Steps

1. Create API routes that use the validation schemas
2. Update existing forms to use the validation system
3. Replace any existing icons with Lucide icons
4. Add more validation schemas as needed
5. Create additional form components using the FormField component

