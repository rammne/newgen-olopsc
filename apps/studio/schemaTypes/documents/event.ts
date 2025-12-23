import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Academic', value: 'academic'},
          {title: 'Sports', value: 'sports'},
          {title: 'Cultural', value: 'cultural'},
          {title: 'Community Service', value: 'community'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Seminar', value: 'seminar'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
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
          hidden: ({parent}) => !parent?.isOnline,
        }),
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'registration',
      title: 'Registration Information',
      type: 'object',
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
      name: 'gallery',
      title: 'Event Gallery',
      type: 'gallery',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      location: 'location.venue',
      media: 'featuredImage',
    },
    prepare({title, startDate, location, media}) {
      const date = startDate ? new Date(startDate).toLocaleDateString() : ''
      return {
        title: title || 'Event',
        subtitle: `${date}${location ? ` • ${location}` : ''}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, Upcoming',
      name: 'startDateAsc',
      by: [{field: 'startDate', direction: 'asc'}],
    },
    {
      title: 'Start Date, Past',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
  ],
})

