import {defineField, defineType} from 'sanity'

export const section = defineType({
  name: 'section',
  title: 'Content Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
    }),
    defineField({
      name: 'variant',
      title: 'Section Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Alternating', value: 'alternating'},
          {title: 'Cards', value: 'cards'},
          {title: 'Grid', value: 'grid'},
          {title: 'Full Width', value: 'fullWidth'},
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Light Gray', value: 'light'},
          {title: 'Primary', value: 'primary'},
          {title: 'Dark', value: 'dark'},
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'imageWithCaption'}],
    }),
    defineField({
      name: 'features',
      title: 'Features/Highlights',
      type: 'array',
      of: [{type: 'feature'}],
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-Action',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      variant: 'variant',
    },
    prepare({title, variant}) {
      return {
        title: title || 'Content Section',
        subtitle: variant || 'default',
      }
    },
  },
})

