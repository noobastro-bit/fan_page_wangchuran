import { useState } from 'react';
import { socials } from '../data';
import SectionHead from './SectionHead';
import styles from './Connect.module.css';

export default function Connect() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setStatus({
      type: 'success',
      message: 'Thank you — this demo form does not send or store anything.',
    });
    setEmail('');
  };

  return (
    <section id="connect" className={styles.section} aria-labelledby="connect-title">
      <div className="shell">
        <SectionHead index="05" label="Connect" />

        <div className={styles.grid}>
          <div className={styles.intro}>
            <h2 className={styles.heading} id="connect-title">
              Find her
              <br />
              elsewhere.
            </h2>
            <p className={styles.introNote}>
              Official accounts, checked 20 November 2026. Follow her work there, not here.
            </p>
          </div>

          <div className={styles.links}>
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.link}
              >
                <span className={styles.platform}>{social.platform}</span>
                <span className={styles.handle}>{social.handle}</span>
                <span className={styles.linkNote}>{social.note}</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.newsletter}>
          <div className={styles.newsCopy}>
            <p className={styles.newsLabel}>Letters, occasionally</p>
            <p className={styles.newsNote}>A demo field — nothing is sent or stored.</p>
          </div>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <label className="visually-hidden" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-describedby="news-status"
            />
            <button type="submit">
              Subscribe <span aria-hidden="true">→</span>
            </button>
          </form>

          <p
            id="news-status"
            className={`${styles.status} ${status?.type === 'error' ? styles.statusError : ''}`}
            role="status"
            aria-live="polite"
          >
            {status?.message ?? ''}
          </p>
        </div>
      </div>
    </section>
  );
}
