import {defineField, defineType} from 'sanity'

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
      description: 'Supporting text shown below the main headline',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      subheadline: 'subheadline',
    },
    prepare({subheadline}) {
      return {
        title: 'Hero Section',
        subtitle: subheadline,
      }
    },
  },
})
