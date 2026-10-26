/* George's Bloom & Broom | Garden marker carousel
   Two sets of three; only Robert's review is genuine at launch.
   Upcoming slots are explicitly labelled; replace them with real reviews later.
   Gentle planting/blooming transition ~2.07 seconds; accessible keyboard controls. */
(function () {
  'use strict';
  function init() {
    const stage = document.getElementById('review-carousel');
    if (!stage) return;
    const track = stage.querySelector('.bb-review-track');
    const viewport = stage.querySelector('.bb-review-viewport');
    const pages = Array.from(stage.querySelectorAll('.bb-review-page'));
    const previous = stage.querySelector('.bb-review-nav-prev');
    const next = stage.querySelector('.bb-review-nav-next');
    const currentText = stage.querySelector('.bb-review-current');
    const totalText = stage.querySelector('.bb-review-total');
    if (!track || !viewport || !pages.length || !previous || !next || !currentText || !totalText) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let busy = false;
    totalText.textContent = String(pages.length).padStart(2,'0');

    function updateControls() {
      previous.disabled = busy || current === 0;
      next.disabled = busy || current === pages.length - 1;
      currentText.textContent = String(current + 1).padStart(2,'0');
    }
    function accessibility() {
      pages.forEach((page, index) => {
        const active = index === current;
        page.setAttribute('aria-hidden', String(!active));
        page.inert = !active;
      });
      updateControls();
    }
    function sizeMarkers() {
      const markers = Array.from(stage.querySelectorAll('.bb-review-marker'));
      markers.forEach(marker => { marker.style.minHeight = ''; });
      if (window.innerWidth > 700) {
        const maxHeight = Math.max(0, ...markers.map(marker => marker.getBoundingClientRect().height));
        markers.forEach(marker => { marker.style.minHeight = Math.ceil(maxHeight) + 'px'; });
      }
    }
    function resize() { viewport.style.height = pages[current].offsetHeight + 'px'; }
    function go(direction) {
      const destination = current + direction;
      if (busy || destination < 0 || destination >= pages.length) return;
      const outgoing = pages[current];
      const incoming = pages[destination];
      if (reduceMotion.matches) {
        current = destination;
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + current * 100 + '%)';
        accessibility(); resize();
        return;
      }
      busy = true;
      updateControls();
      // Make the upcoming group visible, but retain its inert state until selected.
      incoming.classList.add('bb-is-ready');
      outgoing.classList.add('bb-is-leaving');
      viewport.style.height = Math.max(outgoing.offsetHeight, incoming.offsetHeight) + 'px';
      // Stage 1: previous markers rise gently from the soil.
      window.setTimeout(() => {
        incoming.removeAttribute('aria-hidden');
        track.style.transition = 'transform 483ms cubic-bezier(.25,.8,.22,1)';
        track.style.transform = 'translateX(-' + destination * 100 + '%)';
      }, 221);
      // Stage 2: new markers sink into the earth and flowers open in sequence.
      window.setTimeout(() => {
        current = destination;
        accessibility();
        incoming.classList.remove('bb-is-ready');
        incoming.classList.add('bb-is-planting');
        viewport.style.height = incoming.offsetHeight + 'px';
      }, 725);
      // Stage 3: reset animations for another swipe in either direction.
      window.setTimeout(() => {
        incoming.classList.remove('bb-is-planting');
        outgoing.classList.remove('bb-is-leaving');
        busy = false;
        resize(); accessibility();
      }, 2069);
    }
    previous.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    stage.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' && current > 0 && !busy) {
        event.preventDefault(); go(-1); previous.focus();
      }
      if (event.key === 'ArrowRight' && current < pages.length - 1 && !busy) {
        event.preventDefault(); go(1); next.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (!busy) { sizeMarkers(); resize(); }
    }, {passive:true});
    track.style.transition = 'none';
    track.style.transform = 'translateX(0%)';
    sizeMarkers();
    accessibility();
    resize();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { if (!busy) { sizeMarkers(); resize(); } });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
