import {defineField, defineType} from 'sanity'
import {BookOpen, Milestone, Shield, Image as ImageIcon, Megaphone, Search} from 'lucide-react'

export const juniorHighPage = defineType({
  name: 'juniorHighPage',
  title: 'Junior High School Page',
  type: 'document',
  icon: BookOpen,
  groups: [
    {name: 'hero', title: 'Hero', icon: BookOpen, default: true},
    {name: 'journey', title: 'Four-Year Journey', icon: Milestone},
    {name: 'mentorship', title: 'Mentorship', icon: Shield},
    {name: 'campus', title: 'Campus Life & Media', icon: ImageIcon},
    {name: 'cta', title: 'Closing CTA', icon: Megaphone},
    {name: 'seo', title: 'SEO', icon: Search},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      description: 'The call-to-action button is set in code.',
      fields: [
        defineField({name: 'headline', title: 'Headline', type: 'string'}),
        defineField({name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 4}),
        defineField({
          name: 'objectives',
          title: 'Core Objectives',
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
                defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            },
          ],
        }),
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
      name: 'journey',
      title: 'Four-Year Journey',
      type: 'object',
      group: 'journey',
      fields: [
        defineField({name: 'title', title: 'Section Title', type: 'string'}),
        defineField({
          name: 'lead',
          title: 'Lead Line',
          type: 'text',
          rows: 2,
          description: 'Highlighted line directly under the title',
        }),
        defineField({
          name: 'body',
          title: 'Body Paragraphs',
          type: 'array',
          of: [{type: 'text', rows: 4}],
        }),
        defineField({
          name: 'timeline',
          title: 'Grade Timeline',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'grade',
                  title: 'Grade',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({name: 'title', title: 'Title', type: 'string'}),
                defineField({name: 'text', title: 'Description', type: 'text', rows: 3}),
              ],
              preview: {select: {title: 'grade', subtitle: 'title'}},
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'mentorship',
      title: 'Mentorship Section',
      type: 'object',
      group: 'mentorship',
      fields: [
        defineField({name: 'title', title: 'Section Title', type: 'string'}),
        defineField({name: 'content', title: 'Content', type: 'text', rows: 6}),
      ],
    }),

    defineField({
      name: 'facilitiesHeader',
      title: 'Campus Life Header',
      type: 'object',
      group: 'campus',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
      ],
    }),
    defineField({
      name: 'sectionImages',
      title: 'Section-Specific Images',
      type: 'array',
      group: 'campus',
      description:
        'Label each image so you know where it appears, e.g. "Transformation", "Mentorship".',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'sectionLabel',
              title: 'Section Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {select: {title: 'sectionLabel', media: 'image'}},
        },
      ],
    }),
    defineField({
      name: 'facilityTourImages',
      title: 'Campus Life Gallery',
      type: 'array',
      group: 'campus',
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

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'Junior High School Page'}
    },
  },
})
