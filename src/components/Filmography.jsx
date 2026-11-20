import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { forthcoming, works } from '../data';
import SectionHead from './SectionHead';
import styles from './Filmography.module.css';

const previews = {
  'oh_my_general': '/images/oh_my_general.jpg',
  'serenade': '/images/serenade.jpg',
  'royal_feast': '/images/royal_feast.jpg',
  'have_a_crush': '/images/have_a_crush.jpg',
  'longest_promise': '/images/longest_promise.jpg',
  'fireworks': '/images/fireworks.jpg',
  'joy_of_life': '/images/joy_of_life.jpg',
  'you_are_the_one' : '/images/you_are_the_one.jpg',
  'how_dare_you': '/images/how_dare_you.jpg',
  'love_has_fireworks': '/images/love_has_fireworks.jpg',
  'overdo': '/images/overdo.jpg',
  'hidden_shadow': '/images/hidden_shadow.jpg',
  'ming_dynasty': '/images/ming_dynasty.jpg',
  'tales_of_floating': '/images/tales_of_floating.jpg'
};

function WorkRow({ work, onEnter, onLeave, forthcoming = false }) {
  return (
    <li
      className={styles.row}
      {...(forthcoming ? { 'data-forthcoming-row': '' } : { 'data-work-row': '' })}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') onEnter(work, event);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') onLeave();
      }}
    >
      <span className={styles.year}>{work.year}</span>
      <span className={styles.title}>
        <span className={styles.titleEn}>{work.title}</span>
        <span className={styles.titleZh} lang="zh-Hans">
          {work.titleZh}
        </span>
      </span>
      <span className={styles.role}>{work.role}</span>
      <span className={styles.note}>{work.note}</span>
    </li>
  );
}

export default function Filmography({ reduced }) {
  const rootRef = useRef(null);
  const previewRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  const [active, setActive] = useState(null);

  useGSAP(
    () => {
      if (reduced) return;

      xTo.current = gsap.quickTo(previewRef.current, 'x', {
        duration: 0.5,
        ease: 'power3',
      });
      yTo.current = gsap.quickTo(previewRef.current, 'y', {
        duration: 0.5,
        ease: 'power3',
      });

      gsap.from('[data-work-row]', {
        y: 22,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.045,
        scrollTrigger: {
          trigger: '[data-work-list]',
          start: 'top 84%',
        },
      });

      gsap.from('[data-forthcoming-row]', {
        y: 18,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '[data-forthcoming]',
          start: 'top 88%',
        },
      });
    },
   { scope: rootRef, dependencies: [reduced] },
  );

  useEffect(() => {
    if (reduced) return;
    gsap.to(previewRef.current, {
      autoAlpha: active === null ? 0 : 1,
      scale: active === null ? 0.94 : 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, [active, reduced]);

  const movePreview = (event) => {
    if (!xTo.current || !yTo.current || !previewRef.current) return;
    const width = previewRef.current.offsetWidth || 220;
    const height = width * (4 / 3);
   const gap = 26;
    const x =
      event.clientX + gap + width > window.innerWidth
        ? event.clientX - width - gap
        : event.clientX + gap;
    const y = Math.min(
      Math.max(event.clientY - height / 2, 16),
      window.innerHeight - height - 16,
    );
    xTo.current(x);
    yTo.current(y);
  };

  return (
    <section
      id="works"
      className={styles.section}
      ref={rootRef}
      aria-labelledby="works-title"
      onPointerMove={(event) => {
        if (active !== null && event.pointerType === 'mouse') movePreview(event);
      }}
    >
      <div className="shell">
        <SectionHead index="02" label="Filmography" />

        <div className={styles.intro}>
          <h2 className={styles.heading} id="works-title">
            Selected work
          </h2>
          <p className={styles.introNote}>
            Television and streaming roles, 2017 — 2026. Hover a title for a portrait.
          </p>
        </div>

        <div className={styles.columns} aria-hidden="true">
          <span>Year</span>
          <span>Title</span>
          <span>Role</span>
          <span>Notes</span>
        </div>

        <ul className={styles.list} data-work-list>
          {works.map((work) => (
            <WorkRow
              key={`${work.title}-${work.year}`}
              work={work}
              onEnter={(item, event) => {
                setActive(item.image);
                movePreview(event);
              }}
              onLeave={() => setActive(null)}
            />
          ))}
        </ul>

        <div className={styles.forthcoming} data-forthcoming>
          <p className={styles.forthLabel}>Forthcoming</p>
          <ul className={styles.list}>
            {forthcoming.map((work) => (
              <WorkRow
                key={work.title}
                work={work}
                forthcoming
                onEnter={(item, event) => {
                  setActive(item.image);
                  movePreview(event);
                }}
                onLeave={() => setActive(null)}
              />
            ))}
          </ul>
        </div>

        <p className={styles.source}>
          Titles and roles per Wikipedia and broadcaster listings. Release dates are for mainland
          China.
        </p>
      </div>

      <div className={styles.preview} ref={previewRef} aria-hidden="true">
        {Object.entries(previews).map(([key, src]) => (
          <img
            key={key}
            src={src}
            alt=""
            width="560"
            height="747"
            loading="lazy"
            className={active === key ? styles.previewActive : ''}
          />
        ))}
        <span className={styles.previewFrame} />
      </div>
    </section>
  );
}
