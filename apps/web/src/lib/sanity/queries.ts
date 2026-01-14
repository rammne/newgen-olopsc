import { client } from './client'

/**
 * Get about page data
 */
export async function getAboutPage() {
  const query = `*[_type == "aboutPage"][0]{
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
      overlay {
        enabled,
        opacity,
        color
      }
    },
    identity {
      title,
      content,
      image {
        asset->{
          url
        },
        alt
      }
    },
    mission {
      title,
      content,
      image {
        asset->{
          url
        },
        alt
      }
    },
    vision {
      title,
      content,
      image {
        asset->{
          url
        },
        alt
      }
    },
    values {
      title,
      values[] {
        title,
        description,
        icon
      }
    },
    history {
      title,
      content,
      timeline[] {
        year,
        title,
        description,
        image {
          asset->{
            url
          },
          alt
        }
      },
      gallery {
        title,
        images[] {
          asset->{
            url
          },
          alt,
          caption
        }
      }
    },
    strategicAgenda {
      title,
      description,
      agendaItems
    },
    leadership {
      title,
      members[] {
        name,
        role,
        bio,
        image {
          asset->{
            url
          },
          alt
        },
        socialLinks[] {
          platform,
          url
        }
      }
    },
    stats[] {
      value,
      label,
      icon,
      prefix,
      suffix
    },
    accreditations {
      title,
      accreditations[] {
        name,
        description,
        logo {
          asset->{
            url
          },
          alt
        }
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
 * Get admissions page data
 */
export async function getAdmissionsPage() {
  const query = `*[_type == "admissionsPage"][0]{
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
          anchor
        },
        style
      }
    },
    intro {
      headline,
      content
    },
    basicEducation {
      title,
      description,
      steps[] {
        stepNumber,
        title,
        description
      },
      requirements {
        title,
        list,
        requirementList[] {
          level,
          items
        },
        note
      }
    },
    higherEducation {
      title,
      description,
      steps[] {
        stepNumber,
        title,
        description
      },
      requirements {
        title,
        list,
        requirementList[] {
          level,
          items
        },
        note
      }
    },
    paymentOptions {
      title,
      description,
      methods[] {
        name,
        details,
        icon {
          asset->{
            url
          }
        }
      },
      bankDetails[] {
        bankName,
        accountName,
        accountNumber,
        branch,
        logo {
          asset->{
            url
          }
        }
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
      style
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
        shortTitle,
        slug {
          current
        },
        hero {
          backgroundImage {
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            },
            alt
          }
        },
        overview {
          content,
          backgroundImage {
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            },
            alt
          }
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
    category,
    academicDepartment->{
      title
    }
  }`

  return await client.fetch(query)
}

/**
 * Get featured upcoming events for home page (max 3)
 */
export async function getUpcomingEvents(count: number = 3) {
  // Show events starting from yesterday (so 'today's' events don't disappear immediately)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const query = `*[_type == "event" && featured == true && startDate >= '${oneDayAgo}'] | order(startDate asc) [0...${count}] {
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
    "location": location.venue,
    academicDepartment->{
      title
    }
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
    featured,
    academicDepartment->{
      title
    }
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
    academicDepartment->{
      title
    },
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
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        caption
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

  return await client.fetch(query, { slug })
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
    category,
    academicDepartment->{
      title
    }
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
    academicDepartment->{
      title
    },
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
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        caption
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

  return await client.fetch(query, { slug })
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
    highlights {
      title,
      images[] {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      }
    },
    collegePrograms {
      title,
      programs[]->{
        _id,
        title,
        shortTitle,
        slug {
          current
        },
        hero {
          backgroundImage {
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            },
            alt
          }
        },
        overview {
          content,
          backgroundImage {
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            },
            alt
          }
        }
      }
    },
    trackClusters {
      title,
      clusters[] {
        name,
        description,
        tracks
      }
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
      department,
      photo {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      bio,
      qualifications,
      email,
      socialLinks[] {
        platform,
        url,
        label
      }
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

  return await client.fetch(query, { departmentType })
}

/**
 * Get events filtered by academic department (by department type)
 */
export async function getEventsByDepartmentType(departmentType: string) {
  const query = `*[_type == "event" && academicDepartment->departmentType == $departmentType] | order(startDate asc) {
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
    category,
    academicDepartment->{
      _id,
      title
    }
  }`

  return await client.fetch(query, { departmentType })
}

/**
 * Get news filtered by academic department (by department type)
 */
export async function getNewsByDepartmentType(departmentType: string) {
  const query = `*[_type == "news" && academicDepartment->departmentType == $departmentType] | order(publishedAt desc) {
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
    featured,
    academicDepartment->{
      _id,
      title
    }
  }`

  return await client.fetch(query, { departmentType })
}

/**
 * Get all college programs
 */
export async function getAllCollegePrograms() {
  const query = `*[_type == "collegeProgram"] | order(title asc) {
    _id,
    title,
    shortTitle,
    slug {
      current
    },
    hero {
      backgroundImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      }
    },
    overview
  }`

  return await client.fetch(query)
}

/**
 * Get Contact Page Data
 */
export async function getContactPage() {
  const query = `*[_type == "contactPage"][0]{
    _id,
    title,
    hero { ..., backgroundImage { asset->{ url } } },
    intro { ..., image { asset->{ url } } },
    contactInfo,
    departments[] {
       department,
       contact
    },
    contactForm {
       title,
       description,
       formFields,
       submitButtonText,
       successMessage
    },
    socialMedia {
       title,
       links[] { platform, url }
    },
    map {
       title,
       embedUrl,
       image { asset->{ url } }
    },
    officeHours {
       title,
       hours[] { day, hours, closed }
    },
    seo { ..., image { asset->{ url } } }
  }`
  return await client.fetch(query)
}
/**
 * Get Computing Studies Page Data
 */
export async function getComputingStudiesPage() {
  const query = `*[_type == "computingStudies"][0]{
    _id,
    title,
    hero { ..., backgroundImage { asset->{ url } } },
    intro { ..., image { asset->{ url } } },
    degree,
    duration,
    programs[] { ..., image { asset->{ url } } },
    curriculum { ..., courses[] { year, courses[] } },
    careerOpportunities { ..., image { asset->{ url } } },
    keyFeatures[] { ..., image { asset->{ url } } },
    gallery { images[] { asset->{ url }, caption } },
    seo { ..., image { asset->{ url } } }
  }`
  return await client.fetch(query)
}

/**
 * Get Tourism Management Page Data
 */
export async function getTourismManagementPage() {
  const query = `*[_type == "tourismManagement"][0]{
    _id,
    title,
    hero { ..., backgroundImage { asset->{ url } } },
    intro { ..., image { asset->{ url } } },
    degree,
    duration,
    programs[] { ..., image { asset->{ url } } },
    curriculum { ..., courses[] { year, courses[] } },
    careerOpportunities { ..., image { asset->{ url } } },
    keyFeatures[] { ..., image { asset->{ url } } },
    gallery { images[] { asset->{ url }, caption } },
    seo { ..., image { asset->{ url } } }
  }`
  return await client.fetch(query)
}

/**
 * Get Hospitality Management Page Data
 */
export async function getHospitalityManagementPage() {
  const query = `*[_type == "hospitalityManagement"][0]{
    _id,
    title,
    hero { ..., backgroundImage { asset->{ url } } },
    intro { ..., image { asset->{ url } } },
    degree,
    duration,
    programs[] { ..., image { asset->{ url } } },
    curriculum { ..., courses[] { year, courses[] } },
    careerOpportunities { ..., image { asset->{ url } } },
    keyFeatures[] { ..., image { asset->{ url } } },
    gallery { images[] { asset->{ url }, caption } },
    seo { ..., image { asset->{ url } } }
  }`
  return await client.fetch(query)
}

/**
 * Get Business Administration & Entrepreneurship Page Data
 */
export async function getBusinessAdminPage() {
  const query = `*[_type == "businessAdmin"][0]{
    _id,
    title,
    hero { ..., backgroundImage { asset->{ url } } },
    intro { ..., image { asset->{ url } } },
    degree,
    duration,
    programs[] { ..., image { asset->{ url } } },
    curriculum { ..., courses[] { year, courses[] } },
    careerOpportunities { ..., image { asset->{ url } } },
    keyFeatures[] { ..., image { asset->{ url } } },
    gallery { images[] { asset->{ url }, caption } },
    seo { ..., image { asset->{ url } } }
  }`
  return await client.fetch(query)
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
    highlights {
      title,
      images[] {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      }
    },
    collegePrograms {
      title,
      programs[]->{
        _id,
        title,
        shortTitle,
        slug {
          current
        },
        hero {
          backgroundImage {
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            },
            alt
          }
        },
        overview {
          content,
          backgroundImage {
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            },
            alt
          }
        }
      }
    },
    trackClusters {
      title,
      clusters[] {
        name,
        description,
        tracks
      }
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
      department,
      photo {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      bio,
      qualifications,
      email,
      socialLinks[] {
        platform,
        url,
        label
      }
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

  return await client.fetch(query, { slug })
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

/**
 * Get SDG Page data
 */
export async function getSdgPage() {
  const query = `*[_type == "sdgPage"][0]{
    title,
    hero {
      variant,
      headline,
      subheadline,
      backgroundImage {
        asset->{
          url
        },
        alt
      },
      overlay
    },
    intro {
      headline,
      content
    },
    seo
  }`
  return await client.fetch(query)
}

/**
 * Get all active SDGs
 */
export async function getAllSdgs() {
  const query = `*[_type == "sdg"] | order(number asc) {
    _id,
    title,
    slug {
      current
    },
    number,
    image {
      asset->{
        url
      },
      alt
    },
    color,
    description
  }`
  return await client.fetch(query)
}

/**
 * Get SDG by slug
 */
export async function getSdgBySlug(slug: string) {
  const query = `*[_type == "sdg" && slug.current == $slug][0]{
    _id,
    title,
    slug {
      current
    },
    number,
    image {
      asset->{
        url
      },
      alt
    },
    color,
    description,
    content
  }`
  return await client.fetch(query, { slug })
}

/**
 * Get all SDG slugs for static generation
 */
export async function getAllSdgSlugs() {
  const query = `*[_type == "sdg"]{
    "slug": slug.current
  }`
  return await client.fetch(query)
}

/**
 * Get news articles related to a specific SDG
 */
export async function getNewsBySdg(sdgId: string) {
  const query = `*[_type == "news" && references($sdgId)] | order(publishedAt desc) {
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
    academicDepartment->{
      title
    }
  }`
  return await client.fetch(query, { sdgId })
}


/**
 * Get Education and Liberal Arts Page Data
 */
export async function getEducationLiberalArtsPage() {
  const query = `*[_type == "educationLiberalArts"][0]{
    _id,
    title,
    hero { ..., backgroundImage { asset->{ url } } },
    intro { ..., image { asset->{ url } } },
    degree,
    duration,
    programs[] { ..., image { asset->{ url } } },
    curriculum { ..., courses[] { year, courses[] } },
    careerOpportunities { ..., image { asset->{ url } } },
    keyFeatures[] { ..., image { asset->{ url } } },
    gallery { images[] { asset->{ url }, caption } },
    seo { ..., image { asset->{ url } } }
  }`
  return await client.fetch(query)
}

/**
 * Get Scholarship Page Data
 */
export async function getScholarshipPage() {
  const query = `*[_type == "scholarshipPage"][0]{
    _id,
    title,
    hero {
      variant,
      headline,
      subheadline,
      backgroundImage {
        asset->{
          url
        },
        alt,
        hotspot
      },
      overlay {
        enabled,
        opacity,
        color
      }
    },
    intro {
      headline,
      content
    },
    scholarshipPrograms[] {
      name,
      type,
      description,
      coverage {
        percentage,
        amount,
        details
      },
      eligibility {
        requirements,
        gpa,
        income
      },
      applicationProcess,
      deadline,
      documents,
      contact {
        name,
        email,
        phone
      },
      image {
        asset->{
          url
        },
        alt,
        hotspot
      }
    },
    applicationForm,
    faq,
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
        label
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

