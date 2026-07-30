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
 * Normalize URLs pointing to the site's own domain into root-relative paths
 */
export function normalizeToRelativePath(url?: string): string {
  if (!url) return '#'

  // Already relative or anchor
  if (url.startsWith('/') || url.startsWith('#')) return url

  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname.toLowerCase()

    // Domains that belong to this website (production, staging, local)
    const siteDomains = [
      'newgen-olopsc.netlify.app',
      'olopsc.edu.ph',
      'www.olopsc.edu.ph',
      'localhost',
      '127.0.0.1',
    ]

    const isSiteDomain = siteDomains.some(
      (domain) => hostname === domain || hostname.endsWith('.' + domain)
    )

    if (isSiteDomain) {
      const relativePath = parsed.pathname + parsed.search + parsed.hash
      return relativePath || '/'
    }
  } catch (e) {
    // If not a parseable absolute URL, return original
  }

  return url
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
      return normalizeToRelativePath(link.external)
    case 'anchor':
      return `#${link.anchor || ''}`
    case 'file':
      return link.file?.asset?.url || '#'
    case 'internal':
      if (link.internal) {
        const type = link.internal._type
        const slug = link.internal.slug?.current

        if (type === 'academicDepartment' && slug) {
          return `/${slug}`
        }
        if (type === 'collegeProgram' && slug) {
          return `/${slug}`
        }
        if (type === 'news' && slug) {
          return `/news/${slug}`
        }
        if (type === 'event' && slug) {
          return `/events/${slug}`
        }
        if (type === 'aboutPage') return '/about'
        if (type === 'admissionsPage') return '/admissions'
        if (type === 'scholarshipPage') return '/scholarship-programs'
        if (type === 'contactPage') return '/contact'
        if (type === 'jobsPage') return '/jobs-section'
        if (type === 'homePage') return '/'
        if (slug) return `/${slug}`
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

