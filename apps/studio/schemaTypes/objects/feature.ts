import {defineField, defineType} from 'sanity'

export const feature = defineType({
  name: 'feature',
  title: 'Feature/Highlight',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
        }),
        defineField({
          name: 'text',
          title: 'Link Text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      media: 'image',
    },
    prepare({title, icon, media}) {
      return {
        title: title || 'Feature',
        subtitle: icon || '',
        media: media || (icon ? undefined : undefined),
      }
    },
  },
})

