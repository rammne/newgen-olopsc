import {client} from './client'

/**
 * Get homepage data with all sections
 */
export async function getHomePage() {
  const query = `*[_type == "homePage"][0]{
    _id,
    title,
    hero {
      variant,
      headline,
      subheadline,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        hotspot
      },
      backgroundVideoSource,
      backgroundVideoFile {
        asset->{
          url
        }
      },
      backgroundVideoUrl,
      backgroundVideoEmbed,
      overlay {
        enabled,
        opacity,
        color
      },
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor,
          file {
            asset->{
              url
            }
          }
        },
        style,
        openInNewTab
      },
      secondaryCta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor,
          file {
            asset->{
              url
            }
          }
        },
        style,
        openInNewTab
      }
    },
    intro {
      headline,
      subheadline,
      content[],
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        hotspot
      },
      video {
        url,
        provider,
        embedId
      }
    },
    keyStats {
      backgroundImage {
        asset->{
          url
        },
        alt
      },
      stats[] {
        value,
        label,
        icon,
        prefix,
        suffix
      }
    },
    sRice {
      title,
      subtitle,
      items[] {
        letter,
        title,
        description,
        image {
          asset->{
            url
          },
          alt
        }
      }
    },
    academicDepartments {
      title,
      subtitle,
      departments[]->{
        _id,
        title,
        slug {
          current
        },
        departmentType,
        hero {
          backgroundImage {
            asset->{
              url
            },
            alt
          }
        }
      }
    },
    programsPreview {
      title,
      subtitle,
      programs[]->{
        _id,
        title,
        slug {
          current
        },
        description,
        featuredImage {
          asset->{
            url
          },
          alt
        }
      },
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor
        },
        style,
        openInNewTab
      }
    },
    testimonials {
      title,
      testimonials[] {
        quote,
        author {
          name,
          role,
          image {
            asset->{
              url
            },
            alt
          },
          company
        },
        rating
      }
    },
    features[] {
      icon,
      image {
        asset->{
          url
        },
        alt
      },
      title,
      description,
      link {
        url,
        text
      }
    },
    latestNews {
      title,
      count,
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor
        },
        style,
        openInNewTab
      }
    },
    upcomingEvents {
      title,
      count,
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor
        },
        style,
        openInNewTab
      }
    },
    finalCta {
      headline,
      subheadline,
      primaryCta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor
        },
        style,
        openInNewTab
      },
      secondaryCta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor
        },
        style,
        openInNewTab
      },
      backgroundImage {
        asset->{
          url
        },
        alt,
        hotspot
      }
    },
    sections[] {
      title,
      subtitle,
      content[],
      variant,
      backgroundColor,
      images[] {
        image {
          asset->{
            url
          },
          alt
        },
        caption
      },
      features[] {
        icon,
        image {
          asset->{
            url
          },
          alt
        },
        title,
        description,
        link {
          url,
          text
        }
      },
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor
        },
        style,
        openInNewTab
      }
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->{
          url
        }
      },
      canonicalUrl
    }
  }`

  return await client.fetch(query)
}

/**
 * Get featured news articles for home page (max 3)
 */
export async function getLatestNews(count: number = 3) {
  const query = `*[_type == "news" && featured == true] | order(publishedAt desc) [0...${count}] {
    _id,
    title,
    slug {
      current
    },
    publishedAt,
    featuredImage {
      asset->{
        url
      },
      alt
    },
    excerpt,
    category
  }`

  return await client.fetch(query)
}

/**
 * Get featured upcoming events for home page (max 3)
 */
export async function getUpcomingEvents(count: number = 3) {
  const query = `*[_type == "event" && featured == true && startDate >= now()] | order(startDate asc) [0...${count}] {
    _id,
    title,
    slug {
      current
    },
    startDate,
    featuredImage {
      asset->{
        url
      },
      alt
    },
    excerpt,
    "location": location.venue
  }`

  return await client.fetch(query)
}

/**
 * Get all news articles (for news listing page)
 */
export async function getAllNews() {
  const query = `*[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug {
      current
    },
    publishedAt,
    featuredImage {
      asset->{
        url
      },
      alt
    },
    excerpt,
    category,
    featured
  }`

  return await client.fetch(query)
}

/**
 * Get all news slugs for static generation
 */
export async function getAllNewsSlugs() {
  const query = `*[_type == "news"]{
    "slug": slug.current
  }`

  return await client.fetch(query)
}

/**
 * Get news article by slug
 */
export async function getNewsBySlug(slug: string) {
  const query = `*[_type == "news" && slug.current == $slug][0]{
    _id,
    title,
    slug {
      current
    },
    publishedAt,
    featuredImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt,
      hotspot
    },
    excerpt,
    category,
    featured,
    content[] {
      ...,
      _type == "image" => {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        caption
      },
      _type == "videoEmbed" => {
        url,
        platform,
        title
      },
      markDefs[]{
        ...,
        _type == "link" => {
          href,
          openInNewTab
        }
      }
    },
    author {
      name,
      image {
        asset->{
          url
        },
        alt
      }
    },
    tags,
    relatedArticles[]->{
      _id,
      title,
      slug {
        current
      },
      featuredImage {
        asset->{
          url
        },
        alt
      },
      publishedAt
    },
    gallery {
      title,
      images[] {
        image {
          asset->{
            url
          },
          alt
        },
        caption
      },
      layout
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->{
          url
        }
      },
      canonicalUrl
    }
  }`

  return await client.fetch(query, {slug})
}

/**
 * Get all events (for events listing page)
 */
export async function getAllEvents() {
  const query = `*[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug {
      current
    },
    startDate,
    endDate,
    featuredImage {
      asset->{
        url
      },
      alt
    },
    excerpt,
    "location": location.venue,
    featured,
    category
  }`

  return await client.fetch(query)
}

/**
 * Get all event slugs for static generation
 */
export async function getAllEventSlugs() {
  const query = `*[_type == "event"]{
    "slug": slug.current
  }`

  return await client.fetch(query)
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug: string) {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    slug {
      current
    },
    startDate,
    endDate,
    category,
    featured,
    location {
      venue,
      address,
      isOnline,
      onlineLink
    },
    featuredImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt,
      hotspot
    },
    excerpt,
    description[] {
      ...,
      _type == "image" => {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        caption
      },
      _type == "videoEmbed" => {
        url,
        platform,
        title
      },
      markDefs[]{
        ...,
        _type == "link" => {
          href,
          openInNewTab
        }
      }
    },
    registration {
      required,
      deadline,
      link,
      contact
    },
    gallery {
      title,
      images[] {
        image {
          asset->{
            url
          },
          alt
        },
        caption
      },
      layout
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->{
          url
        }
      },
      canonicalUrl
    }
  }`

  return await client.fetch(query, {slug})
}

/**
 * Get academic department by department type
 */
export async function getAcademicDepartmentByType(departmentType: 'preschool' | 'gradeSchool' | 'juniorHigh' | 'seniorHigh' | 'college') {
  const query = `*[_type == "academicDepartment" && departmentType == $departmentType][0]{
    _id,
    title,
    slug {
      current
    },
    departmentType,
    hero {
      variant,
      headline,
      subheadline,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      backgroundVideoSource,
      backgroundVideoFile {
        asset->{
          url
        }
      },
      backgroundVideoUrl,
      backgroundVideoEmbed,
      overlay {
        enabled,
        opacity,
        color
      },
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor,
          file {
            asset->{
              url
            }
          }
        },
        style,
        openInNewTab
      },
      secondaryCta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor,
          file {
            asset->{
              url
            }
          }
        },
        style,
        openInNewTab
      }
    },
    intro {
      headline,
      content,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        hotspot
      },
      video {
        url,
        provider,
        embedId
      }
    },
    overview,
    keyFeatures[] {
      icon,
      image {
        asset->{
          url
        },
        alt
      },
      title,
      description,
      link {
        url,
        text
      }
    },
    curriculum {
      title,
      description,
      image {
        asset->{
          url
        },
        alt
      },
      highlights
    },
    programs[] {
      title,
      description,
      link->{
        _id,
        title,
        slug {
          current
        }
      }
    },
    faculty[] {
      name,
      role,
      image {
        asset->{
          url
        },
        alt
      },
      bio,
      qualifications
    },
    testimonials[] {
      quote,
      author {
        name,
        role,
        image {
          asset->{
            url
          },
          alt
        },
        company
      },
      rating
    },
    stats[] {
      value,
      label,
      icon,
      prefix,
      suffix
    },
    gallery {
      title,
      images[] {
        image {
          asset->{
            url
          },
          alt
        },
        caption
      },
      layout
    },
    admissionInfo {
      title,
      content,
      requirements,
      image {
        asset->{
          url
        },
        alt
      },
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor,
          file {
            asset->{
              url
            }
          }
        },
        style,
        openInNewTab
      }
    },
    storyBlocks[] {
      blockType,
      title,
      caption,
      image {
        asset->{
          url
        },
        alt
      },
      video {
        url,
        provider,
        embedId
      },
      images[] {
        image {
          asset->{
            url
          },
          alt
        },
        caption
      }
    },
    sections[] {
      title,
      subtitle,
      content[],
      variant,
      backgroundColor,
      images[] {
        image {
          asset->{
            url
          },
          alt
        },
        caption
      },
      features[] {
        icon,
        image {
          asset->{
            url
          },
          alt
        },
        title,
        description,
        link {
          url,
          text
        }
      },
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor
        },
        style,
        openInNewTab
      }
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->{
          url
        }
      },
      canonicalUrl
    }
  }`

  return await client.fetch(query, {departmentType})
}

/**
 * Get academic department by slug (for backward compatibility)
 */
export async function getAcademicDepartmentBySlug(slug: string) {
  const query = `*[_type == "academicDepartment" && slug.current == $slug][0]{
    _id,
    title,
    slug {
      current
    },
    departmentType,
    hero {
      variant,
      headline,
      subheadline,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      backgroundVideoSource,
      backgroundVideoFile {
        asset->{
          url
        }
      },
      backgroundVideoUrl,
      backgroundVideoEmbed,
      overlay {
        enabled,
        opacity,
        color
      },
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor,
          file {
            asset->{
              url
            }
          }
        },
        style,
        openInNewTab
      },
      secondaryCta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor,
          file {
            asset->{
              url
            }
          }
        },
        style,
        openInNewTab
      }
    },
    intro {
      headline,
      content,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        hotspot
      },
      video {
        url,
        provider,
        embedId
      }
    },
    overview,
    keyFeatures[] {
      icon,
      image {
        asset->{
          url
        },
        alt
      },
      title,
      description,
      link {
        url,
        text
      }
    },
    curriculum {
      title,
      description,
      image {
        asset->{
          url
        },
        alt
      },
      highlights
    },
    programs[] {
      title,
      description,
      link->{
        _id,
        title,
        slug {
          current
        }
      }
    },
    faculty[] {
      name,
      role,
      image {
        asset->{
          url
        },
        alt
      },
      bio,
      qualifications
    },
    testimonials[] {
      quote,
      author {
        name,
        role,
        image {
          asset->{
            url
          },
          alt
        },
        company
      },
      rating
    },
    stats[] {
      value,
      label,
      icon,
      prefix,
      suffix
    },
    gallery {
      title,
      images[] {
        image {
          asset->{
            url
          },
          alt
        },
        caption
      },
      layout
    },
    admissionInfo {
      title,
      content,
      requirements,
      image {
        asset->{
          url
        },
        alt
      },
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor,
          file {
            asset->{
              url
            }
          }
        },
        style,
        openInNewTab
      }
    },
    storyBlocks[] {
      blockType,
      title,
      caption,
      image {
        asset->{
          url
        },
        alt
      },
      video {
        url,
        provider,
        embedId
      },
      images[] {
        image {
          asset->{
            url
          },
          alt
        },
        caption
      }
    },
    sections[] {
      title,
      subtitle,
      content[],
      variant,
      backgroundColor,
      images[] {
        image {
          asset->{
            url
          },
          alt
        },
        caption
      },
      features[] {
        icon,
        image {
          asset->{
            url
          },
          alt
        },
        title,
        description,
        link {
          url,
          text
        }
      },
      cta {
        text,
        link {
          type,
          internal->{
            _type,
            slug {
              current
            }
          },
          external,
          anchor
        },
        style,
        openInNewTab
      }
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->{
          url
        }
      },
      canonicalUrl
    }
  }`

  return await client.fetch(query, {slug})
}

/**
 * Get all academic department slugs for static generation
 */
export async function getAllAcademicDepartmentSlugs() {
  const query = `*[_type == "academicDepartment"]{
    "slug": slug.current
  }`

  return await client.fetch(query)
}

