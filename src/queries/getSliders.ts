import { sanityClient } from '@/lib/sanityClient'

export async function getSliders() {
  const query = `*[_type == "slider"]{
    _id,
    title,
    subtitle,
    "imageUrl": image.asset->url,
    buttonText,
    buttonLink
  }`

  return await sanityClient.fetch(query)
}