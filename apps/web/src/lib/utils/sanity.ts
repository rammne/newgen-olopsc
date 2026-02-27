/**
 * Utility functions for working with Sanity data
 */

/**
 * Get Sanity image URL with optional transformations
 */
export function getSanityImageUrl(
  image: {
    asset?: {
      url?: string
      _id?: string
    }
  } | null | undefined,
  options?: {
    width?: number
    height?: number
    quality?: number
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  }
): string {
  if (!image?.asset) {
    return ''
  }

  const baseUrl = image.asset.url || `https://cdn.sanity.io/images/6b5ln4gy/production/${image.asset._id}`

  // If no transformation options are passed, return the raw CDN URL (fastest, fully cached)
  if (!options) {
    return baseUrl
  }

  const params = new URLSearchParams()

  // Serve modern formats (WebP/AVIF) to browsers that support them
  params.set('auto', 'format')

  // Default quality of 75 — good balance between file size and visual quality
  params.set('q', options.quality?.toString() || '75')

  if (options.width) params.set('w', options.width.toString())
  if (options.height) params.set('h', options.height.toString())
  if (options.fit) params.set('fit', options.fit)

  return `${baseUrl}?${params.toString()}`
}

/**
 * Resolve CTA link to actual URL
 */
export function resolveCtaLink(cta: {
  link?: {
    type?: string
    internal?: {
      _type?: string
      slug?: {
        current?: string
      }
    }
    external?: string
    anchor?: string
    file?: {
      asset?: {
        url?: string
      }
    }
  }
} | null | undefined): string {
  if (!cta?.link) {
    return '#'
  }

  const { link } = cta

  switch (link.type) {
    case 'external':
      return link.external || '#'
    case 'anchor':
      return `#${link.anchor || ''}`
    case 'file':
      return link.file?.asset?.url || '#'
    case 'internal':
      if (link.internal?.slug?.current) {
        const type = link.internal._type
        if (type === 'academicDepartment') {
          // For academic departments, we need to fetch the department to get the departmentType
          // For now, fallback to the slug-based URL - this will be handled by the component
          return `/${link.internal.slug.current}`
        }
        if (type === 'collegeProgram') {
          return `/${link.internal.slug.current}`
        }
        if (type === 'page') {
          return `/${link.internal.slug.current}`
        }
      }
      return '#'
    default:
      return '#'
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return ''

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

