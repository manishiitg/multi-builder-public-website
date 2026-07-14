(() => {
  const hero = document.querySelector('[data-hero-loop]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phases = [
    { key: 'run', caption: 'Coordinate agents and workflows from one operating view.' },
    { key: 'measure', caption: 'Turn every run into evidence: goals, risks, costs, and outcomes.' },
    { key: 'learn', caption: 'Ask for human judgment when the workflow needs context.' },
    { key: 'improve', caption: 'Have a goal advisor critique results and recommend the next bounded change.' }
  ];

  if (hero) {
    const steps = Array.from(hero.querySelectorAll('[data-hero-loop-step]'));
    const panels = Array.from(hero.querySelectorAll('[data-hero-loop-panel]'));
    const caption = hero.querySelector('[data-hero-loop-caption]');
    let phaseIndex = 0;
    let timer = null;

    const setPhase = index => {
      phaseIndex = index % phases.length;
      const phase = phases[phaseIndex];
      hero.dataset.heroPhase = phase.key;
      if (caption) caption.textContent = phase.caption;

      steps.forEach(step => {
        step.classList.remove('is-active');
        step.removeAttribute('aria-current');
      });

      const activeStep = steps.find(step => step.dataset.heroLoopStep === phase.key);
      if (activeStep) {
        void activeStep.offsetWidth;
        activeStep.classList.add('is-active');
        activeStep.setAttribute('aria-current', 'step');
      }

      panels.forEach(panel => {
        const isActive = panel.dataset.heroLoopPanel === phase.key;
        panel.classList.toggle('is-active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
      });
    };

    const startLoop = () => {
      if (reduceMotion || timer !== null) return;
      timer = window.setInterval(() => setPhase(phaseIndex + 1), 5200);
    };

    const stopLoop = () => {
      if (timer === null) return;
      window.clearInterval(timer);
      timer = null;
    };

    steps.forEach((step, index) => {
      step.addEventListener('click', () => {
        stopLoop();
        setPhase(index);
        startLoop();
      });
    });

    setPhase(0);
    startLoop();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopLoop();
      else startLoop();
    });

    window.addEventListener('pagehide', stopLoop, { once: true });
  }

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
  if (!document.documentElement.classList.contains('hero-preview-ploy')) return;

  const hero = document.querySelector('[data-ploy-hero]');
  if (!hero) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phases = [
    { key: 'run', label: 'Run', caption: 'Coordinate every agent and workflow from one operating view.' },
    { key: 'measure', label: 'Measure', caption: 'Turn each run into visible goals, risks, costs, and outcomes.' },
    { key: 'learn', label: 'Learn', caption: 'Bring human judgment into the moments where context matters.' },
    { key: 'improve', label: 'Improve', caption: 'Have a goal advisor critique results and recommend the next bounded change.' }
  ];
  const steps = Array.from(hero.querySelectorAll('[data-ploy-step]'));
  const label = hero.querySelector('[data-ploy-label]');
  const caption = hero.querySelector('[data-ploy-caption]');
  let phaseIndex = 0;

  const setPhase = index => {
    phaseIndex = index % phases.length;
    const phase = phases[phaseIndex];
    hero.dataset.ployPhase = phase.key;
    if (label) label.textContent = phase.label;
    if (caption) caption.textContent = phase.caption;

    steps.forEach(step => {
      const isActive = step.dataset.ployStep === phase.key;
      step.classList.toggle('is-active', isActive);
      if (isActive) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
  };

  setPhase(0);
  if (!reduceMotion) window.setInterval(() => setPhase(phaseIndex + 1), 5200);
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
    const manualOnly = document.documentElement.classList.contains('routing-preview-proof') && scene.matches('[data-runtime-showcase]');
    let frame = null;
    let activeKey = firstKey;
    let manualKey = null;
    let manualScrollY = 0;

    const applyState = (nextKey, fade) => {
      showcase.style.setProperty(progressProperty, fade.toFixed(4));
      if (nextKey === activeKey) return;
      activeKey = nextKey;

      steps.forEach(step => {
        const isActive = step.dataset.showcaseStep === activeKey;
        step.classList.toggle('is-active', isActive);
        if (step.matches('button')) step.setAttribute('aria-selected', String(isActive));
      });
      panels.forEach(panel => panel.setAttribute('aria-hidden', String(panel.dataset.showcasePanel !== activeKey)));
      notes.forEach(note => note.classList.toggle('is-active', note.dataset.showcaseNote === activeKey));
    };

    const update = () => {
      frame = null;
      const bounds = scene.getBoundingClientRect();
      const isVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;

      if (manualKey && isVisible && Math.abs(window.scrollY - manualScrollY) < 120) {
        applyState(manualKey, manualKey === secondKey ? 1 : 0);
        return;
      }

      manualKey = null;
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
      const nextKey = progress >= 0.5 ? secondKey : firstKey;
      applyState(nextKey, fade);
    };

    const requestUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    const interactiveSteps = steps.filter(step => step.matches('button'));
    interactiveSteps.forEach((step, index) => {
      step.addEventListener('click', () => {
        manualKey = step.dataset.showcaseStep;
        manualScrollY = window.scrollY;
        applyState(manualKey, manualKey === secondKey ? 1 : 0);
      });

      step.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextStep = interactiveSteps[(index + direction + interactiveSteps.length) % interactiveSteps.length];
        nextStep.focus();
        nextStep.click();
      });
    });

    if (manualOnly) {
      applyState(firstKey, 0);
      return;
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    stickyLayout.addEventListener('change', requestUpdate);
    update();
  };

  setupShowcase('[data-runtime-showcase]', '.runtime-showcase', '--routing-progress');
  setupShowcase('[data-context-showcase]', '.context-showcase', '--context-progress');
})();

(() => {
  const dialog = document.querySelector('[data-product-lightbox]');
  if (!dialog) return;

  const image = dialog.querySelector('[data-product-lightbox-image]');
  const title = dialog.querySelector('[data-product-lightbox-title]');
  const close = dialog.querySelector('[data-product-lightbox-close]');

  document.querySelectorAll('[data-lightbox-src]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      image.src = trigger.dataset.lightboxSrc;
      image.alt = trigger.getAttribute('aria-label') || '';
      title.textContent = trigger.dataset.lightboxTitle || 'Product screenshot';
      dialog.showModal();
    });
  });

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    image.alt = '';
  });
})();
