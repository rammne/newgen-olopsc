import { defineField, defineType } from 'sanity'
import { Globe, Search } from 'lucide-react'

export const sdgPage = defineType({
  name: 'sdgPage',
  title: 'SDG Commitments Page',
  type: 'document',
  icon: Globe,
  groups: [
    { name: 'content', title: 'Content', icon: Globe, default: true },
    { name: 'seo', title: 'SEO', icon: Search },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our SDG Commitments',
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
      name: 'intro',
      title: 'Introduction',
      type: 'object',
      group: 'content',
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
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'SDG Commitments Page',
      }
    },
  },
})
