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
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
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
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
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
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'object',
      group: 'content',
      description: 'Used primarily for Grade School to list specific learning goals.',
      fields: [
        defineField({
          name: 'generalObjective',
          title: 'General Objective',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'specificObjectives',
          title: 'Specific Objectives',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
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
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
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
      name: 'trackClusters',
      title: 'Track Clusters (Senior High School)',
      type: 'object',
      group: 'content',
      description: 'Use this specifically for Senior High School to display the Track Clusters UI.',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'clusters',
          title: 'Clusters',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Cluster Name', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'description', title: 'Description (Optional)', type: 'text', rows: 2 }),
                defineField({ name: 'tracks', title: 'Tracks', type: 'array', of: [{ type: 'string' }] }),
              ],
            },
          ],
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
      name: 'academicProgression',
      title: 'Academic Progression / Stepping Stones',
      type: 'array',
      group: 'content',
      description: 'Used to outline the progression through different grade levels (e.g., Lower Primary, Upper Primary).',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title (e.g., Lower Primary)', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Subtitle (e.g., Mastering the Basics)', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
          ],
        },
      ],
    }),
    defineField({
      name: 'dean',
      title: 'Dean / Academic Leadership',
      type: 'object',
      group: 'content',
      description: 'Used primarily for College Department to showcase the Dean.',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Designation / Position',
          type: 'string',
        }),
        defineField({
          name: 'credentials',
          title: 'Credentials / Degrees',
          type: 'string',
        }),
        defineField({
          name: 'quote',
          title: 'Message from the Dean',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'image',
          title: 'Dean Portrait',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
      ],
    }),
    defineField({
      name: 'extracurricular',
      title: 'Holistic Growth & Extracurriculars',
      type: 'object',
      group: 'content',
      description: 'Used primarily for Grade School to showcase extracurricular activities.',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
          description: 'Image for the extracurricular / holistic growth section.',
        }),
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
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
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
      name: 'sectionImages',
      title: 'Section-Specific Images',
      type: 'array',
      group: 'media',
      description: 'Upload images for specific page sections (e.g., "4-Year Journey", "Mentorship", "Extracurriculars"). Each image has a label so you know which section it belongs to. These are separate from the Campus Life / Facility Tour gallery.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'sectionLabel',
              title: 'Section Label',
              type: 'string',
              description: 'Which section this image is for, e.g., "4-Year Journey Image", "Mentorship Section Image", "Extracurricular Image"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'sectionLabel',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'facilitiesHeader',
      title: 'Facilities Header',
      type: 'object',
      group: 'media',
      description: 'Header text for the Facilities Tour / Campus Life section.',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'facilityTourImages',
      title: 'Campus Life / Facility Tour Images',
      type: 'array',
      description: 'Upload images showcasing campus life, facilities (classrooms, labs, student orgs, etc.). Used in the Campus Life / Guided Facilities Tour section. College Dept requires 6 images for the full layout.',
      group: 'media',
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
              description: 'Describe what is shown in the image for accessibility.',
            }),
            defineField({
              name: 'caption',
              title: 'Caption / Title (Optional)',
              type: 'string',
              description: 'e.g., "Modern Computer Labs", "Active Student Organizations"',
            }),
            defineField({
              name: 'description',
              title: 'Description (Optional)',
              type: 'text',
              rows: 3,
              description: 'A brief description of this aspect of campus life or facility.',
            }),
          ],
        },
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
      name: 'industryPartners',
      title: 'Industry Partners',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'companyName', title: 'Company Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'logo', title: 'Company Logo', type: 'image', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'companyName', media: 'logo' },
          },
        },
      ],
      description: 'Logos of industry partners and internship pathways',
    }),
    defineField({
      name: 'outcomeStats',
      title: 'Outcome Statistics',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'context', title: 'Context/Subtext', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'alumniStories',
      title: 'Alumni Stories',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'degree', title: 'Degree', type: 'string' }),
            defineField({ name: 'batch', title: 'Batch/Class', type: 'string' }),
            defineField({ name: 'role', title: 'Job Role', type: 'string' }),
            defineField({ name: 'company', title: 'Company', type: 'string' }),
            defineField({ name: 'quote', title: 'Quote/Testimonial', type: 'text', rows: 4 }),
            defineField({ name: 'image', title: 'Profile Image', type: 'image', options: { hotspot: true } }),
          ],
        },
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
