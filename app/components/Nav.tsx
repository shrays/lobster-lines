'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* Instruments */
import styles from '../styles/layout.module.css'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        href="/"
      >
        <img src="/logo_text.webp" alt="Logo" className={styles.logo} />
      </Link>

      <div className={styles.navLinks}>
        <Link
          className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
          href="/"
        >
          HOME
        </Link>
        <Link
          className={`${styles.link} ${
            pathname === '/comparisons' ? styles.active : ''
          }`}
          href="/comparisons"
        >
          COMPARISONS
        </Link>
        <Link
          className={`${styles.link} ${
            pathname === '/peak-times' ? styles.active : ''
          }`}
          href="/peak-times"
        >
          PEAK TIMES
        </Link>
        <Link
          className={`${styles.link} ${
            pathname === '/blog' ? styles.active : ''
          }`}
          href="/blog"
        >
          BLOG
        </Link>
        <Link
          className={`${styles.link} ${
            pathname === '/about' ? styles.active : ''
          }`}
          href="/about"
        >
          ABOUT
        </Link>
      </div>
    </nav>
  )
}
