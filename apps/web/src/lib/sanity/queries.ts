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
 * Get latest news articles
 */
export async function getLatestNews(count: number = 3) {
  const query = `*[_type == "news"] | order(publishedAt desc) [0...${count}] {
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
 * Get upcoming events
 */
export async function getUpcomingEvents(count: number = 3) {
  const query = `*[_type == "event" && date >= now()] | order(date asc) [0...${count}] {
    _id,
    title,
    slug {
      current
    },
    date,
    featuredImage {
      asset->{
        url
      },
      alt
    },
    excerpt,
    location
  }`

  return await client.fetch(query)
}

