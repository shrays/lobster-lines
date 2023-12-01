import { Nav } from './components/Nav'
import { Analytics } from '@vercel/analytics/react';
import styles from './styles/layout.module.css'
import './styles/globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <title>Lobster Lines</title>
      <head>
        {/* <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' /> */}
        <script src="https://unpkg.com/maplibre-gl/dist/maplibre-gl.js"></script>
        <link href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css" rel="stylesheet" />
        <meta name="description" content="Lobster Lines: Discover real-time wait times at your nearest Red Lobster restaurants. Fast, accurate, and user-friendly, with interactive maps and up-to-date information." />
      </head>
      <body>
        <section className={styles.container}>
          <Nav />          
          <main className={styles.main}>
            {props.children}
          </main>

          <footer className={styles.footer}>
            <span>Copyright © 2023 <span className={styles.highlighted}>Lobster Lines</span>. All Rights Reserved</span>
            <div className={styles.disclaimer}>
                Disclaimer: This site is not affiliated with or endorsed by Red Lobster.<br />All trademarks belong to their respective owners. Wait times are for<br />reference only; please verify with individual locations.
            </div>
          </footer>
        </section>
        <Analytics />
      </body>
    </html>
  )
}
