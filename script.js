(function () {
  'use strict';

  // Desktop lawn-mower scrollbar: use scroll progress to trim the grass,
  // and allow the gardener to be dragged, clicked or operated by keyboard.
  // On small screens / touch / reduced motion the native scrollbar remains.
  function initMowerScroll() {
    const scroller = document.getElementById('mower-scroll');
    const track = document.getElementById('mower-track');
    const thumb = document.getElementById('mower-thumb');
    const cutGrass = document.getElementById('mower-cut-grass');
    const progressText = document.getElementById('mower-progress');
    if (!scroller || !track || !thumb || !cutGrass || !progressText) return;

    const setting = window.matchMedia('(min-width: 1180px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let enabled = false;
    let dragging = false;
    let lastScroll = window.scrollY;
    let rafId = 0;
    let stopTimer = 0;
    const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    function updateMower() {
      rafId = 0;
      if (!enabled) return;
      const total = maxScroll();
      const fraction = total ? clamp(window.scrollY / total, 0, 1) : 0;
      const travel = Math.max(0, track.clientHeight - thumb.offsetHeight);
      const percent = Math.round(fraction * 100);
      thumb.style.setProperty('--mower-y', `${Math.round(travel * fraction)}px`);
      cutGrass.style.setProperty('--cut-height', `${(fraction * 100).toFixed(3)}%`);
      progressText.textContent = `${percent}%`;
      scroller.setAttribute('aria-valuenow', String(percent));
      scroller.setAttribute('aria-valuetext', percent === 0 ? 'At the top of the page, grass uncut' : percent === 100 ? 'At the bottom of the page, grass fully mown' : `${percent} percent through the page, grass mown to here`);
    }

    function scheduleUpdate() {
      if (!rafId) rafId = window.requestAnimationFrame(updateMower);
    }

    function handleScroll() {
      if (!enabled) return;
      if (Math.abs(window.scrollY - lastScroll) > .5) {
        scroller.classList.add('is-mowing');
        window.clearTimeout(stopTimer);
        stopTimer = window.setTimeout(() => scroller.classList.remove('is-mowing'), 240);
      }
      lastScroll = window.scrollY;
      scheduleUpdate();
    }

    function chooseScroll(clientY) {
      const box = track.getBoundingClientRect();
      const travel = Math.max(1, box.height - thumb.offsetHeight);
      const position = clamp(clientY - box.top - thumb.offsetHeight / 2, 0, travel);
      window.scrollTo({top: position / travel * maxScroll(), behavior: 'instant'});
      scheduleUpdate();
    }

    scroller.addEventListener('pointerdown', event => {
      if (!enabled || event.button !== 0) return;
      dragging = true;
      scroller.setPointerCapture(event.pointerId);
      chooseScroll(event.clientY);
      event.preventDefault();
    });
    scroller.addEventListener('pointermove', event => {
      if (dragging && enabled) chooseScroll(event.clientY);
    });
    const endDrag = () => {dragging = false;};
    scroller.addEventListener('pointerup', endDrag);
    scroller.addEventListener('pointercancel', endDrag);
    scroller.addEventListener('lostpointercapture', endDrag);

    scroller.addEventListener('keydown', event => {
      if (!enabled) return;
      let destination = null;
      const delta = window.innerHeight * .72;
      switch (event.key) {
        case 'ArrowDown': destination = window.scrollY + 90; break;
        case 'ArrowUp': destination = window.scrollY - 90; break;
        case 'PageDown': destination = window.scrollY + delta; break;
        case 'PageUp': destination = window.scrollY - delta; break;
        case 'Home': destination = 0; break;
        case 'End': destination = maxScroll(); break;
        default: return;
      }
      event.preventDefault();
      window.scrollTo({top: clamp(destination, 0, maxScroll()), behavior: 'instant'});
      scheduleUpdate();
    });

    function syncAvailability() {
      enabled = setting.matches && maxScroll() > 0;
      scroller.hidden = !enabled;
      scroller.tabIndex = enabled ? 0 : -1;
      document.documentElement.classList.toggle('mower-scroll-ready', enabled);
      if (!enabled) scroller.classList.remove('is-mowing');
      lastScroll = window.scrollY;
      scheduleUpdate();
    }

    window.addEventListener('scroll', handleScroll, {passive:true});
    window.addEventListener('resize', () => {syncAvailability();scheduleUpdate();}, {passive:true});
    if (setting.addEventListener) setting.addEventListener('change', syncAvailability);
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {syncAvailability();scheduleUpdate();});
      observer.observe(document.documentElement);
    }
    syncAvailability();
  }
  initMowerScroll();

  const menuButton = document.querySelector('.menu-button');
  const navigation = document.getElementById('site-nav');
  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      if (isOpen) { closeMenu(); return; }
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close menu');
      navigation.classList.add('is-open');
      document.body.classList.add('menu-open');
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    const wideScreen = window.matchMedia('(min-width: 901px)');
    if (wideScreen.addEventListener) wideScreen.addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Local illustrations always work. Real licensed sample photos are an optional enhancement.
  // If offline or image loading is blocked, the illustration stays visible.
  document.querySelectorAll('img[data-photo-url]').forEach(element => {
    const url = element.getAttribute('data-photo-url');
    if (!url) return;
    const replacement = new Image();
    replacement.decoding = 'async';
    replacement.onload = () => {
      element.src = replacement.src;
      element.dataset.imageType = 'sample-photograph';
    };
    replacement.onerror = () => { /* Keep bundled illustration. */ };
    replacement.src = url;
  });

  // Interactive perspective garden: hover/focus previews a service; a click or
  // tap selects it. All the example drawings are labelled as illustrations,
  // never as photographs of George's actual completed jobs.
  function initInteractiveGarden() {
    const explorer = document.getElementById('garden-explorer');
    if (!explorer) return;
    const panel = document.getElementById('garden-detail');
    const heading = document.getElementById('garden-detail-title');
    const place = document.getElementById('garden-detail-place');
    const number = document.getElementById('garden-detail-number');
    const description = document.getElementById('garden-detail-description');
    const before = document.getElementById('garden-example-before');
    const after = document.getElementById('garden-example-after');
    const enquire = document.getElementById('garden-enquire');
    const controls = Array.from(document.querySelectorAll('[data-garden]'));
    if (!panel || !heading || !place || !number || !description || !before || !after || !enquire) return;

    const services = {
      fence: {number:'01',location:'AT THE REAR FENCE',title:'Fence painting & care',service:'Fence painting & care',description:'Freshen up weathered fence panels and talk through the finishing details to make your garden feel cared for.',before:'Illustration of a worn garden fence',after:'Illustration of a newly painted fence'},
      hedges: {number:'02',location:'ALONG THE LEFT HEDGE',title:'Hedge trimming',service:'Hedges & shrubs',description:'Neat, carefully shaped hedges can transform the whole border and bring structure back to the garden.',before:'Illustration of an overgrown hedge',after:'Illustration of a neatly trimmed hedge'},
      borders: {number:'03',location:'IN THE FLOWERBEDS',title:'Flower beds & planting',service:'Planting & garden care',description:'Ask about border weeding, seasonal planting and making space for colourful flowers and healthy plants.',before:'Illustration of a weedy border',after:'Illustration of a tidy flowering border'},
      lawn: {number:'04',location:'THE CENTRAL LAWN',title:'Lawn mowing & edging',service:'Lawn mowing & edging',description:'A freshly mown lawn with tidy edges gives the whole garden a welcoming finish.',before:'Illustration of long grass',after:'Illustration of evenly cut grass'},
      leaves: {number:'05',location:'BESIDE THE LEAF PILE',title:'Leaf collection & tidy-ups',service:'Leaf collection & seasonal tidy-ups',description:'Keep paths, borders and lawn areas clear of fallen leaves and seasonal garden debris.',before:'Illustration of fallen leaves',after:'Illustration of the same space tidied'},
      patio: {number:'06',location:'ON THE FOREGROUND PATIO',title:'Patio & path cleaning',service:'Patio & path care',description:'Ask about refreshing patio slabs, sweeping paths and improving the appearance of hard surfaces.',before:'Illustration of a dirty patio',after:'Illustration of a clean patio'},
      tree: {number:'07',location:'BENEATH THE RIGHT-HAND TREES',title:'Tree pruning & clearance',service:'Tree pruning & clearance',description:'Discuss light pruning and clearing fallen branches. Larger tree work may require an appropriately qualified specialist.',before:'Illustration of an untidy tree area',after:'Illustration of a tidied tree area'},
      shed: {number:'08',location:'BY THE GARDEN SHED',title:'Shed & garden organisation',service:'Shed & garden organisation',description:'Ask about sweeping, clearing leaves and tidying the space around a garden shed. This does not imply building or repair work.',before:'Illustration of a cluttered shed area',after:'Illustration of a tidy shed area'}
    };
    let selected = 'lawn';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 680px)');
    // On narrow screens start in the middle of the panorama: visitors can
    // swipe left for hedges and flowerbeds or right for the shed and trees.
    const panorama = explorer.querySelector('.garden-viewport');
    let panoramaPositioned = false;
    function centrePanoramaOnMobile() {
      if (!panorama || !narrow.matches || panoramaPositioned) return;
      if (panorama.scrollWidth <= panorama.clientWidth) return;
      panorama.scrollLeft = (panorama.scrollWidth - panorama.clientWidth) / 2;
      panoramaPositioned = true;
    }
    window.requestAnimationFrame(centrePanoramaOnMobile);
    if (narrow.addEventListener) narrow.addEventListener('change', event => {
      if (event.matches) { panoramaPositioned = false; window.requestAnimationFrame(centrePanoramaOnMobile); }
    });
    function render(id) {
      const data = services[id];
      if (!data) return;
      number.textContent = data.number + ' / 08';
      place.textContent = data.location;
      heading.textContent = data.title;
      description.textContent = data.description;
      before.src = 'assets/examples/' + id + '-before.svg';
      before.alt = data.before;
      after.src = 'assets/examples/' + id + '-after.svg';
      after.alt = data.after;
      enquire.dataset.service = data.service;
      enquire.setAttribute('aria-label', 'Ask George about ' + data.title);
    }
    function select(id, scrollToDetail) {
      if (!services[id]) return;
      selected = id;
      render(id);
      controls.forEach(control => control.setAttribute('aria-pressed',String(control.dataset.garden === id)));
      if (scrollToDetail && narrow.matches) {
        panel.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth', block:'nearest'});
      }
    }
    controls.forEach(control => {
      const id = control.dataset.garden;
      if (!services[id]) return;
      control.addEventListener('mouseenter', () => render(id));
      control.addEventListener('mouseleave', () => render(selected));
      control.addEventListener('focus', () => render(id));
      control.addEventListener('blur', () => render(selected));
      control.addEventListener('click', () => select(id, true));
    });
    select(selected, false);
  }
  initInteractiveGarden();

  const serviceSelect = document.getElementById('your-service');
  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      if (serviceSelect) serviceSelect.value = link.dataset.service;
    });
  });

  // The enquiry form uses native HTML POST to FormSubmit.
  // This works on GitHub Pages without running our own server.
  // The first submission triggers a one-time email activation for George.
  const form = document.getElementById('enquiry-form');
  const status = document.getElementById('form-status');

  if (form) {
    // Native required/type=email validation is preserved. This additional
    // check prevents whitespace-only submissions in name/message fields.
    form.addEventListener('submit', event => {
      if (status) status.textContent = '';
      const requiredTextFields = [
        document.getElementById('your-name'),
        document.getElementById('garden-message')
      ].filter(Boolean);

      const emptyField = requiredTextFields.find(field => !field.value.trim());
      if (emptyField) {
        event.preventDefault();
        emptyField.setCustomValidity('Please complete this field.');
        emptyField.reportValidity();
        emptyField.focus();
      }
    });

    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => field.setCustomValidity(''));
    });
  }

}());
