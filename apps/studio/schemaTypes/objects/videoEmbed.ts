import {defineField, defineType} from 'sanity'

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Direct Video', value: 'direct'},
        ],
      },
      initialValue: 'youtube',
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Title for accessibility',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'image',
      description: 'Optional custom thumbnail (if not provided, platform default will be used)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
      platform: 'platform',
    },
    prepare({title, url, platform}) {
      return {
        title: title || url || 'Video',
        subtitle: platform || 'youtube',
      }
    },
  },
})

