import {defineField, defineType} from 'sanity'
import {Baby, Clock, Heart, Building2, Sparkles, Megaphone, Search} from 'lucide-react'

export const preschoolPage = defineType({
  name: 'preschoolPage',
  title: 'Preschool Page',
  type: 'document',
  icon: Baby,
  groups: [
    {name: 'hero', title: 'Hero & Levels', icon: Baby, default: true},
    {name: 'schedule', title: 'Class Schedule', icon: Clock},
    {name: 'culture', title: 'Caring Culture', icon: Heart},
    {name: 'facilities', title: 'Facilities', icon: Building2},
    {name: 'milestones', title: 'Milestones', icon: Sparkles},
    {name: 'cta', title: 'Closing CTA', icon: Megaphone},
    {name: 'seo', title: 'SEO', icon: Search},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      description: 'The call-to-action buttons are set in code.',
      fields: [
        defineField({name: 'headline', title: 'Headline', type: 'string'}),
        defineField({name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 4}),
        defineField({
          name: 'backgroundImage',
          title: 'Hero Image',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'levels',
      title: 'Early Childhood Levels',
      type: 'array',
      group: 'hero',
      description: 'The three level cards. Icons are set in code.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Level Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'name', subtitle: 'description'}},
        },
      ],
    }),

    defineField({
      name: 'schedule',
      title: 'Class Schedule',
      type: 'object',
      group: 'schedule',
      fields: [
        defineField({name: 'title', title: 'Section Title', type: 'string'}),
        defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2}),
        defineField({
          name: 'rows',
          title: 'Schedule Rows',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'level',
                  title: 'Level',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'session',
                  title: 'Session Badge',
                  type: 'string',
                  description: 'Optional, e.g. "AM" or "PM"',
                }),
                defineField({name: 'hours', title: 'Hours', type: 'string'}),
              ],
              preview: {select: {title: 'level', subtitle: 'hours'}},
            },
          ],
        }),
        defineField({
          name: 'fridayTitle',
          title: 'Friday Note Title',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'caringCulture',
      title: 'Caring Culture',
      type: 'object',
      group: 'culture',
      fields: [
        defineField({name: 'title', title: 'Section Title', type: 'string'}),
        defineField({name: 'content', title: 'Content', type: 'text', rows: 6}),
      ],
    }),

    defineField({
      name: 'facilities',
      title: 'Facilities Section',
      type: 'object',
      group: 'facilities',
      fields: [
        defineField({name: 'title', title: 'Section Title', type: 'string'}),
        defineField({name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 3}),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'environment',
      title: 'Dedicated Environment',
      type: 'object',
      group: 'facilities',
      fields: [
        defineField({name: 'title', title: 'Section Title', type: 'string'}),
        defineField({name: 'content', title: 'Content', type: 'text', rows: 5}),
        defineField({
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
        }),
      ],
    }),

    defineField({
      name: 'milestonesSection',
      title: 'Developmental Milestones',
      type: 'object',
      group: 'milestones',
      description: 'Milestone icons are set in code.',
      fields: [
        defineField({name: 'title', title: 'Section Title', type: 'string'}),
        defineField({
          name: 'items',
          title: 'Milestones',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({name: 'text', title: 'Description', type: 'text', rows: 3}),
              ],
              preview: {select: {title: 'title', subtitle: 'text'}},
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'finalCta',
      title: 'Closing Section',
      type: 'object',
      group: 'cta',
      description: 'The call-to-action button is set in code.',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'content', title: 'Content', type: 'text', rows: 3}),
      ],
    }),

    defineField({
      name: 'facilityTourImages',
      title: 'Facility Images',
      type: 'array',
      group: 'facilities',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
            defineField({name: 'caption', title: 'Caption / Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
        },
      ],
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'Preschool Page'}
    },
  },
})
