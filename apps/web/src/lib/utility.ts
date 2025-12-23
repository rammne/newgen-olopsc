export function normalizeYouTubeEmbedUrl(url: string | undefined | null): string | null {
  if (!url) return null

  try {
    // Already embed URL
    if (url.includes('/embed/')) return url

    const parsed = new URL(url)

    // youtube.com/watch?v=VIDEO_ID
    if (parsed.hostname.includes('youtube.com') && parsed.pathname === '/watch') {
      const v = parsed.searchParams.get('v')
      if (v) {
        const params = new URLSearchParams()
        params.set('autoplay', '1')
        params.set('mute', '1')
        params.set('controls', '0')
        params.set('loop', '1')
        params.set('playsinline', '1')
        params.set('playlist', v) // required for loop
        return `https://www.youtube.com/embed/${v}?${params.toString()}`
      }
    }

    // youtu.be/VIDEO_ID
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.replace('/', '')
      if (id) {
        const params = new URLSearchParams()
        params.set('autoplay', '1')
        params.set('mute', '1')
        params.set('controls', '0')
        params.set('loop', '1')
        params.set('playsinline', '1')
        params.set('playlist', id)
        return `https://www.youtube.com/embed/${id}?${params.toString()}`
      }
    }

    // youtube.com/shorts/VIDEO_ID
    if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/shorts/')) {
      const id = parsed.pathname.split('/')[2]
      if (id) {
        const params = new URLSearchParams()
        params.set('autoplay', '1')
        params.set('mute', '1')
        params.set('controls', '0')
        params.set('loop', '1')
        params.set('playsinline', '1')
        params.set('playlist', id)
        return `https://www.youtube.com/embed/${id}?${params.toString()}`
      }
    }

    // Fallback: return original URL
    return url
  } catch {
    return url
  }
}

export function normalizeVimeoEmbedUrl(url: string | undefined | null): string | null {
  if (!url) return null

  try {
    // Already embed URL
    if (url.includes('player.vimeo.com')) return url

    const parsed = new URL(url)

    if (parsed.hostname.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      if (id) {
        const params = new URLSearchParams()
        params.set('autoplay', '1')
        params.set('muted', '1')
        params.set('loop', '1')
        params.set('background', '1')
        return `https://player.vimeo.com/video/${id}?${params.toString()}`
      }
    }

    return url
  } catch {
    return url
  }
}

export function normalizeVideoEmbedUrl(url: string | undefined | null): string | null {
  if (!url) return null
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return normalizeYouTubeEmbedUrl(url)
  }
  if (url.includes('vimeo.com')) {
    return normalizeVimeoEmbedUrl(url)
  }
  return url
}


