import {defineField, defineType} from 'sanity'

export const academicDepartment = defineType({
  name: 'academicDepartment',
  title: 'Academic Department',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Department Title',
      type: 'string',
      description: 'e.g., "Preschool", "Grade School", "College Department"',
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
      name: 'departmentType',
      title: 'Department Type',
      type: 'string',
      options: {
        list: [
          {title: 'Preschool', value: 'preschool'},
          {title: 'Grade School', value: 'gradeSchool'},
          {title: 'Junior High School', value: 'juniorHigh'},
          {title: 'Senior High School', value: 'seniorHigh'},
          {title: 'College Department', value: 'college'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction Section',
      type: 'object',
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
      name: 'overview',
      title: 'Overview',
      type: 'portableText',
      description: 'Main content describing the department',
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features/Highlights',
      type: 'array',
      of: [{type: 'feature'}],
      description: 'What makes this department special',
    }),
    defineField({
      name: 'curriculum',
      title: 'Curriculum Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'portableText',
        }),
        defineField({
          name: 'highlights',
          title: 'Curriculum Highlights',
          type: 'array',
          of: [{type: 'string'}],
        }),
      ],
    }),
    defineField({
      name: 'programs',
      title: 'Programs/Offerings',
      type: 'array',
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
              to: [{type: 'collegeProgram'}],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'faculty',
      title: 'Featured Faculty',
      type: 'array',
      of: [{type: 'facultyMember'}],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{type: 'testimonial'}],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{type: 'stats'}],
      description: 'Key statistics about this department',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'gallery',
    }),
    defineField({
      name: 'admissionInfo',
      title: 'Admission Information',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'portableText',
        }),
        defineField({
          name: 'requirements',
          title: 'Requirements',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'cta',
          title: 'Call-to-Action',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Additional Content Sections',
      type: 'array',
      of: [{type: 'section'}],
      description: 'Flexible content sections for storytelling',
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
      type: 'departmentType',
    },
    prepare({title, type}) {
      return {
        title: title || 'Academic Department',
        subtitle: type || '',
      }
    },
  },
})

