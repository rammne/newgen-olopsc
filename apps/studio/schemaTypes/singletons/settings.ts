import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Main site title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline or slogan',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon',
    }),
    defineField({
      name: 'contact',
      title: 'Global Contact Information',
      type: 'contactInfo',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
    defineField({
      name: 'address',
      title: 'School Address',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Street Address',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
        }),
        defineField({
          name: 'state',
          title: 'State/Province',
          type: 'string',
        }),
        defineField({
          name: 'zipCode',
          title: 'ZIP/Postal Code',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        defineField({
          name: 'mainMenu',
          title: 'Main Menu Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'link',
                  title: 'Link',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'type',
                      title: 'Link Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Internal Page', value: 'internal'},
                          {title: 'External URL', value: 'external'},
                          {title: 'Anchor', value: 'anchor'},
                        ],
                      },
                      initialValue: 'internal',
                    }),
                    defineField({
                      name: 'internal',
                      title: 'Internal Page',
                      type: 'reference',
                      to: [
                        {type: 'homePage'},
                        {type: 'aboutPage'},
                        {type: 'academicDepartment'},
                        {type: 'collegeProgram'},
                        {type: 'news'},
                      ],
                      hidden: ({parent}) => parent?.type !== 'internal',
                    }),
                    defineField({
                      name: 'external',
                      title: 'External URL',
                      type: 'url',
                      hidden: ({parent}) => parent?.type !== 'external',
                    }),
                    defineField({
                      name: 'anchor',
                      title: 'Anchor ID',
                      type: 'string',
                      hidden: ({parent}) => parent?.type !== 'anchor',
                    }),
                  ],
                }),
                defineField({
                  name: 'children',
                  title: 'Submenu Items',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'label',
                          title: 'Label',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'link',
                          title: 'Link',
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'type',
                              title: 'Link Type',
                              type: 'string',
                              options: {
                                list: [
                                  {title: 'Internal Page', value: 'internal'},
                                  {title: 'External URL', value: 'external'},
                                ],
                              },
                              initialValue: 'internal',
                            }),
                            defineField({
                              name: 'internal',
                              title: 'Internal Page',
                              type: 'reference',
                              to: [
                                {type: 'academicDepartment'},
                                {type: 'collegeProgram'},
                                {type: 'news'},
                              ],
                              hidden: ({parent}) => parent?.type !== 'internal',
                            }),
                            defineField({
                              name: 'external',
                              title: 'External URL',
                              type: 'url',
                              hidden: ({parent}) => parent?.type !== 'external',
                            }),
                          ],
                        }),
                      ],
                    },
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
        }),
        defineField({
          name: 'columns',
          title: 'Footer Columns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Column Title',
                  type: 'string',
                }),
                defineField({
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'label',
                          title: 'Label',
                          type: 'string',
                        }),
                        defineField({
                          name: 'url',
                          title: 'URL',
                          type: 'url',
                        }),
                      ],
                    },
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
      description: 'Default SEO settings for the site',
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        }),
        defineField({
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
        }),
        defineField({
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})

