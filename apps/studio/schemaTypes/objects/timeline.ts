import {defineField, defineType} from 'sanity'

export const timeline = defineType({
  name: 'timeline',
  title: 'Timeline/Milestone',
  type: 'object',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      year: 'year',
      title: 'title',
    },
    prepare({year, title}) {
      return {
        title: title || 'Milestone',
        subtitle: year || '',
      }
    },
  },
})

