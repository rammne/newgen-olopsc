import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'portableText',
        }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Main Contact Information',
      type: 'contactInfo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'departments',
      title: 'Department Contacts',
      type: 'array',
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
      name: 'contactForm',
      title: 'Contact Form',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'portableText',
        }),
        defineField({
          name: 'formFields',
          title: 'Form Fields',
          type: 'array',
          of: [{type: 'formField'}],
        }),
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Send Message',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
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
          of: [{type: 'socialLink'}],
        }),
      ],
    }),
    defineField({
      name: 'map',
      title: 'Map Section',
      type: 'object',
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
                      {title: 'Monday', value: 'monday'},
                      {title: 'Tuesday', value: 'tuesday'},
                      {title: 'Wednesday', value: 'wednesday'},
                      {title: 'Thursday', value: 'thursday'},
                      {title: 'Friday', value: 'friday'},
                      {title: 'Saturday', value: 'saturday'},
                      {title: 'Sunday', value: 'sunday'},
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

