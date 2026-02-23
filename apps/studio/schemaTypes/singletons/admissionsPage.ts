import { defineField, defineType } from 'sanity'
import { GraduationCap, ClipboardList, Search } from 'lucide-react'

export const admissionsPage = defineType({
  name: 'admissionsPage',
  title: 'Admissions Page',
  type: 'document',
  icon: GraduationCap,
  __experimental_formPreviewTitle: false,
  groups: [
    { name: 'content', title: 'Content', icon: GraduationCap, default: true },
    { name: 'requirements', title: 'Requirements & Payment', icon: ClipboardList },
    { name: 'seo', title: 'SEO', icon: Search },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Admissions',
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
      name: 'cta',
      title: 'Call-to-Action',
      type: 'cta',
      group: 'content',
    }),
    defineField({
      name: 'basicEducation',
      title: 'Basic Education (Preschool - Senior High)',
      type: 'object',
      group: 'requirements',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Basic Education',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'steps',
          title: 'Admission Steps',
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
              ],
            },
          ],
        }),
        defineField({
          name: 'requirements',
          title: 'Requirements',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Requirements Title',
              type: 'string',
              initialValue: 'Requirements',
            }),
            defineField({
              name: 'requirementList',
              title: 'Requirement Groups (By Level)',
              type: 'array',
              description: 'Add requirements grouped by academic level (e.g. Preschool, Grade School)',
              of: [
                {
                  type: 'object',
                  name: 'group',
                  fields: [
                    defineField({
                      name: 'level',
                      title: 'Academic Level / Group Title',
                      type: 'string',
                      initialValue: 'General',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'items',
                      title: 'Requirements',
                      type: 'array',
                      of: [{ type: 'string' }],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'level',
                      items: 'items',
                    },
                    prepare({ title, items }) {
                      return {
                        title: title,
                        subtitle: `${items ? items.length : 0} requirements`,
                      }
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'list',
              title: 'List of Requirements (Legacy/General)',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => !!parent?.requirementList?.length,
            }),
            defineField({
              name: 'note',
              title: 'Note/Footer',
              type: 'text',
              rows: 2,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'higherEducation',
      title: 'Higher Education (College)',
      type: 'object',
      group: 'requirements',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Higher Education',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'steps',
          title: 'Admission Steps',
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
              ],
            },
          ],
        }),
        defineField({
          name: 'requirements',
          title: 'Requirements',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Requirements Title',
              type: 'string',
              initialValue: 'Requirements',
            }),
            defineField({
              name: 'requirementList',
              title: 'Requirement Groups (By Level)',
              type: 'array',
              description: 'Add requirements grouped by academic level',
              of: [
                {
                  type: 'object',
                  name: 'group',
                  fields: [
                    defineField({
                      name: 'level',
                      title: 'Academic Level / Group Title',
                      type: 'string',
                      initialValue: 'General',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'items',
                      title: 'Requirements',
                      type: 'array',
                      of: [{ type: 'string' }],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'level',
                      items: 'items',
                    },
                    prepare({ title, items }) {
                      return {
                        title: title,
                        subtitle: `${items ? items.length : 0} requirements`,
                      }
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'list',
              title: 'List of Requirements (Legacy/General)',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => !!parent?.requirementList?.length,
            }),
            defineField({
              name: 'note',
              title: 'Note/Footer',
              type: 'text',
              rows: 2,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'paymentOptions',
      title: 'Payment Options',
      type: 'object',
      group: 'requirements',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Payment Options' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
          name: 'methods',
          title: 'Payment Methods',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Method Name', type: 'string' }),
                defineField({ name: 'details', title: 'Details/Instructions', type: 'portableText' }),
                defineField({ name: 'icon', title: 'Icon', type: 'image' })
              ]
            }
          ]
        }),
        defineField({
          name: 'bankDetails',
          title: 'Bank Details',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'bankName', title: 'Bank Name', type: 'string' }),
                defineField({ name: 'accountName', title: 'Account Name', type: 'string' }),
                defineField({ name: 'accountNumber', title: 'Account Number', type: 'string' }),
                defineField({ name: 'branch', title: 'Branch (Optional)', type: 'string' }),
                defineField({ name: 'logo', title: 'Bank Logo', type: 'image' })
              ]
            }
          ]
        })
      ]
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
        title: 'Admissions Page',
      }
    },
  },
})
