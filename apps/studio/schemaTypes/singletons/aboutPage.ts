import { defineField, defineType } from 'sanity'
import { Landmark, Users, History, Target, Award, Info } from 'lucide-react'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: Info,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      group: 'content',
    }),
    defineField({
      name: 'identity',
      title: 'Identity Section (Who We Are)',
      type: 'object',
      group: 'content',
      icon: Users,
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      group: 'content',
      icon: Target,
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Mission',
        }),
        defineField({
          name: 'content',
          title: 'Mission Statement',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'image',
          title: 'Icon/Image',
          type: 'image',
        }),
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'object',
      group: 'content',
      icon: Target,
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Vision',
        }),
        defineField({
          name: 'content',
          title: 'Vision Statement',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'image',
          title: 'Icon/Image',
          type: 'image',
        }),
      ],
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'object',
      group: 'content',
      icon: Award,
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Core Values',
        }),
        defineField({
          name: 'values',
          title: 'Values List',
          type: 'array',
          of: [
            defineField({
              name: 'value',
              type: 'object',
              fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'description', type: 'text', rows: 3 }),
                defineField({ name: 'icon', type: 'string', description: 'Lucide icon name' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'history',
      title: 'History',
      type: 'object',
      group: 'content',
      icon: History,
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Introduction Content',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'timeline',
          title: 'Timeline Events',
          type: 'array',
          of: [
            defineField({
              name: 'event',
              type: 'object',
              fields: [
                defineField({ name: 'year', type: 'string', title: 'Year/Period' }),
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'description', type: 'text' }),
                defineField({
                  name: 'image',
                  type: 'image',
                  fields: [defineField({ name: 'alt', type: 'string' })],
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'year',
                  media: 'image',
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'gallery',
          title: 'History Gallery',
          type: 'gallery',
        }),
      ],
    }),
    defineField({
      name: 'strategicAgenda',
      title: 'Strategic Agenda',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({
          name: 'agendaItems',
          title: 'Agenda Items',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'leadership',
      title: 'Leadership / Administration',
      type: 'object',
      group: 'content',
      icon: Users,
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({
          name: 'members',
          title: 'Members',
          type: 'array',
          of: [
            defineField({
              name: 'member',
              type: 'object',
              fields: [
                defineField({ name: 'name', type: 'string' }),
                defineField({ name: 'role', type: 'string' }),
                defineField({ name: 'bio', type: 'text' }),
                defineField({
                  name: 'image',
                  type: 'image',
                  fields: [defineField({ name: 'alt', type: 'string' })],
                  options: { hotspot: true },
                }),
                defineField({
                  name: 'socialLinks',
                  title: 'Social Links',
                  type: 'array',
                  of: [{ type: 'socialLink' }],
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'role',
                  media: 'image',
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Key Statistics',
      type: 'array',
      group: 'content',
      of: [{ type: 'stats' }],
    }),
    defineField({
      name: 'accreditations',
      title: 'Accreditations & Affiliations',
      type: 'object',
      group: 'content',
      icon: Award,
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({
          name: 'accreditations',
          title: 'Accreditation Items',
          type: 'array',
          of: [
            defineField({
              name: 'item',
              type: 'object',
              fields: [
                defineField({ name: 'name', type: 'string' }),
                defineField({ name: 'description', type: 'text' }),
                defineField({
                  name: 'logo',
                  type: 'image',
                  fields: [defineField({ name: 'alt', type: 'string' })],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'About Page',
        subtitle: 'Singleton',
      }
    },
  },
})
