import {defineField, defineType} from 'sanity'

export const facultyMember = defineType({
  name: 'facultyMember',
  title: 'Faculty/Staff Member',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Degrees, certifications, etc.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      media: 'photo',
    },
    prepare({name, role, media}) {
      return {
        title: name || 'Faculty Member',
        subtitle: role || '',
        media: media,
      }
    },
  },
})

