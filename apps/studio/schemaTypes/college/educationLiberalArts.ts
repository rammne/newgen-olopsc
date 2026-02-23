import { defineField, defineType } from 'sanity'
import { GraduationCap, BookOpen, Search } from 'lucide-react'

export const educationLiberalArts = defineType({
    name: 'educationLiberalArts',
    title: 'Education & Liberal Arts',
    type: 'document',
    icon: GraduationCap,
    groups: [
        { name: 'content', title: 'Content', icon: GraduationCap, default: true },
        { name: 'programs', title: 'Programs & Curriculum', icon: BookOpen },
        { name: 'seo', title: 'SEO', icon: Search },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Department Title',
            type: 'string',
            initialValue: 'College of Education & Liberal Arts',
            readOnly: true,
            group: 'content',
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
            title: 'Introduction',
            type: 'object',
            group: 'content',
            fields: [
                defineField({ name: 'headline', title: 'Headline', type: 'string' }),
                defineField({ name: 'content', title: 'Content', type: 'portableText' }),
                defineField({ name: 'image', title: 'Intro Image', type: 'image', options: { hotspot: true } }),
            ],
        }),
        defineField({
            name: 'degree',
            title: 'Degrees Offered (Summary)',
            type: 'string',
            description: 'e.g. Bachelor of Elementary Education',
            group: 'content',
        }),
        defineField({
            name: 'duration',
            title: 'Program Duration',
            type: 'string',
            description: 'e.g. 4 Years',
            group: 'content',
        }),
        defineField({
            name: 'programs',
            title: 'Offered Programs',
            type: 'array',
            group: 'programs',
            of: [
                {
                    type: 'object',
                    title: 'Program',
                    fields: [
                        defineField({ name: 'title', title: 'Program Title', type: 'string' }),
                        defineField({ name: 'shortTitle', title: 'Abbreviation', type: 'string' }),
                        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'curriculum',
            title: 'Curriculum Highlights',
            type: 'object',
            group: 'programs',
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
                                defineField({ name: 'courses', title: 'Courses', type: 'array', of: [{ type: 'string' }] }),
                            ],
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: 'careerOpportunities',
            title: 'Career Opportunities',
            type: 'object',
            group: 'programs',
            fields: [
                defineField({ name: 'title', title: 'Section Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'careers', title: 'Careers List', type: 'array', of: [{ type: 'string' }] }),
                defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            ],
        }),
        defineField({
            name: 'keyFeatures',
            title: 'Key Features / Facilities',
            type: 'array',
            of: [{ type: 'feature' }],
            group: 'programs',
        }),
        defineField({
            name: 'gallery',
            title: 'Department Gallery',
            type: 'gallery',
            group: 'programs',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
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
