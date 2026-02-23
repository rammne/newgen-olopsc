import { defineField, defineType } from 'sanity'
import { Newspaper, Image, Search } from 'lucide-react'

export const news = defineType({
  name: 'news',
  title: 'News Article',
  type: 'document',
  icon: Newspaper,
  groups: [
    { name: 'content', title: 'Content', icon: Newspaper, default: true },
    { name: 'media', title: 'Media & Relations', icon: Image },
    { name: 'seo', title: 'SEO', icon: Search },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
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
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Announcements', value: 'announcements' },
          { title: 'Achievements', value: 'achievements' },
        ],
      },
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      group: 'content',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Show this article on the home page (max 3 featured articles)',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary for previews (150-200 characters)',
      rows: 3,
      validation: (Rule) =>
        Rule.max(200).warning('Excerpts should be under 200 characters'),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true,
          },
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
      validation: (Rule) => Rule.required(),
      group: 'media',
    }),
    defineField({
      name: 'academicDepartment',
      title: 'Academic Department',
      type: 'reference',
      to: [{ type: 'academicDepartment' }],
      description: 'The academic department that posted this news article (optional)',
      group: 'media',
    }),
    defineField({
      name: 'relatedSDGs',
      title: 'Related SDGs',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'sdg' }],
        options: {
          filter: 'isActive == true',
        }
      }],
      description: 'Select the Sustainable Development Goals related to this article',
      group: 'media',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'media',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'news' }],
        },
      ],
      group: 'media',
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'gallery',
      group: 'media',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      featured: 'featured',
      departmentTitle: 'academicDepartment.title',
      media: 'featuredImage',
    },
    prepare({ title, publishedAt, featured, departmentTitle, media }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : ''
      const subtitle = `${date}${departmentTitle ? ` • ${departmentTitle}` : ''}${featured ? ' ⭐ Featured' : ''}`
      return {
        title: title || 'News Article',
        subtitle: subtitle,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
