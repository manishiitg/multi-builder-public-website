// Reusable SVG scribble snippets as React components
// Uses global React via window.React

// uses window.h

window.Arrow = function Arrow({ className = '', color = 'var(--ink)', w = 80, h: hh = 40, variant = 1 }) {
  const paths = {
    1: 'M4 20 Q 25 5, 50 18 T 74 20 M66 12 L74 20 L66 28',
    2: 'M4 30 C 20 5, 50 35, 76 10 M70 6 L76 10 L72 16',
    3: 'M4 20 L 74 20 M66 12 L74 20 L66 28',
    4: 'M4 8 Q 30 28, 50 14 T 76 28 M68 22 L76 28 L68 34',
  };
  return h('svg', { className, width: w, height: hh, viewBox: '0 0 80 40', fill: 'none' },
    h('path', { d: paths[variant] || paths[1], stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })
  );
};

window.Scribble = function Scribble({ w = 100, h: hh = 8, color = 'var(--accent)' }) {
  return h('svg', { width: w, height: hh, viewBox: '0 0 100 8', preserveAspectRatio: 'none' },
    h('path', { d: 'M2 5 Q 15 1, 30 4 T 60 3 T 98 5', stroke: color, strokeWidth: 2, fill: 'none', strokeLinecap: 'round' })
  );
};

window.Star = function Star({ size = 20, color = 'var(--accent)' }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none' },
    h('path', { d: 'M12 3 L14 10 L21 12 L14 14 L12 21 L10 14 L3 12 L10 10 Z',
      stroke: color, strokeWidth: 1.5, fill: color, fillOpacity: 0.3, strokeLinejoin: 'round' })
  );
};

window.Sparkle = function Sparkle({ size = 16, color = 'var(--accent)' }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none' },
    h('path', { d: 'M8 1 L9 7 L15 8 L9 9 L8 15 L7 9 L1 8 L7 7 Z', stroke: color, strokeWidth: 1, fill: color, fillOpacity: 0.4 })
  );
};

window.Squiggle = function Squiggle({ w = 120, color = 'var(--ink-3)' }) {
  return h('svg', { width: w, height: 10, viewBox: '0 0 120 10', preserveAspectRatio: 'none' },
    h('path', { d: 'M0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5 T 120 5', stroke: color, strokeWidth: 1.2, fill: 'none' })
  );
};

window.NodeGraph = function NodeGraph({ compact = false }) {
  // inline SVG of a small workflow graph placeholder
  const size = compact ? { w: 240, h: 140 } : { w: 360, h: 200 };
  return h('svg', { width: '100%', viewBox: `0 0 ${size.w} ${size.h}`, style: { display: 'block' } },
    // connections
    h('path', { d: `M40 ${size.h*0.5} C 80 ${size.h*0.5}, 90 ${size.h*0.25}, 130 ${size.h*0.25}`, stroke: 'var(--accent-2)', strokeWidth: 1.8, fill: 'none', strokeDasharray: '4 3' }),
    h('path', { d: `M40 ${size.h*0.5} C 80 ${size.h*0.5}, 90 ${size.h*0.75}, 130 ${size.h*0.75}`, stroke: 'var(--accent-2)', strokeWidth: 1.8, fill: 'none', strokeDasharray: '4 3' }),
    h('path', { d: `M190 ${size.h*0.25} C 230 ${size.h*0.25}, 240 ${size.h*0.5}, 280 ${size.h*0.5}`, stroke: 'var(--accent-2)', strokeWidth: 1.8, fill: 'none', strokeDasharray: '4 3' }),
    h('path', { d: `M190 ${size.h*0.75} C 230 ${size.h*0.75}, 240 ${size.h*0.5}, 280 ${size.h*0.5}`, stroke: 'var(--accent-2)', strokeWidth: 1.8, fill: 'none', strokeDasharray: '4 3' }),
    // nodes
    [
      { x: 10, y: size.h*0.5 - 20, label: 'trigger' },
      { x: 130, y: size.h*0.25 - 18, label: 'agent' },
      { x: 130, y: size.h*0.75 - 18, label: 'agent' },
      { x: 280, y: size.h*0.5 - 20, label: 'output' },
    ].map((n, i) =>
      h('g', { key: i },
        h('rect', { x: n.x, y: n.y, width: 60, height: 36, rx: 8, ry: 6,
          fill: 'var(--paper)', stroke: 'var(--ink)', strokeWidth: 1.8 }),
        h('text', { x: n.x + 30, y: n.y + 22, textAnchor: 'middle',
          fontFamily: 'JetBrains Mono', fontSize: 10, fill: 'var(--ink)' }, n.label)
      )
    )
  );
};

Object.assign(window, {
  Arrow: window.Arrow, Scribble: window.Scribble, Star: window.Star,
  Sparkle: window.Sparkle, Squiggle: window.Squiggle, NodeGraph: window.NodeGraph
});
