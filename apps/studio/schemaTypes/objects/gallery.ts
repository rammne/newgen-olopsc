import {defineField, defineType} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'object',
  description: 'Bento-style photo gallery (exactly 6 images)',
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
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.length(6).error('Please add exactly 6 images for the bento gallery'),
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
        title: title || 'Photo Gallery',
        subtitle: `${imageCount} image${imageCount !== 1 ? 's' : ''}`,
      }
    },
  },
})

