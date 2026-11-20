import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import useReducedMotion from './lib/useReducedMotion';
import { getLenis, setLenis } from './lib/scroll';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Filmography from './components/Filmography';
import Gallery from './components/Gallery';
import Quote from './components/Quote';
import Connect from './components/Connect';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const reduced = useReducedMotion();
  const [introDone, setIntroDone] = useState(reduced);

  useEffect(() => {
    if (reduced) setIntroDone(true);
  }, [reduced]);

  // Lock the page while the loader runs.
  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !introDone);
    return () => document.documentElement.classList.remove('is-loading');
  }, [introDone]);

  // Smooth scrolling, synced with ScrollTrigger.
  useEffect(() => {
    if (reduced || !introDone) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [introDone, reduced]);

  // Keep ScrollTrigger measurements fresh after fonts and images.
  useEffect(() => {
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', refresh);
    };
  }, []);

  // Smooth in-page anchors (native jump otherwise).
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const lenis = getLenis();
      if (lenis && !reduced) {
        lenis.scrollTo(target, { offset: -56, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [reduced]);

  // Clean up any ScrollTrigger instances when the app unmounts.
  useEffect(() => () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill()), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ProgressBar />
      <Header />
      {!reduced ? <Loader onDone={() => setIntroDone(true)} /> : null}
      <Cursor disabled={reduced} />

      <main id="main">
        <Hero ready={introDone} reduced={reduced} />
        <About reduced={reduced} />
        <Filmography reduced={reduced} />
        <Gallery reduced={reduced} />
        <Quote reduced={reduced} />
        <Connect />
      </main>

      <Footer reduced={reduced} />
    </>
  );
}
