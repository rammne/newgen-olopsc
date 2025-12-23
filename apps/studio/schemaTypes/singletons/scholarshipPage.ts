import {defineField, defineType} from 'sanity'

export const scholarshipPage = defineType({
  name: 'scholarshipPage',
  title: 'Scholarship Programs Page',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Scholarship Programs',
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
      name: 'scholarshipPrograms',
      title: 'Scholarship Programs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Scholarship Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Scholarship Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Academic Excellence', value: 'academic'},
                  {title: 'Athletic', value: 'athletic'},
                  {title: 'Arts & Culture', value: 'arts'},
                  {title: 'Financial Need', value: 'financial'},
                  {title: 'Merit-Based', value: 'merit'},
                  {title: 'Community Service', value: 'community'},
                  {title: 'Alumni', value: 'alumni'},
                  {title: 'Other', value: 'other'},
                ],
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'portableText',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'coverage',
              title: 'Coverage',
              type: 'object',
              fields: [
                defineField({
                  name: 'percentage',
                  title: 'Percentage Coverage',
                  type: 'string',
                  description: 'e.g., "100%", "50%", "Full Tuition"',
                }),
                defineField({
                  name: 'amount',
                  title: 'Amount',
                  type: 'string',
                  description: 'e.g., "₱50,000 per semester"',
                }),
                defineField({
                  name: 'details',
                  title: 'Details',
                  type: 'text',
                  rows: 3,
                }),
              ],
            }),
            defineField({
              name: 'eligibility',
              title: 'Eligibility Requirements',
              type: 'object',
              fields: [
                defineField({
                  name: 'requirements',
                  title: 'Requirements',
                  type: 'array',
                  of: [{type: 'string'}],
                }),
                defineField({
                  name: 'gpa',
                  title: 'Minimum GPA',
                  type: 'string',
                }),
                defineField({
                  name: 'income',
                  title: 'Income Requirements',
                  type: 'text',
                  rows: 2,
                }),
              ],
            }),
            defineField({
              name: 'applicationProcess',
              title: 'Application Process',
              type: 'portableText',
            }),
            defineField({
              name: 'deadline',
              title: 'Application Deadline',
              type: 'date',
            }),
            defineField({
              name: 'documents',
              title: 'Required Documents',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'contact',
              title: 'Contact Information',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Contact Person',
                  type: 'string',
                }),
                defineField({
                  name: 'email',
                  title: 'Email',
                  type: 'email',
                }),
                defineField({
                  name: 'phone',
                  title: 'Phone',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'applicationForm',
      title: 'Scholarship Application Form',
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
      title: 'Scholarship Recipient Testimonials',
      type: 'array',
      of: [{type: 'testimonial'}],
    }),
    defineField({
      name: 'stats',
      title: 'Scholarship Statistics',
      type: 'array',
      of: [{type: 'stats'}],
      description: 'e.g., number of scholarships awarded, total amount',
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
        title: 'Scholarship Programs Page',
      }
    },
  },
})

