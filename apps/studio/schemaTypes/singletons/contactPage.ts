import { defineField, defineType } from 'sanity'
import { Phone, Search } from 'lucide-react'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: Phone,
  __experimental_formPreviewTitle: false,
  groups: [
    { name: 'content', title: 'Content', icon: Phone, default: true },
    { name: 'seo', title: 'SEO', icon: Search },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'departments',
      title: 'Department Contacts',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'department',
              title: 'Department',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'contact',
              title: 'Contact Information',
              type: 'contactInfo',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'links',
          title: 'Social Links',
          type: 'array',
          of: [{ type: 'socialLink' }],
        }),
      ],
    }),
    defineField({
      name: 'map',
      title: 'Map Section',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'embedUrl',
          title: 'Map Embed URL',
          type: 'url',
          description: 'Google Maps embed URL',
        }),
        defineField({
          name: 'image',
          title: 'Map Image (Fallback)',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'hours',
          title: 'Hours',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'day',
                  title: 'Day',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Monday', value: 'monday' },
                      { title: 'Tuesday', value: 'tuesday' },
                      { title: 'Wednesday', value: 'wednesday' },
                      { title: 'Thursday', value: 'thursday' },
                      { title: 'Friday', value: 'friday' },
                      { title: 'Saturday', value: 'saturday' },
                      { title: 'Sunday', value: 'sunday' },
                    ],
                  },
                }),
                defineField({
                  name: 'hours',
                  title: 'Hours',
                  type: 'string',
                  description: 'e.g., "8:00 AM - 5:00 PM"',
                }),
                defineField({
                  name: 'closed',
                  title: 'Closed',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page',
      }
    },
  },
})
