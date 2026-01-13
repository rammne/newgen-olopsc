import { defineField, defineType } from 'sanity'

export const hospitalityManagement = defineType({
    name: 'hospitalityManagement',
    title: 'Hospitality Management',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Department Title',
            type: 'string',
            initialValue: 'College of Hospitality Management',
            readOnly: true,
        }),
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'hero',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'intro',
            title: 'Introduction',
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
                    title: 'Intro Image',
                    type: 'image',
                    options: { hotspot: true },
                })
            ]
        }),
        defineField({
            name: 'degree',
            title: 'Degrees Offered (Summary)',
            type: 'string',
            description: 'e.g. BS Hospitality Management',
        }),
        defineField({
            name: 'duration',
            title: 'Program Duration',
            type: 'string',
            description: 'e.g. 4 Years',
        }),
        defineField({
            name: 'programs',
            title: 'Offered Programs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Program',
                    fields: [
                        defineField({ name: 'title', title: 'Program Title', type: 'string' }),
                        defineField({ name: 'shortTitle', title: 'Abbreviation', type: 'string' }),
                        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
                    ]
                }
            ]
        }),
        defineField({
            name: 'curriculum',
            title: 'Curriculum Highlights',
            type: 'object',
            fields: [
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({
                    name: 'courses',
                    title: 'Featured Courses',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                defineField({ name: 'year', title: 'Year Level', type: 'string' }),
                                defineField({ name: 'courses', title: 'Courses', type: 'array', of: [{ type: 'string' }] })
                            ]
                        }
                    ]
                })
            ]
        }),
        defineField({
            name: 'careerOpportunities',
            title: 'Career Opportunities',
            type: 'object',
            fields: [
                defineField({ name: 'title', title: 'Section Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'careers', title: 'Careers List', type: 'array', of: [{ type: 'string' }] }),
                defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } })
            ]
        }),
        defineField({
            name: 'keyFeatures',
            title: 'Key Features / facilities',
            type: 'array',
            of: [{ type: 'feature' }]
        }),
        defineField({
            name: 'gallery',
            title: 'Department Gallery',
            type: 'gallery',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Hospitality Management Page' }
        }
    }
})
