import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: '6b5ln4gy',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

