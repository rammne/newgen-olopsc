import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

// Footer link sections
const FOOTER_SECTIONS = [
  {
    title: 'Academics',
    links: [
      { label: 'Preschool', href: '/preschool' },
      { label: 'Grade School', href: '/grade-school' },
      { label: 'Junior High School', href: '/junior-high-school' },
      { label: 'Senior High School', href: '/senior-high-school' },
      { label: 'College', href: '/college-department' },
      { label: 'Scholarship Programs', href: '/scholarship-programs' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About OLOPSC', href: '/about' },
      { label: 'Admissions', href: '/admissions' },
      { label: 'Alumni Section', href: '/alumni' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Events', href: '/events' },
      { label: 'News & Updates', href: '/news' },
      { label: 'Sustainable Development Goals', href: '/sdg' },
    ],
  },
]

// Social media links (can be fetched from Sanity later)
const SOCIAL_LINKS = [
  { platform: 'Facebook', icon: Facebook, href: '#' },
  { platform: 'Instagram', icon: Instagram, href: '#' },
  { platform: 'Twitter', icon: Twitter, href: '#' },
  { platform: 'YouTube', icon: Youtube, href: '#' },
  { platform: 'LinkedIn', icon: Linkedin, href: '#' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-primary)] text-white relative z-50 overflow-hidden">
      {/* Main footer content */}
      <div className="mx-auto w-full px-5 py-12 sm:px-[60px] sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {/* Logo and description column - spans 2 columns on large screens */}
            <div className="sm:col-span-2 lg:col-span-2">
              <a href="/" className="mb-4 inline-block">
                <div className="flex items-center gap-3">
                  <img
                    src="/olopsc-logo-outline.webp"
                    alt="OLOPSC Logo"
                    className="h-16 w-16 rounded-full object-cover shadow-lg"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-base font-bold tracking-wide text-white sm:text-lg">
                      OLOPSC COLLEGE
                    </span>
                    <span className="text-xs text-white/80 sm:text-sm">
                      Marikina City, Philippines
                    </span>
                  </div>
                </div>
              </a>
              <p className="mb-6 text-sm leading-relaxed text-white/80 sm:text-base">
                Our Lady of Perpetual Succor College - Empowering students through quality
                education and values formation since 1978.
              </p>
              {/* <p className="mb-8 font-serif text-lg italic text-[var(--color-accent)]">
                "With Mary Lift Jesus"
              </p> */}

              {/* Contact information */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[var(--color-accent)]" />
                  <span className="text-white/90">
                    Marikina City, Philippines
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="flex-shrink-0 text-[var(--color-accent)]" />
                  <a
                    href="tel:+63"
                    className="text-white/90 transition-colors hover:text-[var(--color-accent)]"
                  >
                    +63 (2) XXX-XXXX
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="flex-shrink-0 text-[var(--color-accent)]" />
                  <a
                    href="mailto:info@olopsc.edu.ph"
                    className="text-white/90 transition-colors hover:text-[var(--color-accent)]"
                  >
                    info@olopsc.edu.ph
                  </a>
                </div>
              </div>

              {/* Social media links */}
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={social.platform}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit our ${social.platform} page`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={18} className="text-white" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_SECTIONS.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="sm:col-span-1"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/80 transition-colors hover:text-[var(--color-accent)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[var(--color-primary)]">
        <div className="mx-auto w-full px-5 py-6 sm:px-[60px]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/70 sm:text-sm">
              © {currentYear} Our Lady of Perpetual Succor College. All rights reserved. | Website by <a href="https://www.rammne.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:text-[var(--color-accent)]">Rammne.</a>
            </p>
            {/* <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 sm:text-sm">
              <a
                href="/privacy-policy"
                className="transition-colors hover:text-[var(--color-accent)]"
              >
                Privacy Policy
              </a>
              <span className="text-white/30">|</span>
              <a
                href="/terms-of-service"
                className="transition-colors hover:text-[var(--color-accent)]"
              >
                Terms of Service
              </a>
              <span className="text-white/30">|</span>
              <a
                href="/accessibility"
                className="transition-colors hover:text-[var(--color-accent)]"
              >
                Accessibility
              </a>
            </div> */}
            <p className="mb-8 font-serif text-lg italic text-[var(--color-accent)]">
              "With Mary Lift Jesus".
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

