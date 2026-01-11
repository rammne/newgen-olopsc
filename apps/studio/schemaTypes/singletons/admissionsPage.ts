import { defineField, defineType } from 'sanity'

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
      name: 'basicEducation',
      title: 'Basic Education (Preschool - Senior High)',
      type: 'object',
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
              name: 'list',
              title: 'List of Requirements',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'note',
              title: 'Note/Footer',
              type: 'text',
              rows: 2
            })
          ],
        }),
      ],
    }),
    defineField({
      name: 'higherEducation',
      title: 'Higher Education (College)',
      type: 'object',
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
              name: 'list',
              title: 'List of Requirements',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'note',
              title: 'Note/Footer',
              type: 'text',
              rows: 2
            })
          ],
        }),
      ],
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

