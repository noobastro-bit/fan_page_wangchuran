import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';

export default function Cursor({ disabled = false }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (disabled) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return undefined;

    const html = document.documentElement;
    html.classList.add('has-custom-cursor');

    gsap.set([dot, ring, label], { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { scale: 0.35, autoAlpha: 0 });
    gsap.set(label, { autoAlpha: 0 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    const labelX = gsap.quickTo(label, 'x', { duration: 0.45, ease: 'power3' });
    const labelY = gsap.quickTo(label, 'y', { duration: 0.45, ease: 'power3' });

    const move = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      labelX(event.clientX);
      labelY(event.clientY);
    };

    const over = (event) => {
      const interactive = event.target.closest('a, button, [data-cursor-label]');
      const labelled = event.target.closest('[data-cursor-label]');
      const isField = event.target.closest('input, textarea, select');

      gsap.to(ring, {
        scale: interactive && !isField ? 1 : 0.35,
        autoAlpha: interactive && !isField ? 1 : 0,
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        scale: interactive && !isField ? 0.35 : 1,
        autoAlpha: interactive && !isField ? 0.5 : 1,
        duration: 0.35,
        ease: 'power3.out',
      });

      if (labelled) {
        label.textContent = labelled.dataset.cursorLabel ?? '';
        gsap.to(label, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
      }
    };

    const hide = () => {
      gsap.to([dot, ring, label], { autoAlpha: 0, duration: 0.25 });
    };

    const show = () => {
      gsap.to(dot, { autoAlpha: 1, duration: 0.25 });
    };

    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    document.addEventListener('pointerenter', show);
    window.addEventListener('cursor:hide', hide);
    window.addEventListener('cursor:show', show);

    return () => {
      html.classList.remove('has-custom-cursor');
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      document.removeEventListener('pointerenter', show);
      window.removeEventListener('cursor:hide', hide);
      window.removeEventListener('cursor:show', show);
      gsap.killTweensOf([dot, ring, label]);
    };
  }, [disabled]);

  return (
    <div aria-hidden="true">
      <span className={styles.dot} ref={dotRef} />
      <span className={styles.ring} ref={ringRef} />
      <span className={styles.label} ref={labelRef} />
    </div>
  );
}
