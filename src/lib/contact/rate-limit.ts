// 3 envois par 10 minutes et par IP. Compteur en mémoire : propre à chaque instance (accepté en v1).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 3;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now: number = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}
