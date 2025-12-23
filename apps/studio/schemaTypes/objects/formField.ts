import {defineField, defineType} from 'sanity'

export const formField = defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Field Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Field Type',
      type: 'string',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'tel'},
          {title: 'Textarea', value: 'textarea'},
          {title: 'Select', value: 'select'},
          {title: 'Checkbox', value: 'checkbox'},
          {title: 'Radio', value: 'radio'},
          {title: 'Date', value: 'date'},
          {title: 'File Upload', value: 'file'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder Text',
      type: 'string',
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{type: 'string'}],
      description: 'For select, radio, or checkbox fields',
      hidden: ({parent}) =>
        !['select', 'radio', 'checkbox'].includes(parent?.type || ''),
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'validation',
      title: 'Validation',
      type: 'object',
      fields: [
        defineField({
          name: 'minLength',
          title: 'Minimum Length',
          type: 'number',
        }),
        defineField({
          name: 'maxLength',
          title: 'Maximum Length',
          type: 'number',
        }),
        defineField({
          name: 'pattern',
          title: 'Pattern (Regex)',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      label: 'label',
      type: 'type',
      required: 'required',
    },
    prepare({label, type, required}) {
      return {
        title: label || 'Form Field',
        subtitle: `${type || 'text'}${required ? ' (required)' : ''}`,
      }
    },
  },
})

