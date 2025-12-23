import {z} from 'zod'
import type {SafeParseReturnType} from 'zod'

/**
 * Validates data against a Zod schema
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with success flag and data/errors
 */
export function validate<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): SafeParseReturnType<z.input<T>, z.output<T>> {
  return schema.safeParse(data)
}

/**
 * Validates data and throws if invalid (for use in server-side code)
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validated data
 * @throws ZodError if validation fails
 */
export function validateOrThrow<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.output<T> {
  return schema.parse(data)
}

/**
 * Formats Zod errors into a user-friendly format
 * @param errors - Zod error object
 * @returns Object with field names as keys and error messages as values
 */
export function formatZodErrors(errors: z.ZodError): Record<string, string> {
  const formatted: Record<string, string> = {}
  
  errors.errors.forEach((error) => {
    const path = error.path.join('.')
    formatted[path] = error.message
  })
  
  return formatted
}

/**
 * Gets the first error message for a field
 * @param errors - Zod error object
 * @param fieldPath - Path to the field (e.g., 'email' or 'address.street')
 * @returns First error message or undefined
 */
export function getFieldError(
  errors: z.ZodError,
  fieldPath: string
): string | undefined {
  const error = errors.errors.find((err) => err.path.join('.') === fieldPath)
  return error?.message
}

/**
 * Validates form data from FormData object
 * @param schema - Zod schema to validate against
 * @param formData - FormData object
 * @returns Validation result
 */
export function validateFormData<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData
): SafeParseReturnType<z.input<T>, z.output<T>> {
  const data: Record<string, unknown> = {}
  
  // Convert FormData to object
  for (const [key, value] of formData.entries()) {
    // Handle array fields (e.g., interests[] or documents[])
    if (key.endsWith('[]')) {
      const arrayKey = key.slice(0, -2)
      if (!data[arrayKey]) {
        data[arrayKey] = []
      }
      ;(data[arrayKey] as string[]).push(value.toString())
    } else {
      data[key] = value
    }
  }
  
  return schema.safeParse(data)
}

