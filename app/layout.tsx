/* Components */
import { Providers } from '@/lib/providers'
import { Nav } from './components/Nav'

/* Instruments */
import styles from './styles/layout.module.css'
import './styles/globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <title>Lobster Lines</title>
        <body>
          <section className={styles.container}>
            <Nav />

            {/* <header className={styles.header}>
              <img src="/logo.svg" className={styles.logo} alt="logo" />
            </header> */}

            <main className={styles.main}>{props.children}</main>

            <footer className={styles.footer}>
              <span>Copyright © 2023 <span className={styles.highlighted}>Lobster Lines</span>. All Rights Reserved</span>
              <div className={styles.disclaimer}>
                  Disclaimer: This site is not affiliated with or endorsed by Red Lobster.<br />All trademarks belong to their respective owners. Wait times are for<br />reference only; please verify with individual locations.
              </div>
            </footer>
          </section>
        </body>
      </html>
    </Providers>
  )
}
