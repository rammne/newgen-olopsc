import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Hero Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width Image', value: 'fullWidth'},
          {title: 'Split Content', value: 'split'},
          {title: 'Centered', value: 'centered'},
          {title: 'Video Background', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'fullWidth',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline (H1)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      description: 'Supporting text below headline',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/jpeg,image/png,image/webp',
      },
      description: 'JPEG, PNG, or WebP only',
      hidden: ({parent}) => parent?.variant === 'video',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value?.asset) return true
          const assetRef = value.asset._ref || ''
          const extension = assetRef.split('-').pop()?.split('.')[1]?.toLowerCase()
          if (extension && !['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
            return 'Image must be in JPEG, PNG, or WebP format'
          }
          return true
        }),
    }),
    defineField({
      name: 'backgroundVideoSource',
      title: 'Background Video Source',
      type: 'string',
      options: {
        list: [
          {title: 'Uploaded File', value: 'file'},
          {title: 'External URL (MP4/WebM)', value: 'url'},
          {title: 'YouTube / Vimeo URL', value: 'embed'},
        ],
        layout: 'radio',
      },
      initialValue: 'embed',
      hidden: ({parent}) => parent?.variant !== 'video',
    }),
    defineField({
      name: 'backgroundVideoFile',
      title: 'Background Video File',
      type: 'file',
      description: 'Upload an MP4/WebM file to use as background video',
      options: {
        accept: 'video/mp4,video/webm',
      },
      hidden: ({parent}) => parent?.variant !== 'video' || parent?.backgroundVideoSource !== 'file',
    }),
    defineField({
      name: 'backgroundVideoUrl',
      title: 'Background Video URL',
      type: 'url',
      description: 'Direct MP4/WebM URL',
      hidden: ({parent}) => parent?.variant !== 'video' || parent?.backgroundVideoSource !== 'url',
    }),
    defineField({
      name: 'backgroundVideoEmbed',
      title: 'YouTube/Vimeo URL',
      type: 'url',
      description: 'YouTube or Vimeo URL for embedded background video',
      hidden: ({parent}) => parent?.variant !== 'video' || parent?.backgroundVideoSource !== 'embed',
    }),
    defineField({
      name: 'overlay',
      title: 'Overlay',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Overlay',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'opacity',
          title: 'Overlay Opacity',
          type: 'number',
          description: '0-100 (0 = transparent, 100 = opaque)',
          initialValue: 50,
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'color',
          title: 'Overlay Color',
          type: 'string',
          options: {
            list: [
              {title: 'Black', value: 'black'},
              {title: 'White', value: 'white'},
              {title: 'Primary', value: 'primary'},
            ],
          },
          initialValue: 'black',
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-Action',
      type: 'cta',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      variant: 'variant',
    },
    prepare({headline, variant}) {
      return {
        title: headline || 'Hero Section',
        subtitle: variant || 'fullWidth',
      }
    },
  },
})

