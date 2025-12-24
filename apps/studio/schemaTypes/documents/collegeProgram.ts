import {defineField, defineType} from 'sanity'

export const collegeProgram = defineType({
  name: 'collegeProgram',
  title: 'College Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      description: 'e.g., "Bachelor of Science in Computer Science"',
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'shortTitle',
      title: 'Short Title/Abbreviation',
      type: 'string',
      description: 'e.g., "BSCS", "BSIT"',
    }),
    defineField({
      name: 'category',
      title: 'Program Category',
      type: 'string',
      options: {
        list: [
          {title: 'Engineering', value: 'engineering'},
          {title: 'Business', value: 'business'},
          {title: 'Education', value: 'education'},
          {title: 'Arts & Sciences', value: 'arts'},
          {title: 'Health Sciences', value: 'health'},
          {title: 'Technology', value: 'technology'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Program Overview (Brief)',
      type: 'text',
      description: 'Short overview - 2-3 sentences max. Use Story Blocks below for visual storytelling.',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "4 years", "2 years"',
    }),
    defineField({
      name: 'degree',
      title: 'Degree Awarded',
      type: 'string',
      description: 'e.g., "Bachelor of Science", "Associate Degree"',
    }),
    defineField({
      name: 'careerOpportunities',
      title: 'Career Opportunities',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description (Brief)',
          type: 'text',
          rows: 2,
          description: 'Keep it short - 1-2 sentences',
          validation: (Rule) => Rule.max(200),
        }),
        defineField({
          name: 'careers',
          title: 'Career Paths',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'image',
          title: 'Featured Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Visual element for career opportunities',
        }),
      ],
    }),
    defineField({
      name: 'curriculum',
      title: 'Curriculum',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Description (Brief)',
          type: 'text',
          rows: 2,
          description: 'Short description - 1-2 sentences',
          validation: (Rule) => Rule.max(200),
        }),
        defineField({
          name: 'image',
          title: 'Curriculum Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Visual representation of the curriculum',
        }),
        defineField({
          name: 'courses',
          title: 'Key Courses',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'year',
                  title: 'Year Level',
                  type: 'string',
                  options: {
                    list: [
                      {title: '1st Year', value: '1'},
                      {title: '2nd Year', value: '2'},
                      {title: '3rd Year', value: '3'},
                      {title: '4th Year', value: '4'},
                    ],
                  },
                }),
                defineField({
                  name: 'courses',
                  title: 'Courses',
                  type: 'array',
                  of: [{type: 'string'}],
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'admissionRequirements',
      title: 'Admission Requirements',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'requirements',
          title: 'Requirements',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'additionalInfo',
          title: 'Additional Information (Brief)',
          type: 'text',
          rows: 2,
          description: 'Keep it concise',
          validation: (Rule) => Rule.max(200),
        }),
        defineField({
          name: 'image',
          title: 'Featured Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'faculty',
      title: 'Program Faculty',
      type: 'array',
      of: [{type: 'facultyMember'}],
    }),
    defineField({
      name: 'testimonials',
      title: 'Student/Alumni Testimonials',
      type: 'array',
      of: [{type: 'testimonial'}],
    }),
    defineField({
      name: 'features',
      title: 'Program Features',
      type: 'array',
      of: [{type: 'feature'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Program Gallery',
      type: 'gallery',
    }),
    defineField({
      name: 'storyBlocks',
      title: 'Visual Story Blocks',
      type: 'array',
      of: [{type: 'storyBlock'}],
      description: 'Visual storytelling blocks - Use images, videos, and short captions to showcase the program. Keep text minimal!',
    }),
    defineField({
      name: 'sections',
      title: 'Additional Content Sections (Legacy)',
      type: 'array',
      of: [{type: 'section'}],
      description: 'Legacy text-heavy sections - Consider using Story Blocks instead for visual storytelling',
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-Action',
      type: 'cta',
      description: 'CTA for applying or learning more',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      shortTitle: 'shortTitle',
      category: 'category',
    },
    prepare({title, shortTitle, category}) {
      return {
        title: title || 'College Program',
        subtitle: [shortTitle, category].filter(Boolean).join(' • ') || '',
      }
    },
  },
})

