import {useEffect, useState} from 'react'
import {Menu, X} from 'lucide-react'
import {AnimatePresence, motion} from 'framer-motion'

const NAV_ITEMS = [
  {label: 'About OLOPSC', href: '/about'},
  {label: 'Admissions', href: '/admissions'},
  {label: 'Academics', href: '/academics'},
  {label: 'Our SDG Commitments', href: '/sdg-commitments'},
]

const MENU_ITEMS = [
  {label: 'News & Updates', href: '/news'},
  {label: 'Scholarship Programs', href: '/admissions#scholarships'},
  {label: 'Events', href: '/events'},
  {label: 'Contact Us', href: '/contact'},
]

export function Header() {
  
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      setScrolled(offset > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const baseClasses =
    'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]'

  const backgroundClasses = scrolled
    ? 'bg-[var(--color-primary)]/95 shadow-lg backdrop-blur-md'
    : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent backdrop-blur-[2px]'

  const heightClasses = scrolled ? 'py-3' : 'py-5'

  return (
    <header className={`${baseClasses} ${backgroundClasses} ${heightClasses}`}>
      <div className="mx-auto flex w-full items-center justify-evenly px-5 sm:px-[60px]">
        {/* Logo + wordmark */}
        <a href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[var(--color-neutral)]/90 shadow-md" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wide text-white sm:text-base">
              OLOPSC COLLEGE
            </span>
            <span className="text-[10px] text-white/80 sm:text-xs">
              Marikina City, Philippines
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:flex">
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
        </nav>

        {/* Desktop call-to-action placeholder (right side spacing) */}
        <div className="hidden w-10 lg:block" />

        {/* Global menu button (mobile + desktop) */}
        <motion.button
          type="button"
          className="relative ml-4 flex h-8 w-8 items-center justify-center"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
          whileTap={{scale: 0.9}}
          transition={{type: 'spring', stiffness: 300, damping: 20}}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{opacity: 0, rotate: -90, scale: 0.7}}
                animate={{opacity: 1, rotate: 0, scale: 1}}
                exit={{opacity: 0, rotate: 90, scale: 0.7}}
                transition={{duration: 0.25, ease: 'easeOut'}}
              >
                <X size={20} className="text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{opacity: 0, rotate: 90, scale: 0.7}}
                animate={{opacity: 1, rotate: 0, scale: 1}}
                exit={{opacity: 0, rotate: -90, scale: 0.7}}
                transition={{duration: 0.25, ease: 'easeOut'}}
              >
                <Menu size={20} className="text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Global menu panel (mobile + desktop) */}
      <div
        className={`transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-3 bg-[var(--color-primary)]/95 px-5 pb-5 pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:rounded-b-xl sm:px-[60px]">
          {[...NAV_ITEMS, ...MENU_ITEMS].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="border-b border-white/10 pb-2 last:border-b-0 hover:text-[var(--color-accent)]"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header


