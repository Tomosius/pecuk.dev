// Minimal types to match your JSON
export type Item = {
  type: 'project' | 'blog';
  slug: string;
  title: string;
  summary: string;
  date?: string | null;
  cover?: string | null;
  links?: Record<string, string>;
  tech: string[];
  keywords: string[];
};

export type IndexJson = { items: Item[] };

let _cache: Promise<IndexJson> | null = null;

/** Load and cache /content-index.json (works in load() or client) */
export async function loadIndex(fetchFn?: typeof fetch): Promise<IndexJson> {
  if (_cache) return _cache;
  const f = fetchFn ?? fetch;
  _cache = f('/content-index.json').then((r) => r.json());
  return _cache;
}

/** Simple normalize */
const norm = (s: string) => s.toLowerCase();

/** Full-text search over selected fields (very simple "includes" search). */
export function search(items: Item[], q: string, fields: Array<keyof Item> = ['title', 'summary', 'tech', 'keywords']): Item[] {
  if (!q.trim()) return items;
  const needle = norm(q);
  return items.filter((it) =>
    fields.some((field) => {
      const v = it[field];
      if (Array.isArray(v)) return v.some((x) => norm(String(x)).includes(needle));
      if (typeof v === 'string') return norm(v).includes(needle);
      return false;
    })
  );
}

/** Basic filters (all optional). Uses AND between provided filters. */
export function filter(items: Item[], opts: {
  type?: 'project' | 'blog';
  techAll?: string[];      // item must include ALL of these tech ids
  techAny?: string[];      // item must include AT LEAST ONE of these
  keywordsAny?: string[];  // item must include at least one keyword
  dateFrom?: string;       // ISO (inclusive)
  dateTo?: string;         // ISO (inclusive)
}): Item[] {
  let out = items.slice();

  if (opts.type) out = out.filter((it) => it.type === opts.type);

  if (opts.techAll?.length) {
    const need = new Set(opts.techAll.map(norm));
    out = out.filter((it) => {
      const have = new Set(it.tech.map(norm));
      for (const t of need) if (!have.has(t)) return false;
      return true;
    });
  }

  if (opts.techAny?.length) {
    const any = new Set(opts.techAny.map(norm));
    out = out.filter((it) => it.tech.some((t) => any.has(norm(t))));
  }

  if (opts.keywordsAny?.length) {
    const any = new Set(opts.keywordsAny.map(norm));
    out = out.filter((it) => it.keywords?.some((k) => any.has(norm(k))));
  }

  if (opts.dateFrom) out = out.filter((it) => (it.date ?? '') >= opts.dateFrom!);
  if (opts.dateTo)   out = out.filter((it) => (it.date ?? '') <= opts.dateTo!);

  return out;
}

/** Sorting helper */
export function sort(items: Item[], by: 'date' | 'title' = 'date', dir: 'asc' | 'desc' = 'desc'): Item[] {
  const s = items.slice();
  const cmp = (a: string, b: string) => (dir === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
  if (by === 'date') s.sort((a, b) => cmp(a.date ?? '', b.date ?? ''));
  else s.sort((a, b) => cmp(a.title, b.title));
  return s;
}

/** Convenience: combine filter + search + sort */
export function query(items: Item[], opts: {
  q?: string;
  fields?: Array<keyof Item>;
  filter?: Parameters<typeof filter>[1];
  sortBy?: Parameters<typeof sort>[1];
  sortDir?: Parameters<typeof sort>[2];
}) {
  let res = items;
  if (opts.filter) res = filter(res, opts.filter);
  if (opts.q)      res = search(res, opts.q, opts.fields);
  res = sort(res, opts.sortBy ?? 'date', opts.sortDir ?? 'desc');
  return res;
}