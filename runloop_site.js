// AgentWorks marketing and docs pages. Static React runtime.

const h = React.createElement;

const BRAND_ASSETS = {
  mark: 'assets/brand/agentworks-logo.svg'
};
const PRODUCT_ASSET_BASE = 'assets/product/';
const productAsset = name => `${PRODUCT_ASSET_BASE}${name}`;
const SALES_CALL_URL = 'https://calendly.com/manishiitg/15min';
const INSTALL_COMMAND = 'curl -fsSL https://raw.githubusercontent.com/manishiitg/coding-agent-loop/main/install.sh | bash';

const PRODUCT_ASSETS = {
  workspace: productAsset('automation-workspace.png'),
  heroDashboard: productAsset('org-dashboard-scale.png'),
  modelCatalog: productAsset('model-catalog.png'),
  workflowPulse: `${productAsset('workflow-pulse.png')}?v=20260710-1857`,
  tradingPlan: productAsset('trading-plan-laptop.png'),
  botsConnector: productAsset('bots-connector.png'),
  browserIntegrations: productAsset('browser-integrations.png'),
  globalSecrets: productAsset('global-secrets.png'),
  globalSkills: productAsset('global-skills.png'),
  reporting: productAsset('reporting-dashboard.png'),
  generatedReport: `${productAsset('generated-report-dashboard.jpg')}?v=20260710-1901`,
  workflowCostAnalysis: `${productAsset('workflow-cost-analysis.jpg')}?v=20260710-1905`,
  liveTerminal: productAsset('live-terminal-tmux.png'),
  chief: productAsset('chief-of-staff.png'),
  goals: productAsset('org-goals.png'),
  pulse: productAsset('org-pulse.png'),
  workflowDemoVideo: productAsset('workflow-automation-demo.mp4'),
  workflowDemoPoster: productAsset('workflow-automation-demo-poster.jpg'),
  operatingLoopDemoVideo: productAsset('operating-loop-demo.mp4'),
  operatingLoopDemoPoster: productAsset('operating-loop-demo-poster.jpg'),
  cliDemoVideo: productAsset('multi-cli-management-demo.mp4'),
  cliDemoPoster: productAsset('multi-cli-management-demo-poster.jpg')
};

const ASSET_DIMENSIONS = {
  [PRODUCT_ASSETS.workspace]: [1420, 801],
  [PRODUCT_ASSETS.heroDashboard]: [1280, 720],
  [PRODUCT_ASSETS.modelCatalog]: [1280, 720],
  [PRODUCT_ASSETS.workflowPulse]: [1195, 768],
  [PRODUCT_ASSETS.tradingPlan]: [1280, 720],
  [PRODUCT_ASSETS.botsConnector]: [1280, 720],
  [PRODUCT_ASSETS.browserIntegrations]: [1280, 720],
  [PRODUCT_ASSETS.globalSecrets]: [1280, 720],
  [PRODUCT_ASSETS.globalSkills]: [1280, 720],
  [PRODUCT_ASSETS.reporting]: [1280, 720],
  [PRODUCT_ASSETS.generatedReport]: [1195, 768],
  [PRODUCT_ASSETS.workflowCostAnalysis]: [1195, 768],
  [PRODUCT_ASSETS.liveTerminal]: [1280, 720],
  [PRODUCT_ASSETS.chief]: [1420, 801],
  [PRODUCT_ASSETS.goals]: [1420, 801],
  [PRODUCT_ASSETS.pulse]: [1420, 801],
  [PRODUCT_ASSETS.workflowDemoVideo]: [1200, 720],
  [PRODUCT_ASSETS.workflowDemoPoster]: [1200, 720],
  [PRODUCT_ASSETS.operatingLoopDemoVideo]: [1200, 720],
  [PRODUCT_ASSETS.operatingLoopDemoPoster]: [1200, 720],
  [PRODUCT_ASSETS.cliDemoVideo]: [1200, 720],
  [PRODUCT_ASSETS.cliDemoPoster]: [1200, 720]
};

function imageAttrs(src, { alt, loading = 'lazy', fetchPriority } = {}) {
  const [width, height] = ASSET_DIMENSIONS[src] || [];
  return {
    src,
    alt,
    loading,
    decoding: 'async',
    ...(fetchPriority ? { fetchPriority } : {}),
    ...(width && height ? { width, height } : {})
  };
}

function videoAttrs(src, { label, poster, preload = 'metadata', autoPlay = true } = {}) {
  const [width, height] = ASSET_DIMENSIONS[src] || [];
  return {
    className: 'mk-motion-video',
    autoPlay,
    muted: true,
    loop: true,
    playsInline: true,
    preload,
    poster,
    'aria-label': label,
    ...(width && height ? { width, height } : {})
  };
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function ProductVideo({ src, poster, label, eager = false }) {
  const ref = React.useRef(null);
  const [shouldLoad, setShouldLoad] = React.useState(Boolean(eager));
  const [reducedMotion, setReducedMotion] = React.useState(prefersReducedMotion);

  React.useEffect(() => {
    if (shouldLoad || eager) return undefined;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '240px 0px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad, eager, src]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  React.useEffect(() => {
    if (!shouldLoad || reducedMotion || !ref.current) return;
    ref.current.load();
    ref.current.playbackRate = 0.72;
    const playAttempt = ref.current.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {});
    }
  }, [shouldLoad, reducedMotion, src]);

  const attachSource = shouldLoad && !reducedMotion;

  return h('video', {
    ref,
    ...videoAttrs(src, {
      poster,
      label,
      preload: attachSource ? 'metadata' : 'none',
      autoPlay: attachSource
    })
  },
    attachSource ? h('source', { src, type: 'video/mp4' }) : null
  );
}

function ExpandableProductVideo({ src, poster, label }) {
  const [open, setOpen] = React.useState(false);
  const title = label || 'Product demo';
  const [width, height] = ASSET_DIMENSIONS[src] || [];

  React.useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = event => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return h(React.Fragment, null,
    h('div', { className: 'mk-expandable-video' },
      h(ProductVideo, { src, poster, label }),
      h('button', {
        type: 'button',
        className: 'mk-expandable-video-action',
        onClick: () => setOpen(true),
        'aria-label': `Open full-size demo: ${title}`
      }, 'View full demo')
    ),
    open ? h('div', {
      className: 'mk-shot-lightbox mk-video-lightbox',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': title,
      onClick: event => {
        if (event.target === event.currentTarget) setOpen(false);
      }
    },
      h('div', { className: 'mk-shot-lightbox-panel mk-video-lightbox-panel' },
        h('div', { className: 'mk-shot-lightbox-head' },
          h('strong', null, title),
          h('div', null,
            h('button', {
              type: 'button',
              onClick: () => setOpen(false),
              'aria-label': 'Close demo'
            }, 'Close')
          )
        ),
        h('div', { className: 'mk-video-lightbox-canvas' },
          h('video', {
            className: 'mk-video-lightbox-media',
            controls: true,
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            poster,
            width,
            height,
            'aria-label': title
          },
            h('source', { src, type: 'video/mp4' })
          )
        )
      )
    ) : null
  );
}

function ExpandableProductImage({ src, alt, label, loading = 'lazy', fetchPriority, className }) {
  const [open, setOpen] = React.useState(false);
  const [zoomed, setZoomed] = React.useState(false);
  const canvasRef = React.useRef(null);
  const title = label || alt || 'Product screenshot';

  React.useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = event => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open || !zoomed || !canvasRef.current) return;
    const node = canvasRef.current;
    window.requestAnimationFrame(() => {
      node.scrollLeft = Math.max(0, (node.scrollWidth - node.clientWidth) / 2);
      node.scrollTop = Math.max(0, (node.scrollHeight - node.clientHeight) / 2);
    });
  }, [open, zoomed, src]);

  return h(React.Fragment, null,
    h('button', {
      type: 'button',
      className: 'mk-expandable-shot',
      onClick: () => {
        setZoomed(false);
        setOpen(true);
      },
      'aria-label': `Open full-size screenshot: ${title}`
    },
      h('img', {
        className,
        ...imageAttrs(src, { alt, loading, fetchPriority })
      }),
      h('span', { className: 'mk-expandable-shot-badge', 'aria-hidden': 'true' }, 'View full')
    ),
    open ? h('div', {
      className: 'mk-shot-lightbox',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': title,
      onClick: event => {
        if (event.target === event.currentTarget) setOpen(false);
      }
    },
      h('div', { className: `mk-shot-lightbox-panel ${zoomed ? 'zoomed' : ''}` },
        h('div', { className: 'mk-shot-lightbox-head' },
          h('strong', null, title),
          h('div', null,
            h('button', {
              type: 'button',
              onClick: () => setZoomed(value => !value),
              'aria-pressed': zoomed ? 'true' : 'false'
            }, zoomed ? 'Fit' : 'Zoom'),
            h('button', {
              type: 'button',
              onClick: () => setOpen(false),
              'aria-label': 'Close screenshot'
            }, 'Close')
          )
        ),
        h('div', { className: 'mk-shot-lightbox-canvas', ref: canvasRef },
          h('img', imageAttrs(src, { alt, loading: 'eager' }))
        )
      )
    ) : null
  );
}

function marketingPath(page) {
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '';
  if (page === 'home') return isLocal ? '/index.html' : '/';
  if (page === 'usecases') return '/use-cases/';
  if (page === 'updates') return '/updates/';
  if (page === 'how') return isLocal ? '/how.html' : '/how/';
  if (page === 'docs') return '/docs/';
  if (page === 'notfound') return '/404.html';
  return page;
}

function marketingHash(page, id) {
  return `${marketingPath(page)}#${id}`;
}

function IconGlyph({ label }) {
  const map = {
    run: 'M4 4h5l3 4-3 4H4z',
    pulse: 'M2 9h3l2-6 3 10 2-4h4',
    improve: 'M3 11c3-7 7-7 10-4m0 0V3m0 4H9',
    docs: 'M5 2h6l3 3v9H5zM11 2v4h4',
    shield: 'M8 2l6 2v4c0 4-2.4 6.5-6 8-3.6-1.5-6-4-6-8V4z',
    cli: 'M4 5l3 3-3 3m5 0h4',
    mcp: 'M5 5h6v6H5zM2 8h3m6 0h3M8 2v3m0 6v3',
    browser: 'M3 4h10v8H3zM3 7h10'
  };
  return h('svg', { className: 'mk-icon', viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' },
    h('path', { d: map[label] || map.run, stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' })
  );
}

function ProductLogo() {
  return h('a', { className: 'mk-brand', href: marketingPath('home'), 'aria-label': 'AgentWorks home' },
    h('span', { className: 'mk-brand-mark' },
      h('img', { src: BRAND_ASSETS.mark, alt: '', width: 32, height: 32, decoding: 'async' })
    ),
    h('span', null, 'AgentWorks')
  );
}

function MarketingNav({ current = 'home' }) {
  const links = [
    { id: 'how', label: 'Product', href: marketingPath('how') },
    { id: 'usecases', label: 'Use cases', href: marketingPath('usecases') },
    { id: 'docs', label: 'Docs', href: marketingPath('docs') }
  ];
  return h('header', { className: 'mk-nav' },
    h('a', { className: 'mk-skip-link', href: marketingHash(current, 'main-content') }, 'Skip to content'),
    h('div', { className: 'mk-nav-inner' },
      h(ProductLogo),
      h('nav', { className: 'mk-nav-links', 'aria-label': 'Primary' },
        links.map(link =>
          h('a', {
            key: link.id,
            href: link.href,
            className: current === link.id ? 'active' : ''
          }, link.label)
        )
      ),
      h('div', { className: 'mk-nav-actions' },
        h('a', { href: 'https://github.com/manishiitg/coding-agent-loop', target: '_blank', rel: 'noreferrer' }, 'GitHub'),
        h('a', { className: 'mk-btn mk-btn-small', href: SALES_CALL_URL, target: '_blank', rel: 'noreferrer' }, 'Book a call')
      )
    )
  );
}

function ShotFrame({ src, alt, label, note, variant = 'wide', loading = 'lazy' }) {
  return h('figure', { className: `mk-shot mk-shot-${variant}` },
    h('div', { className: 'mk-shot-chrome' },
      h('span', null), h('span', null), h('span', null),
      h('strong', null, label)
    ),
    h(ExpandableProductImage, { src, alt, loading, label }),
    note ? h('figcaption', null, note) : null
  );
}

function MotionShotFrame({ src, poster, label, note, alt, variant = 'wide' }) {
  return h('figure', { className: `mk-shot mk-shot-${variant} mk-motion-shot` },
    h('div', { className: 'mk-shot-chrome' },
      h('span', null), h('span', null), h('span', null),
      h('strong', null, label)
    ),
    h(ExpandableProductVideo, { src, poster, label: alt || label }),
    note ? h('figcaption', null, note) : null
  );
}

function InstallCommandCard({
  label = 'quickstart',
  includeLinks = true,
  className = 'mk-doc-start-command',
  actionsClassName = 'mk-doc-command-actions',
  links
}) {
  const [copied, setCopied] = React.useState(false);
  const actionLinks = links || [
    ['Latest release', 'https://github.com/manishiitg/coding-agent-loop/releases/latest'],
    ['GitHub', 'https://github.com/manishiitg/coding-agent-loop'],
    ['Reference map', marketingHash('docs', 'reference-map')]
  ];

  function copyCommand() {
    const finish = ok => {
      if (!ok) return;
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    };

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(INSTALL_COMMAND).then(() => finish(true)).catch(() => finish(fallbackCopy()));
      return;
    }

    finish(fallbackCopy());
  }

  function fallbackCopy() {
    if (typeof document === 'undefined' || typeof document.execCommand !== 'function') return false;
    const field = document.createElement('textarea');
    field.value = INSTALL_COMMAND;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    field.style.pointerEvents = 'none';
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (error) {
      ok = false;
    }
    document.body.removeChild(field);
    return ok;
  }

  return h('div', { className },
    h('div', { className: 'mk-v4-browserbar' },
      h('span', null), h('span', null), h('span', null),
      h('strong', null, label)
    ),
    h('pre', null, h('code', null, INSTALL_COMMAND)),
    h('div', { className: actionsClassName },
      h('button', { type: 'button', onClick: copyCommand, 'aria-live': 'polite' }, copied ? 'Copied' : 'Copy command'),
      includeLinks ? actionLinks.map(link =>
        h('a', {
          key: link[0],
          href: link[1],
          target: link[1].startsWith('http') ? '_blank' : undefined,
          rel: link[1].startsWith('http') ? 'noreferrer' : undefined
        }, link[0])
      ) : null
    )
  );
}

function HeroSignals() {
  const signals = [
    ['Pulse', 'Bug-free / Goal short', 'pulse'],
    ['Auto Improve', 'proposal queued', 'improve'],
    ['Org view', 'manage by exception', 'run']
  ];
  return h('div', { className: 'mk-signal-stack' },
    signals.map((signal, i) =>
      h('div', { key: signal[0], className: `mk-signal mk-signal-${i + 1}` },
        h(IconGlyph, { label: signal[2] }),
        h('span', null,
          h('strong', null, signal[0]),
          h('small', null, signal[1])
        )
      )
    )
  );
}

function AgentConstellation() {
  const agents = [
    ['Claude Code', 'coding'],
    ['Codex CLI', 'review'],
    ['Cursor CLI', 'ui'],
    ['Gemini CLI', 'research'],
    ['MCP tools', 'data'],
    ['Browser', 'web'],
    ['Schedules', 'cron'],
    ['Skills', 'memory']
  ];

  return h('div', { className: 'mk-constellation', 'aria-label': 'AgentWorks agent fleet map' },
    h('div', { className: 'mk-ring mk-ring-1' }),
    h('div', { className: 'mk-ring mk-ring-2' }),
    h('div', { className: 'mk-ring mk-ring-3' }),
    h('div', { className: 'mk-core' },
      h('span', null, 'AGENTWORKS'),
      h('strong', null, 'operating loop')
    ),
    agents.map((agent, i) =>
      h('div', { key: agent[0], className: `mk-agent-node mk-agent-${i + 1}` },
        h('strong', null, agent[0]),
        h('span', null, agent[1])
      )
    ),
    h('div', { className: 'mk-constellation-log' },
      h('span', null, 'pulse: 9 workflows checked'),
      h('span', null, 'auto-improve: 3 proposals'),
      h('span', null, 'skills: reusable fix saved')
    )
  );
}

function ArchitectureBoard() {
  const columns = [
    {
      title: 'Agent data plane',
      items: ['Claude Code', 'Codex CLI', 'Cursor CLI', 'Gemini CLI', 'MCP servers', 'Agent browser']
    },
    {
      title: 'AgentWorks control plane',
      items: ['Goals', 'Schedules', 'Pulse', 'Auto Improve', 'Skills', 'Org Pulse']
    },
    {
      title: 'Human decisions',
      items: ['Approve replans', 'Review exceptions', 'Route ownership', 'Promote skills', 'Tune budgets', 'Ship workflows']
    }
  ];

  return h('div', { className: 'mk-architecture-board' },
    columns.map((column, i) =>
      h('div', { key: column.title, className: `mk-arch-column mk-arch-${i + 1}` },
        h('span', { className: 'mk-arch-index' }, String(i + 1).padStart(2, '0')),
        h('h3', null, column.title),
        h('div', null,
          column.items.map(item => h('span', { key: item }, item))
        )
      )
    )
  );
}

function SpanOfControlSection() {
  const rows = [
    ['100+ agents', 'running coding, research, browser, reporting, and ops workflows'],
    ['9 workflows checked', 'Pulse reads fresh evidence and marks Bug / Goal state'],
    ['8 exceptions', 'dashboard surfaces only the broken, drifting, expensive, or decision-worthy work'],
    ['3 proposals', 'Auto Improve suggests bounded changes with evidence before humans approve'],
    ['1 operator', 'reviews the exceptions instead of watching every run']
  ];

  return h('section', { className: 'mk-span-section' },
    h('div', { className: 'mk-shell mk-span-grid' },
      h('div', { className: 'mk-span-copy' },
        h('p', { className: 'mk-kicker' }, 'Span of control'),
        h('h2', null, 'The goal is not more agents. It is fewer things you personally have to watch.'),
        h('p', null, 'A small team can run a few automations by reading logs. That collapses when every agent has its own terminal, cost profile, failures, tool access, memory, and improvement path. AgentWorks compresses the fleet into exceptions, proposals, and reusable learning.')
      ),
      h('div', { className: 'mk-span-console' },
        h('div', { className: 'mk-span-scan' }),
        h('div', { className: 'mk-span-console-head' },
          h('span', null, 'org-pulse://fleet-review'),
          h('strong', null, 'manage by exception')
        ),
        rows.map((row, i) =>
          h('div', { key: row[0], className: `mk-span-row mk-span-row-${i + 1}` },
            h('span', null, String(i + 1).padStart(2, '0')),
            h('strong', null, row[0]),
            h('p', null, row[1])
          )
        )
      )
    )
  );
}

function ProductTour({ items }) {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef([]);
  const current = items[active];
  const panelId = 'product-tour-panel';

  function selectTab(index, focus = false) {
    const next = (index + items.length) % items.length;
    setActive(next);
    if (focus) {
      window.requestAnimationFrame(() => tabRefs.current[next]?.focus());
    }
  }

  function onTabKeyDown(event, index) {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') {
      selectTab(0, true);
      return;
    }
    if (event.key === 'End') {
      selectTab(items.length - 1, true);
      return;
    }
    const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    selectTab(index + delta, true);
  }

  return h('section', { className: 'mk-v22-tour-section' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-v22-tour-head' },
        h('div', null,
          h('p', { className: 'mk-kicker' }, 'Product inspection'),
          h('h2', null, 'The main surfaces.'),
          h('span', null, 'A quick product tour: fleet state, worker choice, live execution, and reusable learning.')
        ),
        h('a', { className: 'mk-text-link', href: marketingPath('docs') }, 'Open docs')
      ),
      h('div', { className: 'mk-v22-tour-grid' },
        h('aside', { className: 'mk-v22-tour-console' },
          h('div', { className: 'mk-v22-tour-console-head' },
            h('span', null, 'operator questions'),
            h('strong', null, `${String(active + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`)
          ),
          h('div', { className: 'mk-v22-tour-tabs', role: 'tablist', 'aria-label': 'AgentWorks product tour', 'aria-orientation': 'vertical' },
            items.map((item, i) =>
              h('button', {
                key: item.title,
                id: `product-tour-tab-${i}`,
                ref: node => { tabRefs.current[i] = node; },
                type: 'button',
                role: 'tab',
                'aria-selected': active === i ? 'true' : 'false',
                'aria-controls': panelId,
                tabIndex: active === i ? 0 : -1,
                className: active === i ? 'active' : '',
                onClick: () => selectTab(i),
                onKeyDown: event => onTabKeyDown(event, i)
              },
                h('span', null, String(i + 1).padStart(2, '0')),
                h('strong', null, item.title),
                h('small', null, item.question)
              )
            )
          ),
          h('div', { className: 'mk-v22-tour-summary' },
            h('span', null, 'current answer'),
            h('strong', null, current.short),
            h('p', null, current.outcome)
          )
        ),
        h('div', {
          className: 'mk-v22-tour-stage',
          id: panelId,
          role: 'tabpanel',
          tabIndex: 0,
          'aria-labelledby': `product-tour-tab-${active}`
        },
          h('div', { className: 'mk-v4-browserbar' },
            h('span', null), h('span', null), h('span', null),
            h('strong', null, current.label)
          ),
          h('div', { className: 'mk-v22-tour-image-wrap' },
            h(ExpandableProductImage, { key: current.title, src: current.image, alt: current.alt, label: current.label }),
            h('div', { className: 'mk-v22-tour-callout' },
              h('span', null, 'operator question'),
              h('strong', null, current.question)
            )
          ),
          h('div', { className: 'mk-v22-tour-lower' },
            h('div', { className: 'mk-v22-tour-answer' },
              h('span', null, 'AgentWorks answer'),
              h('p', null, current.description)
            ),
            h('div', { className: 'mk-v22-tour-proof' },
              h('span', null, 'proof signals'),
              h('div', null,
                current.proof.map(tag => h('em', { key: tag }, tag))
              )
            )
          )
        )
      )
    )
  );
}

function OperatingProofStrip({ items, steps }) {
  const statuses = ['planned', 'routed', 'attached', 'scored', 'promoted'];

  return h('section', { className: 'mk-v21-lifecycle-section' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-v21-lifecycle-head' },
        h('div', null,
          h('p', { className: 'mk-kicker' }, 'Operating proof'),
          h('h2', null, 'A workflow is not done when the agent stops.')
        ),
        h('p', null, 'The useful loop is longer: define the outcome, route the worker, keep the evidence, score the run, then promote what worked into the next run.')
      ),
      h('div', { className: 'mk-v21-lifecycle-grid' },
        h('div', { className: 'mk-v21-ledger' },
          h('div', { className: 'mk-v21-ledger-head' },
            h('span', null, 'workflow://instagram-growth'),
            h('strong', null, 'single run ledger')
          ),
          items.map((item, i) =>
            h('article', { key: item.title },
              h('span', null, String(i + 1).padStart(2, '0')),
              h('div', null,
                h('strong', null, item.title),
                h('p', null, item.description)
              ),
              h('small', null, statuses[i])
            )
          ),
          h('div', { className: 'mk-v21-ledger-footer' },
            h('strong', null, 'Next run gets better context.'),
            h('span', null, 'The promoted skill, cost signal, Pulse verdict, and operator decision stay attached to the workflow.')
          )
        ),
        h('div', { className: 'mk-v21-proof-board' },
          steps.map(step =>
            h('figure', { key: step[0] },
              h(ExpandableProductImage, { src: step[3], alt: `${step[4]} in AgentWorks`, label: step[4] }),
              h('figcaption', null,
                h('span', null, step[0]),
                h('div', null,
                  h('strong', null, step[1]),
                  h('small', null, step[2])
                )
              )
            )
          )
        )
      )
    )
  );
}

function HowHeroVisual() {
  const stages = [
    ['01', 'Goal', 'Define the outcome and schedule.'],
    ['02', 'Runtime', 'Choose agent CLI, model, MCP tools, browser, and secrets.'],
    ['03', 'Evidence', 'Attach terminal output, reports, screenshots, files, and cost.'],
    ['04', 'Improve', 'Pulse flags state; skills and proposals harden the next run.']
  ];

  return h('div', { className: 'mk-v9-how-visual' },
    h('div', { className: 'mk-v4-browserbar' },
      h('span', null), h('span', null), h('span', null),
      h('strong', null, 'workflow operating loop')
    ),
    h('div', { className: 'mk-v9-how-grid' },
      h('figure', { className: 'mk-v9-how-main' },
        h(ExpandableProductImage, {
          src: PRODUCT_ASSETS.pulse,
          alt: 'AgentWorks org pulse dashboard showing goals, issues, and suggestions',
          label: 'Org Pulse',
          loading: 'eager',
          fetchPriority: 'high'
        }),
        h('figcaption', null,
          h('strong', null, 'Org Pulse'),
          h('span', null, 'A higher-level view of goals, exceptions, suggestions, and workflow state.')
        )
      ),
      h('div', { className: 'mk-v9-how-rail' },
        stages.map(stage =>
          h('div', { key: stage[0] },
            h('span', null, stage[0]),
            h('strong', null, stage[1]),
            h('p', null, stage[2])
          )
        )
      )
    ),
    h('div', { className: 'mk-v9-how-proofbar' },
      ['goal state', 'agent runtime', 'tool access', 'run evidence', 'pulse verdict', 'reusable skill'].map(item =>
        h('span', { key: item }, item)
      )
    )
  );
}

function GetStartedCTA() {
  const paths = [
    {
      label: 'Local operator',
      title: 'Install the Mac app.',
      description: 'Start with one repeated task, one workflow goal, visible evidence, Pulse, and one improvement that can compound.',
      action: 'Latest release',
      href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest',
      secondary: 'Install docs',
      secondaryHref: marketingHash('docs', 'install'),
      proof: ['Mac app', 'MCP bridge', 'local workspace']
    },
    {
      label: 'Developer',
      title: 'Inspect and extend the runtime.',
      description: 'Read the implementation docs, connect MCP servers, add model providers, and adapt workflow skills.',
      action: 'View source',
      href: 'https://github.com/manishiitg/coding-agent-loop',
      secondary: 'Reference map',
      secondaryHref: marketingHash('docs', 'reference-map'),
      proof: ['open source', 'Go runtime', 'workflow docs']
    },
    {
      label: 'Team/server',
      title: 'Plan a controlled workspace.',
      description: 'Map the local-to-server path, auth boundary, locked config, secrets, and deployment shape.',
      action: 'Book architecture call',
      href: SALES_CALL_URL,
      secondary: 'Deployment docs',
      secondaryHref: 'https://github.com/manishiitg/coding-agent-loop/tree/main/deploy',
      proof: ['dedicated server', 'Kubernetes', 'Azure VM']
    }
  ];
  const checklist = [
    ['01', 'Pick a recurring job', 'Something that needs schedule, evidence, report, cost, or approval.'],
    ['02', 'Attach the worker', 'Claude Code, Codex CLI, Cursor, Gemini, MCP tools, browser, or provider models.'],
    ['03', 'Promote one learning', 'Turn the first repeated fix into a reusable skill or bounded Auto Improve proposal.']
  ];

  return h('section', { className: 'mk-v23-start-section mk-v4-final' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-v23-start-head' },
        h('p', { className: 'mk-kicker' }, 'Get started'),
        h('h2', null, 'Start with one workflow. Scale when the loop proves itself.'),
        h('p', null, 'Install locally, connect one agent worker, run with proof, then decide whether to extend the runtime or move it onto shared infrastructure.'),
        h('div', { className: 'mk-hero-actions' },
          h('a', { className: 'mk-btn', href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Install for Mac'),
          h('a', { className: 'mk-btn mk-btn-secondary', href: marketingPath('docs') }, 'Read docs'),
          h('a', { className: 'mk-text-link', href: SALES_CALL_URL, target: '_blank', rel: 'noreferrer' }, 'Book a call')
        )
      ),
      h('div', { className: 'mk-v23-start-grid' },
        h('div', { className: 'mk-v23-paths' },
          paths.map((path, i) =>
            h('article', { key: path.title, className: i === 0 ? 'primary' : '' },
              h('span', null, path.label),
              h('h3', null, path.title),
              h('p', null, path.description),
              h('div', { className: 'mk-v23-card-actions' },
                h('a', { href: path.href, target: path.href.startsWith('http') ? '_blank' : undefined, rel: path.href.startsWith('http') ? 'noreferrer' : undefined }, path.action),
                h('a', { href: path.secondaryHref, target: path.secondaryHref.startsWith('http') ? '_blank' : undefined, rel: path.secondaryHref.startsWith('http') ? 'noreferrer' : undefined }, path.secondary)
              )
            )
          )
        ),
        h('div', { className: 'mk-v23-start-panel' },
        h('div', { className: 'mk-v4-browserbar' },
          h('span', null), h('span', null), h('span', null),
          h('strong', null, 'first-workflow.sh')
        ),
        h('pre', null, h('code', null, INSTALL_COMMAND)),
          h('div', { className: 'mk-v23-start-steps' },
            checklist.map(step =>
              h('div', { key: step[0] },
                h('span', null, step[0]),
                h('strong', null, step[1]),
                h('p', null, step[2])
              )
            )
          )
        )
      )
    )
  );
}

function CompactHomeCTA() {
  return h('section', { className: 'mk-home-simple-cta' },
    h('div', { className: 'mk-shell mk-home-simple-cta-panel' },
      h('div', null,
        h('p', { className: 'mk-kicker' }, 'Start small'),
        h('h2', null, 'Run one workflow. Then scale the loop.'),
        h('p', null, 'Install the Mac app, connect the agent tools you already use, and run the first workflow with visible evidence.')
      ),
      h('div', { className: 'mk-home-simple-cta-actions' },
        h('a', { className: 'mk-btn', href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Install for Mac'),
        h('a', { className: 'mk-btn mk-btn-secondary', href: marketingPath('docs') }, 'Read docs'),
        h('a', { className: 'mk-text-link', href: SALES_CALL_URL, target: '_blank', rel: 'noreferrer' }, 'Book a call')
      )
    )
  );
}

function TrustSection({ items }) {
  const topology = [
    ['Local Mac app', 'Run agent CLIs, MCP bridge, browser sessions, and workflow evidence on the operator machine.'],
    ['Remote workspace', 'Switch to a server workspace when client or team environments need shared execution.'],
    ['Own infrastructure', 'Use dedicated VM, Azure VM, or Kubernetes blueprints when isolation and locked config matter.']
  ];
  const artifacts = ['latest DMG', 'curl installer', 'Kubernetes', 'Azure VM', 'secrets docs'];

  return h('section', { className: 'mk-v29-deploy-section' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-v29-deploy-head' },
        h('div', null,
          h('p', { className: 'mk-kicker' }, 'Deployment posture'),
          h('h2', null, 'Start on the desktop. Move serious workflows onto controlled infrastructure.'),
          h('p', null, 'AgentWorks is built around the same reality as production agent work: credentials, browser sessions, files, costs, reports, and approvals have to stay visible whether the workflow runs locally or on a managed server.')
        ),
        h('div', { className: 'mk-v29-deploy-actions' },
          h('a', { className: 'mk-btn', href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Latest release'),
          h('a', { className: 'mk-btn mk-btn-secondary', href: 'https://github.com/manishiitg/coding-agent-loop/tree/main/deploy', target: '_blank', rel: 'noreferrer' }, 'Deploy docs')
        )
      ),
      h('div', { className: 'mk-v29-deploy-grid' },
        h('div', { className: 'mk-v29-topology-panel' },
          h('div', { className: 'mk-v4-browserbar' },
            h('span', null), h('span', null), h('span', null),
            h('strong', null, 'runtime-topology.agentworks')
          ),
          h('div', { className: 'mk-v29-topology-rows' },
            topology.map((row, i) =>
              h('div', { key: row[0], className: 'mk-v29-topology-row' },
                h('span', null, String(i + 1).padStart(2, '0')),
                h('div', null,
                  h('strong', null, row[0]),
                  h('p', null, row[1])
                )
              )
            )
          ),
          h('div', { className: 'mk-v29-artifact-strip' },
            artifacts.map(item => h('em', { key: item }, item))
          )
        ),
        h('div', { className: 'mk-v29-assurance-grid' },
          items.map((item, i) =>
            h('a', {
              key: item.title,
              href: item.href,
              target: item.href.startsWith('http') ? '_blank' : undefined,
              rel: item.href.startsWith('http') ? 'noreferrer' : undefined
            },
              h('span', null, String(i + 1).padStart(2, '0')),
              h('strong', null, item.title),
              h('p', null, item.description),
              h('small', null, item.evidence)
            )
          )
        )
      )
    )
  );
}

function FAQSection() {
  const faqs = [
    {
      question: 'Is AgentWorks replacing Claude Code, Codex CLI, Cursor, or Gemini?',
      answer: 'No. Those are workers. AgentWorks is the operating layer around goals, schedules, tool access, evidence, costs, Pulse, approvals, and reusable skills.'
    },
    {
      question: 'Which agent workers and tools can I use?',
      answer: 'Claude Code, Codex CLI, Cursor CLI, Gemini CLI, browser sessions, MCP servers, provider APIs, files, secrets, schedules, and custom workflow tools.'
    },
    {
      question: 'Where does the work actually run?',
      answer: 'Start in the Mac app with local CLIs. For teams or clients, move workflows to a remote workspace or your own server deployment.'
    },
    {
      question: 'How is this different from workflow engines or observability tools?',
      answer: 'Workflow engines make code steps durable. Observability explains traces. AgentWorks owns the agent-operation record before, during, and after the run.'
    },
    {
      question: 'How does the loop improve?',
      answer: 'Pulse marks health, cost, goal state, and exceptions. Repeated fixes become reusable skills or bounded Auto Improve proposals for human review.'
    }
  ];

  return h('section', { className: 'mk-faq-section', id: 'faq' },
    h('div', { className: 'mk-shell mk-faq-grid' },
      h('div', { className: 'mk-faq-head' },
        h('p', { className: 'mk-kicker' }, 'Questions'),
        h('h2', null, 'The boundaries before you install.'),
        h('p', null, 'AgentWorks sits between raw agent CLIs and production workflow ownership. These are the boundaries that matter before you turn a strong run into a repeatable operating loop.')
      ),
      h('div', { className: 'mk-faq-list' },
        faqs.map((item, i) =>
          h('details', { key: item.question, open: i === 0 },
            h('summary', null,
              h('span', null, String(i + 1).padStart(2, '0')),
              h('h3', null, item.question)
            ),
            h('div', null,
              h('p', null, item.answer)
            )
          )
        )
      )
    )
  );
}

function HeroOpsFeed() {
  const events = [
    ['Pulse', '9 workflows checked', 'healthy'],
    ['Cost', 'instagram-automation under budget', 'info'],
    ['Auto Improve', '3 fixes proposed', 'improve'],
    ['Human', 'approval needed for server write', 'warn']
  ];

  return h('div', { className: 'mk-v13-ops-feed', 'aria-label': 'Live AgentWorks operations feed' },
    h('div', { className: 'mk-v13-ops-head' },
      h('span', null, 'live loop'),
      h('strong', null, '4 signals')
    ),
    h('div', { className: 'mk-v13-ops-rows' },
      events.map((event, i) =>
        h('div', { key: event[0], className: `mk-v13-ops-row ${event[2]}` },
          h('span', null, String(i + 1).padStart(2, '0')),
          h('div', null,
            h('strong', null, event[0]),
            h('small', null, event[1])
          )
        )
      )
    )
  );
}

function DeveloperQuickstartBand() {
  const proof = [
    ['01', 'Install the Mac app', 'Use the public release or one-line install command.'],
    ['02', 'Connect workers', 'Claude Code, Codex CLI, Cursor, Gemini, MCP tools, and browser sessions.'],
    ['03', 'Operate the loop', 'Plan, run, measure with Pulse, improve with skills, and review by exception.']
  ];

  return h('section', { className: 'mk-v40-quickstart-section', 'aria-label': 'Developer quickstart' },
    h('div', { className: 'mk-shell mk-v40-quickstart-panel' },
      h('div', { className: 'mk-v40-quickstart-copy' },
        h('p', { className: 'mk-kicker' }, 'Developer quickstart'),
        h('h2', null, 'Install AgentWorks. Connect the agents you already use.'),
        h('p', null,
          'Start with the desktop app, point it at your local or server workspace, then run Claude Code, Codex CLI, Cursor, Gemini, MCP tools, browser sessions, and schedules from one operating loop.'
        )
      ),
      h(InstallCommandCard, {
        label: 'install.sh',
        className: 'mk-doc-start-command mk-v40-command-card',
        actionsClassName: 'mk-doc-command-actions mk-v40-command-actions',
        links: [
          ['Latest release', 'https://github.com/manishiitg/coding-agent-loop/releases/latest'],
          ['Source repo', 'https://github.com/manishiitg/coding-agent-loop'],
          ['Docs', marketingPath('docs')]
        ]
      }),
      h('div', { className: 'mk-v40-quickstart-proof' },
        proof.map(item =>
          h('article', { key: item[0] },
            h('span', null, item[0]),
            h('strong', null, item[1]),
            h('p', null, item[2])
          )
        )
      )
    )
  );
}

function PublicProofStrip() {
  const proofs = [
    {
      title: 'Open-source runtime',
      label: 'GitHub',
      href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest'
    },
    {
      title: 'Mac app install',
      label: 'Release',
      href: 'https://github.com/manishiitg/coding-agent-loop'
    },
    {
      title: 'Local + server workspaces',
      label: 'Deploy',
      href: marketingPath('how')
    },
    {
      title: 'Claude, Codex, Cursor, MCP',
      label: 'Stack',
      href: marketingPath('docs')
    }
  ];

  return h('section', { className: 'mk-v57-proof-strip mk-v111-proof-rail', 'aria-label': 'AgentWorks public proof and installability' },
    h('div', { className: 'mk-shell mk-v57-proof-grid mk-v111-proof-grid' },
      proofs.map((proof, i) =>
        h('a', {
          key: proof.title,
          href: proof.href,
          target: proof.href.startsWith('http') ? '_blank' : undefined,
          rel: proof.href.startsWith('http') ? 'noreferrer' : undefined
        },
          h('span', null, String(i + 1).padStart(2, '0')),
          h('small', null, proof.label),
          h('strong', null, proof.title)
        )
      )
    )
  );
}

function MotionProofSection() {
  const loop = ['Run', 'Measure', 'Improve'];

  return h('section', { className: 'mk-v41-motion-section' },
    h('div', { className: 'mk-shell mk-v41-motion-grid' },
      h('div', { className: 'mk-v41-motion-copy' },
        h('p', { className: 'mk-kicker' }, 'Product motion'),
        h('h2', null, 'The loop is visible while the agents run.'),
        h('p', null, 'Watch a workflow move from agent execution to Pulse and improvement evidence.'),
        h('div', { className: 'mk-v41-motion-steps' },
          loop.map((item, i) =>
            h('article', { key: item },
              h('span', null, String(i + 1).padStart(2, '0')),
              h('strong', null, item)
            )
          )
        )
      ),
      h('div', { className: 'mk-v41-motion-stage' },
        h('div', { className: 'mk-v4-browserbar' },
          h('span', null), h('span', null), h('span', null),
          h('strong', null, 'operating-loop-demo.mp4')
        ),
        h(ExpandableProductVideo, {
          src: PRODUCT_ASSETS.operatingLoopDemoVideo,
          poster: PRODUCT_ASSETS.operatingLoopDemoPoster,
          label: 'AgentWorks operating loop demo showing Pulse, workflow evidence, and improvement signals'
        }),
        h('div', { className: 'mk-v41-motion-caption' },
          h('strong', null, 'Pulse is part of the run loop.'),
          h('span', null, 'Goal state, bug state, proposals, and learning stay attached.')
        )
      )
    )
  );
}

function StackCompatibilityStrip({ metrics }) {
  const groups = [
    ['Agent workers', ['Claude Code', 'Codex CLI', 'Cursor CLI', 'Gemini CLI', 'Browser']],
    ['Tool access', ['MCP servers', 'Files', 'Secrets', 'APIs', 'Slack-like sources']],
    ['Operations', ['Goals', 'Schedules', 'Pulse', 'Auto Improve', 'Reports', 'Skills']]
  ];
  const contract = [
    ['01', 'Goal', 'Outcome, owner, schedule, and approval boundary.'],
    ['02', 'Worker', 'Claude Code, Codex, Cursor, Gemini, browser, or model API.'],
    ['03', 'Evidence', 'Logs, files, screenshots, reports, cost, and artifacts.'],
    ['04', 'Signal', 'Healthy, blocked, off-goal, risky, expensive, or improving.'],
    ['05', 'Skill', 'Reusable procedure promoted from repeated successful runs.']
  ];

  return h('section', { className: 'mk-v18-stack-strip' },
    h('div', { className: 'mk-shell mk-v18-stack-panel' },
      h('div', { className: 'mk-v18-stack-copy' },
        h('p', { className: 'mk-kicker' }, 'Operating contract'),
        h('strong', null, 'Every worker gets the same control plane.'),
        h('span', null, 'AgentWorks does not replace your agent CLIs. It gives every CLI, browser, schedule, and model step the same operating wrapper.')
      ),
      h('div', { className: 'mk-v18-contract' },
        contract.map(item =>
          h('article', { key: item[0] },
            h('span', null, item[0]),
            h('strong', null, item[1]),
            h('p', null, item[2])
          )
        )
      ),
      h('div', { className: 'mk-v18-stack-side' },
        h('div', { className: 'mk-v18-stack-groups' },
          groups.map(group =>
            h('div', { key: group[0], className: 'mk-v18-stack-group' },
              h('span', null, group[0]),
              h('div', null,
                group[1].map(item => h('em', { key: item }, item))
              )
            )
          )
        ),
        h('div', { className: 'mk-v18-stack-metrics' },
          metrics.map(item =>
            h('div', { key: item[0] },
              h('strong', null, item[0]),
              h('span', null, item[1])
            )
          )
        )
      ),
    )
  );
}

function CategoryPositioning({ items }) {
  const loop = ['Goal', 'Worker', 'Evidence', 'Pulse', 'Skill'];

  return h('section', { className: 'mk-v12-category-section' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-v12-category-head' },
        h('div', null,
          h('p', { className: 'mk-kicker' }, 'Category fit'),
          h('h2', null, 'The operating layer for agent work.'),
          h('p', null, 'Goal, worker, evidence, Pulse, skill: one record from plan to improvement.')
        ),
        h('div', { className: 'mk-v12-loopline' },
          loop.map((item, i) =>
            h('span', { key: item },
              h('small', null, String(i + 1).padStart(2, '0')),
              item
            )
          )
        )
      ),
      h('div', { className: 'mk-v12-category-grid' },
        items.map(item =>
          h('article', { key: item.title, className: item.highlight ? 'highlight' : '' },
            h('span', null, item.label),
            h('h3', null, item.title),
            h('p', null, item.description),
            h('div', null,
              item.rows.map(row =>
                h('dl', { key: row[0] },
                  h('dt', null, row[0]),
                  h('dd', null, row[1])
                )
              )
            )
          )
        )
      )
    )
  );
}

function OperatingSystemSection() {
  const loopRows = [
    ['01', 'Assign goals', 'Owner, schedule, model plan, secrets, and approval boundary.', 'planned'],
    ['02', 'Run workers', 'Claude Code, Codex CLI, Cursor, Gemini, MCP tools, and browser sessions.', 'running'],
    ['03', 'Read evidence', 'Logs, reports, screenshots, costs, artifacts, Pulse, and workflow state.', 'checked'],
    ['04', 'Improve safely', 'Auto Improve proposes bounded fixes; humans approve larger replans.', 'queued']
  ];
  const operatingRows = [
    ['Critical', 'hetzner-ssh', 'server workflow blocked on auth'],
    ['Cost watch', 'instagram-automation', 'under daily budget'],
    ['Pulse', 'build-in-public', 'goal state checked'],
    ['Skill', 'terminal migration', 'new reusable procedure']
  ];

  return h('section', { className: 'mk-v17-os-section' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-v17-os-head' },
        h('div', null,
          h('p', { className: 'mk-kicker' }, 'Control room'),
          h('h2', null, 'AgentWorks is the operating system around agent workers.'),
          h('p', null, 'Agent CLIs execute work. Observability tools explain traces. AgentWorks owns the daily operating loop: assign goals, run workers, read evidence, approve improvements, and turn repeated fixes into skills.')
        ),
        h('div', { className: 'mk-v17-os-proof' },
          h('strong', null, 'Designed for 100+ agents'),
          h('span', null, 'Manage by exception, not by watching terminals.')
        )
      ),
      h('div', { className: 'mk-v17-os-grid' },
        h('div', { className: 'mk-v17-loop' },
          h('div', { className: 'mk-v17-loop-head' },
            h('span', null, 'operating-loop.agentworks'),
            h('strong', null, 'Plan -> Run -> Pulse -> Improve')
          ),
          loopRows.map(row =>
            h('div', { key: row[0], className: 'mk-v17-loop-row' },
              h('span', null, row[0]),
              h('div', null,
                h('strong', null, row[1]),
                h('p', null, row[2])
              ),
              h('small', null, row[3])
            )
          )
        ),
        h('div', { className: 'mk-v17-console', 'aria-label': 'AgentWorks operating console preview' },
          h('div', { className: 'mk-v4-browserbar' },
            h('span', null), h('span', null), h('span', null),
            h('strong', null, 'org-pulse://today')
          ),
          h('div', { className: 'mk-v17-console-body' },
            h('div', { className: 'mk-v17-console-title' },
              h('span', null, 'operator view'),
              h('strong', null, '12 exceptions from 41 scheduled workflows')
            ),
            h('div', { className: 'mk-v17-console-metrics' },
              [
                ['9', 'checked'],
                ['3', 'proposals'],
                ['2', 'blocked'],
                ['$18', 'today']
              ].map(metric =>
                h('div', { key: metric[1] },
                  h('strong', null, metric[0]),
                  h('span', null, metric[1])
                )
              )
            ),
            h('div', { className: 'mk-v17-console-rows' },
              operatingRows.map((row, i) =>
                h('div', { key: row[0] + row[1] },
                  h('span', null, String(i + 1).padStart(2, '0')),
                  h('strong', null, row[0]),
                  h('p', null, row[1]),
                  h('small', null, row[2])
                )
              )
            ),
            h('div', { className: 'mk-v17-console-approval' },
              h('strong', null, 'Human judgment stays explicit'),
              h('span', null, 'Approve risky writes, major replans, production changes, and promoted skills.')
            )
          )
        )
      ),
    )
  );
}

function UseCaseLanesSection({ lanes }) {
  return h('section', { className: 'mk-v20-lanes-section' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-v20-lanes-head' },
        h('div', null,
          h('p', { className: 'mk-kicker' }, 'Where AgentWorks fits'),
          h('h2', null, 'Use it when agents become recurring operations.'),
          h('p', null, 'A single agent can live in one terminal. AgentWorks becomes useful when the work repeats, touches real tools, needs proof, has cost and access boundaries, or should improve from previous runs.')
        ),
        h('a', { className: 'mk-text-link', href: marketingPath('how') }, 'See the loop')
      ),
      h('div', { className: 'mk-v20-lanes-grid' },
        lanes.map((lane, i) =>
          h('article', { key: lane.title, className: i === 0 ? 'primary' : '' },
            h('figure', null,
              h(ExpandableProductImage, { src: lane.image, alt: lane.alt, label: lane.label })
            ),
            h('div', { className: 'mk-v20-lane-copy' },
              h('span', null, lane.label),
              h('h3', null, lane.title),
              h('p', null, lane.description),
              h('ul', null,
                lane.points.map(point => h('li', { key: point }, point))
              )
            )
          )
        )
      )
    )
  );
}

function RuntimeLearningSection({ cards }) {
  const routeRows = [
    ['01', 'High reasoning', 'Use Claude Code, Codex CLI, Cursor, or Gemini where judgment and long tool chains matter.'],
    ['02', 'Cheaper steps', 'Route extraction, formatting, tagging, and routine checks to lower-cost model providers.'],
    ['03', 'Reusable skills', 'Promote repeated fixes so future agents need less context and fewer expensive retries.']
  ];

  return h('section', { className: 'mk-v31-runtime-section' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-v31-runtime-head' },
        h('div', null,
          h('p', { className: 'mk-kicker' }, 'Runtime learning'),
          h('h2', null, 'The model plan should get cheaper as the workflow gets smarter.'),
          h('p', null, 'Most agent platforms stop at running the worker. AgentWorks keeps the routing plan, evidence, Pulse verdicts, costs, and promoted skills in one loop so repeated workflows can use less high-reasoning time without losing quality.')
        ),
        h('div', { className: 'mk-v31-runtime-meter' },
          h('span', null, 'OPERATING EFFECT'),
          h('strong', null, 'expensive reasoning moves to the few steps that still need it')
        )
      ),
      h('div', { className: 'mk-v31-runtime-grid' },
        h('div', { className: 'mk-v31-runtime-console' },
          h('div', { className: 'mk-v4-browserbar' },
            h('span', null), h('span', null), h('span', null),
            h('strong', null, 'model-plan.auto')
          ),
          h('div', { className: 'mk-v31-runtime-rows' },
            routeRows.map(row =>
              h('div', { key: row[0] },
                h('span', null, row[0]),
                h('div', null,
                  h('strong', null, row[1]),
                  h('p', null, row[2])
                )
              )
            )
          ),
          h('div', { className: 'mk-v31-runtime-footer' },
            h('strong', null, 'Route by risk, not habit.'),
            h('span', null, 'Use the expensive worker for ambiguous, stateful, or high-impact steps; let skills and cheaper models carry the repeatable work.')
          )
        ),
        h('div', { className: 'mk-v31-runtime-stage' },
          cards.map((card, i) =>
            h('article', { key: card.title },
              h('figure', null,
                h(ExpandableProductImage, { src: card.image, alt: card.alt, label: card.label })
              ),
              h('div', null,
                h('span', null, card.label),
                h('h3', null, card.title),
                h('p', null, card.description),
                h('small', null, card.proof)
              )
            )
          )
        )
      )
    )
  );
}

function GovernanceSection({ controls }) {
  const primary = controls.slice(0, 3);
  const secondary = controls.slice(3);

  return h('section', { className: 'mk-v27-governance-section' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-v27-governance-head' },
        h('div', null,
          h('p', { className: 'mk-kicker' }, 'Governance'),
          h('h2', null, 'Controls should be visible where agents actually run.'),
          h('p', null, 'Serious agent work touches credentials, browsers, models, schedules, reports, and production systems. AgentWorks keeps those controls attached to the workflow instead of scattering them across terminals, dashboards, and chat history.')
        ),
        h('div', { className: 'mk-v27-governance-proof' },
          h('span', null, 'VISIBLE BOUNDARIES'),
          h('strong', null, 'Access, cost, model choice, browser state, approvals, and skills stay inspectable before and after a run.')
        )
      ),
      h('div', { className: 'mk-v27-governance-grid' },
        primary.map((item, i) =>
          h('article', { key: item.title, className: i === 0 ? 'primary' : '' },
            h('figure', null,
              h(ExpandableProductImage, { src: item.image, alt: item.alt, label: item.label })
            ),
            h('div', { className: 'mk-v27-governance-copy' },
              h('span', null, item.label),
              h('h3', null, item.title),
              h('p', null, item.description),
              h('div', null,
                item.proof.map(proof => h('em', { key: proof }, proof))
              )
            )
          )
        ),
        h('aside', { className: 'mk-v27-governance-rail' },
          h('div', { className: 'mk-v4-browserbar' },
            h('span', null), h('span', null), h('span', null),
            h('strong', null, 'workflow-control.policy')
          ),
          secondary.map((item, i) =>
            h('div', { key: item.title, className: 'mk-v27-policy-row' },
              h('span', null, String(i + 4).padStart(2, '0')),
              h('div', null,
                h('strong', null, item.title),
                h('p', null, item.description),
                h('small', null, item.proof.join(' / '))
              )
            )
          )
        )
      )
    )
  );
}

function MobileHomeSummary() {
  const items = [
    ['Workers', 'Claude Code, Codex CLI, Cursor, Gemini, browser, MCP tools, and model APIs run as worker surfaces.'],
    ['Run packet', 'Every run keeps goal, owner, schedule, selected secrets, tool access, evidence, cost, and approval state.'],
    ['Pulse', 'Logs become health, goal, cost, and risk signals so the operator reviews exceptions instead of all runs.'],
    ['Learning', 'Repeated fixes become reusable skills; Auto Improve proposes bounded changes before the next run.']
  ];

  return h('section', { className: 'mk-mobile-summary', 'aria-label': 'AgentWorks mobile summary' },
    h('div', { className: 'mk-shell' },
      h('div', { className: 'mk-mobile-summary-head' },
        h('p', { className: 'mk-kicker' }, 'Mobile briefing'),
        h('h2', null, 'The short version: AgentWorks turns agent work into an operating record.'),
        h('p', null, 'The full desktop page shows every surface. On mobile, this is the product logic to remember before you inspect the tour.')
      ),
      h('div', { className: 'mk-mobile-summary-grid' },
        items.map((item, i) =>
          h('article', { key: item[0] },
            h('span', null, String(i + 1).padStart(2, '0')),
            h('strong', null, item[0]),
            h('p', null, item[1])
          )
        )
      ),
      h('div', { className: 'mk-mobile-summary-proof' },
        h('figure', null,
          h(ExpandableProductImage, { src: PRODUCT_ASSETS.workflowPulse, alt: 'AgentWorks workflow pulse evidence', label: 'Pulse evidence' }),
          h('figcaption', null, 'Pulse evidence')
        ),
        h('figure', null,
          h(ExpandableProductImage, { src: PRODUCT_ASSETS.globalSkills, alt: 'AgentWorks reusable skills generated from workflow runs', label: 'Reusable skills' }),
          h('figcaption', null, 'Reusable skills')
        )
      )
    )
  );
}

function AgentWorksHome() {
  const heroChips = ['Claude Code', 'Codex CLI', 'Cursor', 'Browser', 'MCP', 'Pulse'];
  const metrics = [
    ['100+', 'agent and workflow fleet target'],
    ['41', 'schedules visible from the control plane'],
    ['29', 'model and coding-agent configs'],
    ['Global', 'skills and knowledge base from runs']
  ];
  const loopSteps = [
    ['01', 'Plan the work', 'Define the goal, workflow, runtime, secrets, schedule, and model plan before the agent starts.', PRODUCT_ASSETS.tradingPlan, 'Workflow plan'],
    ['02', 'Run every agent with evidence', 'Keep live terminals, tmux sessions, browser sessions, reports, files, and artifacts attached to the workflow.', PRODUCT_ASSETS.liveTerminal, 'Live terminal'],
    ['03', 'Measure with Pulse', 'Turn logs into health, goal, risk, and cost signals so the operator sees exceptions instead of noise.', PRODUCT_ASSETS.workflowPulse, 'Workflow Pulse'],
    ['04', 'Improve the system', 'Promote repeated fixes into global skills and let Auto Improve propose bounded workflow changes from evidence.', PRODUCT_ASSETS.globalSkills, 'Skills layer']
  ];
  const proofItems = [
    {
      title: 'Plan',
      signal: 'goal + schedule',
      description: 'The workflow starts with an explicit outcome, runtime, tool access, model plan, and approval boundary.'
    },
    {
      title: 'Route',
      signal: 'right worker',
      description: 'Pick Claude Code, Codex CLI, Cursor, Gemini, browser automation, MCP tools, or lower-cost models by step.'
    },
    {
      title: 'Run',
      signal: 'evidence attached',
      description: 'Terminal output, browser proof, files, reports, run state, and spend stay connected to the workflow.'
    },
    {
      title: 'Pulse',
      signal: 'health + goal state',
      description: 'Logs become Bug, Goal, risk, and cost signals so operators review exceptions instead of every run.'
    },
    {
      title: 'Improve',
      signal: 'skills compound',
      description: 'Repeated fixes become reusable skills, while Auto Improve proposes bounded changes from the evidence.'
    }
  ];
  const tourItems = [
    {
      title: 'Org dashboard',
      short: 'Manage by exception',
      question: 'Which workflows need attention right now?',
      outcome: 'Fleet state becomes a queue of exceptions, not a pile of tabs.',
      label: 'org dashboard / fleet health',
      image: PRODUCT_ASSETS.heroDashboard,
      alt: 'AgentWorks org dashboard showing workflow health, cost, goal, and schedule states',
      description: 'One dashboard for health, goals, risk, cost, schedule, and the work needing attention.',
      proof: ['attention queue', 'health states', 'cost watch']
    },
    {
      title: 'Model catalog',
      short: 'Route the right worker',
      question: 'Which model or coding CLI should this step use?',
      outcome: 'Each step can use the right worker without losing cost and run history.',
      label: 'llm configuration / coding agents',
      image: PRODUCT_ASSETS.modelCatalog,
      alt: 'AgentWorks model catalog and coding agent configuration',
      description: 'Route each workflow step to the right CLI, model, browser, or MCP worker.',
      proof: ['29 configs', 'coding agents', 'provider routing']
    },
    {
      title: 'Live terminal',
      short: 'Keep execution visible',
      question: 'What is the agent doing, and can we resume it?',
      outcome: 'Terminal-native agents stay familiar while execution evidence stays attached.',
      label: 'live terminal / tmux session',
      image: PRODUCT_ASSETS.liveTerminal,
      alt: 'AgentWorks live terminal and tmux-based agent execution view',
      description: 'Keep terminal-native agents visible while logs, costs, reports, and artifacts stay attached.',
      proof: ['tmux sessions', 'run evidence', 'resume context']
    },
    {
      title: 'Browser sessions',
      short: 'Proof for web work',
      question: 'What happened inside the browser session?',
      outcome: 'Authenticated web work gets screenshots, state, and workflow proof.',
      label: 'browser integrations / web evidence',
      image: PRODUCT_ASSETS.browserIntegrations,
      alt: 'AgentWorks browser integration screen',
      description: 'Browser automation becomes a managed runtime with visual proof, authenticated sessions, screenshots, and workflow evidence.',
      proof: ['browser state', 'screenshots', 'authenticated apps']
    },
    {
      title: 'Secrets',
      short: 'Control access',
      question: 'Which credentials can this workflow actually use?',
      outcome: 'Global and workflow secrets stay scoped instead of leaking into every run.',
      label: 'global secrets / workflow credentials',
      image: PRODUCT_ASSETS.globalSecrets,
      alt: 'AgentWorks global secrets management screen',
      description: 'Separate global and workflow secrets so agents get enough access to work without turning every automation into a shared credential bucket.',
      proof: ['scoped credentials', 'workflow secrets', 'safer tools']
    },
    {
      title: 'Skills',
      short: 'Compound learning',
      question: 'What did previous runs teach the next agent?',
      outcome: 'Repeated fixes become reusable skill memory instead of disappearing in logs.',
      label: 'skills manager / reusable knowledge',
      image: PRODUCT_ASSETS.globalSkills,
      alt: 'AgentWorks skills manager showing generated workflow learnings',
      description: 'Turn repeated fixes into skills the next workflow can reuse.',
      proof: ['global skills', 'learned procedures', 'auto improve']
    }
  ];
  const useCaseLanes = [
    {
      label: 'Coding agents',
      title: 'Run many coding CLIs without losing the thread.',
      description: 'Bring terminal-native agents into a workflow surface that keeps execution, artifacts, model choice, cost, and run history together.',
      image: PRODUCT_ASSETS.liveTerminal,
      alt: 'AgentWorks live terminal managing tmux-based coding agents',
      points: ['Claude Code, Codex CLI, Cursor, Gemini', 'tmux sessions and run evidence', 'skills promoted from repeated fixes']
    },
    {
      label: 'Recurring workflows',
      title: 'Turn repeated business work into observable runs.',
      description: 'Schedule workflow agents that use tools, browser sessions, APIs, files, and secrets while keeping proof and reports attached.',
      image: PRODUCT_ASSETS.workspace,
      alt: 'AgentWorks workflow automation workspace',
      points: ['schedules, approvals, reports', 'MCP tools and browser sessions', 'cost and failure visibility']
    },
    {
      label: 'Org operations',
      title: 'Manage by exception across the whole system.',
      description: 'Roll workflow state into goals, Pulse, reports, blocked work, improvement suggestions, and decisions that need human judgment.',
      image: PRODUCT_ASSETS.chief,
      alt: 'AgentWorks Chief of Staff and org operating dashboard',
      points: ['org goals and pulse', 'attention queue', 'human approval boundaries']
    }
  ];
  const controls = [
    {
      label: 'Access control',
      title: 'Scoped secrets',
      description: 'Keep global and workflow secrets separate so each automation receives only the credentials it needs.',
      image: PRODUCT_ASSETS.globalSecrets,
      alt: 'AgentWorks global secrets screen with scoped credentials',
      proof: ['global secrets', 'workflow secrets', 'runtime selection']
    },
    {
      label: 'Spend control',
      title: 'Cost visibility',
      description: 'Track workflow cost, run history, token usage, and date-wise breakdowns where the work happens.',
      image: PRODUCT_ASSETS.reporting,
      alt: 'AgentWorks reporting dashboard with workflow cost breakdown',
      proof: ['daily cost', 'run history', 'token usage']
    },
    {
      label: 'Web control',
      title: 'Browser evidence',
      description: 'Attach browser sessions, screenshots, and web-task proof to workflows that depend on external apps.',
      image: PRODUCT_ASSETS.browserIntegrations,
      alt: 'AgentWorks browser integration screen for authenticated browser sessions',
      proof: ['browser state', 'screenshots', 'web proof']
    },
    {
      label: 'Routing',
      title: 'Model routing',
      description: 'Choose the right coding CLI or model per step instead of paying for high-reasoning models everywhere.',
      proof: ['Claude Code', 'Codex CLI', 'Cursor', 'Gemini']
    },
    {
      label: 'Cadence',
      title: 'Schedules and approvals',
      description: 'Run recurring agents while keeping human approval for risky writes, replans, and production actions.',
      proof: ['schedules', 'approval gates', '2FA pauses']
    },
    {
      label: 'Learning',
      title: 'Reusable skills',
      description: 'Turn repeated fixes and learned procedures into global knowledge that future agents can reuse.',
      proof: ['generated skills', 'workflow learnings', 'Auto Improve']
    }
  ];
  const runtimeLearningCards = [
    {
      label: 'Route',
      title: 'Model and CLI choice is part of the workflow.',
      description: 'Keep Claude Code, Codex CLI, Cursor, Gemini, provider APIs, and lower-cost models in one plan so each step can use the right worker.',
      image: PRODUCT_ASSETS.modelCatalog,
      alt: 'AgentWorks model catalog and coding agent configuration',
      proof: '29 model and coding-agent configs'
    },
    {
      label: 'Measure',
      title: 'Pulse turns run output into operating signals.',
      description: 'The workflow keeps health, goal state, cost, logs, reports, and run evidence together, so failures and regressions are not buried in terminals.',
      image: PRODUCT_ASSETS.workflowPulse,
      alt: 'AgentWorks Pulse evidence for a workflow run',
      proof: 'Bug / Goal / cost / report signals'
    },
    {
      label: 'Reuse',
      title: 'Skills make future runs need less context.',
      description: 'Repeated fixes and procedures become global skills, so cheaper or smaller workers can execute work that previously required heavier reasoning.',
      image: PRODUCT_ASSETS.globalSkills,
      alt: 'AgentWorks generated global skills and workflow learnings',
      proof: 'global skills and workflow learnings'
    }
  ];
  const categoryItems = [
    {
      label: 'Managed-agent boards',
      title: 'Great for assignment. Thin on execution.',
      description: 'Boards coordinate work. AgentWorks keeps runtime proof.',
      rows: [
        ['Owns well', 'tasks, comments, status'],
        ['AgentWorks adds', 'workers, secrets, proof, Pulse']
      ]
    },
    {
      label: 'Workflow engines',
      title: 'Great for durable code. Not CLI-native.',
      description: 'Engines run code. AgentWorks manages agent workers.',
      rows: [
        ['Owns well', 'queues, events, schedules'],
        ['AgentWorks adds', 'CLI agents, MCP, browser proof']
      ]
    },
    {
      label: 'Observability / evals',
      title: 'Great for traces. Not the run owner.',
      description: 'Evals explain behavior. AgentWorks owns the run record.',
      rows: [
        ['Owns well', 'traces, scores, datasets'],
        ['AgentWorks adds', 'goal, evidence, approvals']
      ]
    },
    {
      label: 'AgentWorks',
      title: 'One loop: run, measure, improve.',
      description: 'Use your agent stack with one operating record.',
      rows: [
        ['Owns', 'goals, workers, evidence, costs'],
        ['Compounds', 'skills, learnings, Auto Improve']
      ],
      highlight: true
    }
  ];
  const trustItems = [
    {
      title: 'Open-source release path',
      description: 'Install from public releases, inspect the runtime, and trace product behavior back to the repository.',
      evidence: 'release artifacts + install script',
      href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest'
    },
    {
      title: 'Scoped credential model',
      description: 'Use global, user, and workflow secrets with runtime injection instead of leaving credentials in prompts or chat history.',
      evidence: 'AES-256-GCM + selected secrets',
      href: 'https://github.com/manishiitg/coding-agent-loop/blob/main/docs/core/secrets.md'
    },
    {
      title: 'Server deployment options',
      description: 'Move shared agent execution to your own environment when client work or team workflows need a controlled server.',
      evidence: 'dedicated VM + Azure + Kubernetes',
      href: 'https://github.com/manishiitg/coding-agent-loop/tree/main/deploy'
    },
    {
      title: 'Evidence after every run',
      description: 'Keep cost, reports, screenshots, browser state, logs, skills, and artifacts connected to the workflow after execution.',
      evidence: 'reports + Pulse + artifacts',
      href: 'https://github.com/manishiitg/coding-agent-loop/blob/main/docs/workflow/self_improvement_and_reporting.md'
    }
  ];
  const homeTourItems = [tourItems[0], tourItems[1], tourItems[2], tourItems[5]];

  return h('div', { className: 'mk-page mk-homev4 mk-home-page' },
    h(MarketingNav, { current: 'home' }),
    h('main', { id: 'main-content', tabIndex: -1 },
      h('section', { className: 'mk-v4-hero' },
        h('div', { className: 'mk-shell mk-v4-hero-grid' },
          h('div', { className: 'mk-v4-hero-copy' },
            h('p', { className: 'mk-kicker' }, 'Agent fleet control plane'),
            h('h1', null, 'Run 100+ agents without 100 terminals.'),
            h('p', { className: 'mk-lead' },
              'AgentWorks is the control plane for Claude Code, Codex CLI, Cursor, browser agents, and MCP workflows.'
            ),
            h('div', { className: 'mk-hero-actions' },
              h('a', { className: 'mk-btn', href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Install for Mac'),
              h('a', { className: 'mk-btn mk-btn-secondary', href: marketingPath('docs') }, 'Read docs'),
              h('a', { className: 'mk-text-link', href: SALES_CALL_URL, target: '_blank', rel: 'noreferrer' }, 'Book a call')
            ),
            h('div', { className: 'mk-v111-hero-chips', 'aria-label': 'Supported agent surfaces' },
              heroChips.map(label => h('span', { key: label }, label))
            )
          ),
          h('div', { className: 'mk-v4-hero-visual' },
          h('div', { className: 'mk-v4-browserbar' },
            h('span', null), h('span', null), h('span', null),
            h('strong', null, 'org dashboard / agent fleet')
          ),
          h(ExpandableProductImage, {
            src: PRODUCT_ASSETS.heroDashboard,
            alt: 'AgentWorks org dashboard showing workflow health, costs, goals, and schedules',
            label: 'Org dashboard / agent fleet',
            loading: 'eager',
            fetchPriority: 'high'
          }),
            h('div', { className: 'mk-v4-evidence' },
              h('strong', null, 'Manage by exception'),
              h('span', null, 'Critical, bug, off-goal, cost-watch, and healthy workflows are visible in one place.')
            ),
            h(HeroOpsFeed)
          )
        )
      ),

      h(PublicProofStrip),

      h(MobileHomeSummary),

      h(CategoryPositioning, { items: categoryItems }),

      h(MotionProofSection),

      h(ProductTour, { items: homeTourItems }),

      h(CompactHomeCTA)
    ),
    h(MarketingFooter)
  );
}

function UseCasesPage() {
  const useCases = [
    {
      label: 'Sales and marketing',
      title: 'Turn research, outreach, and publishing into measurable loops.',
      description: 'Coordinate prospect research, campaign work, content packages, and performance reporting.',
      image: PRODUCT_ASSETS.heroDashboard,
      alt: 'AgentWorks organization dashboard showing workflow goals, health, cost, and schedules',
      signals: ['research', 'campaigns', 'reporting'],
      when: 'Multiple agents contribute to one growth outcome.',
      proof: 'goals, artifacts, approvals, performance'
    },
    {
      label: 'Support and success',
      title: 'Connect customer channels to workflows with human escalation.',
      description: 'Route Slack, WhatsApp, Gmail, and support signals into recurring agent work.',
      image: PRODUCT_ASSETS.botsConnector,
      alt: 'AgentWorks bot connectors for Slack, WhatsApp, Gmail, and workflow routing',
      signals: ['inbox routing', 'response drafts', 'escalation'],
      when: 'Customer work crosses channels and owners.',
      proof: 'messages, decisions, response time, Pulse'
    },
    {
      label: 'Finance and operations',
      title: 'Run recurring analysis and reporting with an evidence trail.',
      description: 'Schedule analysis, collect source evidence, track cost, and package operator-ready reports.',
      image: PRODUCT_ASSETS.tradingPlan,
      alt: 'AgentWorks plan for a recurring analysis and reporting workflow',
      signals: ['scheduled analysis', 'cost controls', 'reports'],
      when: 'A recurring decision needs auditable inputs.',
      proof: 'plans, source files, reports, cost'
    },
    {
      label: 'Engineering and IT',
      title: 'Operate coding agents, browser workers, and infrastructure tasks together.',
      description: 'Route work across coding CLIs, models, MCP tools, browser sessions, and controlled environments.',
      image: PRODUCT_ASSETS.liveTerminal,
      alt: 'AgentWorks live terminal attached to a coding-agent workflow',
      signals: ['coding CLIs', 'browser workers', 'MCP tools'],
      when: 'Execution spans repositories, tools, and environments.',
      proof: 'logs, tests, screenshots, approvals'
    }
  ];
  const routes = [
    ['01', 'Start local', 'Run one recurring workflow with existing agent tools.'],
    ['02', 'Add evidence', 'Attach terminal output, browser proof, reports, cost, and Pulse.'],
    ['03', 'Manage exceptions', 'Review blocked, off-goal, risky, or approval-needed work.'],
    ['04', 'Promote learning', 'Turn repeated fixes into skills or bounded proposals.']
  ];
  const fitMatrix = [
    ['Agent CLI', 'High-judgment interactive work.'],
    ['Workflow engine', 'Queues, retries, schedules, and durable code.'],
    ['Observability / evals', 'Traces, scoring, and quality gates.'],
    ['AgentWorks', 'Goals, workers, evidence, Pulse, cost, approvals, and skills.']
  ];

  return h('div', { className: 'mk-page mk-homev4 mk-usecases-page' },
    h(MarketingNav, { current: 'usecases' }),
    h('main', { id: 'main-content', tabIndex: -1 },
      h('section', { className: 'mk-usecases-hero' },
        h('div', { className: 'mk-shell mk-usecases-hero-grid' },
          h('div', { className: 'mk-usecases-hero-copy' },
            h('p', { className: 'mk-kicker' }, 'Use cases'),
            h('h1', null, 'One AI workforce. Every function.'),
            h('p', { className: 'mk-lead' },
              'Run sales, marketing, support, finance, operations, engineering, and IT workflows with shared goals, evidence, human judgment, and continuous improvement.'
            ),
            h('div', { className: 'mk-hero-actions' },
              h('a', { className: 'mk-btn', href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Install for Mac'),
              h('a', { className: 'mk-btn mk-btn-secondary', href: marketingPath('docs') }, 'Read docs'),
              h('a', { className: 'mk-text-link', href: SALES_CALL_URL, target: '_blank', rel: 'noreferrer' }, 'Book a call')
            ),
            h('div', { className: 'mk-usecases-proof-row' },
              ['sales + marketing', 'support + success', 'finance + operations', 'engineering + IT'].map(item =>
                h('span', { key: item }, item)
              )
            )
          )
        )
      ),

      h('section', { className: 'mk-usecases-section' },
        h('div', { className: 'mk-shell' },
          h('div', { className: 'mk-section-head mk-usecases-head' },
            h('p', { className: 'mk-kicker' }, 'Best-fit scenarios'),
            h('h2', null, 'Start with work that repeats.')
          ),
          h('div', { className: 'mk-usecases-grid' },
            useCases.map((item, i) =>
              h('article', { key: item.title, className: i === 0 ? 'primary' : '' },
                h('div', { className: 'mk-usecase-overline' },
                  h('span', null, String(i + 1).padStart(2, '0')),
                  h('strong', null, item.label)
                ),
                h('h3', null, item.title),
                h('dl', { className: 'mk-usecase-facts' },
                  h('div', null,
                    h('dt', null, 'Use for'),
                    h('dd', null, item.signals.join(' · '))
                  ),
                  h('div', null,
                    h('dt', null, 'Evidence'),
                    h('dd', null, item.proof)
                  )
                )
              )
            )
          )
        )
      ),

      h('section', { className: 'mk-usecases-flow-section' },
        h('div', { className: 'mk-shell mk-usecases-flow-grid' },
          h('div', { className: 'mk-usecases-flow-copy' },
            h('p', { className: 'mk-kicker' }, 'Adoption path'),
            h('h2', null, 'Start with one outcome. Scale after the loop earns trust.'),
            h('p', null, 'Keep the first workflow narrow, measurable, and owned by a person who can judge the result.')
          ),
          h('div', { className: 'mk-usecases-flow-panel' },
            h('div', { className: 'mk-v4-browserbar' },
              h('span', null), h('span', null), h('span', null),
              h('strong', null, 'adoption-path.agentworks')
            ),
            routes.map(row =>
              h('div', { key: row[0], className: 'mk-usecases-flow-row' },
                h('span', null, row[0]),
                h('div', null,
                  h('strong', null, row[1]),
                  h('p', null, row[2])
                )
              )
            )
          )
        )
      ),

      h('section', { className: 'mk-usecases-fit-section' },
        h('div', { className: 'mk-shell' },
          h('div', { className: 'mk-usecases-fit-head' },
            h('p', { className: 'mk-kicker' }, 'Category boundary'),
            h('h2', null, 'Coordinate the stack you already use.'),
            h('p', null, 'Keep your CLIs, workflow engines, and evaluation tools. AgentWorks adds the shared operating record across them.')
          ),
          h('div', { className: 'mk-usecases-fit-list' },
            fitMatrix.map((row, i) =>
              h('article', { key: row[0], className: i === fitMatrix.length - 1 ? 'highlight' : '' },
                h('span', null, String(i + 1).padStart(2, '0')),
                h('strong', null, row[0]),
                h('p', null, row[1])
              )
            )
          )
        )
      ),

      h(CompactHomeCTA)
    ),
    h(MarketingFooter)
  );
}


const DOCS_SOURCE_ROOT = 'https://github.com/manishiitg/coding-agent-loop/blob/main/docs';
const DOCS_REPO_ROOT = 'https://github.com/manishiitg/coding-agent-loop/blob/main';

function docsArticleHref(docPath, hash = '') {
  const encodedPath = String(docPath).split('/').map(part => encodeURIComponent(part)).join('/');
  return `${marketingPath('docs')}?doc=${encodedPath}${hash}`;
}

function normalizeDocsPath(value) {
  const parts = [];
  String(value || '').replace(/\\/g, '/').split('/').forEach(part => {
    if (!part || part === '.') return;
    if (part === '..') {
      parts.pop();
      return;
    }
    parts.push(part);
  });
  return parts.join('/');
}

function requestedDocsPath() {
  const requested = new URLSearchParams(window.location.search).get('doc');
  if (!requested) return null;
  let normalized = requested.trim().replace(/^\/+/, '').replace(/^docs\//, '');
  if (normalized.endsWith('/')) normalized += 'README';
  normalized = normalized.replace(/\.md$/i, '');
  if (!normalized || normalized.includes('..') || !/^[a-z0-9/_-]+$/i.test(normalized)) return null;
  return normalized;
}

function resolveDocsLink(currentDoc, rawValue, isImage = false) {
  if (!rawValue || /^(?:https?:|mailto:|tel:|data:)/i.test(rawValue)) return rawValue;
  if (rawValue.startsWith('#')) return rawValue;

  const hashIndex = rawValue.indexOf('#');
  const rawPath = hashIndex === -1 ? rawValue : rawValue.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : rawValue.slice(hashIndex);
  let decodedPath = rawPath;
  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch (error) {
    return rawValue;
  }

  const currentRepoPath = `docs/${currentDoc}.md`;
  const currentDirectory = currentRepoPath.split('/').slice(0, -1).join('/');
  const resolved = normalizeDocsPath(`${currentDirectory}/${decodedPath}`);

  if (resolved.startsWith('docs/') && resolved.toLowerCase().endsWith('.md')) {
    return docsArticleHref(resolved.slice(5, -3), hash);
  }
  if (resolved.startsWith('docs/')) {
    return `/docs-content/${resolved.slice(5)}${hash}`;
  }
  if (isImage) {
    return `https://raw.githubusercontent.com/manishiitg/coding-agent-loop/main/${resolved}${hash}`;
  }
  return `${DOCS_REPO_ROOT}/${resolved}${hash}`;
}

function slugDocsHeading(value, used) {
  const base = String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-') || 'section';
  let slug = base;
  let suffix = 2;
  while (used.has(slug)) slug = `${base}-${suffix++}`;
  used.add(slug);
  return slug;
}

function compileDocsMarkdown(markdown, docPath) {
  if (!window.marked || !window.DOMPurify) {
    throw new Error('The documentation renderer did not load.');
  }

  const rendered = window.marked.parse(markdown, { gfm: true, breaks: false });
  const sanitized = window.DOMPurify.sanitize(rendered, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['target', 'rel']
  });
  const template = document.createElement('template');
  template.innerHTML = sanitized;
  const used = new Set();
  const headings = [];

  template.content.querySelectorAll('h1, h2, h3').forEach(heading => {
    const id = slugDocsHeading(heading.textContent, used);
    heading.id = id;
    if (heading.tagName !== 'H1') {
      headings.push({ id, label: heading.textContent.trim(), level: heading.tagName === 'H3' ? 3 : 2 });
    }
  });

  template.content.querySelectorAll('a[href]').forEach(link => {
    const original = link.getAttribute('href');
    const resolved = resolveDocsLink(docPath, original, false);
    link.setAttribute('href', resolved);
    if (/^https?:/i.test(resolved)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noreferrer');
    }
  });

  template.content.querySelectorAll('img[src]').forEach(image => {
    image.setAttribute('src', resolveDocsLink(docPath, image.getAttribute('src'), true));
    image.setAttribute('loading', 'lazy');
    image.setAttribute('decoding', 'async');
  });

  return {
    html: template.innerHTML,
    headings,
    title: template.content.querySelector('h1')?.textContent?.trim() || 'AgentWorks documentation'
  };
}

function DocsArticlePage({ docPath }) {
  const [state, setState] = React.useState({ status: 'loading', markdown: '', error: '' });
  const rendered = React.useMemo(() => {
    if (state.status !== 'ready') return null;
    try {
      return compileDocsMarkdown(state.markdown, docPath);
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Could not render this document.' };
    }
  }, [docPath, state]);

  React.useEffect(() => {
    let active = true;
    setState({ status: 'loading', markdown: '', error: '' });
    fetch(`/docs-content/${docPath}.md`)
      .then(response => {
        if (!response.ok) throw new Error(`Document returned ${response.status}`);
        return response.text();
      })
      .then(markdown => {
        if (active) setState({ status: 'ready', markdown, error: '' });
      })
      .catch(error => {
        if (active) setState({ status: 'error', markdown: '', error: error.message || 'Document could not be loaded.' });
      });
    return () => { active = false; };
  }, [docPath]);

  React.useEffect(() => {
    if (!rendered || rendered.error) return;
    const previousTitle = document.title;
    document.title = `${rendered.title} | AgentWorks Docs`;
    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        document.getElementById(id)?.scrollIntoView({ block: 'start' });
      });
    }
    return () => { document.title = previousTitle; };
  }, [rendered]);

  const primaryDocs = [
    ['Docs home', marketingPath('docs')],
    ['Getting started', docsArticleHref('getting-started/README')],
    ['First workflow', docsArticleHref('getting-started/first-workflow')],
    ['Workflow overview', docsArticleHref('workflow/README')],
    ['Pulse and reporting', docsArticleHref('workflow/self_improvement_and_reporting')],
    ['Auto Improve', docsArticleHref('workflow/auto_improvement_framework')],
    ['Models and agents', docsArticleHref('core/llm_configuration_and_resilience')],
    ['MCP bridge', docsArticleHref('core/mcp_bridge_layer')],
    ['Browser sessions', docsArticleHref('core/browser')],
    ['Secrets', docsArticleHref('core/secrets')],
    ['Organization and agents', docsArticleHref('multiagent/README')]
  ];
  const category = docPath.includes('/') ? docPath.split('/')[0].replace('-', ' ') : 'overview';
  const sourceUrl = `${DOCS_SOURCE_ROOT}/${docPath}.md`;

  return h('div', { className: 'mk-page mk-docs-page mk-doc-reader-page' },
    h(MarketingNav, { current: 'docs' }),
    h('main', { id: 'main-content', className: 'mk-doc-layout mk-doc-reader-layout', tabIndex: -1 },
      h('aside', { className: 'mk-doc-sidebar mk-doc-reader-sidebar' },
        h('nav', { 'aria-label': 'Documentation navigation' },
          primaryDocs.map(link =>
            h('a', {
              key: link[0],
              href: link[1],
              'aria-current': link[1] === docsArticleHref(docPath) ? 'page' : undefined
            }, link[0])
          )
        ),
        h('a', { className: 'mk-doc-github', href: sourceUrl, target: '_blank', rel: 'noreferrer' }, 'View source')
      ),
      h('article', { className: 'mk-doc-reader-content' },
        h('div', { className: 'mk-doc-reader-toolbar' },
          h('div', { className: 'mk-doc-breadcrumbs' },
            h('a', { href: marketingPath('docs') }, 'Docs'),
            h('span', { 'aria-hidden': 'true' }, '/'),
            h('span', null, category)
          ),
          h('a', { href: sourceUrl, target: '_blank', rel: 'noreferrer' }, 'View source')
        ),
        state.status === 'loading'
          ? h('div', { className: 'mk-doc-loading', role: 'status' },
              h('span', null, 'Loading document'),
              h('div', null), h('div', null), h('div', null)
            )
          : null,
        state.status === 'error' || rendered?.error
          ? h('div', { className: 'mk-doc-error', role: 'alert' },
              h('p', { className: 'mk-kicker' }, 'Document unavailable'),
              h('h1', null, 'This documentation page could not be loaded.'),
              h('p', null, state.error || rendered.error),
              h('a', { className: 'mk-btn mk-btn-small', href: marketingPath('docs') }, 'Back to docs')
            )
          : null,
        rendered && !rendered.error
          ? h('div', {
              className: 'mk-doc-markdown',
              dangerouslySetInnerHTML: { __html: rendered.html }
            })
          : null
      ),
      rendered && !rendered.error && rendered.headings.length
        ? h('aside', { className: 'mk-doc-toc', 'aria-label': 'On this page' },
            h('strong', null, 'On this page'),
            h('nav', null,
              rendered.headings.slice(0, 14).map(heading =>
                h('a', {
                  key: heading.id,
                  className: heading.level === 3 ? 'subsection' : '',
                  href: `#${heading.id}`
                }, heading.label)
              )
            )
          )
        : h('div', { className: 'mk-doc-toc-placeholder', 'aria-hidden': 'true' })
    ),
    h(MarketingFooter)
  );
}

function DocsPage() {
  const activeDoc = requestedDocsPath();
  if (activeDoc) return h(DocsArticlePage, { docPath: activeDoc });

  const docLinks = [
    ['Start', marketingHash('docs', 'overview')],
    ['Install', marketingHash('docs', 'install')],
    ['Operate', marketingHash('docs', 'operate')],
    ['Improve', marketingHash('docs', 'improve')],
    ['Connect', marketingHash('docs', 'connect')],
    ['Organization', marketingHash('docs', 'organization')],
    ['Reference', marketingHash('docs', 'reference')]
  ];
  const taskSections = [
    {
      id: 'operate',
      title: 'Operate workflows',
      href: docsArticleHref('workflow/README'),
      description: 'Build a durable workflow, schedule it, watch active runs, and review the evidence it produces.',
      links: [
        ['Interactive workflow builder', 'Create and refine workflows through the builder.', docsArticleHref('workflow/workflow_builder_interactive')],
        ['Schedules', 'Run recurring work and inspect schedule history.', docsArticleHref('workflow/workflow_scheduling')],
        ['Monitoring', 'Review run history, status, reports, and failures.', docsArticleHref('workflow/workflow_monitoring')],
        ['Cost and logs', 'Measure model usage and inspect run-level logs.', docsArticleHref('workflow/cost_and_log_measurement')],
        ['Human feedback', 'Pause consequential work for operator input.', docsArticleHref('workflow/human_feedback_system')]
      ]
    },
    {
      id: 'improve',
      title: 'Improve every run',
      href: docsArticleHref('workflow/self_improvement_and_reporting'),
      description: 'Use Pulse, evaluations, run evidence, and saved skills to make the next run more reliable.',
      links: [
        ['Pulse and reporting', 'Understand the fix, report, and improvement loops.', docsArticleHref('workflow/self_improvement_and_reporting')],
        ['Auto Improve', 'Propose changes from measured run evidence.', docsArticleHref('workflow/auto_improvement_framework')],
        ['Evaluations', 'Score workflow outputs against explicit criteria.', docsArticleHref('workflow/evaluation_system')],
        ['Learning architecture', 'Save reusable workflow and step learnings.', docsArticleHref('workflow/learning_architecture')],
        ['Skills', 'Manage reusable instructions shared across agents.', docsArticleHref('core/skills')]
      ]
    },
    {
      id: 'connect',
      title: 'Connect the runtime',
      href: docsArticleHref('core/README'),
      description: 'Choose the right worker for each job and give it controlled access to tools, browsers, channels, and secrets.',
      links: [
        ['Models and coding agents', 'Configure providers, defaults, and fallback behavior.', docsArticleHref('core/llm_configuration_and_resilience')],
        ['MCP bridge', 'Connect local tools and MCP servers.', docsArticleHref('core/mcp_bridge_layer')],
        ['Browser sessions', 'Control visible, CDP, or headless browser work.', docsArticleHref('core/browser')],
        ['Secrets', 'Scope credentials globally or to one workflow.', docsArticleHref('core/secrets')],
        ['Bot connectors', 'Route Slack, WhatsApp, and other channels into work.', docsArticleHref('core/bot_connector_system')],
        ['OAuth', 'Handle delegated access for external services.', docsArticleHref('core/oauth')]
      ]
    },
    {
      id: 'organization',
      title: 'Run the organization',
      href: docsArticleHref('multiagent/README'),
      description: 'Roll workflow activity up to goals, coordinate agents, and preserve the context operators want them to reuse.',
      links: [
        ['Organization dashboard', 'Track goals, plans, and workflow progress together.', docsArticleHref('workflow/org_dashboard_design')],
        ['Org Pulse', 'Summarize cross-workflow health and requests for attention.', docsArticleHref('multiagent/org_pulse_design')],
        ['Sub-agent delegation', 'Delegate bounded work to specialist agents.', docsArticleHref('multiagent/sub_agent_delegation')],
        ['Agent memory', 'Persist useful context across agent sessions.', docsArticleHref('multiagent/agent_memory_system')],
        ['Multi-tab coordination', 'Coordinate parallel agent conversations.', docsArticleHref('multiagent/multi_tab_chat_architecture')]
      ]
    },
    {
      id: 'reference',
      title: 'Implementation reference',
      href: docsArticleHref('README'),
      description: 'Detailed formats and runtime contracts for operators extending or debugging AgentWorks.',
      links: [
        ['Workflow manifest', 'Understand the durable workflow definition.', docsArticleHref('workflow/workflow_manifest_architecture')],
        ['Step configuration', 'Reference step-level runtime configuration.', docsArticleHref('workflow/step_config_format_specification')],
        ['Tool filtering', 'Control which tools each workflow step can call.', docsArticleHref('workflow/tool_filtering_system')],
        ['Tiered model allocation', 'Route workflow phases to different models.', docsArticleHref('workflow/tiered_llm_allocation')],
        ['Folder guard', 'Constrain file access to approved workspace paths.', docsArticleHref('core/folder_guard_system')],
        ['Session and tool binding', 'Trace runtime identity and tool ownership.', docsArticleHref('core/session_and_tool_binding')]
      ]
    }
  ];
  const principles = [
    ['01', 'Install', 'Choose a workspace and connect a provider.'],
    ['02', 'Build', 'Define the outcome, evidence, and approval boundary.'],
    ['03', 'Run', 'Observe the agent, files, logs, cost, and report.'],
    ['04', 'Improve', 'Use Pulse and learnings to strengthen the next run.']
  ];

  return h('div', { className: 'mk-page mk-docs-page' },
    h(MarketingNav, { current: 'docs' }),
    h('main', { id: 'main-content', className: 'mk-doc-layout', tabIndex: -1 },
      h('aside', { className: 'mk-doc-sidebar' },
        h('nav', { 'aria-label': 'Docs sections' },
          docLinks.map(link => h('a', { key: link[0], href: link[1] }, link[0]))
        ),
        h('a', { className: 'mk-doc-github', href: 'https://github.com/manishiitg/coding-agent-loop/tree/main/docs', target: '_blank', rel: 'noreferrer' }, 'Browse source')
      ),
      h('article', { className: 'mk-doc-content' },
        h('section', { id: 'overview', className: 'mk-doc-hero mk-doc-minimal-hero' },
          h('p', { className: 'mk-kicker' }, 'AgentWorks Docs'),
          h('h1', null, 'Build and operate your first workflow.'),
          h('p', null, 'Install AgentWorks, connect a worker, schedule a run, inspect its report and Pulse, then improve the next run.'),
          h('div', { className: 'mk-doc-actions' },
            h('a', { className: 'mk-btn mk-btn-small', href: docsArticleHref('getting-started/first-workflow') }, 'Build the first workflow'),
            h('a', { className: 'mk-text-link', href: docsArticleHref('getting-started/README') }, 'Getting started')
          ),
          h('div', { className: 'mk-doc-principles', 'aria-label': 'Operating loop principles' },
            principles.map(item =>
              h('div', { key: item[0] },
                h('span', null, item[0]),
                h('strong', null, item[1]),
                h('p', null, item[2])
              )
            )
          )
        ),

        h('section', { id: 'install', className: 'mk-doc-section' },
          h('h2', null, 'Install'),
          h('p', null, 'AgentWorks ships as a macOS app today. The installer also prepares the local MCP bridge used by supported coding agents.'),
          h(InstallCommandCard, {
            label: 'install.sh',
            className: 'mk-doc-command-minimal',
            links: [
              ['Latest release', 'https://github.com/manishiitg/coding-agent-loop/releases/latest'],
              ['GitHub', 'https://github.com/manishiitg/coding-agent-loop']
            ]
          })
        ),

        taskSections.map(section =>
          h('section', { id: section.id, key: section.id, className: 'mk-doc-section mk-doc-bucket' },
            h('div', { className: 'mk-doc-section-title' },
              h('h2', null, section.title),
              h('a', { href: section.href }, section.id === 'reference' ? 'All docs' : 'Overview')
            ),
            h('p', null, section.description),
            h('div', { className: 'mk-doc-link-list' },
              section.links.map(link =>
                h('a', { key: link[0], href: link[2] },
                  h('span', null, link[0]),
                  h('small', null, link[1])
                )
              )
            )
          )
        )
      )
    ),
    h(MarketingFooter)
  );
}

function UpdatesPage() {
  const latest = {
    version: 'v1.25.95',
    date: 'July 5, 2026',
    url: 'https://github.com/manishiitg/coding-agent-loop/releases/tag/v1.25.95',
    artifacts: ['AgentWorks-1.25.95-arm64.dmg', 'AgentWorks-1.25.95-arm64-mac.zip', 'latest-mac.yml']
  };
  const highlights = [
    {
      label: 'Pulse / Auto Improve',
      title: 'The operating loop is getting stricter.',
      description: 'Pulse, reports, notifications, and Auto Improve controls are getting stricter.',
      proof: ['Pulse checks', 'report evidence', 'bounded proposals'],
      image: PRODUCT_ASSETS.workflowPulse,
      alt: 'AgentWorks workflow Pulse screen showing health and workflow signals'
    },
    {
      label: 'Terminal runtime',
      title: 'tmux live attach moved toward the primary coding-agent transport.',
      description: 'Recent work improved live attach, scrollback, resize, follow-ups, and completed panes.',
      proof: ['tmux', 'live terminal', 'CLI follow-ups'],
      image: PRODUCT_ASSETS.liveTerminal,
      alt: 'AgentWorks live terminal tmux session attached to an agent run'
    },
    {
      label: 'Chief of Staff',
      title: 'Org Pulse and handoff flows became more concrete.',
      description: 'Org Pulse, memory enrichment, schedule pre-gating, and goal/status fixes moved forward.',
      proof: ['Org Pulse', 'goals', 'memory handoff'],
      image: PRODUCT_ASSETS.chief,
      alt: 'AgentWorks Chief of Staff product screen'
    },
    {
      label: 'Deployment / safety',
      title: 'The server and trust story is becoming a product surface.',
      description: 'Workspace isolation, scoped secrets, locked config, deploy paths, and install notes got clearer.',
      proof: ['secrets', 'server deploy', 'release channel'],
      image: PRODUCT_ASSETS.globalSecrets,
      alt: 'AgentWorks global secrets and credential boundary screen'
    }
  ];
  const timeline = [
    ['Jul 5', 'v1.25.95 public macOS release', 'DMG, zip, and update metadata published to GitHub Releases.'],
    ['Jul 5', 'Workspace files, terminal debugging, scheduled agents', 'Stabilized workspace files, terminal debugging, scheduled agents, and reports.'],
    ['Jul 4', 'Pulse sequencing and report hardening', 'Refined Pulse, publish, task reporting, report handling, and Auto Improve.'],
    ['Jul 3', 'Chief of Staff Pulse handoff', 'Made org-level Pulse and handoff flows more concrete.'],
    ['Jul 2', 'terminal live attach fixes', 'Improved tmux live attach, scrollback, seed-gap, and control transport.'],
    ['Jul 1', 'multi-CLI/product proof work', 'Moved release script, terminal rendering, demo media, and provider defaults forward.']
  ];
  const metrics = [
    ['Latest release', latest.version],
    ['Published', latest.date],
    ['Artifacts', 'DMG + zip'],
    ['Reviewed', 'July 7, 2026']
  ];

  return h('div', { className: 'mk-page mk-homev4 mk-updates-page' },
    h(MarketingNav, { current: 'updates' }),
    h('main', { id: 'main-content', tabIndex: -1 },
      h('section', { className: 'mk-updates-hero' },
        h('div', { className: 'mk-shell mk-updates-hero-grid' },
          h('div', { className: 'mk-updates-hero-copy' },
            h('p', { className: 'mk-kicker' }, 'Updates'),
            h('h1', null, 'Shipping proof for the agent operating loop.'),
            h('p', { className: 'mk-lead' },
              'Recent work is concentrated around releases, Pulse, terminal runtime, Chief of Staff workflows, deployment, and trust boundaries.'
            ),
            h('div', { className: 'mk-hero-actions' },
              h('a', { className: 'mk-btn', href: latest.url, target: '_blank', rel: 'noreferrer' }, 'Open latest release'),
              h('a', { className: 'mk-btn mk-btn-secondary', href: 'https://github.com/manishiitg/coding-agent-loop/commits/main', target: '_blank', rel: 'noreferrer' }, 'View commits'),
              h('a', { className: 'mk-text-link', href: marketingPath('docs') }, 'Read docs')
            )
          ),
          h('div', { className: 'mk-updates-release-card' },
            h('div', { className: 'mk-v4-browserbar' },
              h('span', null), h('span', null), h('span', null),
              h('strong', null, 'release-channel.agentworks')
            ),
            h('div', { className: 'mk-updates-release-main' },
              h('span', null, 'Latest public release'),
              h('strong', null, latest.version),
              h('p', null, `Published ${latest.date}. Use GitHub for the current release channel.`)
            ),
            h('div', { className: 'mk-updates-release-assets' },
              latest.artifacts.map(asset => h('em', { key: asset }, asset))
            ),
            h('div', { className: 'mk-updates-metrics' },
              metrics.map(item =>
                h('div', { key: item[0] },
                  h('span', null, item[0]),
                  h('strong', null, item[1])
                )
              )
            )
          )
        )
      ),

      h('section', { className: 'mk-updates-highlights-section' },
        h('div', { className: 'mk-shell' },
          h('div', { className: 'mk-section-head mk-updates-section-head' },
            h('p', { className: 'mk-kicker' }, 'Recent product motion'),
            h('h2', null, 'The updates are concentrated where the category needs proof.'),
            h('p', null, 'Grouped by the product surfaces a buyer or developer would care about.')
          ),
          h('div', { className: 'mk-updates-highlight-grid' },
            highlights.map(item =>
              h('article', { key: item.title },
                h('figure', null,
                  h(ExpandableProductImage, { src: item.image, alt: item.alt, label: item.label })
                ),
                h('div', { className: 'mk-updates-highlight-copy' },
                  h('span', null, item.label),
                  h('h3', null, item.title),
                  h('p', null, item.description),
                  h('div', null,
                    item.proof.map(proof => h('em', { key: proof }, proof))
                  )
                )
              )
            )
          )
        )
      ),

      h('section', { className: 'mk-updates-timeline-section' },
        h('div', { className: 'mk-shell mk-updates-timeline-grid' },
          h('div', { className: 'mk-updates-timeline-copy' },
            h('p', { className: 'mk-kicker' }, 'Shipping timeline'),
            h('h2', null, 'Recent commits show the product is being hardened around real workflow operations.'),
            h('p', null, 'High-level summary only. GitHub remains the source of truth.')
          ),
          h('div', { className: 'mk-updates-timeline-panel' },
            h('div', { className: 'mk-v4-browserbar' },
              h('span', null), h('span', null), h('span', null),
              h('strong', null, 'recent-history.log')
            ),
            timeline.map((row, i) =>
              h('div', { key: row[0] + row[1], className: 'mk-updates-timeline-row' },
                h('span', null, row[0]),
                h('div', null,
                  h('strong', null, row[1]),
                  h('p', null, row[2])
                ),
                h('small', null, String(i + 1).padStart(2, '0'))
              )
            )
          )
        )
      ),

      h('section', { className: 'mk-updates-cta-section' },
        h('div', { className: 'mk-shell mk-updates-cta-grid' },
          h('div', null,
            h('p', { className: 'mk-kicker' }, 'Follow the work'),
            h('h2', null, 'Use GitHub for exact releases. Use this site for the product story.'),
            h('p', null, 'This site explains the product story. GitHub has code, releases, install notes, and deploy docs.')
          ),
          h('div', null,
            h('a', { className: 'mk-btn', href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Latest release'),
            h('a', { className: 'mk-btn mk-btn-secondary', href: 'https://github.com/manishiitg/coding-agent-loop', target: '_blank', rel: 'noreferrer' }, 'Source repo'),
            h('a', { className: 'mk-text-link', href: 'https://github.com/manishiitg/coding-agent-loop/tree/main/deploy', target: '_blank', rel: 'noreferrer' }, 'Deployment docs')
          )
        )
      )
    ),
    h(MarketingFooter)
  );
}

function HowPage() {
  const packet = [
    ['goal', 'business outcome + owner'],
    ['worker', 'Claude Code / Codex / Cursor / browser'],
    ['access', 'MCP tools + scoped secrets'],
    ['evidence', 'terminal logs + files + screenshots'],
    ['pulse', 'health, cost, risk, goal state'],
    ['learning', 'skill or bounded improvement proposal']
  ];
  const loop = [
    ['01', 'Run', 'Workers execute against a defined business outcome and output contract.', 'run'],
    ['02', 'Observe', 'Logs, screenshots, reports, cost, failures, and decisions become evidence.', 'observe'],
    ['03', 'Pulse', 'Evaluate health, goal alignment, risk, cost, and where human judgment is needed.', 'pulse'],
    ['04', 'Auto Improve', 'Propose bounded workflow changes and promote successful learnings into skills.', 'improve']
  ];
  const layers = [
    ['Goal and plan', 'Outcome, owner, cadence, output contract, and approval boundary.'],
    ['Workers and access', 'CLIs, models, MCP tools, browser sessions, and scoped secrets.'],
    ['Evidence and Pulse', 'Logs, files, screenshots, reports, cost, health, and decisions.'],
    ['Learning and improvement', 'Shared skills and bounded Auto Improve proposals for the next run.']
  ];
  const automationDetails = [
    {
      number: '01',
      label: 'Plan',
      title: 'Start with a business outcome and an explicit plan.',
      description: 'Define the goal, cadence, output contract, checkpoints, and approval boundary before execution starts. The plan remains attached to every attempt and report.',
      signals: ['goal and owner', 'cadence and checkpoints', 'output contract'],
      image: PRODUCT_ASSETS.tradingPlan,
      alt: 'AgentWorks workflow plan for a recurring analysis automation',
      mediaLabel: 'Workflow plan and execution contract'
    },
    {
      number: '02',
      label: 'Run',
      title: 'Keep live execution inspectable when an agent takes over.',
      description: 'Attach to tmux-based coding-agent sessions, inspect scrollback, reconnect to long-running work, and intervene without losing the durable workflow record.',
      signals: ['live terminal attach', 'long-running sessions', 'operator intervention'],
      image: PRODUCT_ASSETS.liveTerminal,
      alt: 'AgentWorks live terminal attached to a tmux coding-agent workflow',
      mediaLabel: 'Live agent execution'
    },
    {
      number: '03',
      label: 'Cost',
      title: 'See exactly where every workflow dollar goes.',
      description: 'Break spend down by run, workflow step, model, provider, input, cached tokens, output, and builder activity so cost decisions are based on evidence rather than a single monthly total.',
      signals: ['step-level cost', 'model and token breakdown', 'builder spend'],
      image: PRODUCT_ASSETS.workflowCostAnalysis,
      alt: 'AgentWorks Cost Analysis showing workflow steps, models, token usage, caching, and per-step cost',
      mediaLabel: 'Workflow cost analysis'
    },
    {
      number: '04',
      label: 'Report',
      title: 'Turn every run into an inspectable business report.',
      description: 'Render workflow output as a structured report with source-health warnings, summary metrics, actionable results, and detailed evidence instead of leaving the answer inside a chat transcript.',
      signals: ['decision-ready output', 'source-health warnings', 'inspectable evidence'],
      image: PRODUCT_ASSETS.generatedReport,
      alt: 'AgentWorks generated day-trading report showing source health, summary metrics, and actionable results',
      mediaLabel: 'Generated workflow report'
    },
    {
      number: '05',
      label: 'Pulse',
      title: 'Pulse turns run evidence into a decision.',
      description: 'Pulse evaluates the run against its business outcome, health, risk, and cost. It identifies bugs, goal drift, approval needs, and the next action without requiring an operator to read every log.',
      signals: ['goal and health verdict', 'risk and cost signals', 'human review when needed'],
      image: PRODUCT_ASSETS.workflowPulse,
      alt: 'AgentWorks workflow Pulse view showing health, goal, cost, evidence, and next-action signals',
      mediaLabel: 'Workflow Pulse evaluation'
    },
    {
      number: '06',
      label: 'Improve',
      title: 'Turn run evidence into reusable operating knowledge.',
      description: 'Auto Improve examines repeated failures, successful fixes, and Pulse evidence. It proposes bounded changes to the workflow, while approved learnings become workflow or global skills that improve future runs.',
      signals: ['evidence-based proposals', 'human-reviewed changes', 'skills that compound over time'],
      image: PRODUCT_ASSETS.globalSkills,
      alt: 'AgentWorks global skills screen showing reusable skills generated from workflow runs',
      mediaLabel: 'Generated global skills'
    }
  ];

  return h('div', { className: 'mk-page mk-homev4 mk-how2-page' },
    h(MarketingNav, { current: 'how' }),
    h('main', { id: 'main-content', tabIndex: -1 },
      h('section', { className: 'mk-how2-hero' },
        h('div', { className: 'mk-shell mk-how2-hero-grid' },
          h('div', { className: 'mk-how2-copy' },
            h('p', { className: 'mk-kicker' }, 'How AgentWorks works'),
            h('h1', null, 'Build AI workflows that improve with every run.'),
            h('p', { className: 'mk-lead' },
              'AgentWorks keeps the outcome, workers, tools, evidence, cost, and human judgment together. Pulse evaluates what happened; Auto Improve makes the next run better.'
            ),
            h('div', { className: 'mk-hero-actions' },
              h('a', { className: 'mk-btn', href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Install for Mac'),
              h('a', { className: 'mk-btn mk-btn-secondary', href: marketingPath('docs') }, 'Read docs'),
              h('a', { className: 'mk-text-link', href: marketingPath('usecases') }, 'See use cases')
            )
          ),
          h('div', { className: 'mk-how2-packet', 'aria-label': 'Run packet model' },
            h('div', { className: 'mk-v4-browserbar' },
              h('span', null), h('span', null), h('span', null),
              h('strong', null, 'run-packet.json')
            ),
            h('div', { className: 'mk-how2-packet-body' },
              packet.map(row =>
                h('div', { key: row[0] },
                  h('span', null, row[0]),
                  h('strong', null, row[1])
                )
              ),
              h('p', null, 'The prompt is temporary. The run packet is durable.')
            )
          )
        )
      ),

      h('section', { className: 'mk-how2-loop-section' },
        h('div', { className: 'mk-shell' },
          h('div', { className: 'mk-how2-section-head' },
            h('p', { className: 'mk-kicker' }, 'Core improvement loop'),
            h('h2', null, 'Every run should make the next run better.'),
            h('span', null, 'The workflow keeps its evidence, evaluates the outcome, and turns successful fixes into reusable operating knowledge.')
          ),
          h('div', { className: 'mk-how2-loop-grid' },
            loop.map(item =>
              h('article', { key: item[0], className: `mk-loop-${item[3]}` },
                h('span', null, item[0]),
                h('h3', null, item[1]),
                h('p', null, item[2])
              )
            )
          ),
          h('div', { className: 'mk-improvement-flow', 'aria-label': 'Continuous workflow improvement loop' },
            ['Run', 'Evidence', 'Pulse', 'Auto Improve', 'Next run'].map((step, index) =>
              h('span', {
                key: step,
                className: index === 2 ? 'pulse' : index === 3 ? 'improve' : ''
              }, step)
            )
          )
        )
      ),

      h('section', { className: 'mk-how2-proof-section' },
        h('div', { className: 'mk-shell mk-how2-proof-grid' },
          h('div', { className: 'mk-how2-proof-copy' },
            h('p', { className: 'mk-kicker' }, 'Inside an automation'),
            h('h2', null, 'A workflow is more than a prompt.'),
            h('p', null, 'It is a durable operating record that connects the outcome, execution, evidence, human judgment, and what should improve next.'),
            h('div', { className: 'mk-how2-layer-list' },
              layers.map((layer, i) =>
                h('article', { key: layer[0] },
                  h('span', null, String(i + 1).padStart(2, '0')),
                  h('div', null,
                    h('strong', null, layer[0]),
                    h('p', null, layer[1])
                  )
                )
              )
            )
          )
        )
      ),

      automationDetails.map((item, index) =>
        h('section', {
          key: item.number,
          className: `mk-product-detail ${index % 2 === 1 ? 'mk-product-detail-white' : ''}`
        },
          h('div', { className: 'mk-shell mk-product-detail-inner' },
            h('div', { className: 'mk-product-detail-copy' },
              h('p', { className: 'mk-product-detail-index' }, `${item.number} / ${item.label}`),
              h('div', null,
                h('h2', null, item.title),
                h('p', null, item.description),
                h('ul', null,
                  item.signals.map(signal => h('li', { key: signal }, signal))
                )
              )
            ),
            h('figure', { className: 'mk-product-detail-figure' },
              h('div', { className: 'mk-v4-browserbar' },
                h('span', null), h('span', null), h('span', null),
                h('strong', null, item.mediaLabel)
              ),
              h(ExpandableProductImage, {
                src: item.image,
                alt: item.alt,
                label: item.mediaLabel
              })
            )
          )
        )
      ),

      h('section', { className: 'mk-product-boundary' },
        h('div', { className: 'mk-shell mk-product-boundary-inner' },
          h('div', { className: 'mk-product-boundary-head' },
            h('p', { className: 'mk-kicker' }, 'Operating boundary'),
            h('div', null,
              h('h2', null, 'Agents execute. AgentWorks coordinates. Humans decide.'),
              h('p', null, 'AgentWorks does not replace workers or human judgment. It keeps both inside one inspectable operating model.')
            )
          ),
          h('div', { className: 'mk-product-boundary-roles' },
            h('article', null,
              h('span', null, '01 / Workers'),
              h('strong', null, 'Execute the work.'),
              h('p', null, 'Claude Code, Codex CLI, Cursor, Gemini, browsers, MCP tools, and APIs run each step.')
            ),
            h('article', { className: 'active' },
              h('span', null, '02 / AgentWorks'),
              h('strong', null, 'Operate the loop.'),
              h('p', null, 'Goals, schedules, access, evidence, Pulse, approvals, cost, and learning remain connected.')
            ),
            h('article', null,
              h('span', null, '03 / Humans'),
              h('strong', null, 'Keep judgment.'),
              h('p', null, 'Risky actions, goal changes, replans, exceptions, and promoted skills stay reviewable.')
            )
          )
        )
      ),

      h('section', { className: 'mk-product-closing' },
        h('div', { className: 'mk-shell mk-product-closing-inner' },
          h('p', { className: 'mk-kicker' }, 'Start with one workflow'),
          h('h2', null, 'Build the first operating loop with us.'),
          h('p', null, 'Bring one recurring workflow, its business outcome, and the tools it already uses. We will map the workers, evidence, review points, and path to improvement.'),
          h('div', { className: 'mk-product-closing-actions' },
            h('a', { className: 'mk-btn', href: SALES_CALL_URL, target: '_blank', rel: 'noreferrer' }, 'Book a call'),
            h('a', { className: 'mk-text-link', href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Install for Mac'),
            h('a', { className: 'mk-text-link', href: marketingPath('docs') }, 'Read docs')
          )
        )
      )
    ),
    h(MarketingFooter)
  );
}


function MarketingFooter() {
  return h('footer', { className: 'mk-footer' },
    h('div', { className: 'mk-shell mk-footer-grid' },
      h('div', null,
        h(ProductLogo),
        h('p', null, 'Open-source operating layer for running and improving an AI workforce across your company.')
      ),
      h('div', null,
        h('strong', null, 'Product'),
        h('a', { href: marketingPath('home') }, 'Home'),
        h('a', { href: marketingPath('usecases') }, 'Use cases'),
        h('a', { href: marketingPath('updates') }, 'Updates'),
        h('a', { href: marketingPath('how') }, 'Product'),
        h('a', { href: marketingPath('docs') }, 'Docs')
      ),
      h('div', null,
        h('strong', null, 'Open source'),
        h('a', { href: 'https://github.com/manishiitg/coding-agent-loop', target: '_blank', rel: 'noreferrer' }, 'GitHub'),
        h('a', { href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Latest release'),
        h('a', { href: 'https://modelcontextprotocol.io/docs/getting-started/intro', target: '_blank', rel: 'noreferrer' }, 'MCP')
      ),
      h('div', null,
        h('strong', null, 'Connect'),
        h('a', { href: 'https://x.com/manish_iitg', target: '_blank', rel: 'noreferrer' }, 'X'),
        h('a', { href: 'https://in.linkedin.com/in/manishiitg', target: '_blank', rel: 'noreferrer' }, 'LinkedIn'),
        h('a', { href: SALES_CALL_URL, target: '_blank', rel: 'noreferrer' }, 'Book a call')
      )
    )
  );
}

function NotFoundPage() {
  return h('div', { className: 'mk-page mk-homev4 mk-notfound-page' },
    h(MarketingNav, { current: 'notfound' }),
    h('main', { id: 'main-content', tabIndex: -1 },
      h('section', { className: 'mk-notfound-section' },
        h('div', { className: 'mk-shell mk-notfound-grid' },
          h('div', { className: 'mk-notfound-copy' },
            h('p', { className: 'mk-kicker' }, '404 / Route missing'),
            h('h1', null, 'This run does not have a page.'),
            h('p', { className: 'mk-lead' },
              'The route may be old, private, or from an earlier AgentWorks experiment. The current public surface is the product overview, how-it-works page, and docs.'
            ),
            h('div', { className: 'mk-hero-actions' },
              h('a', { className: 'mk-btn', href: marketingPath('home') }, 'Go home'),
              h('a', { className: 'mk-btn mk-btn-secondary', href: marketingPath('docs') }, 'Open docs'),
              h('a', { className: 'mk-text-link', href: 'https://github.com/manishiitg/coding-agent-loop/releases/latest', target: '_blank', rel: 'noreferrer' }, 'Latest release')
            )
          ),
          h('div', { className: 'mk-notfound-panel', 'aria-label': 'AgentWorks route status' },
            h('div', { className: 'mk-v4-browserbar' },
              h('span', null), h('span', null), h('span', null),
              h('strong', null, 'route-check.agentworks')
            ),
            h('div', { className: 'mk-notfound-rows' },
              [
                ['status', 'missing route'],
                ['public pages', 'home / how / docs'],
                ['legacy routes', 'redirected to docs'],
                ['next action', 'choose a current surface']
              ].map(row =>
                h('div', { key: row[0] },
                  h('span', null, row[0]),
                  h('strong', null, row[1])
                )
              )
            )
          )
        )
      )
    ),
    h(MarketingFooter)
  );
}

Object.assign(window, {
  AgentWorksHome,
  UseCasesPage,
  UpdatesPage,
  HowPage,
  DocsPage,
  NotFoundPage,
  MarketingNav,
  MarketingFooter
});

const root = document.getElementById('root');
const pages = {
  home: AgentWorksHome,
  usecases: UseCasesPage,
  updates: UpdatesPage,
  how: HowPage,
  docs: DocsPage,
  notfound: NotFoundPage
};

if (root) {
  const Page = pages[root.dataset.page] || AgentWorksHome;
  ReactDOM.createRoot(root).render(h(Page));
}
