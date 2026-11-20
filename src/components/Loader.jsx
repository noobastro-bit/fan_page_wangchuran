import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Loader.module.css';

export default function Loader({ onDone }) {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const finished = useRef(false);

  useGSAP(
    () => {
      const counter = { value: 0 };
      const tl = gsap.timeline();

      tl.to(counter, {
        value: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          const value = Math.round(counter.value);
          if (countRef.current) {
            countRef.current.textContent = String(value).padStart(3, '0');
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${value / 100})`;
          }
        },
      })
        .add(() => {
          if (!finished.current) {
            finished.current = true;
            onDone();
          }
        })
        .to(innerRef.current, {
          yPercent: -12,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.in',
        }, '+=0.1')
        .to(rootRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1,
          ease: 'expo.inOut',
        }, '-=0.2')
        .set(rootRef.current, { display: 'none' });
    },
    { scope: rootRef },
  );

  return (
    <div className={styles.root} ref={rootRef} aria-hidden="true">
      <div className={styles.inner} ref={innerRef}>
        <div className={styles.top}>
          <span className={`zh ${styles.zh}`} lang="zh-Hans">
            王楚然
          </span>
          <span className={styles.topNote}>Fan archive</span>
        </div>

        <div className={styles.center}>
          <span className={styles.name}>Wang Churan</span>
        </div>

        <div className={styles.bottom}>
          <span className={styles.note}>Portraits &amp; works</span>
          <span className={styles.count} ref={countRef}>
            000
          </span>
        </div>

        <div className={styles.track}>
          <span className={styles.bar} ref={barRef} />
        </div>
      </div>
    </div>
  );
}
