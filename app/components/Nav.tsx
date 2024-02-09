'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Nav.module.css';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <Link href="/">
        <img src="/logo_text.webp" alt="Logo" className={styles.logo} />
      </Link>

      {/* Hamburger Icon */}
      <div className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerX : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      {/* Links */}
      <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
        <Link
          className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
          href="/"
          onClick={() => setIsMenuOpen(false)}
        >
          HOME
        </Link>
        <Link
          className={`${styles.link} ${pathname === '/peak-times' ? styles.active : ''}`}
          href="/peak-times"
          onClick={() => setIsMenuOpen(false)}
        >
          PEAK TIMES
        </Link>
        <Link
          className={`${styles.link} ${pathname === '/blog' ? styles.active : ''}`}
          href="/blog"
          onClick={() => setIsMenuOpen(false)}
        >
          BLOG
        </Link>
        <Link
          className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}
          href="/about"
          onClick={() => setIsMenuOpen(false)}
        >
          ABOUT
        </Link>
      </div>
    </nav>
  );
};
