import { defineField, defineType } from 'sanity'
import { GraduationCap, BookOpen, Search, ImageIcon } from 'lucide-react'

export const hospitalityManagement = defineType({
  name: 'hospitalityManagement',
  title: 'Hospitality Management',
  type: 'document',
  icon: GraduationCap,
  groups: [
    { name: 'hero', title: 'Hero & Quick Facts', icon: ImageIcon, default: true },
    { name: 'overview', title: 'Program Overview' },
    { name: 'outcomes', title: 'Outcomes & Manifesto' },
    { name: 'curriculum', title: 'Curriculum Engine' },
    { name: 'ecosystem', title: 'Ecosystem Images' },
    { name: 'leadership', title: 'Leadership & Faculty' },
    { name: 'pathways', title: 'Career Pathways' },
    { name: 'seo', title: 'SEO', icon: Search },
  ],
  fields: [
    // --- HERO & QUICK FACTS ---
    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
    }),
    defineField({
      name: 'cardThumbnail',
      title: 'Card Thumbnail (Hub Page)',
      description: 'Thumbnail displayed on the College Department hub page card. Recommended: 800x450px (16:9).',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
    }),
    defineField({
      name: 'quickFacts',
      title: 'Quick Facts',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'duration', title: 'Duration', type: 'string', initialValue: '4 Years' }),
        defineField({ name: 'units', title: 'Total Units', type: 'string', initialValue: '160 Units' }),
        defineField({ name: 'format', title: 'Format', type: 'string', initialValue: 'Lab & Practicum' }),
      ]
    }),

    // --- PROGRAM OVERVIEW ---
    defineField({
      name: 'overviewMainImage',
      title: 'Overview Main Image (Back/Bottom-Left)',
      type: 'image',
      group: 'overview',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
    }),
    defineField({
      name: 'overviewSubImage',
      title: 'Overview Sub Image (Front/Top-Right)',
      type: 'image',
      group: 'overview',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
    }),

    // --- OUTCOMES ---
    defineField({
      name: 'outcomes',
      title: 'Graduate Capabilities (Outcomes)',
      type: 'array',
      group: 'outcomes',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 })
          ]
        }
      ]
    }),

    // --- CURRICULUM ---
    defineField({
      name: 'curriculum',
      title: 'Curriculum Roadmap',
      type: 'array',
      group: 'curriculum',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Year (e.g. Year 1)', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'subjects', title: 'Core Subjects', type: 'array', of: [{ type: 'string' }] })
          ]
        }
      ]
    }),

    // --- ECOSYSTEM ---
    defineField({
      name: 'ecosystemImages',
      title: 'Department Ecosystem Images',
      type: 'object',
      group: 'ecosystem',
      fields: [
        defineField({
          name: 'facilities', title: 'Facilities / Simulation Room Image', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
        }),
        defineField({
          name: 'society', title: 'Society Image', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
        }),
        defineField({
          name: 'catering', title: 'Catering Image', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
        }),
        defineField({
          name: 'restaurant', title: 'Restaurant Image', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
        }),
      ]
    }),

    // --- LEADERSHIP & FACULTY ---
    defineField({
      name: 'chair',
      title: 'Program Chair',
      type: 'object',
      group: 'leadership',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'credentials', title: 'Credentials', type: 'string' }),
        defineField({ name: 'quote', title: 'Manifesto Quote', type: 'text', rows: 4 }),
        defineField({
          name: 'image', title: 'Chair Portrait', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
        }),
      ]
    }),
    defineField({
      name: 'faculty',
      title: 'Core Faculty Grid',
      type: 'array',
      group: 'leadership',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'specialty', title: 'Specialty Badge', type: 'string' }),
            defineField({ name: 'credentials', title: 'Credentials', type: 'string' }),
            defineField({
              name: 'image', title: 'Faculty Portrait', type: 'image', options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
            }),
          ]
        }
      ]
    }),

    // --- CAREER PATHWAYS ---
    defineField({
      name: 'pathways',
      title: 'Career Pathways & ROI',
      type: 'array',
      group: 'pathways',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'subtitle', title: 'Subtitle (Context)', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'roles', title: 'Target Roles', type: 'array', of: [{ type: 'string' }] })
          ]
        }
      ]
    }),

    // --- SEO ---
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hospitality Management Program Page' }
    },
  },
})
