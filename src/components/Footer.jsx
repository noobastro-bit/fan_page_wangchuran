import { credits } from '../data';
import { scrollToTop } from '../lib/scroll';
import styles from './Footer.module.css';

export default function Footer({ reduced }) {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.top}>
          <div>
            <p className={`zh ${styles.zh}`} lang="zh-Hans">
              王楚然
            </p>
            <p className={styles.wordmark}>Wang Churan — Fan Archive</p>
          </div>

          <button
            type="button"
            className={styles.toTop}
            onClick={() => scrollToTop(reduced)}
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <span className={styles.arrow} aria-hidden="true">
              ↑
            </span>
          </button>
        </div>

        <div className={styles.disclaimer}>
          <p className={styles.notice}>
            Unofficial fan site. Not affiliated with Wang Churan, her studio, or her management.
          </p>
          <p>
            Facts are compiled from Wikipedia and the public sources listed in the project README.
            Portraits are used for identification and editorial commentary; all rights remain with
            their respective owners.
          </p>
        </div>

        <div className={styles.credits}>
          <h2 className={styles.creditsTitle}>Image credits</h2>

          <ul className={styles.creditList}>
            {credits.map((credit) => (
              <li key={credit.file}>
                <span className={styles.creditUsed}>{credit.used}</span>
                <a href={credit.url} target="_blank" rel="noreferrer noopener">
                  {credit.file}
                </a>
                <span className={styles.creditLicense}>CC0 1.0</span>
              </li>
            ))}
          </ul>

          <p className={styles.creditNote}>
            All portraits above were sourced from Wikimedia Commons under CC0 1.0 and were uploaded
            there by User:Estellabella. Typography: Cormorant Garamond and Inter (SIL Open Font
            License); 王楚然 set in Noto Serif SC (SIL Open Font License).
          </p>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 · A fan project</span>
          <span>Built with React, GSAP &amp; Lenis</span>
        </div>
      </div>
    </footer>
  );
}
