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
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          description: 'Used as the department card image on the home page',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          hidden: ({ document }) => document?.departmentType !== 'gradeSchool',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 3,
          hidden: ({ document }) => document?.departmentType !== 'gradeSchool',
        }),
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Overview Section',
      type: 'object',
      description: 'Shown as the description on the department card on the home page',
      group: 'content',
      fields: [
        defineField({
          name: 'content',
          title: 'Content (Brief)',
          type: 'text',
          rows: 3,
          description: 'Short overview - 2-3 sentences max',
          validation: (Rule) => Rule.max(300),
        }),
      ],
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features/Highlights',
      type: 'object',
      group: 'content',
      description: 'Section heading and the feature cards beneath it',
      hidden: ({ document }) => !['gradeSchool'].includes(document?.departmentType as string),
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'items',
          title: 'Feature Cards',
          type: 'array',
          of: [{ type: 'feature' }],
        }),
      ],
    }),
    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'object',
      group: 'content',
      hidden: ({document}) => !['gradeSchool'].includes(document?.departmentType as string),
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
      name: 'academicProgression',
      title: 'Academic Progression / Stepping Stones',
      type: 'array',
      group: 'content',
      hidden: ({document}) => !['gradeSchool'].includes(document?.departmentType as string),
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
      hidden: ({document}) => !['college'].includes(document?.departmentType as string),
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
      hidden: ({document}) => !['gradeSchool'].includes(document?.departmentType as string),
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
      hidden: ({document}) => !['college'].includes(document?.departmentType as string),
    }),
    defineField({
      name: 'finalCta',
      title: 'Closing Section',
      type: 'object',
      group: 'content',
      description: 'Heading and copy for the call-to-action at the bottom of the page. The button itself is set in code.',
      hidden: ({ document }) => !['gradeSchool'].includes(document?.departmentType as string),
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'facilitiesHeader',
      title: 'Facilities Header',
      type: 'object',
      group: 'media',
      hidden: ({ document }) => !['gradeSchool'].includes(document?.departmentType as string),
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
      hidden: ({ document }) => !['gradeSchool', 'college'].includes(document?.departmentType as string),
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
      name: 'industryPartners',
      title: 'Industry Partners',
      type: 'array',
      group: 'content',
      hidden: ({document}) => !['college'].includes(document?.departmentType as string),
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
      hidden: ({document}) => !['college'].includes(document?.departmentType as string),
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
      hidden: ({document}) => !['college'].includes(document?.departmentType as string),
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
      hidden: ({ document }) => !['gradeSchool', 'college'].includes(document?.departmentType as string),
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
