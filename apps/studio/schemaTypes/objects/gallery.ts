import {defineField, defineType} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Masonry', value: 'masonry'},
          {title: 'Carousel', value: 'carousel'},
        ],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
    },
    prepare({title, images}) {
      const imageCount = images?.length || 0
      return {
        title: title || 'Image Gallery',
        subtitle: `${imageCount} image${imageCount !== 1 ? 's' : ''}`,
      }
    },
  },
})

