import {z} from 'zod'
import type {SanityDocument} from '@sanity/client'

/**
 * Zod schema for validating Sanity document structure
 * This can be used to validate data fetched from Sanity
 */
export const sanityDocumentSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
})

/**
 * Validates that data from Sanity matches expected structure
 */
export function validateSanityDocument<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.SafeParseReturnType<unknown, z.output<T>> {
  // First validate it's a Sanity document
  const docValidation = sanityDocumentSchema.safeParse(data)
  if (!docValidation.success) {
    return {
      success: false,
      error: docValidation.error,
    } as z.SafeParseReturnType<unknown, z.output<T>>
  }
  
  // Then validate against the provided schema
  return schema.safeParse(data)
}

/**
 * Schema for SEO object from Sanity
 */
export const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  image: z
    .object({
      asset: z.object({
        _ref: z.string(),
        _type: z.literal('reference'),
      }),
    })
    .optional(),
  noindex: z.boolean().optional(),
  canonicalUrl: z.string().url().optional(),
})

/**
 * Schema for Hero object from Sanity
 */
export const heroSchema = z.object({
  variant: z.enum(['fullWidth', 'split', 'centered', 'video']).optional(),
  headline: z.string(),
  subheadline: z.string().optional(),
  backgroundImage: z
    .object({
      asset: z.object({
        _ref: z.string(),
        _type: z.literal('reference'),
      }),
    })
    .optional(),
  backgroundVideo: z.string().url().optional(),
  cta: z
    .object({
      text: z.string(),
      link: z.any(),
      style: z.string().optional(),
    })
    .optional(),
  secondaryCta: z
    .object({
      text: z.string(),
      link: z.any(),
      style: z.string().optional(),
    })
    .optional(),
})

/**
 * Schema for News Article from Sanity
 */
export const newsArticleSchema = sanityDocumentSchema.extend({
  _type: z.literal('news'),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  category: z.string().optional(),
  publishedAt: z.string(),
  featured: z.boolean().optional(),
  featuredImage: z.any(),
  excerpt: z.string().optional(),
  content: z.any(),
  author: z
    .object({
      name: z.string().optional(),
      image: z.any().optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
  seo: seoSchema.optional(),
})

/**
 * Schema for Academic Department from Sanity
 */
export const academicDepartmentSchema = sanityDocumentSchema.extend({
  _type: z.literal('academicDepartment'),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  departmentType: z.enum(['preschool', 'gradeSchool', 'juniorHigh', 'seniorHigh', 'college']),
  hero: heroSchema,
  seo: seoSchema.optional(),
})

/**
 * Schema for College Program from Sanity
 */
export const collegeProgramSchema = sanityDocumentSchema.extend({
  _type: z.literal('collegeProgram'),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  shortTitle: z.string().optional(),
  category: z.string().optional(),
  hero: heroSchema,
  overview: z.any(),
  duration: z.string().optional(),
  degree: z.string().optional(),
  seo: seoSchema.optional(),
})

