/* BrightSpark Electrical Services – interactive features
   2.1 Interactive elements: modals, accordion, tabs, Leaflet map, animations, DOM manipulation, lightbox gallery
   2.2 Dynamic content: services loaded and rendered with JavaScript, search, filter and sort
   Plain JavaScript, no frameworks required. Each feature only runs on pages that contain its markup. */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Modal helpers (used by emergency banner, enquiry confirmation, lightbox) ---------- */
  var lastFocus = null;

  function openModal(modal) {
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('bs-no-scroll');
    var dlg = $('[role="dialog"]', modal);
    if (dlg) dlg.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('bs-no-scroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function wireClose(modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.classList.contains('bs-lightbox__dialog') ||
          e.target.closest('.bs-modal__close') || e.target.closest('[data-close]')) {
        closeModal(modal);
      }
    });
  }

  function buildModal(id, title, content) {
    var modal = document.createElement('div');
    modal.className = 'bs-modal';
    modal.id = id;
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="bs-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="' + id + '-title" tabindex="-1">' +
      '<button class="bs-modal__close" type="button" aria-label="Close">&times;</button>' +
      '<h2 id="' + id + '-title"></h2><div class="bs-modal__body"></div></div>';
    $('h2', modal).textContent = title;
    var body = $('.bs-modal__body', modal);
    if (typeof content === 'string') { body.innerHTML = content; } else { body.appendChild(content); }
    wireClose(modal);
    document.body.appendChild(modal);
    return modal;
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var open = $('.bs-modal.is-open');
      if (open) closeModal(open);
    }
  });

  /* ---------- Scroll reveal animation ---------- */
  var revealObserver = null;
  function reveal(elements) {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    elements.forEach(function (el) {
      el.classList.add('bs-reveal');
      revealObserver.observe(el);
    });
  }

  /* ---------- Emergency banner opens a modal ---------- */
  function initEmergencyModal() {
    var banner = $('.emergency-banner');
    if (!banner) return;
    var modal = buildModal('emergency-modal', 'Electrical emergency?',
      '<p><strong>If anyone has been shocked, or you can see fire or smoke, call 112 first.</strong></p>' +
      '<p>For a fault that is not life-threatening, switch off the affected circuit at the distribution board and contact our 24/7 emergency line.</p>' +
      '<p>WhatsApp: <strong>+27 819 2833</strong></p>' +
      '<p><a class="btn" href="contact.html">Contact details</a> <button type="button" class="bs-btn-quiet" data-close>Close</button></p>');
    banner.setAttribute('role', 'button');
    banner.setAttribute('tabindex', '0');
    banner.setAttribute('aria-haspopup', 'dialog');
    banner.title = 'Click for emergency advice';
    banner.addEventListener('click', function () { openModal(modal); });
    banner.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(modal); }
    });
  }

  /* ---------- Accordion (FAQ) ---------- */
  function initAccordions() {
    $$('[data-accordion]').forEach(function (acc) {
      $$('.bs-acc__trigger', acc).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var item = btn.closest('.bs-acc__item');
          var willOpen = !item.classList.contains('is-open');
          $$('.bs-acc__item.is-open', acc).forEach(function (other) {
            if (other !== item) {
              other.classList.remove('is-open');
              $('.bs-acc__trigger', other).setAttribute('aria-expanded', 'false');
            }
          });
          item.classList.toggle('is-open', willOpen);
          btn.setAttribute('aria-expanded', String(willOpen));
        });
      });
    });
  }

  /* ---------- Tabs (Mission / Vision / Who we serve) ---------- */
  function initTabs() {
    $$('[data-tabs]').forEach(function (root) {
      var tabs = $$('[role="tab"]', root);
      var panels = $$('[role="tabpanel"]', root);

      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
        });
        panels.forEach(function (p) { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
        if (focus) tab.focus();
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab); });
        tab.addEventListener('keydown', function (e) {
          var next = null;
          if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
          else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
          else if (e.key === 'Home') next = tabs[0];
          else if (e.key === 'End') next = tabs[tabs.length - 1];
          if (next) { e.preventDefault(); select(next, true); }
        });
      });
    });
  }

  /* ---------- Gallery with lightbox ---------- */
  function initGallery() {
    var items = $$('.bs-gallery__item');
    if (!items.length) return;
    var index = 0;

    var lb = document.createElement('div');
    lb.className = 'bs-modal bs-lightbox';
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML =
      '<div class="bs-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Image viewer" tabindex="-1">' +
      '<button class="bs-modal__close" type="button" aria-label="Close image viewer">&times;</button>' +
      '<button class="bs-lightbox__nav bs-lightbox__prev" type="button" aria-label="Previous image">&#8249;</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button class="bs-lightbox__nav bs-lightbox__next" type="button" aria-label="Next image">&#8250;</button></div>';
    document.body.appendChild(lb);
    wireClose(lb);

    var img = $('img', lb);
    var cap = $('figcaption', lb);

    function show(i) {
      index = (i + items.length) % items.length;
      var item = items[index];
      img.classList.remove('is-in');
      img.src = item.getAttribute('data-full');
      img.alt = $('img', item).alt;
      cap.textContent = (index + 1) + ' of ' + items.length + ': ' + item.getAttribute('data-caption');
      // restart the fade-in transition
      void img.offsetWidth;
      img.classList.add('is-in');
    }

    items.forEach(function (item, i) {
      item.addEventListener('click', function () { show(i); openModal(lb); });
    });
    $('.bs-lightbox__prev', lb).addEventListener('click', function () { show(index - 1); });
    $('.bs-lightbox__next', lb).addEventListener('click', function () { show(index + 1); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
    reveal(items);
  }

  /* ---------- Interactive map (Leaflet + OpenStreetMap) ---------- */
  function initMap() {
    var el = $('#map');
    if (!el) return;
    if (typeof L === 'undefined') {
      el.innerHTML = '<p class="bs-map__fallback">The map could not be loaded. Please check your connection and refresh the page.</p>';
      return;
    }
    var pos = [-26.2041, 28.0473]; // Johannesburg
    var map = L.map(el, { scrollWheelZoom: false }).setView(pos, 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker(pos).addTo(map)
      .bindPopup('<strong>BrightSpark Electrical Services</strong><br>Johannesburg, Gauteng')
      .openPopup();
    L.circle(pos, { radius: 45000, color: '#f5b400', weight: 2, fillColor: '#f5b400', fillOpacity: 0.12 })
      .addTo(map).bindTooltip('Approximate service area', { sticky: true });
    // Only zoom with the scroll wheel once the map has been clicked, so page scrolling is not hijacked
    map.on('focus', function () { map.scrollWheelZoom.enable(); });
    map.on('blur', function () { map.scrollWheelZoom.disable(); });
  }

  /* ---------- Services: dynamic content, search, filter, sort ---------- */
  var SERVICES = [
    { id: 'residential', name: 'Residential Electrical', category: 'Home',
      desc: 'Installations, repairs, and upgrades for homes across Gauteng.', option: 'Residential Electrical' },
    { id: 'commercial', name: 'Commercial Electrical', category: 'Business',
      desc: 'Reliable electrical solutions for offices, retail, and business premises.', option: 'Commercial Electrical' },
    { id: 'industrial', name: 'Light-Industrial Electrical', category: 'Business',
      desc: 'Safe, code-compliant work for light-industrial sites and equipment.', option: 'Light-Industrial Electrical' },
    { id: 'coc', name: 'Compliance Certificates (CoC)', category: 'Compliance',
      desc: 'Certificate of Compliance issuing for property sales, rentals, and insurance requirements.', option: 'Compliance Certificate (CoC)' },
    { id: 'emergency', name: '24/7 Emergency Callouts', category: 'Emergency',
      desc: 'Fast response for urgent electrical faults, any time of day or night.', option: 'Emergency Callout' }
  ];

  // Simulates loading from a server. Swap the body for fetch('services.json').then(r => r.json()) when a backend exists.
  function loadServices() {
    return new Promise(function (resolve) {
      setTimeout(function () { resolve(SERVICES.slice()); }, reduceMotion ? 0 : 400);
    });
  }

  // Builds a fragment with matches wrapped in <mark>, using DOM nodes instead of innerHTML
  function highlight(text, term) {
    var frag = document.createDocumentFragment();
    if (!term) { frag.appendChild(document.createTextNode(text)); return frag; }
    var lower = text.toLowerCase(), t = term.toLowerCase(), pos = 0, hit;
    while ((hit = lower.indexOf(t, pos)) !== -1) {
      if (hit > pos) frag.appendChild(document.createTextNode(text.slice(pos, hit)));
      var mark = document.createElement('mark');
      mark.textContent = text.slice(hit, hit + t.length);
      frag.appendChild(mark);
      pos = hit + t.length;
    }
    if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
    return frag;
  }

  function initServices() {
    var list = $('#services-list');
    if (!list) return;
    var search = $('#service-search');
    var sort = $('#service-sort');
    var chipBox = $('.bs-chips');
    var count = $('#services-count');
    var data = [];
    var state = { term: '', sort: 'name-asc', category: 'All' };

    list.innerHTML = '<p class="bs-loading">Loading services&hellip;</p>';

    function render() {
      var term = state.term.trim().toLowerCase();
      var rows = data.filter(function (s) {
        var okCat = state.category === 'All' || s.category === state.category;
        var okTerm = !term || (s.name + ' ' + s.desc + ' ' + s.category).toLowerCase().indexOf(term) !== -1;
        return okCat && okTerm;
      });
      rows.sort(function (a, b) {
        if (state.sort === 'name-desc') return b.name.localeCompare(a.name);
        if (state.sort === 'category') return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        return a.name.localeCompare(b.name);
      });

      list.textContent = '';
      rows.forEach(function (s) {
        var card = document.createElement('article');
        card.className = 'card bs-service';

        var tag = document.createElement('span');
        tag.className = 'bs-tag';
        tag.textContent = s.category;

        var h3 = document.createElement('h3');
        h3.appendChild(highlight(s.name, state.term.trim()));

        var p = document.createElement('p');
        p.appendChild(highlight(s.desc, state.term.trim()));

        var a = document.createElement('a');
        a.className = 'bs-service__link';
        a.href = 'enquiry.html?service=' + encodeURIComponent(s.option);
        a.textContent = 'Get a quote for this service';

        card.appendChild(tag); card.appendChild(h3); card.appendChild(p); card.appendChild(a);
        list.appendChild(card);
      });

      if (!rows.length) {
        var empty = document.createElement('p');
        empty.className = 'bs-empty';
        empty.textContent = 'No services match your search. Try a different word or choose "All".';
        list.appendChild(empty);
      }
      count.textContent = rows.length + ' of ' + data.length + ' services shown';
      reveal($$('.bs-service', list));
    }

    function buildChips() {
      var cats = ['All'];
      data.forEach(function (s) { if (cats.indexOf(s.category) === -1) cats.push(s.category); });
      cats.forEach(function (c) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'bs-chip';
        b.textContent = c;
        b.setAttribute('aria-pressed', String(c === state.category));
        b.addEventListener('click', function () {
          state.category = c;
          $$('.bs-chip', chipBox).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          render();
        });
        chipBox.appendChild(b);
      });
    }

    search.addEventListener('input', function () { state.term = search.value; render(); });
    sort.addEventListener('change', function () { state.sort = sort.value; render(); });

    loadServices().then(function (rows) {
      data = rows;
      buildChips();
      render();
    });
  }

  /* ---------- Enquiry form: pre-select service, photo preview, confirmation modal ---------- */
  function initEnquiry() {
    var form = $('form');
    var service = $('#service');
    if (!form || !service) return;

    var wanted = new URLSearchParams(window.location.search).get('service');
    if (wanted) {
      var match = $$('option', service).filter(function (o) { return o.text === wanted; })[0];
      if (match) service.value = match.value || match.text;
    }

    var photo = $('#photo');
    var preview = document.createElement('img');
    preview.className = 'bs-preview';
    preview.alt = 'Preview of the photo you selected';
    preview.hidden = true;
    photo.insertAdjacentElement('afterend', preview);
    photo.addEventListener('change', function () {
      var file = photo.files && photo.files[0];
      if (!file) { preview.hidden = true; return; }
      var reader = new FileReader();
      reader.onload = function (e) { preview.src = e.target.result; preview.hidden = false; };
      reader.readAsDataURL(file);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var list = document.createElement('div');
      var intro = document.createElement('p');
      intro.textContent = 'Thanks, ' + $('#name').value.trim().split(' ')[0] + '. We have your details and will get back to you promptly.';
      var dl = document.createElement('dl');
      dl.className = 'bs-summary';
      [['Service', service.value], ['Phone', $('#phone').value], ['Email', $('#email').value]].forEach(function (pair) {
        var dt = document.createElement('dt'); dt.textContent = pair[0];
        var dd = document.createElement('dd'); dd.textContent = pair[1];
        dl.appendChild(dt); dl.appendChild(dd);
      });
      var close = document.createElement('button');
      close.type = 'button'; close.className = 'btn'; close.textContent = 'Done';
      close.setAttribute('data-close', '');
      list.appendChild(intro); list.appendChild(dl); list.appendChild(close);

      var old = $('#enquiry-modal');
      if (old) old.remove();
      var modal = buildModal('enquiry-modal', 'Enquiry received', list);
      openModal(modal);
      form.reset();
      preview.hidden = true;
    });
  }

  /* ---------- Start ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initEmergencyModal();
    initAccordions();
    initTabs();
    initGallery();
    initMap();
    initServices();
    initEnquiry();
    reveal($$('section > .card, section > .bs-acc, section > .bs-tabs, .bs-map'));
  });
})();
