import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getLenis } from '../lib/scroll';
import styles from './Lightbox.module.css';

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const closeRef = useRef(null);
  const firstRender = useRef(true);
  const handlers = useRef({ onClose, onNavigate });

  handlers.current = { onClose, onNavigate };

  const item = items[index];

  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.fromTo(
          rootRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' },
        ).fromTo(
          imageRef.current,
          { clipPath: 'inset(8% 8% 8% 8%)', scale: 1.03, autoAlpha: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, autoAlpha: 1, duration: 0.9 },
          0.05,
        );
        return;
      }

      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, scale: 1.015 },
        { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' },
      );
    },
    { dependencies: [index], scope: rootRef },
  );

  useEffect(() => {
    const lenis = getLenis();
    const previousOverflow = document.documentElement.style.overflow;
    const previousFocus = document.activeElement;

    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.classList.add('lightbox-open');
    closeRef.current?.focus();
    window.dispatchEvent(new Event('cursor:hide'));

    const onKeyDown = (event) => {
      if (event.key === 'Escape') handlers.current.onClose();
      if (event.key === 'ArrowRight') handlers.current.onNavigate(1);
      if (event.key === 'ArrowLeft') handlers.current.onNavigate(-1);

      if (event.key === 'Tab' && rootRef.current) {
        const focusable = rootRef.current.querySelectorAll('button:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = previousOverflow;
      document.documentElement.classList.remove('lightbox-open');
      lenis?.start();
      window.dispatchEvent(new Event('cursor:show'));
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    };
  }, []);

  return (
    <div
      className={styles.root}
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption} — enlarged image`}
      data-lenis-prevent
    >
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Close image viewer"
        tabIndex={-1}
      />

      <div className={styles.bar}>
        <span className={styles.count}>
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          ref={closeRef}
          aria-label="Close image viewer"
        >
          Close <span aria-hidden="true">×</span>
        </button>
      </div>

      <figure className={styles.figure}>
        <img
          key={item.src}
          ref={imageRef}
          src={item.src}
          width={item.width}
          height={item.height}
          alt={item.alt}
        />
        <figcaption className={styles.caption}>
          <span>{item.caption}</span>
          <span>{item.credit}</span>
        </figcaption>
      </figure>

      <div className={styles.nav}>
        <button type="button" onClick={() => onNavigate(-1)} aria-label="Previous image">
          <span aria-hidden="true">←</span> Prev
        </button>
        <button type="button" onClick={() => onNavigate(1)} aria-label="Next image">
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
