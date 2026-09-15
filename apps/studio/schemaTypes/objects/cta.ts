import {defineField, defineType} from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Call-to-Action',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      validation: (Rule) =>
        Rule.custom((link: any) => {
          if (!link?.type) return true
          const stale = ['internal', 'external', 'anchor', 'file'].filter(
            (key) => key !== link.type && link[key]
          )
          if (!stale.length) return true
          return `Unused link value still saved: ${stale.join(', ')}. Clear it — a leftover Internal Page reference keeps counting as a link and will block deleting the target document.`
        }).warning(),
      fields: [
        defineField({
          name: 'type',
          title: 'Link Type',
          type: 'string',
          options: {
            list: [
              {title: 'Internal Page', value: 'internal'},
              {title: 'External URL', value: 'external'},
              {title: 'Anchor Link', value: 'anchor'},
              {title: 'File Download', value: 'file'},
          ],
            layout: 'radio',
          },
          initialValue: 'internal',
        }),
        defineField({
          name: 'internal',
          title: 'Internal Page',
          type: 'reference',
          to: [
            {type: 'academicDepartment'},
            {type: 'collegeProgram'},
            {type: 'news'},
            {type: 'event'},
            {type: 'aboutPage'},
            {type: 'admissionsPage'},
            {type: 'scholarshipPage'},
            {type: 'contactPage'},
            {type: 'jobsPage'},
            {type: 'homePage'},
          ],
          hidden: ({parent}) => parent?.type !== 'internal' && !parent?.internal,
        }),
        defineField({
          name: 'external',
          title: 'External URL',
          type: 'url',
          hidden: ({parent}) => parent?.type !== 'external' && !parent?.external,
        }),
        defineField({
          name: 'anchor',
          title: 'Anchor ID',
          type: 'string',
          description: 'Section ID to scroll to (e.g., "admissions")',
          hidden: ({parent}) => parent?.type !== 'anchor' && !parent?.anchor,
        }),
        defineField({
          name: 'file',
          title: 'File',
          type: 'file',
          hidden: ({parent}) => parent?.type !== 'file' && !parent?.file,
        }),
      ],
    }),
    defineField({
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Outline', value: 'outline'},
          {title: 'Text Link', value: 'text'},
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.link?.type === 'anchor',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      style: 'style',
    },
    prepare({text, style}) {
      return {
        title: text || 'CTA Button',
        subtitle: style || 'primary',
      }
    },
  },
})

