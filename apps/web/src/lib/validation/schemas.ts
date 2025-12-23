import {z} from 'zod'

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject must be less than 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
  department: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Admissions Application Schema
export const admissionsFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  middleName: z.string().optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)'),
  gender: z.enum(['male', 'female', 'other']),
  nationality: z.string().min(2),
  
  // Contact Information
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.object({
    street: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    zipCode: z.string().min(4),
    country: z.string().min(2),
  }),
  
  // Academic Information
  department: z.string().min(1, 'Please select a department'),
  program: z.string().optional(),
  previousSchool: z.string().optional(),
  graduationYear: z.string().optional(),
  
  // Documents
  documents: z.array(z.string()).optional(),
  
  // Additional Information
  additionalInfo: z.string().max(1000).optional(),
})

export type AdmissionsFormData = z.infer<typeof admissionsFormSchema>

// Scholarship Application Schema
export const scholarshipFormSchema = z.object({
  scholarshipId: z.string().min(1, 'Please select a scholarship program'),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  department: z.string().min(1, 'Please select a department'),
  program: z.string().optional(),
  gpa: z.string().regex(/^\d+\.?\d*$/, 'Please enter a valid GPA'),
  income: z.string().optional(),
  reason: z.string().min(50, 'Please provide a reason (at least 50 characters)').max(1000),
  documents: z.array(z.string()).optional(),
})

export type ScholarshipFormData = z.infer<typeof scholarshipFormSchema>

// Job Application Schema
export const jobApplicationSchema = z.object({
  jobId: z.string().min(1, 'Please select a job position'),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  coverLetter: z.string().min(100, 'Cover letter must be at least 100 characters').max(2000),
  resume: z.string().min(1, 'Please upload your resume'),
  portfolio: z.string().url().optional().or(z.literal('')),
  linkedIn: z.string().url().optional().or(z.literal('')),
  additionalInfo: z.string().max(1000).optional(),
})

export type JobApplicationData = z.infer<typeof jobApplicationSchema>

// Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2).optional(),
  interests: z.array(z.string()).optional(),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Event Registration Schema
export const eventRegistrationSchema = z.object({
  eventId: z.string().min(1),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  organization: z.string().optional(),
  numberOfAttendees: z.number().int().min(1).max(10).optional(),
  dietaryRequirements: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
})

export type EventRegistrationData = z.infer<typeof eventRegistrationSchema>

// Search Query Schema
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query cannot be empty').max(100),
  type: z.enum(['all', 'news', 'programs', 'events', 'departments']).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(50).optional(),
})

export type SearchData = z.infer<typeof searchSchema>

