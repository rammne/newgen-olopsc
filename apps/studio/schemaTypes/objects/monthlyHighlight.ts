import { defineField, defineType } from 'sanity'
import { Star } from 'lucide-react'

export const monthlyHighlight = defineType({
  name: 'monthlyHighlight',
  title: 'Monthly Highlight',
  type: 'object',
  icon: Star,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the highlight',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Detailed description of what happened',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Date of the highlight (year will not be displayed)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Featured Photo',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/jpeg,image/png,image/webp',
      },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      description: 'Photo for this highlight (JPEG, PNG, or WebP)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      description: 'Which department does this highlight belong to?',
      options: {
        list: [
          { title: 'Preschool', value: 'preschool' },
          { title: 'Grade School', value: 'grade-school' },
          { title: 'Junior High School', value: 'junior-high-school' },
          { title: 'Senior High School', value: 'senior-high-school' },
          { title: 'College', value: 'college' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      date: 'date',
      media: 'image',
    },
    prepare({ title, department, date, media }) {
      const deptLabels: Record<string, string> = {
        preschool: 'Preschool',
        'grade-school': 'Grade School',
        'junior-high-school': 'Junior High School',
        'senior-high-school': 'Senior High School',
        college: 'College',
      }
      const deptLabel = department ? deptLabels[department] || department : 'No Dept'
      const dateLabel = date
        ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : ''
      return {
        title: title || 'Untitled Highlight',
        subtitle: `${deptLabel}${dateLabel ? ` · ${dateLabel}` : ''}`,
        media,
      }
    },
  },
})
