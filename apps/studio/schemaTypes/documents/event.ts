import { defineField, defineType } from 'sanity'
import { Calendar, FileText, Search } from 'lucide-react'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: Calendar,
  groups: [
    { name: 'details', title: 'Event Details', icon: Calendar, default: true },
    { name: 'content', title: 'Content & Media', icon: FileText },
    { name: 'seo', title: 'SEO', icon: Search },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'details',
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
      group: 'details',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Academic', value: 'academic' },
          { title: 'Sports', value: 'sports' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Community Service', value: 'community' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Seminar', value: 'seminar' },
          { title: 'Other', value: 'other' },
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Show this event on the home page (max 3 featured events)',
      initialValue: false,
      group: 'details',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      group: 'details',
      fields: [
        defineField({
          name: 'venue',
          title: 'Venue',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'isOnline',
          title: 'Online Event',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'onlineLink',
          title: 'Online Event Link',
          type: 'url',
          hidden: ({ parent }) => !parent?.isOnline,
        }),
      ],
    }),
    defineField({
      name: 'academicDepartment',
      title: 'Academic Department',
      type: 'reference',
      to: [{ type: 'academicDepartment' }],
      description: 'The academic department that posted this event (optional)',
      group: 'details',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'registration',
      title: 'Registration Information',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'required',
          title: 'Registration Required',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'deadline',
          title: 'Registration Deadline',
          type: 'datetime',
        }),
        defineField({
          name: 'link',
          title: 'Registration Link',
          type: 'url',
        }),
        defineField({
          name: 'contact',
          title: 'Contact for Registration',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'relatedSDGs',
      title: 'Related SDGs',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'sdg' }],
        options: {
          filter: 'isActive == true',
        }
      }],
      description: 'Select the Sustainable Development Goals related to this event',
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'Event Gallery',
      type: 'gallery',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      location: 'location.venue',
      featured: 'featured',
      departmentTitle: 'academicDepartment.title',
      media: 'featuredImage',
    },
    prepare({ title, startDate, location, featured, departmentTitle, media }) {
      const date = startDate ? new Date(startDate).toLocaleDateString() : ''
      const subtitle = `${date}${location ? ` • ${location}` : ''}${departmentTitle ? ` • ${departmentTitle}` : ''}${featured ? ' ⭐ Featured' : ''}`
      return {
        title: title || 'Event',
        subtitle: subtitle,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, Upcoming',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Start Date, Past',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
})
