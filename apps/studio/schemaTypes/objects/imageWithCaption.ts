import {defineField, defineType} from 'sanity'

export const imageWithCaption = defineType({
  name: 'imageWithCaption',
  title: 'Image with Caption',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Important for accessibility and SEO',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
          {title: 'Full Width', value: 'full'},
        ],
      },
      initialValue: 'center',
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
      media: 'image',
    },
    prepare({caption, media}) {
      return {
        title: caption || 'Image',
        media: media,
      }
    },
  },
})

