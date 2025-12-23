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
  
  if (!options) {
    return baseUrl
  }

  const params = new URLSearchParams()
  if (options.width) params.set('w', options.width.toString())
  if (options.height) params.set('h', options.height.toString())
  if (options.quality) params.set('q', options.quality.toString())
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

  const {link} = cta

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
          return `/college-department/${link.internal.slug.current}`
        }
        if (type === 'collegeProgram') {
          return `/program/${link.internal.slug.current}`
        }
        if (type === 'news') {
          return `/news/${link.internal.slug.current}`
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

