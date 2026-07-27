const MAX_TITLE_LENGTH = 60;
const SUFFIX = " | OLOPSC";

/** Build a CMS-driven <title> tag with truncation. Returns a raw title (no further suffix needed). */
export function buildCmsTitle(seoTitle?: string, fallbackTitle?: string): string {
  // Case 1: seo.title is present
  if (seoTitle) {
    if (seoTitle.length <= MAX_TITLE_LENGTH) return seoTitle;
    // Too long — truncate and flag
    return seoTitle.slice(0, MAX_TITLE_LENGTH - 1) + "…";
  }
  
  // Case 2: Fall back to document title + suffix
  const title = fallbackTitle || "Untitled";
  const full = `${title}${SUFFIX}`;
  if (full.length <= MAX_TITLE_LENGTH) return full;
  
  // Truncate title portion
  const maxTitleLen = MAX_TITLE_LENGTH - SUFFIX.length - 1; // -1 for "…"
  // Ensure we don't end up with negative length if MAX_TITLE_LENGTH is too small
  if (maxTitleLen <= 0) return SUFFIX.slice(0, MAX_TITLE_LENGTH); 
  return `${title.slice(0, maxTitleLen)}…${SUFFIX}`;
}
