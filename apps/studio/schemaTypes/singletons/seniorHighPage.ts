import {defineField, defineType} from 'sanity'
import {GraduationCap, Layers, Image as ImageIcon, Search} from 'lucide-react'

export const seniorHighPage = defineType({
  name: 'seniorHighPage',
  title: 'Senior High School Page',
  type: 'document',
  icon: GraduationCap,
  groups: [
    {name: 'hero', title: 'Hero', icon: GraduationCap, default: true},
    {name: 'tracks', title: 'Track Clusters', icon: Layers},
    {name: 'campus', title: 'Campus Life & Media', icon: ImageIcon},
    {name: 'admission', title: 'Admission'},
    {name: 'seo', title: 'SEO', icon: Search},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'headline', title: 'Headline', type: 'string'}),
        defineField({name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3}),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
        }),
      ],
    }),

    defineField({
      name: 'trackClusters',
      title: 'Track Clusters',
      type: 'object',
      group: 'tracks',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Heading of the Strengthened Curriculum section',
        }),
        defineField({
          name: 'intro',
          title: 'Intro Paragraph',
          type: 'text',
          rows: 2,
          description: 'Short lead-in shown beside the section title',
        }),
        defineField({
          name: 'detailTitle',
          title: 'Detail Section Heading',
          type: 'string',
          description: 'Heading of the detailed track breakdown further down the page',
        }),
        defineField({
          name: 'subtitle',
          title: 'Detail Section Subtitle',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'clusters',
          title: 'Clusters',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Cluster Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description (Optional)',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'tracks',
                  title: 'Tracks',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'name',
                          title: 'Track Name',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
                        defineField({name: 'skills', title: 'Skills Developed', type: 'text', rows: 2}),
                        defineField({name: 'outcomes', title: 'Target Outcomes', type: 'text', rows: 2}),
                      ],
                      preview: {select: {title: 'name', subtitle: 'description'}},
                    },
                  ],
                }),
              ],
              preview: {select: {title: 'name', subtitle: 'description'}},
            },
          ],
        }),
        defineField({name: 'note', title: 'Closing Note', type: 'text', rows: 3}),
        defineField({name: 'quote', title: 'Pull Quote', type: 'text', rows: 2}),
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
        'Images for specific page sections. Label each one so you know where it appears, e.g. "Academic Track", "TechPro Track".',
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
      name: 'admissionInfo',
      title: 'Admission Section',
      type: 'object',
      group: 'admission',
      description: 'The call-to-action buttons for this section are set in code.',
      fields: [
        defineField({name: 'title', title: 'Section Title', type: 'string'}),
        defineField({name: 'content', title: 'Content', type: 'text', rows: 3}),
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
      return {title: 'Senior High School Page'}
    },
  },
})
