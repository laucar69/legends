import styles from './Footer.module.css'

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerItem}>
              <span className={styles.footerIcon}>🥡</span>
              <span>Legends Lieferservice</span>
            </div>
            <div className={styles.footerItem}>
              <span className={styles.footerIcon}>📫</span>
              <a href="mailto:info@legends.de">info@legends.de</a>
            </div>
            <div className={styles.footerItem}>
              <span className={styles.footerIcon}>📞</span>
              <a href="tel:+4917623768017">0176 237 680 17</a>
            </div>
            <div className={styles.footerItem}>
              <span className={styles.footerIcon}>⏰</span>
              <span>Mo - So 17 - 24 Uhr</span>
            </div>
          </div>
          <div className={styles.footerCopyright}>
            © 2025 Legends Lieferservice. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    )
  }
