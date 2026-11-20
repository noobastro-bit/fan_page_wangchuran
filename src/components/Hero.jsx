import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroMeta } from '../data';
import styles from './Hero.module.css';

export default function Hero({ ready, reduced }) {
  const rootRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      if (!ready || reduced) return;

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.14 },
        { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.4 },
        0,
      )
        .fromTo(
          '[data-hero-line]',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.2, stagger: 0.09 },
          0.1,
        )
        .fromTo(
          '[data-hero-fade]',
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08 },
          0.55,
        );
    },
    { scope: rootRef, dependencies: [ready, reduced] },
  );

  return (
    <section id="top" className={styles.hero} ref={rootRef} aria-labelledby="hero-title">
      <div className={styles.media}>
        <img
          ref={imageRef}
          src="/images/hero-portrait.webp"
          width="1600"
          height="2133"
          alt="Wang Churan in a pale satin dress, photographed against a textured grey wall"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className={`shell ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.kicker} data-hero-fade>
            <span>Fan archive</span>
            <span className={styles.kickerDot} aria-hidden="true" />
            <span>Portraits &amp; works</span>
          </p>

          <h1 className={styles.name} id="hero-title">
            <span className={styles.line}>
              <span className={styles.lineInner} data-hero-line>
                Wang
              </span>
            </span>
            <span className={styles.line}>
              <span className={styles.lineInner} data-hero-line>
                Churan
              </span>
            </span>
          </h1>

          <p className={`zh ${styles.nameZh}`} lang="zh-Hans" data-hero-fade>
            王楚然
          </p>

          <p className={styles.tagline} data-hero-fade>
            Actress <span aria-hidden="true">·</span> Shanghai <span aria-hidden="true">·</span>{' '}
            born 1999
          </p>

          <dl className={styles.meta} data-hero-fade>
            {heroMeta.map(([term, value]) => (
              <div className={styles.metaItem} key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a className={styles.scroll} href="#about" aria-label="Scroll to the about section">
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.scrollTrack} aria-hidden="true">
          <span className={styles.scrollDot} />
        </span>
      </a>
    </section>
  );
}
