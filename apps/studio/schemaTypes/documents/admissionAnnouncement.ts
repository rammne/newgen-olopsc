import { defineField, defineType } from 'sanity'
import { Megaphone } from 'lucide-react'

export const admissionAnnouncement = defineType({
  name: 'admissionAnnouncement',
  title: 'Admission Announcement',
  type: 'document',
  icon: Megaphone,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal label for this announcement (not shown on the website)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Announcement Message',
      type: 'text',
      rows: 2,
      description: 'The announcement text that will appear on the notification bar',
      validation: (Rule) => Rule.required().max(200).warning('Keep the message concise (under 200 characters) for best display'),
    }),
    defineField({
      name: 'linkUrl',
      title: 'Redirect URL',
      type: 'string',
      description: 'The page URL where users will be redirected when they click the announcement (e.g., /admissions)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text (Optional)',
      type: 'string',
      description: 'Optional call-to-action text appended to the message (e.g., "Click here to begin!"). If left empty, the entire message will be clickable.',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle this announcement to display it on the website. Only one announcement can be active at a time.',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (isActive, context) => {
          if (!isActive) return true

          const client = context.getClient({ apiVersion: '2024-01-01' })
          const currentId = context.document?._id?.replace('drafts.', '')

          const otherActive = await client.fetch(
            `count(*[_type == "admissionAnnouncement" && isActive == true && !(_id in [$currentId, "drafts." + $currentId])])`,
            { currentId }
          )

          if (otherActive > 0) {
            return 'Another announcement is already active. Please deactivate it first before activating this one.'
          }

          return true
        }),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      message: 'message',
      isActive: 'isActive',
    },
    prepare({ title, message, isActive }) {
      return {
        title: `${isActive ? '✅ ' : ''}${title || 'Untitled Announcement'}`,
        subtitle: message || 'No message set',
      }
    },
  },
  orderings: [
    {
      title: 'Created Date, Newest',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
