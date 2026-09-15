import { defineField, defineType } from 'sanity'

export const collegeProgram = defineType({
  name: 'collegeProgram',
  title: 'College Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      description: 'e.g., "Computing Studies", "Hospitality Management"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Must match the page path under /college/ — e.g. "computing-studies"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Short Title/Abbreviation',
      type: 'string',
      description: 'Badge shown on the card, e.g. "BSCS & ACT"',
    }),
    defineField({
      name: 'description',
      title: 'Card Description',
      type: 'text',
      rows: 3,
      description: 'Short blurb shown on the homepage program card — 1-2 sentences',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'cardThumbnail',
      title: 'Card Thumbnail',
      type: 'image',
      description:
        'Fallback card image, used when the matching College Programs page has no thumbnail set. Recommended size: 800×450px (16:9 ratio).',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      shortTitle: 'shortTitle',
      media: 'cardThumbnail',
    },
    prepare({ title, shortTitle, media }) {
      return {
        title: title || 'College Program',
        subtitle: shortTitle || '',
        media,
      }
    },
  },
})
