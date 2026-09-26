// Dropdowns and mobile menu for the shared header on pages that don't load launch.js (Docs).
(function () {
  var toggle = document.querySelector('.site-header [data-menu-toggle]');
  var menu = document.querySelector('.site-header [data-mobile-menu]');
  if (toggle && menu) toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.site-header [data-drop]').forEach(function (drop) {
    var btn = drop.querySelector('[data-drop-btn]');
    var set = function (open) { drop.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); };
    btn.addEventListener('click', function (e) { e.stopPropagation(); set(!drop.classList.contains('is-open')); });
    document.addEventListener('click', function (e) { if (!drop.contains(e.target)) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  });
})();
