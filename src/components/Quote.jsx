import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { quote } from '../data';
import SplitWords from './SplitWords';
import styles from './Quote.module.css';

export default function Quote({ reduced }) {
  const rootRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => {
        gsap.fromTo(
          textRef.current.querySelectorAll('.sw-inner'),
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.12,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: '+=130%',
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      mm.add('(max-width: 899px)', () => {
        gsap.fromTo(
          textRef.current.querySelectorAll('.sw-inner'),
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 84%',
            },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <section className={styles.section} ref={rootRef} aria-labelledby="quote-title">
      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <h2 className={styles.label} id="quote-title">
            {quote.label}
          </h2>
          <span className={styles.count}>04 / 04</span>
        </div>

        <p className={`zh ${styles.zh}`} lang="zh-Hans">
          {quote.zh}
        </p>

        <blockquote className={styles.text} ref={textRef}>
          <SplitWords text={quote.text} />
        </blockquote>

        <p className={styles.note}>An editorial note by this fan archive — not a quotation.</p>
      </div>
    </section>
  );
}
