import { Nav } from './components/Nav'
import { Analytics } from '@vercel/analytics/react';
import styles from './styles/layout.module.css'
import './styles/globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en">
      <title>Lobster Lines</title>
      <head>
        {/* <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' /> */}
        <script src="https://unpkg.com/maplibre-gl/dist/maplibre-gl.js"></script>
        <link href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css" rel="stylesheet" />

        <meta name="description" content="Don't get caught in those pesky lines. Discover current wait times at your nearest Red Lobster today!" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://www.lobsterlines.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lobster Lines" />
        <meta property="og:description" content="Don't get caught in those pesky lines. Discover current wait times at your nearest Red Lobster today!" />
        <meta property="og:image" content="/preview.webp" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="lobsterlines.com" />
        <meta property="twitter:url" content="https://www.lobsterlines.com/" />
        <meta name="twitter:title" content="Lobster Lines" />
        <meta name="twitter:description" content="Don't get caught in those pesky lines. Discover current wait times at your nearest Red Lobster today!" />
        <meta name="twitter:image" content="/preview.webp" />

      </head>
      <body>
        <section className={styles.container}>
          <Nav />          
          <main className={styles.main}>
            {props.children}
          </main>

          <footer className={styles.footer}>
            <span>Copyright © {currentYear} <span className={styles.highlighted}>Lobster Lines</span>. All Rights Reserved</span>
            <div className={styles.disclaimer}>
                Disclaimer: This site is not affiliated with or endorsed by Red Lobster. All trademarks belong to their respective owners. Wait times are for reference only; please verify with individual locations.
            </div>
          </footer>
        </section>
        <Analytics />
      </body>
    </html>
  )
}
