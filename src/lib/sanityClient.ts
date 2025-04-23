import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '2yzstkat',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})