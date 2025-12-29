import {defineField, defineType} from 'sanity'

/**
 * Story Block - Visual storytelling component for modern school websites
 * Supports images, videos, short text, and mixed media layouts
 */
export const storyBlock = defineType({
  name: 'storyBlock',
  title: 'Story Block',
  type: 'object',
  fields: [
    defineField({
      name: 'blockType',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image with Caption', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'Image Grid', value: 'imageGrid'},
          {title: 'Split Content (Image + Text)', value: 'split'},
          {title: 'Full Width Image', value: 'fullImage'},
          {title: 'Video with Text', value: 'videoText'},
          {title: 'Stats/Highlights', value: 'stats'},
          {title: 'Quote/Testimonial', value: 'quote'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    // Short headline/title (max 1-2 lines)
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Short, impactful headline (1-2 lines max)',
      validation: (Rule) => Rule.max(100),
    }),
    // Short caption/description (max 2-3 sentences)
    defineField({
      name: 'caption',
      title: 'Caption/Description',
      type: 'text',
      description: 'Brief description (2-3 sentences max - keep it concise!)',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    // Single image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/jpeg,image/png,image/webp',
      },
      description: 'JPEG, PNG, or WebP only',
      hidden: ({parent}) => 
        !['image', 'split', 'fullImage', 'imageGrid'].includes(parent?.blockType || ''),
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
    // Multiple images for grid
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/jpeg,image/png,image/webp',
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
        },
      ],
      hidden: ({parent}) => parent?.blockType !== 'imageGrid',
      validation: (Rule) => Rule.min(2).max(6),
    }),
    // Video
    defineField({
      name: 'video',
      title: 'Video',
      type: 'videoEmbed',
      hidden: ({parent}) => 
        !['video', 'videoText'].includes(parent?.blockType || ''),
    }),
    // Text content (for split layouts)
    defineField({
      name: 'textContent',
      title: 'Text Content',
      type: 'text',
      description: 'Short text content (keep it brief!)',
      rows: 4,
      hidden: ({parent}) => !['split', 'videoText'].includes(parent?.blockType || ''),
      validation: (Rule) => Rule.max(500),
    }),
    // Stats/highlights
    defineField({
      name: 'stats',
      title: 'Statistics/Highlights',
      type: 'array',
      of: [{type: 'stats'}],
      hidden: ({parent}) => parent?.blockType !== 'stats',
      validation: (Rule) => Rule.max(4),
    }),
    // Quote/testimonial
    defineField({
      name: 'quote',
      title: 'Quote/Testimonial',
      type: 'testimonial',
      hidden: ({parent}) => parent?.blockType !== 'quote',
    }),
    // Layout options
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'left',
      hidden: ({parent}) => parent?.blockType !== 'split',
    }),
    defineField({
      name: 'gridColumns',
      title: 'Grid Columns',
      type: 'number',
      options: {
        list: [
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
          {title: '4 Columns', value: 4},
        ],
      },
      initialValue: 3,
      hidden: ({parent}) => parent?.blockType !== 'imageGrid',
    }),
    // Background color
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Light Gray', value: 'light'},
          {title: 'Primary Color', value: 'primary'},
          {title: 'Dark', value: 'dark'},
        ],
      },
      initialValue: 'white',
    }),
    // Spacing
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      options: {
        list: [
          {title: 'Compact', value: 'compact'},
          {title: 'Normal', value: 'normal'},
          {title: 'Large', value: 'large'},
        ],
      },
      initialValue: 'normal',
    }),
  ],
  preview: {
    select: {
      blockType: 'blockType',
      headline: 'headline',
      caption: 'caption',
      media: 'image',
    },
    prepare({blockType, headline, caption, media}) {
      return {
        title: headline || `Story Block: ${blockType || 'image'}`,
        subtitle: caption ? caption.substring(0, 50) + '...' : blockType,
        media: media,
      }
    },
  },
})

