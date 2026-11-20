let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToTop(reduced = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: reduced ? 0 : 1.2 });
    return;
  }
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}
