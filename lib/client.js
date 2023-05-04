import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'mxhqqobi',
    dataset: 'production',
    apiVersion:'2023-04-21',
    useCdn:true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
