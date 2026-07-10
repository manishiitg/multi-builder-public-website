(() => {
  const hero = document.querySelector('.hero');
  const product = document.querySelector('[data-hero-product]');
  const supportsPointerMotion = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!hero || !product || !supportsPointerMotion || reduceMotion) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame = null;

  const render = () => {
    currentX += (targetX - currentX) * 0.09;
    currentY += (targetY - currentY) * 0.09;

    product.style.setProperty('--tilt-x', `${-currentY * 1.7}deg`);
    product.style.setProperty('--tilt-y', `${currentX * 2.4}deg`);
    product.style.setProperty('--shift-x', `${currentX * 8}px`);
    product.style.setProperty('--shift-y', `${currentY * 5}px`);

    const settled = Math.abs(targetX - currentX) < 0.002 && Math.abs(targetY - currentY) < 0.002;
    frame = settled ? null : window.requestAnimationFrame(render);
  };

  const startRender = () => {
    if (frame === null) frame = window.requestAnimationFrame(render);
  };

  hero.addEventListener('pointermove', event => {
    const bounds = hero.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    product.classList.add('is-pointer-active');
    startRender();
  });

  hero.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
    product.classList.remove('is-pointer-active');
    startRender();
  });

  document.body.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  document.querySelectorAll('[data-reveal]').forEach(node => revealObserver.observe(node));
})();

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stickyLayout = window.matchMedia('(min-width: 769px) and (min-height: 720px)');
  const clamp = value => Math.min(1, Math.max(0, value));
  const smoothstep = value => value * value * (3 - 2 * value);

  const setupShowcase = (sceneSelector, showcaseSelector, progressProperty) => {
    const scene = document.querySelector(sceneSelector);
    if (!scene) return;

    const showcase = scene.querySelector(showcaseSelector);
    const steps = Array.from(scene.querySelectorAll('[data-showcase-step]'));
    const panels = Array.from(showcase.querySelectorAll('[data-showcase-panel]'));
    const notes = Array.from(showcase.querySelectorAll('[data-showcase-note]'));
    if (panels.length !== 2) return;

    const firstKey = panels[0].dataset.showcasePanel;
    const secondKey = panels[1].dataset.showcasePanel;
    let frame = null;
    let activeKey = firstKey;

    const update = () => {
      frame = null;
      const bounds = scene.getBoundingClientRect();
      let progress;

      if (stickyLayout.matches) {
        const stickyTop = Number.parseFloat(window.getComputedStyle(showcase).top) || 0;
        const travel = Math.max(1, scene.offsetHeight - showcase.offsetHeight);
        progress = clamp((stickyTop - bounds.top) / travel);
      } else {
        const start = window.innerHeight * 0.78;
        const end = window.innerHeight * 0.22;
        progress = clamp((start - bounds.top) / Math.max(1, start - end));
      }

      const fade = reduceMotion ? Number(progress >= 0.5) : smoothstep(clamp((progress - 0.34) / 0.32));
      showcase.style.setProperty(progressProperty, fade.toFixed(4));

      const nextKey = progress >= 0.5 ? secondKey : firstKey;
      if (nextKey === activeKey) return;
      activeKey = nextKey;

      steps.forEach(step => step.classList.toggle('is-active', step.dataset.showcaseStep === activeKey));
      panels.forEach(panel => panel.setAttribute('aria-hidden', String(panel.dataset.showcasePanel !== activeKey)));
      notes.forEach(note => note.classList.toggle('is-active', note.dataset.showcaseNote === activeKey));
    };

    const requestUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    stickyLayout.addEventListener('change', requestUpdate);
    update();
  };

  setupShowcase('[data-runtime-showcase]', '.runtime-showcase', '--routing-progress');
  setupShowcase('[data-context-showcase]', '.context-showcase', '--context-progress');
})();
