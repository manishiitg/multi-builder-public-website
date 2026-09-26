/* Redirect legacy /docs/?doc=<path> reader URLs to static article URLs. */
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var doc = params.get('doc');
    if (!doc) return;
    doc = doc.replace(/\.md$/, '').replace(/^\.\//, '');
    if (!/^[A-Za-z0-9_./-]+$/.test(doc) || doc.indexOf('..') !== -1) return;
    var route = doc === 'README' ? '/docs/overview/' : '/docs/' + doc.replace(/\/README$/, '') + '/';
    window.location.replace(route + window.location.hash);
  } catch (e) { /* stay on the docs home */ }
})();
