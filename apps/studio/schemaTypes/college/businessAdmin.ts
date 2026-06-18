import { defineField, defineType } from 'sanity'
import { Briefcase, Search } from 'lucide-react'

export const businessAdmin = defineType({
    name: 'businessAdmin',
    title: 'Business Administration & Entrepreneurship',
    type: 'document',
    icon: Briefcase,
    groups: [
        { name: 'hero', title: 'Hero & Quick Facts', default: true },
        { name: 'overview', title: 'Program Overview' },
        { name: 'curriculum', title: 'Curriculum & Ecosystem' },
        { name: 'faculty', title: 'Faculty & Outcomes' },
        { name: 'seo', title: 'SEO', icon: Search },
    ],
    fields: [
        // --- Hero & Quick Facts ---
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
            description: 'Thumbnail displayed on the College Department hub page card. Recommended: 800x450px (16:9).',
            type: 'image',
            group: 'hero',
            options: { hotspot: true },
            fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
        }),
        defineField({
            name: 'quickFacts',
            title: 'Quick Facts',
            type: 'object',
            group: 'hero',
            fields: [
                defineField({ name: 'duration', title: 'Duration', type: 'string', initialValue: '4 Years' }),
                defineField({ name: 'units', title: 'Units', type: 'string', initialValue: '144 Units' }),
                defineField({ name: 'format', title: 'Format', type: 'string', initialValue: 'On-Campus & Practicum' }),
            ]
        }),
        defineField({
            name: 'tracks',
            title: 'Degree Tracks Matrix',
            type: 'array',
            group: 'hero',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Title', type: 'string' }),
                        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
                        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                    ]
                }
            ]
        }),

        // --- Overview & Manifesto ---
        defineField({
            name: 'overviewMainImage',
            title: 'Overview Main Image',
            type: 'image',
            group: 'overview',
            options: { hotspot: true },
            fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
            name: 'overviewSubImage',
            title: 'Overview Sub Image',
            type: 'image',
            group: 'overview',
            options: { hotspot: true },
            fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
            name: 'outcomes',
            title: 'Program Outcomes (Why OLOPSC Business)',
            type: 'array',
            group: 'overview',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Title', type: 'string' }),
                        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                    ]
                }
            ]
        }),

        // --- Curriculum Engine & Ecosystem ---
        defineField({
            name: 'curriculumTracks',
            title: 'Curriculum Engine Tracks',
            type: 'array',
            group: 'curriculum',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'id', title: 'Track ID', type: 'string', description: 'e.g., hrm, mm, ent' }),
                        defineField({ name: 'name', title: 'Track Name', type: 'string' }),
                        defineField({
                            name: 'roadmap',
                            title: 'Roadmap',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'year', title: 'Year', type: 'string' }),
                                        defineField({ name: 'title', title: 'Theme/Title', type: 'string' }),
                                        defineField({ name: 'subjects', title: 'Subjects', type: 'array', of: [{ type: 'string' }] }),
                                    ]
                                }
                            ]
                        })
                    ]
                }
            ]
        }),
        defineField({
            name: 'ecosystemImages',
            title: 'Department Ecosystem Images',
            type: 'object',
            group: 'curriculum',
            fields: [
                defineField({ name: 'incubator', title: 'Startup Incubator', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] }),
                defineField({ name: 'strategy', title: 'Corporate Strategy Lab', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] }),
                defineField({ name: 'pitch', title: 'Executive Pitch Arena', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] }),
                defineField({ name: 'networking', title: 'Industry Networking Hub', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] }),
            ]
        }),

        // --- Faculty & Pathways ---
        defineField({
            name: 'chair',
            title: 'Program Chair',
            type: 'object',
            group: 'faculty',
            fields: [
                defineField({ name: 'name', title: 'Name', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'credentials', title: 'Credentials', type: 'string' }),
                defineField({ name: 'quote', title: 'Manifesto Quote', type: 'text', rows: 4 }),
                defineField({ name: 'image', title: 'Portrait', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] }),
            ]
        }),
        defineField({
            name: 'faculty',
            title: 'Faculty Spotlight',
            type: 'array',
            group: 'faculty',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', title: 'Name', type: 'string' }),
                        defineField({ name: 'specialty', title: 'Specialty', type: 'string' }),
                        defineField({ name: 'credentials', title: 'Credentials', type: 'string' }),
                        defineField({ name: 'image', title: 'Portrait', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] }),
                    ]
                }
            ]
        }),
        defineField({
            name: 'pathways',
            title: 'Career Pathways & ROI',
            type: 'array',
            group: 'faculty',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Pathway Title', type: 'string' }),
                        defineField({ name: 'subtitle', title: 'Subtitle (e.g., BSBA - HRM Trajectory)', type: 'string' }),
                        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                        defineField({ name: 'roles', title: 'Target Roles', type: 'array', of: [{ type: 'string' }] }),
                    ]
                }
            ]
        }),

        // --- SEO ---
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            group: 'seo',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Business Admin & Entrepreneurship' }
        },
    },
})
