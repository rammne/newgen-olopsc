import {defineField, defineType} from 'sanity'

export const stats = defineType({
  name: 'stats',
  title: 'Statistics/Numbers',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The number or statistic (e.g., "95%", "1000+", "50")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Description of the statistic (e.g., "Graduation Rate", "Students")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional icon name or emoji',
    }),
    defineField({
      name: 'prefix',
      title: 'Prefix',
      type: 'string',
      description: 'Text before value (e.g., "$", "~")',
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'Text after value (e.g., "%", "+", "years")',
    }),
  ],
  preview: {
    select: {
      value: 'value',
      label: 'label',
      prefix: 'prefix',
      suffix: 'suffix',
    },
    prepare({value, label, prefix, suffix}) {
      const displayValue = [prefix, value, suffix].filter(Boolean).join('')
      return {
        title: displayValue || value,
        subtitle: label,
      }
    },
  },
})

