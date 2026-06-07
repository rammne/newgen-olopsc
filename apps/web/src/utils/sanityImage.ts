import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '../lib/sanity/client';

// Initialize the builder with your Sanity client
const builder = imageUrlBuilder(client);

/**
 * Helper function to generate optimized Sanity image URLs.
 * Enforces WebP/AVIF auto-formatting and 80% quality at the CDN edge.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').quality(80);
}

/**
 * Alternative method for explicit format enforcement.
 */
export function urlForStrictWebp(source: SanityImageSource) {
  return builder.image(source).format('webp').quality(80);
}
