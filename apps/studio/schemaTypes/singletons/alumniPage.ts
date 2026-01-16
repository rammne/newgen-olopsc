import { defineField, defineType } from 'sanity'
import { Users, Target, Calendar, Newspaper, Info } from 'lucide-react'

export const alumniPage = defineType({
  name: 'alumniPage',
  title: 'Alumni Page',
  type: 'document',
  icon: Users,
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
      name: 'intro',
      title: 'Introduction / Welcome',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'content', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
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
      name: 'officers',
      title: 'Alumni Officers',
      type: 'object',
      group: 'content',
      icon: Users,
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({
          name: 'members',
          title: 'Officers',
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
      name: 'featuredAlumni',
      title: 'Alumni Spotlight',
      type: 'array',
      group: 'content',
      of: [{ type: 'testimonial' }],
      description: 'Highlight successful alumni stories',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Section',
      type: 'gallery',
      group: 'content',
    }),
    defineField({
      name: 'news',
      title: 'Latest News Section',
      type: 'object',
      group: 'content',
      icon: Newspaper,
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'count', type: 'number', initialValue: 3 }),
        defineField({ name: 'cta', type: 'cta' }),
      ],
    }),
    defineField({
      name: 'events',
      title: 'Upcoming Events Section',
      type: 'object',
      group: 'content',
      icon: Calendar,
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'count', type: 'number', initialValue: 3 }),
        defineField({ name: 'cta', type: 'cta' }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Join / Contact CTA',
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
        title: title || 'Alumni Page',
        subtitle: 'Singleton',
      }
    },
  },
})
