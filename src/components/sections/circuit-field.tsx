"use client";

import { useEffect, useRef } from "react";

type Pt = [number, number];

type Track = {
  pts: Pt[];
  cum: number[];
  len: number;
  main: boolean;
  nodeStart: number;
  nodeEnd: number;
};

type NetNode = { x: number; y: number; glow: number; lit: number; main: boolean };

type Pulse = { track: Track; d: number; dir: 1 | -1; speed: number };

type Palette = {
  ambient: string;
  main: string;
  cyan: string;
  rgb: [number, number, number];
  ambientAlpha: number;
  mainAlpha: number;
  nodeAlpha: number;
};

type FocusBox = { x: number; y: number; w: number; h: number };

// Points d'ancrage des pistes dans le repère de l'emblème (969 x 441) : les anneaux du logo.
const ANCHORS: Pt[] = [
  [569, 103],
  [537, 48],
  [601, 19],
  [692, 0],
  [930, 205],
  [944, 340],
];
const EMBLEM_W = 969;
const EMBLEM_H = 441;

const SEED = 20260211;
const MOUSE_RADIUS = 140;
const TRAIL_STEPS = 10;
const TRAIL_STEP_PX = 8;

const DIRS: Pt[] = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeTrack(pts: Pt[], main: boolean, nodeStart: number, nodeEnd: number): Track {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  return { pts, cum, len: cum[cum.length - 1], main, nodeStart, nodeEnd };
}

// Route à angles de 45 degrés : un tronçon droit, une diagonale, puis le reste en droit.
function route(from: Pt, to: Pt, rng: () => number): Pt[] {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const sx = Math.sign(dx) || 1;
  const sy = Math.sign(dy) || 1;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);
  const diag = Math.min(adx, ady);
  const rest = Math.abs(adx - ady);
  const major: Pt = adx > ady ? [sx, 0] : [0, sy];
  const first = rest * (0.25 + rng() * 0.5);
  const p1: Pt = [from[0] + major[0] * first, from[1] + major[1] * first];
  const p2: Pt = [p1[0] + sx * diag, p1[1] + sy * diag];
  return [from, p1, p2, to].filter((p, i, all) => i === 0 || Math.hypot(p[0] - all[i - 1][0], p[1] - all[i - 1][1]) > 0.5);
}

function pointAt(track: Track, dist: number): Pt {
  const d = Math.max(0, Math.min(track.len, dist));
  let i = 1;
  while (i < track.cum.length - 1 && track.cum[i] < d) i++;
  const span = track.cum[i] - track.cum[i - 1] || 1;
  const t = (d - track.cum[i - 1]) / span;
  const a = track.pts[i - 1];
  const b = track.pts[i];
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function offsetWithin(element: HTMLElement, ancestor: HTMLElement): Pt {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return [x, y];
}

function parseRgb(color: string): [number, number, number] {
  const match = /^#?([0-9a-f]{6})$/i.exec(color.trim());
  if (!match) return [34, 195, 255];
  const n = parseInt(match[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement);
  const read = (name: string) => style.getPropertyValue(name).trim();
  const cyan = read("--color-cyan") || "#22c3ff";
  return {
    ambient: read("--color-line-strong") || "#5a6ea0",
    main: read("--color-navy") || "#0b2a7a",
    cyan,
    rgb: parseRgb(cyan),
    ambientAlpha: parseFloat(read("--circuit-ambient-alpha")) || 0.3,
    mainAlpha: parseFloat(read("--circuit-main-alpha")) || 0.8,
    nodeAlpha: parseFloat(read("--circuit-node-alpha")) || 0.55,
  };
}

function buildNetwork(width: number, height: number, focus: FocusBox | null, compact: boolean) {
  const rng = mulberry32(SEED);
  const cell = compact ? 56 : 44;
  const tracks: Track[] = [];
  const nodes: NetNode[] = [];
  const addNode = (x: number, y: number, main: boolean) => nodes.push({ x, y, glow: 0, lit: 0, main }) - 1;

  const avoid = focus
    ? { x0: focus.x - 28, y0: focus.y - 28, x1: focus.x + focus.w + 28, y1: focus.y + focus.h + 28 }
    : null;
  const blocked = (x: number, y: number) => avoid !== null && x > avoid.x0 && x < avoid.x1 && y > avoid.y0 && y < avoid.y1;

  if (focus) {
    const margin = 12;
    ANCHORS.forEach((anchor, index) => {
      const ax = focus.x + (anchor[0] / EMBLEM_W) * focus.w;
      const ay = focus.y + (anchor[1] / EMBLEM_H) * focus.h;
      const onTop = index < 4;
      for (let k = 0; k < 2; k++) {
        let sx: number;
        let sy: number;
        if (onTop) {
          sx = Math.min(width - margin, Math.max(margin, ax + (rng() * 2 - 1) * width * 0.35));
          sy = margin + rng() * 24;
        } else if (rng() < 0.6) {
          sx = width - margin;
          sy = Math.min(height - margin, Math.max(margin, ay + (rng() * 2 - 1) * height * 0.3));
        } else {
          sx = Math.min(width - margin, ax + rng() * (width - ax));
          sy = height - margin;
        }
        const pts = route([sx, sy], [ax, ay], rng);
        if (pts.length < 2) continue;
        const nodeStart = addNode(sx, sy, true);
        tracks.push(makeTrack(pts, true, nodeStart, -1));
      }
    });
  }

  const count = Math.round((width * height) / (compact ? 52000 : 30000));
  for (let n = 0; n < count; n++) {
    let x = Math.floor((rng() * width) / cell) * cell;
    let y = Math.floor((rng() * height) / cell) * cell;
    if (blocked(x, y)) continue;
    let dir = Math.floor(rng() * 8);
    const pts: Pt[] = [[x, y]];
    const segments = 3 + Math.floor(rng() * 4);
    for (let s = 0; s < segments; s++) {
      const len = (1 + Math.floor(rng() * 3)) * cell;
      const nx = x + DIRS[dir][0] * len;
      const ny = y + DIRS[dir][1] * len;
      if (nx < 0 || nx > width || ny < 0 || ny > height || blocked(nx, ny) || blocked((x + nx) / 2, (y + ny) / 2)) break;
      pts.push([nx, ny]);
      x = nx;
      y = ny;
      dir = (dir + (rng() < 0.5 ? 1 : 7)) % 8;
    }
    if (pts.length < 2) continue;
    const nodeStart = rng() < 0.4 ? addNode(pts[0][0], pts[0][1], false) : -1;
    const last = pts[pts.length - 1];
    const nodeEnd = rng() < 0.8 ? addNode(last[0], last[1], false) : -1;
    tracks.push(makeTrack(pts, false, nodeStart, nodeEnd));
  }

  return { tracks, nodes };
}

// Le canvas ne porte que du décor : deux couches, l'une dessinée une fois (pistes), l'autre redessinée (impulsions, nœuds).
export function CircuitField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const staticRef = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const staticCanvas = staticRef.current;
    const liveCanvas = liveRef.current;
    const section = wrap?.closest("section");
    if (!wrap || !staticCanvas || !liveCanvas || !section) return;
    const staticCtx = staticCanvas.getContext("2d");
    const liveCtx = liveCanvas.getContext("2d");
    if (!staticCtx || !liveCtx) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineQuery = window.matchMedia("(pointer: fine)");
    const rng = mulberry32(SEED ^ 0x9e3779b9);

    let palette = readPalette();
    let sprite = document.createElement("canvas");
    let tracks: Track[] = [];
    let nodes: NetNode[] = [];
    let pulses: Pulse[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let compact = false;
    let maxPulses = 4;
    let spawnIn = 0.6;
    let mouse: Pt | null = null;
    let visible = false;
    let raf = 0;
    let running = false;
    let last = 0;
    let resizeTimer = 0;

    const makeSprite = () => {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const [r, g, b] = palette.rgb;
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        gradient.addColorStop(0, `rgba(${r},${g},${b},0.6)`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return canvas;
    };

    const drawStatic = () => {
      staticCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      staticCtx.clearRect(0, 0, width, height);
      staticCtx.lineCap = "round";
      staticCtx.lineJoin = "round";
      for (const pass of [false, true]) {
        staticCtx.strokeStyle = pass ? palette.main : palette.ambient;
        staticCtx.globalAlpha = pass ? palette.mainAlpha : palette.ambientAlpha;
        staticCtx.lineWidth = pass ? 1.5 : 1;
        for (const track of tracks) {
          if (track.main !== pass) continue;
          staticCtx.beginPath();
          track.pts.forEach(([x, y], i) => (i === 0 ? staticCtx.moveTo(x, y) : staticCtx.lineTo(x, y)));
          staticCtx.stroke();
        }
      }
      staticCtx.strokeStyle = palette.ambient;
      staticCtx.fillStyle = palette.ambient;
      staticCtx.lineWidth = 1.25;
      staticCtx.globalAlpha = palette.nodeAlpha;
      for (const node of nodes) {
        staticCtx.beginPath();
        staticCtx.arc(node.x, node.y, node.main ? 4.5 : 3.5, 0, Math.PI * 2);
        staticCtx.stroke();
        staticCtx.beginPath();
        staticCtx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
        staticCtx.fill();
      }
      staticCtx.globalAlpha = 1;
    };

    const drawLive = () => {
      liveCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      liveCtx.clearRect(0, 0, width, height);
      liveCtx.lineCap = "round";
      liveCtx.strokeStyle = palette.cyan;
      liveCtx.fillStyle = palette.cyan;

      for (const pulse of pulses) {
        for (let k = 0; k < TRAIL_STEPS; k++) {
          const from = pulse.d - pulse.dir * k * TRAIL_STEP_PX;
          const to = pulse.d - pulse.dir * (k + 1) * TRAIL_STEP_PX;
          if ((from < 0 && to < 0) || (from > pulse.track.len && to > pulse.track.len)) continue;
          const a = pointAt(pulse.track, from);
          const b = pointAt(pulse.track, to);
          liveCtx.globalAlpha = 0.85 * Math.pow(1 - k / TRAIL_STEPS, 1.6);
          liveCtx.lineWidth = 1.8;
          liveCtx.beginPath();
          liveCtx.moveTo(a[0], a[1]);
          liveCtx.lineTo(b[0], b[1]);
          liveCtx.stroke();
        }
        const [hx, hy] = pointAt(pulse.track, pulse.d);
        liveCtx.globalAlpha = 0.9;
        liveCtx.drawImage(sprite, hx - 14, hy - 14, 28, 28);
        liveCtx.globalAlpha = 1;
        liveCtx.beginPath();
        liveCtx.arc(hx, hy, 1.8, 0, Math.PI * 2);
        liveCtx.fill();
      }

      for (const node of nodes) {
        const v = Math.max(node.glow, node.lit);
        if (v < 0.03) continue;
        liveCtx.globalAlpha = v * 0.7;
        liveCtx.drawImage(sprite, node.x - 20, node.y - 20, 40, 40);
        liveCtx.globalAlpha = 0.3 + 0.7 * v;
        liveCtx.lineWidth = 1.5;
        liveCtx.beginPath();
        liveCtx.arc(node.x, node.y, 3.5 + 3 * v, 0, Math.PI * 2);
        liveCtx.stroke();
        liveCtx.globalAlpha = v;
        liveCtx.beginPath();
        liveCtx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        liveCtx.fill();
      }
      liveCtx.globalAlpha = 1;
    };

    const step = (dt: number) => {
      spawnIn -= dt;
      if (spawnIn <= 0 && pulses.length < maxPulses && tracks.length > 0) {
        const mains = tracks.filter((track) => track.main);
        const pool = mains.length > 0 && rng() < 0.65 ? mains : tracks;
        const track = pool[Math.floor(rng() * pool.length)];
        const inward = !track.main || rng() < 0.75;
        pulses.push({ track, d: inward ? 0 : track.len, dir: inward ? 1 : -1, speed: 110 + rng() * 60 });
        spawnIn = 0.5 + rng() * 1.3;
      }

      pulses = pulses.filter((pulse) => {
        pulse.d += pulse.dir * pulse.speed * dt;
        const done = pulse.dir === 1 ? pulse.d >= pulse.track.len : pulse.d <= 0;
        if (done) {
          const index = pulse.dir === 1 ? pulse.track.nodeEnd : pulse.track.nodeStart;
          if (index >= 0) nodes[index].lit = 1;
        }
        return !done;
      });

      for (const node of nodes) {
        node.lit = Math.max(0, node.lit - dt * 1.4);
        const target = mouse ? Math.max(0, 1 - Math.hypot(node.x - mouse[0], node.y - mouse[1]) / MOUSE_RADIUS) : 0;
        node.glow += (target - node.glow) * Math.min(1, dt * 8);
      }
    };

    const frame = (time: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((time - last) / 1000, 0.05);
      last = time;
      step(dt);
      drawLive();
    };

    const sync = () => {
      const shouldRun = visible && !document.hidden && !reduceQuery.matches;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const rebuild = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (width === 0 || height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      compact = window.innerWidth < 768;
      maxPulses = compact ? 2 : 4;
      for (const canvas of [staticCanvas, liveCanvas]) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      let focus: FocusBox | null = null;
      const emblem = section.querySelector<HTMLElement>("[data-circuit-focus]");
      if (emblem) {
        const origin = offsetWithin(wrap, section);
        const pos = offsetWithin(emblem, section);
        focus = { x: pos[0] - origin[0], y: pos[1] - origin[1], w: emblem.offsetWidth, h: emblem.offsetHeight };
      }

      palette = readPalette();
      sprite = makeSprite();
      ({ tracks, nodes } = buildNetwork(width, height, focus, compact));
      pulses = [];
      drawStatic();
      drawLive();
    };

    const scheduleRebuild = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuild, 150);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduceQuery.matches) return;
      const rect = liveCanvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? [x, y] : null;
    };
    const onPointerLeave = () => {
      mouse = null;
    };

    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      sync();
    });
    const resizeObserver = new ResizeObserver(scheduleRebuild);

    rebuild();
    observer.observe(wrap);
    resizeObserver.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    reduceQuery.addEventListener("change", sync);
    if (fineQuery.matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }
    void document.fonts?.ready.then(scheduleRebuild);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduceQuery.removeEventListener("change", sync);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" data-circuit-field className="pointer-events-none absolute inset-0">
      <canvas ref={staticRef} className="absolute inset-0 size-full" />
      <canvas ref={liveRef} className="absolute inset-0 size-full" />
    </div>
  );
}
