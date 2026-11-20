import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { about } from '../data';
import SectionHead from './SectionHead';
import SplitWords from './SplitWords';
import styles from './About.module.css';

export default function About({ reduced }) {
  const rootRef = useRef(null);
  const figureRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 980px)', () => {
        ScrollTrigger.create({
          trigger: figureRef.current,
          start: 'top 96',
          endTrigger: rootRef.current,
          end: 'bottom bottom',
          pin: figureRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.1 },
        {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: figureRef.current,
            start: 'top 82%',
          },
        },
      );

      gsap.from('[data-heading-line]', {
        yPercent: 110,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '[data-about-heading]',
          start: 'top 84%',
        },
      });

      gsap.utils.toArray('[data-split]').forEach((element) => {
        gsap.from(element.querySelectorAll('.sw-inner'), {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.014,
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
          },
        });
      });

      gsap.from('[data-about-row]', {
        y: 18,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '[data-about-details]',
          start: 'top 88%',
        },
      });
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <section id="about" className={styles.section} ref={rootRef} aria-labelledby="about-title">
      <div className="shell">
        <SectionHead index="01" label="About" />

        <div className={styles.grid}>
          <figure className={styles.figureCol} ref={figureRef}>
            <div className={styles.frame}>
              <img
                ref={imageRef}
                src="/images/about-portrait.webp"
                width="1080"
                height="2010"
                alt="Wang Churan in a black coat, photographed against a cool grey backdrop and looking over her shoulder"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className={styles.caption}>
              <span>Studio portrait</span>
              <span>CC0 · Commons</span>
            </figcaption>
          </figure>

          <div className={styles.content}>
            <h2 className={styles.heading} id="about-title" data-about-heading>
              {about.heading.map((line) => (
                <span className={styles.headingLine} key={line}>
                  <span data-heading-line>{line}</span>
                </span>
              ))}
            </h2>

            <p className={styles.lead} data-split>
              <SplitWords text={about.lead} />
            </p>

            {about.paragraphs.map((paragraph) => (
              <p className={styles.para} key={paragraph.slice(0, 24)} data-split>
                <SplitWords text={paragraph} />
              </p>
            ))}

            <div className={styles.details} data-about-details>
              <dl className={styles.facts}>
                {about.facts.map(([term, value]) => (
                  <div className={styles.fact} key={term} data-about-row>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className={styles.recognition}>
                <p className={styles.recognitionLabel}>Recognition</p>
                <ul>
                  {about.recognition.map((item) => (
                    <li className={styles.recognitionRow} key={item.text} data-about-row>
                      <span className={styles.recognitionYear}>{item.year}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
