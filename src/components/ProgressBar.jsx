import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './ProgressBar.module.css';

export default function ProgressBar() {
  const barRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: 0.3,
        },
      },
    );
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <span className={styles.bar} ref={barRef} />
    </div>
  );
}
