import { buildDemoSessions } from './demo-data.js';

const builtAt = Date.now();
const sessions = buildDemoSessions(builtAt);
const main = sessions[0];
const sessionById = new Map(sessions.map((session) => [session.id, session]));

const ZERO = { input: 0, output: 0, reasoning: 0, cacheRead: 0, cacheWrite: 0, cost: 0 };
const RANGE_MS = {
  '24h': 24 * 3600_000,
  '7d': 7 * 24 * 3600_000,
  '30d': 30 * 24 * 3600_000,
};

function summary(session) {
  return {
    id: session.id,
    title: session.title,
    agent: session.agent,
    model: session.model,
    directory: session.directory,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  };
}

function makeSnapshot() {
  return {
    at: Date.now(),
    focused: null,
    agents: main
      ? [
          {
            sourceId: 'demo',
            name: 'opencode',
            interface: 'cli/tui',
            description: 'Synthetic multi-turn demo session',
            available: true,
            alive: true,
            focused: false,
            processes: [],
            sessions: [summary(main)],
          },
        ]
      : [],
  };
}

function usageOf(u = {}) {
  return {
    input: u.input || 0,
    output: u.output || 0,
    reasoning: u.reasoning || 0,
    cacheRead: u.cacheRead || 0,
    cacheWrite: u.cacheWrite || 0,
    cost: typeof u.cost === 'number' ? u.cost : u.cost?.total || 0,
  };
}

function hasUsage(u) {
  return ['input', 'output', 'reasoning', 'cacheRead', 'cacheWrite', 'cost'].some(
    (key) => (Number(u?.[key]) || 0) > 0,
  );
}

function addUsage(a, b) {
  const u = usageOf(b);
  for (const key of Object.keys(ZERO)) a[key] += u[key] || 0;
  return a;
}

function countStatuses(turns = []) {
  const out = { ok: 0, error: 0, aborted: 0, running: 0 };
  for (const turn of turns) {
    if (out[turn.status] != null) out[turn.status] += 1;
  }
  return out;
}

function addContext(context, event) {
  const text = event?.data?.text || event?.data?.notice || '';
  const chars =
    typeof text === 'string' ? text.length : text == null ? 0 : JSON.stringify(text).length;
  const source = event?.data?.source || 'context';
  context.events += 1;
  context.chars += chars;
  const prev = context.sources.get(source) || { name: source, count: 0, chars: 0 };
  prev.count += 1;
  prev.chars += chars;
  context.sources.set(source, prev);
}

function buildDashboard(sourceId, rangeInput) {
  const range = RANGE_MS[rangeInput] ? rangeInput : '24h';
  const since = builtAt - RANGE_MS[range];
  const rows = [];
  const heatPoints = [];
  const totals = {
    usage: { ...ZERO },
    turns: 0,
    contextTokens: 0,
    generated: 0,
    cost: 0,
    durationMs: 0,
  };
  const context = { events: 0, chars: 0, sources: new Map() };
  const statuses = { ok: 0, error: 0, aborted: 0, running: 0 };

  for (const item of sessions) {
    if ((item.updatedAt || 0) < since) continue;

    const session = item;
    const turnUsage = (session.turns || []).reduce(
      (acc, turn) => addUsage(acc, turn.usage),
      { ...ZERO },
    );
    const usage = hasUsage(turnUsage) ? turnUsage : usageOf(session.usage);
    const rowStatuses = countStatuses(session.turns);
    for (const key of Object.keys(statuses)) statuses[key] += rowStatuses[key];

    rows.push({
      id: session.id,
      title: session.title || item.title || session.id,
      model: session.model || {},
      createdAt: session.createdAt || item.createdAt || 0,
      updatedAt: session.updatedAt || item.updatedAt || 0,
      turns: session.turns?.length || 0,
      usage,
      statuses: rowStatuses,
    });

    addUsage(totals.usage, usage);
    totals.turns += session.turns?.length || 0;

    for (const turn of session.turns || []) {
      let stepPoints = 0;
      for (const event of turn.events || []) {
        if (event.type === 'context') addContext(context, event);
        if (event.type !== 'step') continue;
        const u = usageOf(event.data?.usage);
        if (!hasUsage(u)) continue;
        heatPoints.push({
          at: event.at || turn.startedAt || turn.endedAt || 0,
          usage: u,
          sessionId: session.id,
          turnIndex: turn.index,
        });
        stepPoints += 1;
      }
      if (!stepPoints) {
        const u = usageOf(turn.usage);
        if (hasUsage(u)) {
          heatPoints.push({
            at: turn.startedAt || turn.endedAt || 0,
            usage: u,
            sessionId: session.id,
            turnIndex: turn.index,
          });
        }
      }
    }
  }

  totals.contextTokens = totals.usage.input + totals.usage.cacheRead + totals.usage.cacheWrite;
  totals.generated = totals.usage.output + totals.usage.reasoning;
  totals.cost = totals.usage.cost;

  const starts = rows
    .map((row) => (row.createdAt ? Math.max(row.createdAt, since) : 0))
    .filter(Boolean);
  const ends = rows.map((row) => row.updatedAt).filter(Boolean);
  if (starts.length && ends.length) totals.durationMs = Math.max(...ends) - Math.min(...starts);

  return {
    sourceId,
    range,
    since,
    generatedAt: Date.now(),
    totals,
    sessionRows: rows.sort((a, b) => b.updatedAt - a.updatedAt),
    context: {
      events: context.events,
      chars: context.chars,
      sources: [...context.sources.values()].sort((a, b) => b.chars - a.chars),
    },
    statuses,
    heatPoints,
  };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

const originalFetch = window.fetch.bind(window);

window.fetch = (input, init) => {
  const raw = typeof input === 'string' ? input : input?.url || String(input);
  let url;
  try {
    url = new URL(raw, location.href);
  } catch {
    return originalFetch(input, init);
  }

  const rawPath = url.pathname;
  const apiIndex = rawPath.indexOf('/api/');
  const path = apiIndex >= 0 ? rawPath.slice(apiIndex) : rawPath;

  if (path === '/api/agents') return Promise.resolve(jsonResponse(makeSnapshot()));

  const sessionMatch = path.match(/^\/api\/session\/([^/]+)\/([^/]+)$/);
  if (sessionMatch) {
    const sourceId = decodeURIComponent(sessionMatch[1]);
    const id = decodeURIComponent(sessionMatch[2]);
    if (sourceId !== 'demo') {
      return Promise.resolve(jsonResponse({ error: `source not found: ${sourceId}` }, 404));
    }
    const session = sessionById.get(id);
    if (!session) return Promise.resolve(jsonResponse({ error: 'session not found' }, 404));
    return Promise.resolve(jsonResponse({ ...session, sourceId }));
  }

  const dashboardMatch = path.match(/^\/api\/dashboard\/([^/]+)$/);
  if (dashboardMatch) {
    const sourceId = decodeURIComponent(dashboardMatch[1]);
    if (sourceId !== 'demo') {
      return Promise.resolve(jsonResponse({ error: `source not found: ${sourceId}` }, 404));
    }
    return Promise.resolve(
      jsonResponse(buildDashboard(sourceId, url.searchParams.get('range'))),
    );
  }

  if (path.startsWith('/api/')) {
    return Promise.resolve(jsonResponse({ error: 'not found' }, 404));
  }

  return originalFetch(input, init);
};

class DemoEventSource extends EventTarget {
  constructor(url) {
    super();
    this.url = String(url);
    this.readyState = DemoEventSource.CONNECTING;
    this.withCredentials = false;
    this.onopen = null;
    this.onmessage = null;
    this.onerror = null;
    this._timer = null;

    if (this.url.includes('/api/stream')) {
      this._timer = window.setTimeout(() => {
        this._timer = null;
        if (this.readyState === DemoEventSource.CLOSED) return;
        this.readyState = DemoEventSource.OPEN;
        const openEvent = new Event('open');
        this.dispatchEvent(openEvent);
        if (typeof this.onopen === 'function') this.onopen(openEvent);
        this._emit('agents', makeSnapshot());
        this._emit('session', { ...main, sourceId: 'demo' });
      }, 0);
    } else {
      this.readyState = DemoEventSource.CLOSED;
      window.setTimeout(() => {
        const errorEvent = new Event('error');
        this.dispatchEvent(errorEvent);
        if (typeof this.onerror === 'function') this.onerror(errorEvent);
      }, 0);
    }
  }

  _emit(type, data) {
    if (this.readyState === DemoEventSource.CLOSED) return;
    const event =
      typeof MessageEvent === 'function'
        ? new MessageEvent(type, { data: JSON.stringify(data) })
        : Object.assign(new Event(type), { data: JSON.stringify(data) });
    this.dispatchEvent(event);
  }

  close() {
    this.readyState = DemoEventSource.CLOSED;
    if (this._timer) {
      window.clearTimeout(this._timer);
      this._timer = null;
    }
  }
}

DemoEventSource.CONNECTING = 0;
DemoEventSource.OPEN = 1;
DemoEventSource.CLOSED = 2;

window.EventSource = DemoEventSource;
