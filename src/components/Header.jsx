import { useEffect, useState } from 'react';
import styles from './Header.module.css';

const links = [
  ['About', '#about'],
  ['Works', '#works'],
  ['Gallery', '#gallery'],
  ['Connect', '#connect'],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <a className={styles.brand} href="#top" aria-label="Wang Churan fan archive, back to top">
        <span className={`zh ${styles.zh}`} lang="zh-Hans">
          王楚然
        </span>
        <span className={styles.brandNote}>Fan archive</span>
      </a>

      <nav className={styles.nav} aria-label="Sections">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
