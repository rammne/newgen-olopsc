import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      description: 'Main hero section - first impression (ATTENTION)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction Section',
      type: 'object',
      description: 'Hook visitors with your story (INTEREST) - Keep it visual and concise!',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Short, impactful headline',
          validation: (Rule) => Rule.max(100),
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
          description: 'Brief subheadline (1-2 sentences max)',
          validation: (Rule) => Rule.max(200),
        }),
        defineField({
          name: 'image',
          title: 'Featured Image',
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/jpeg,image/png,image/webp',
          },
          description: 'Primary visual element (JPEG, PNG, or WebP only)',
          validation: (Rule) =>
            Rule.custom((value) => {
              if (!value?.asset) return true
              const assetRef = value.asset._ref || ''
              const extension = assetRef.split('-').pop()?.split('.')[1]?.toLowerCase()
              if (extension && !['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
                return 'Image must be in JPEG, PNG, or WebP format'
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'keyStats',
      title: 'Key Statistics',
      type: 'array',
      of: [{type: 'stats'}],
      description: 'Showcase impressive numbers (CREDIBILITY)',
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'academicDepartments',
      title: 'Academic Departments Preview',
      type: 'object',
      description: 'Showcase academic offerings (DESIRE)',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'departments',
          title: 'Featured Departments',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{type: 'academicDepartment'}],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'programsPreview',
      title: 'Programs Preview',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'programs',
          title: 'Featured Programs',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{type: 'collegeProgram'}],
            },
          ],
        }),
        defineField({
          name: 'cta',
          title: 'Call-to-Action',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      description: 'Social proof from students/parents (CREDIBILITY)',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [{type: 'testimonial'}],
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Key Features/Highlights',
      type: 'array',
      of: [{type: 'feature'}],
      description: 'What makes your school special',
    }),
    defineField({
      name: 'latestNews',
      title: 'Latest News Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'count',
          title: 'Number of Articles',
          type: 'number',
          initialValue: 3,
          validation: (Rule) => Rule.min(1).max(6),
        }),
        defineField({
          name: 'cta',
          title: 'View All News CTA',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      name: 'upcomingEvents',
      title: 'Upcoming Events Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'count',
          title: 'Number of Events',
          type: 'number',
          initialValue: 3,
          validation: (Rule) => Rule.min(1).max(6),
        }),
        defineField({
          name: 'cta',
          title: 'View All Events CTA',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      name: 'finalCta',
      title: 'Final Call-to-Action',
      type: 'object',
      description: 'Strong CTA to convert visitors (ACTION)',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'cta',
        }),
        defineField({
          name: 'secondaryCta',
          title: 'Secondary CTA',
          type: 'cta',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/jpeg,image/png,image/webp',
          },
          description: 'JPEG, PNG, or WebP only',
          validation: (Rule) =>
            Rule.custom((value) => {
              if (!value?.asset) return true
              const assetRef = value.asset._ref || ''
              const extension = assetRef.split('-').pop()?.split('.')[1]?.toLowerCase()
              if (extension && !['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
                return 'Image must be in JPEG, PNG, or WebP format'
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'storyBlocks',
      title: 'Visual Story Blocks',
      type: 'array',
      of: [{type: 'storyBlock'}],
      description: 'Visual storytelling blocks - Use images, videos, and short captions to tell your story. Keep text minimal!',
    }),
    defineField({
      name: 'sections',
      title: 'Additional Content Sections (Legacy)',
      type: 'array',
      of: [{type: 'section'}],
      description: 'Legacy text-heavy sections - Consider using Story Blocks instead for visual storytelling',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})

