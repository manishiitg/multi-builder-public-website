// AgentWorks launch site: shared behavior for home, pricing, enterprise, templates.
(function () {
  document.documentElement.classList.remove('no-js');

  // Sticky header border once the page scrolls.
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu.
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Product dropdown: click to toggle, Escape or outside click to close.
  document.querySelectorAll('[data-drop]').forEach(function (drop) {
    var btn = drop.querySelector('[data-drop-btn]');
    var set = function (open) { drop.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); };
    btn.addEventListener('click', function (e) { e.stopPropagation(); set(!drop.classList.contains('is-open')); });
    document.addEventListener('click', function (e) { if (!drop.contains(e.target)) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  });

  // Template filters: tabs set a category, the optional search box narrows by text.
  document.querySelectorAll('[data-tpl-filter]').forEach(function (root) {
    var tabs = root.querySelectorAll('[data-filter]');
    var cards = root.querySelectorAll('[data-cat]');
    var search = root.querySelector('[data-tpl-search]');
    var empty = root.querySelector('[data-tpl-empty]');
    var sections = root.querySelectorAll('[data-tpl-section]');
    var current = 'all';

    var apply = function () {
      var q = search ? search.value.trim().toLowerCase() : '';
      var shown = 0;
      cards.forEach(function (card) {
        var inCat = current === 'all' || card.getAttribute('data-cat').split(' ').indexOf(current) !== -1;
        var inText = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
        var visible = inCat && inText;
        card.hidden = !visible;
        if (visible) shown += 1;
      });
      sections.forEach(function (section) {
        section.hidden = !section.querySelector('[data-cat]:not([hidden])');
      });
      if (empty) empty.classList.toggle('is-visible', shown === 0);
    };

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        current = tab.getAttribute('data-filter');
        tabs.forEach(function (t) { t.setAttribute('aria-pressed', t === tab ? 'true' : 'false'); });
        apply();
      });
    });
    if (search) search.addEventListener('input', apply);
  });

  // Hero video: respect reduced motion (the poster frame shows the end state).
  var heroVideo = document.querySelector('[data-hero-video]');
  if (heroVideo && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
  }

  // Reveal on scroll.
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
