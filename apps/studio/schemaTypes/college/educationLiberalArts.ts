import { defineField, defineType } from 'sanity'
import { GraduationCap, BookOpen, Search, ImageIcon } from 'lucide-react'

export const educationLiberalArts = defineType({
  name: 'educationLiberalArts',
  title: 'Education & Liberal Arts',
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
    defineField({
      name: 'title',
      title: 'Department Title',
      type: 'string',
      initialValue: 'College of Education & Liberal Arts',
      group: 'hero',
    }),

    // --- HERO & QUICK FACTS ---
    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'cardThumbnail',
      title: 'Card Thumbnail (Hub Page)',
      description: 'Thumbnail displayed on the College Department hub page card. Recommended: 800×450px (16:9).',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'quickFacts',
      title: 'Quick Facts',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'duration', title: 'Duration', type: 'string', initialValue: '4 Years' }),
        defineField({ name: 'units', title: 'Total Units', type: 'string', initialValue: '145+ Units' }),
        defineField({ name: 'format', title: 'Format', type: 'string', initialValue: 'On-Campus & Teaching Practicum' }),
      ],
    }),

    // --- PROGRAM OVERVIEW ---
    defineField({
      name: 'overviewMainImage',
      title: 'Overview Main Image (Back/Bottom-Left)',
      type: 'image',
      group: 'overview',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'overviewSubImage',
      title: 'Overview Sub Image (Front/Top-Right)',
      type: 'image',
      group: 'overview',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
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
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),

    // --- CURRICULUM ---
    defineField({
      name: 'curriculumTracks',
      title: 'Curriculum Tracks',
      type: 'array',
      group: 'curriculum',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'Track ID (e.g. beed, bsed, bael)', type: 'string' }),
            defineField({ name: 'name', title: 'Track Name', type: 'string' }),
            defineField({
              name: 'roadmap',
              title: 'Roadmap',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'year', title: 'Year (e.g. Year 1)', type: 'string' }),
                    defineField({ name: 'title', title: 'Title', type: 'string' }),
                    defineField({ name: 'subjects', title: 'Subjects', type: 'array', of: [{ type: 'string' }] }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    // --- ECOSYSTEM ---
    defineField({
      name: 'ecosystemImages',
      title: 'Department Ecosystem Images',
      type: 'object',
      group: 'ecosystem',
      fields: [
        defineField({
          name: 'modelClassroom', title: 'Interactive Model Classroom', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
          name: 'speechLab', title: 'Digital Phonetics & Speech Suite', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
          name: 'literacyHub', title: 'The Literary & Publishing Workstation', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
          name: 'resourceCenter', title: 'Curriculum Design & Media Lab', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
      ],
    }),

    // --- LEADERSHIP & FACULTY ---
    defineField({
      name: 'chair',
      title: 'Program Chair / Lead Instructor',
      type: 'object',
      group: 'leadership',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'title', title: 'Title / Designation', type: 'string' }),
        defineField({ name: 'credentials', title: 'Credentials', type: 'string' }),
        defineField({ name: 'quote', title: 'Manifesto Quote', type: 'text', rows: 4 }),
        defineField({
          name: 'image', title: 'Chair Portrait', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
      ],
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
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
          ],
        },
      ],
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
            defineField({ name: 'iconPath', title: 'Icon SVG Path', type: 'string' }),
            defineField({ name: 'roles', title: 'Target Roles', type: 'array', of: [{ type: 'string' }] }),
          ],
        },
      ],
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
      return { title: 'Education & Liberal Arts Page' }
    },
  },
})
