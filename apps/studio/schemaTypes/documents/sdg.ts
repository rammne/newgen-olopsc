import {defineField, defineType} from 'sanity'

export const sdg = defineType({
  name: 'sdg',
  title: 'Sustainable Development Goal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'SDG Number',
      type: 'number',
      description: 'The official number of the SDG (1-17)',
      validation: (Rule) => Rule.required().min(1).max(17).integer(),
    }),
    defineField({
      name: 'image',
      title: 'SDG Icon/Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Brand Color',
      type: 'string',
      description: 'Hex code for the official SDG color (e.g. #E5243B)',
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, {
        name: 'hex',
        invert: false
      }),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Detailed Content',
      type: 'portableText',
      description: 'Full details about our commitment to this goal',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      number: 'number',
      media: 'image',
    },
    prepare({title, number, media}) {
      return {
        title: `${number}. ${title}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'SDG Number',
      name: 'numberAsc',
      by: [{field: 'number', direction: 'asc'}],
    },
  ],
})
