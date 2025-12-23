import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
      rows: 4,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'role',
          title: 'Role/Title',
          type: 'string',
          description: 'e.g., "Parent", "Alumni", "Student"',
        }),
        defineField({
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'company',
          title: 'Company/Organization',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5',
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author.name',
    },
    prepare({quote, author}) {
      return {
        title: quote ? quote.substring(0, 50) + '...' : 'Testimonial',
        subtitle: author || 'Anonymous',
      }
    },
  },
})

