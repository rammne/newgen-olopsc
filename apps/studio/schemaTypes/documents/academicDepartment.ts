import { defineField, defineType } from 'sanity'
import { School, BookOpen, Image, Search } from 'lucide-react'

export const academicDepartment = defineType({
  name: 'academicDepartment',
  title: 'Academic Department',
  type: 'document',
  icon: School,
  groups: [
    { name: 'basics', title: 'Basics', icon: School, default: true },
    { name: 'content', title: 'Content', icon: BookOpen },
    { name: 'media', title: 'Media & Social Proof', icon: Image },
    { name: 'seo', title: 'SEO', icon: Search },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Department Title',
      type: 'string',
      description: 'e.g., "Preschool", "Grade School", "College Department"',
      validation: (Rule) => Rule.required(),
      group: 'basics',
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
      group: 'basics',
    }),
    defineField({
      name: 'departmentType',
      title: 'Department Type',
      type: 'string',
      options: {
        list: [
          { title: 'Preschool', value: 'preschool' },
          { title: 'Grade School', value: 'gradeSchool' },
          { title: 'Junior High School', value: 'juniorHigh' },
          { title: 'Senior High School', value: 'seniorHigh' },
          { title: 'College Department', value: 'college' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'basics',
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
      title: 'Introduction Section',
      type: 'object',
      description: 'Keep it visual and concise!',
      group: 'content',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Short, impactful headline',
          validation: (Rule) => Rule.max(100),
        }),
        defineField({
          name: 'content',
          title: 'Content (Brief)',
          type: 'text',
          rows: 3,
          description: 'Short introduction - 2-3 sentences max',
          validation: (Rule) => Rule.max(300),
        }),
        defineField({
          name: 'image',
          title: 'Featured Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Primary visual element',
        }),
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Overview Section',
      type: 'object',
      description: 'Overview content with optional background image',
      group: 'content',
      fields: [
        defineField({
          name: 'content',
          title: 'Content (Brief)',
          type: 'text',
          rows: 3,
          description: 'Short overview - 2-3 sentences max. Use Story Blocks below for visual storytelling.',
          validation: (Rule) => Rule.max(300),
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Optional background image for the overview section',
        }),
      ],
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features/Highlights',
      type: 'array',
      of: [{ type: 'feature' }],
      description: 'What makes this department special',
      group: 'content',
    }),
    defineField({
      name: 'curriculum',
      title: 'Curriculum Section',
      type: 'object',
      group: 'content',
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
          name: 'highlights',
          title: 'Curriculum Highlights',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'programs',
      title: 'Programs/Offerings',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Program Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'link',
              title: 'Link to Program Page',
              type: 'reference',
              to: [{ type: 'collegeProgram' }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'faculty',
      title: 'Featured Faculty',
      type: 'array',
      of: [{ type: 'facultyMember' }],
      group: 'content',
    }),
    defineField({
      name: 'admissionInfo',
      title: 'Admission Information',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content (Brief)',
          type: 'text',
          rows: 2,
          description: 'Keep it concise - 1-2 sentences',
          validation: (Rule) => Rule.max(200),
        }),
        defineField({
          name: 'requirements',
          title: 'Requirements',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'image',
          title: 'Featured Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'cta',
          title: 'Call-to-Action',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights Photo Collage',
      type: 'object',
      description: 'Bento-style photo collage showcasing department highlights (exactly 6 images)',
      group: 'media',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.length(6).error('Please add exactly 6 images for the highlights collage'),
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials (Parents/Students)',
      description: 'Add testimonials from parents, students, or alumni here.',
      type: 'array',
      of: [{ type: 'testimonial' }],
      group: 'media',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{ type: 'stats' }],
      description: 'Key statistics about this department',
      group: 'media',
    }),
    defineField({
      name: 'sections',
      title: 'Additional Content Sections (Legacy)',
      type: 'array',
      of: [{ type: 'section' }],
      description: 'Legacy text-heavy sections - Consider using Story Blocks instead for visual storytelling',
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
      type: 'departmentType',
    },
    prepare({ title, type }) {
      return {
        title: title || 'Academic Department',
        subtitle: type || '',
      }
    },
  },
})
