import { defineField, defineType } from 'sanity'
import { Briefcase, Users, Search } from 'lucide-react'

export const jobsPage = defineType({
  name: 'jobsPage',
  title: 'Jobs/Careers Page',
  type: 'document',
  icon: Briefcase,
  __experimental_formPreviewTitle: false,
  groups: [
    { name: 'content', title: 'Content', icon: Briefcase, default: true },
    { name: 'jobs', title: 'Job Listings', icon: Users },
    { name: 'seo', title: 'SEO', icon: Search },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Careers',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'object',
      group: 'content',
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
      name: 'whyWorkHere',
      title: 'Why Work Here Section',
      type: 'object',
      group: 'content',
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
          name: 'benefits',
          title: 'Benefits',
          type: 'array',
          of: [{ type: 'feature' }],
        }),
      ],
    }),
    defineField({
      name: 'jobOpenings',
      title: 'Job Openings',
      type: 'array',
      group: 'jobs',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Job Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'department',
              title: 'Department',
              type: 'string',
            }),
            defineField({
              name: 'type',
              title: 'Employment Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Full-time', value: 'fulltime' },
                  { title: 'Part-time', value: 'parttime' },
                  { title: 'Contract', value: 'contract' },
                  { title: 'Internship', value: 'internship' },
                ],
              },
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Job Description',
              type: 'portableText',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'requirements',
              title: 'Requirements',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'responsibilities',
              title: 'Key Responsibilities',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'qualifications',
              title: 'Qualifications',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'postedDate',
              title: 'Posted Date',
              type: 'date',
              initialValue: () => new Date().toISOString().split('T')[0],
            }),
            defineField({
              name: 'deadline',
              title: 'Application Deadline',
              type: 'date',
            }),
            defineField({
              name: 'applicationEmail',
              title: 'Application Email',
              type: 'email',
            }),
            defineField({
              name: 'applicationLink',
              title: 'Application Link',
              type: 'url',
            }),
            defineField({
              name: 'active',
              title: 'Active',
              type: 'boolean',
              description: 'Is this position currently open?',
              initialValue: true,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'applicationProcess',
      title: 'Application Process',
      type: 'object',
      group: 'jobs',
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
                  rows: 2,
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Employee Testimonials',
      type: 'array',
      of: [{ type: 'testimonial' }],
      group: 'jobs',
    }),
    defineField({
      name: 'contactInfo',
      title: 'HR Contact Information',
      type: 'contactInfo',
      group: 'jobs',
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-Action',
      type: 'cta',
      group: 'jobs',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Jobs/Careers Page',
      }
    },
  },
})
