/**
 * Validation Examples
 * 
 * This file demonstrates how to use the validation schemas and utilities
 * in different scenarios (API routes, components, etc.)
 */

import {
  contactFormSchema,
  admissionsFormSchema,
  scholarshipFormSchema,
  validateFormData,
  formatZodErrors,
  type ContactFormData,
} from './index'

// Example 1: Validating in an Astro API route
export async function handleContactForm(formData: FormData) {
  const result = validateFormData(contactFormSchema, formData)
  
  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
    }
  }
  
  // result.data is now typed as ContactFormData
  const data: ContactFormData = result.data
  
  // Process the form data (send email, save to database, etc.)
  // ...
  
  return {
    success: true,
    message: 'Form submitted successfully',
  }
}

// Example 2: Validating in a server-side component
export function validateContactInput(data: unknown) {
  const result = contactFormSchema.safeParse(data)
  
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    }
  }
  
  return {
    valid: true,
    data: result.data,
  }
}

// Example 3: Client-side validation (if using React/Vue)
export function validateOnClient(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const result = contactFormSchema.safeParse(data)
  
  if (!result.success) {
    // Return errors in a format suitable for client-side display
    return {
      isValid: false,
      fieldErrors: formatZodErrors(result.error),
    }
  }
  
  return {
    isValid: true,
    data: result.data,
  }
}

// Example 4: Partial validation (for multi-step forms)
export function validateStep1(data: Partial<ContactFormData>) {
  // Only validate name and email for step 1
  const step1Schema = contactFormSchema.pick({
    name: true,
    email: true,
  })
  
  return step1Schema.safeParse(data)
}

// Example 5: Custom validation with refinement
export function validateWithCustomRules(data: unknown) {
  const schema = contactFormSchema.refine(
    (data) => {
      // Custom validation logic
      if (data.email && data.email.includes('example.com')) {
        return false // Reject example.com emails
      }
      return true
    },
    {
      message: 'Please use a valid email address',
      path: ['email'],
    }
  )
  
  return schema.safeParse(data)
}

