import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: '2yzstkat',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

export async function GET() {
  const query = `*[_type == "slider"]{
    _id,
    title,
    subtitle,
    "imageUrl": image.asset->url,
    buttonText,
    buttonLink
  }`

  const sliders = await client.fetch(query)
  return NextResponse.json(sliders)
}