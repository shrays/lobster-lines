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
      <img src="/logo_text.webp" alt="Logo" className={styles.logo} />

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
          href="/pages/comparisons"
        >
          COMPARISONS
        </Link>
        <Link
          className={`${styles.link} ${
            pathname === '/peak-times' ? styles.active : ''
          }`}
          href="/pages/peak-times"
        >
          PEAK TIMES
        </Link>
        <Link
          className={`${styles.link} ${
            pathname === '/blog' ? styles.active : ''
          }`}
          href="/pages/blog"
        >
          BLOG
        </Link>
        <Link
          className={`${styles.link} ${
            pathname === '/about' ? styles.active : ''
          }`}
          href="/pages/about"
        >
          ABOUT
        </Link>
      </div>
    </nav>
  )
}
