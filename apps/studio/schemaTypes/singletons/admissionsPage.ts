import {defineField, defineType} from 'sanity'

export const admissionsPage = defineType({
  name: 'admissionsPage',
  title: 'Admissions Page',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Admissions',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'portableText',
        }),
      ],
    }),
    defineField({
      name: 'admissionProcess',
      title: 'Admission Process',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'stepNumber',
                  title: 'Step Number',
                  type: 'number',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Step Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'requirements',
      title: 'General Requirements',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'portableText',
        }),
        defineField({
          name: 'requirementsList',
          title: 'Requirements List',
          type: 'array',
          of: [{type: 'string'}],
        }),
      ],
    }),
    defineField({
      name: 'departmentRequirements',
      title: 'Department-Specific Requirements',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'departments',
          title: 'Departments',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'department',
                  title: 'Department',
                  type: 'reference',
                  to: [{type: 'academicDepartment'}],
                }),
                defineField({
                  name: 'requirements',
                  title: 'Requirements',
                  type: 'array',
                  of: [{type: 'string'}],
                }),
                defineField({
                  name: 'additionalInfo',
                  title: 'Additional Information',
                  type: 'portableText',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'importantDates',
      title: 'Important Dates & Deadlines',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'dates',
          title: 'Important Dates',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Event Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'date',
                  title: 'Date',
                  type: 'date',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'tuitionFees',
      title: 'Tuition & Fees',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'portableText',
        }),
        defineField({
          name: 'feeStructure',
          title: 'Fee Structure',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'category',
                  title: 'Category',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'amount',
                  title: 'Amount',
                  type: 'string',
                  description: 'e.g., "₱50,000", "Contact for details"',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'cta',
          description: 'Link to scholarship programs or contact',
        }),
      ],
    }),
    defineField({
      name: 'applicationForm',
      title: 'Application Form',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'portableText',
        }),
        defineField({
          name: 'formFields',
          title: 'Form Fields',
          type: 'array',
          of: [{type: 'formField'}],
        }),
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Submit Application',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'questions',
          title: 'Questions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'portableText',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{type: 'testimonial'}],
      description: 'Testimonials from current students or parents',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Admissions Contact Information',
      type: 'contactInfo',
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-Action',
      type: 'cta',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Admissions Page',
      }
    },
  },
})

