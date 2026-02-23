import { useEffect, useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'About OLOPSC', href: '/about' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Sustainable Development Goals', href: '/sdg' },
]

// Replicating Footer sections for the expanded menu
const HEADER_MENU_SECTIONS = [
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
      { label: 'Alumni Section', href: '/alumni-section' },
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

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const offset =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      setScrolled(offset > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const baseClasses =
    'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]'

  const backgroundClasses = scrolled || menuOpen
    ? 'bg-[var(--color-primary)] shadow-lg backdrop-blur-md'
    : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent backdrop-blur-[2px]'

  const heightClasses = scrolled ? 'py-3' : 'py-5'

  return (
    <header ref={headerRef} className={`${baseClasses} ${backgroundClasses} ${heightClasses}`}>
      <div className="mx-auto flex w-full items-center justify-between px-5 sm:px-[60px]">
        {/* Logo + wordmark */}
        <a href="/" className="flex items-center gap-3 relative z-50">
          <img
            src="/olopsc-logo-outline.webp"
            alt="OLOPSC Logo"
            className="h-10 w-10 rounded-full object-cover shadow-md"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wide text-white sm:text-base">
              OLOPSC COLLEGE
            </span>
            <span className="text-[10px] text-white/80 sm:text-xs">
              Marikina City, Philippines
            </span>
          </div>
        </a>

        {/* Right side container */}
        <div className="flex items-center gap-6">
          {/* Desktop nav - Hidden when menu is open */}
          <AnimatePresence>
            {!menuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="hidden items-center gap-10 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:flex"
              >
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="relative pb-1 transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    <span>{item.label}</span>
                    <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] origin-center scale-x-0 rounded-full bg-[var(--color-accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Global menu button (mobile + desktop) */}
          <motion.button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center z-50"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <X size={24} className="text-white" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <Menu size={24} className="text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Full-width Expanded Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[var(--color-primary)]"
          >
            <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-[60px] sm:py-16">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {HEADER_MENU_SECTIONS.map((section, idx) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  >
                    <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">
                      {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="group flex items-center text-sm font-medium text-white/90 transition-colors hover:text-white"
                            onClick={() => setMenuOpen(false)}
                          >
                            <span className="relative overflow-hidden">
                              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                                {link.label}
                              </span>
                              <span className="absolute left-0 top-0 inline-block translate-y-full text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-y-0">
                                {link.label}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header


