import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters recommended)',
      validation: (Rule) => Rule.max(60).warning('SEO titles should be under 60 characters'),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      description: 'Meta description for search engines (150-160 characters recommended)',
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning('Meta descriptions should be under 160 characters'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Relevant keywords for SEO (comma-separated)',
    }),
    defineField({
      name: 'image',
      title: 'OG Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noindex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Canonical URL for this page (if different from default)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({title, description}) {
      return {
        title: title || 'No SEO title',
        subtitle: description || 'No SEO description',
      }
    },
  },
})

