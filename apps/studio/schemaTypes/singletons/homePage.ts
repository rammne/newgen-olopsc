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
        defineField({
          name: 'cta',
          title: 'Call-to-Action Button',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      name: 'keyStats',
      title: 'Key Statistics',
      type: 'object',
      description: 'Showcase impressive numbers (CREDIBILITY)',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Background image for the stats section',
        }),
        defineField({
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [{type: 'stats'}],
          validation: (Rule) => Rule.max(6),
        }),
      ],
    }),
    defineField({
      name: 'presidentMessage',
      title: "President's Message",
      type: 'object',
      description: 'A dedicated section for the President\'s message',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: "President's Message",
        }),
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 3,
          description: 'Short highlight quote from the president',
        }),
        defineField({
          name: 'message',
          title: 'Message',
          type: 'portableText',
          description: 'The main message content',
        }),
        defineField({
          name: 'presidentName',
          title: 'President Name',
          type: 'string',
          initialValue: 'Armida Salvador Samaniego, PhD',
        }),
        defineField({
          name: 'presidentRole',
          title: 'President Role/Title',
          type: 'string',
          initialValue: 'President',
        }),
        defineField({
          name: 'presidentImage',
          title: 'President Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'sRice',
      title: 'S-RICE Section',
      type: 'object',
      description: 'Spirituality, Responsibility and Respect, Integrity, Caring Culture, and Excellence',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'S-RICE',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'items',
          title: 'S-RICE Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'letter',
                  title: 'Letter',
                  type: 'string',
                  description: 'The letter in S-RICE (S, R, I, C, or E)',
                  validation: (Rule) => Rule.required().max(1),
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  description: 'Full title (e.g., "Spirituality", "Responsibility and Respect")',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  letter: 'letter',
                  title: 'title',
                  media: 'image',
                },
                prepare({letter, title, media}) {
                  return {
                    title: `${letter}: ${title}`,
                    media: media,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(5).max(5),
        }),
      ],
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
          title: 'College Programs',
          type: 'array',
          description: 'Select up to 6 college programs to display in a bento grid layout',
          of: [
            {
              type: 'reference',
              to: [{type: 'collegeProgram'}],
            },
          ],
          validation: (Rule) => Rule.max(6).error('Please select up to 6 programs'),
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

