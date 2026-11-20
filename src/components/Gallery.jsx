import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { gallery } from '../data';
import SectionHead from './SectionHead';
import Lightbox from './Lightbox';
import styles from './Gallery.module.css';

export default function Gallery({ reduced }) {
  const rootRef = useRef(null);
  const triggers = useRef([]);
  const [openIndex, setOpenIndex] = useState(null);

  useGSAP(
    () => {
      if (reduced) return;

      gsap.utils.toArray('[data-gallery-item]').forEach((item) => {
        gsap.fromTo(
          item.querySelector('[data-gallery-frame]'),
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
            },
          },
        );

        gsap.fromTo(
          item.querySelector('[data-gallery-media]'),
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const navigate = useCallback((direction) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + direction + gallery.length) % gallery.length;
    });
  }, []);

  return (
    <section id="gallery" className={styles.section} ref={rootRef} aria-labelledby="gallery-title">
      <div className="shell">
        <SectionHead index="03" label="Gallery" />

        <div className={styles.intro}>
          <h2 className={styles.heading} id="gallery-title">
            In frame
          </h2>
          <p className={styles.introNote}>Four portraits. Click to view full size.</p>
        </div>

        <div className={styles.grid}>
          {gallery.map((image, index) => (
            <figure className={styles.item} key={image.src} data-gallery-item>
              <button
                type="button"
                className={styles.button}
                ref={(element) => {
                  triggers.current[index] = element;
                }}
                onClick={() => setOpenIndex(index)}
                data-cursor-label="View"
                aria-label={`Open image: ${image.caption}`}
              >
                <span className={styles.frame} data-gallery-frame>
                  <span className={styles.media} data-gallery-media>
                    <img
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </span>
                <span className={styles.caption}>
                  <span>{image.caption}</span>
                  <span className={styles.view}>View</span>
                </span>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {openIndex !== null ? (
        <Lightbox
          items={gallery}
          index={openIndex}
          onClose={close}
          onNavigate={navigate}
        />
      ) : null}
    </section>
  );
}
