# Validation System

This directory contains Zod schemas and validation utilities for the application.

## Usage

### Form Validation

```typescript
import {contactFormSchema, validateFormData} from '@/lib/validation'
import type {ContactFormData} from '@/lib/validation'

// In an Astro API route or component
const formData = await Astro.request.formData()
const result = validateFormData(contactFormSchema, formData)

if (!result.success) {
  // Handle validation errors
  const errors = formatZodErrors(result.error)
} else {
  // Use validated data
  const data: ContactFormData = result.data
}
```

### Available Schemas

- `contactFormSchema` - Contact form validation
- `admissionsFormSchema` - Admissions application
- `scholarshipFormSchema` - Scholarship application
- `jobApplicationSchema` - Job application
- `newsletterSchema` - Newsletter subscription
- `eventRegistrationSchema` - Event registration
- `searchSchema` - Search query validation

### Utilities

- `validate(schema, data)` - Safe validation (returns result object)
- `validateOrThrow(schema, data)` - Throws on validation failure
- `formatZodErrors(errors)` - Format errors for display
- `getFieldError(errors, fieldPath)` - Get error for specific field
- `validateFormData(schema, formData)` - Validate FormData objects

## Adding New Schemas

1. Define your Zod schema in `schemas.ts`
2. Export the schema and its TypeScript type
3. Use the validation utilities in your components/API routes

Example:

```typescript
// schemas.ts
export const myFormSchema = z.object({
  field1: z.string().min(1),
  field2: z.number().int().positive(),
})

export type MyFormData = z.infer<typeof myFormSchema>
```

