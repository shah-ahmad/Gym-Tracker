/**
 * dashboard-stats.js
 * Dashboard statistics: weekly session comparison, daily water progress,
 * plus loading and empty states.
 *
 * Pure calculation helpers (no DOM) are separated from render helpers (return
 * HTML strings) so they are easy to test and to drop into app.js.
 *
 * Expected data (matches the app's saved state):
 *   state.sessions : [{ date: 'YYYY-MM-DD', ... }]
 *   state.water    : [{ amount: <ml>, date: 'YYYY-MM-DD' }]
 *   state.goals.water       : daily goal in ml (falls back to DEFAULT_WATER_GOAL_ML)
 *   state.settings.weekStart: 0 = Sunday ... 6 = Saturday (default 1 = Monday)
 */

export const DEFAULT_WATER_GOAL_ML = 2500;

/* ---------- Date helpers ---------- */

/** Local date as 'YYYY-MM-DD' (avoids the UTC shift of toISOString). */
export function toDateKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Date keys for the 7 days of the week containing `now`, shifted by `weekOffset` weeks (0 = this, -1 = last). */
export function getWeekKeys(weekOffset = 0, weekStart = 1, now = new Date()) {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysBack = (start.getDay() - weekStart + 7) % 7;
  start.setDate(start.getDate() - daysBack + weekOffset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return toDateKey(d);
  });
}

/* ---------- Calculations (pure) ---------- */

/**
 * Sessions completed this week vs last week.
 * @returns {{thisWeek:number,lastWeek:number,diff:number,trend:'up'|'down'|'same'}}
 */
export function getWeeklySessionStats(sessions = [], weekStart = 1, now = new Date()) {
  const count = (offset) => {
    const keys = new Set(getWeekKeys(offset, weekStart, now));
    return sessions.filter((s) => keys.has(s.date)).length;
  };
  const thisWeek = count(0);
  const lastWeek = count(-1);
  const diff = thisWeek - lastWeek;
  return { thisWeek, lastWeek, diff, trend: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same' };
}

/**
 * Today's water total against the daily goal.
 * @returns {{total:number,goal:number,percent:number,reached:boolean}}
 *   `percent` is capped at 100 so it can drive a bar width directly.
 */
export function getWaterProgress(waterLog = [], goalMl = DEFAULT_WATER_GOAL_ML, now = new Date()) {
  const goal = Number(goalMl) > 0 ? Number(goalMl) : DEFAULT_WATER_GOAL_ML;
  const key = toDateKey(now);
  const total = waterLog.filter((w) => w.date === key).reduce((sum, w) => sum + (Number(w.amount) || 0), 0);
  return { total, goal, percent: Math.min(100, Math.round((total / goal) * 100)), reached: total >= goal };
}

/* ---------- Render helpers (return HTML strings) ---------- */

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtMl = (n) => `${Math.round(n).toLocaleString()} ml`;

/** Loading spinner. `label` is announced to screen readers. */
export function renderLoading(label = 'Loading…') {
  return `<div class="ds-state ds-loading" role="status" aria-live="polite">
    <span class="ds-spinner" aria-hidden="true"></span>
    <span class="ds-state-text">${escapeHtml(label)}</span>
  </div>`;
}

/** Empty state with a message and an optional call-to-action link. */
export function renderEmpty({ title, message, actionLabel, actionHref } = {}) {
  const action = actionLabel && actionHref
    ? `<a class="ds-action" href="${escapeHtml(actionHref)}">${escapeHtml(actionLabel)}</a>`
    : '';
  return `<div class="ds-state ds-empty">
    <strong class="ds-state-title">${escapeHtml(title || 'Nothing here yet')}</strong>
    <span class="ds-state-text">${escapeHtml(message || '')}</span>
    ${action}
  </div>`;
}

/** Card comparing this week's sessions with last week's. */
export function renderWeeklySessions(sessions, weekStart = 1) {
  if (!sessions || sessions.length === 0) {
    return `<section class="ds-card" aria-label="Weekly sessions">
      <h3 class="ds-title">Sessions this week</h3>
      ${renderEmpty({
        title: 'No sessions logged yet',
        message: 'Complete a workout and your weekly comparison will show up here.',
        actionLabel: 'Start a workout',
        actionHref: 'gym-sessions.html',
      })}
    </section>`;
  }
  const { thisWeek, lastWeek, diff, trend } = getWeeklySessionStats(sessions, weekStart);
  const arrow = { up: '▲', down: '▼', same: '–' }[trend];
  const note = trend === 'same'
    ? 'Same as last week'
    : `${Math.abs(diff)} ${trend === 'up' ? 'more' : 'fewer'} than last week`;
  return `<section class="ds-card" aria-label="Weekly sessions">
    <h3 class="ds-title">Sessions this week</h3>
    <div class="ds-big">${thisWeek}<span class="ds-unit">${thisWeek === 1 ? 'session' : 'sessions'}</span></div>
    <p class="ds-trend ds-trend-${trend}"><span aria-hidden="true">${arrow}</span> ${note}</p>
    <p class="ds-sub">Last week: ${lastWeek}</p>
  </section>`;
}

/** Card with a progress bar of today's water against the goal. */
export function renderWaterProgress(waterLog, goalMl = DEFAULT_WATER_GOAL_ML) {
  const { total, goal, percent, reached } = getWaterProgress(waterLog, goalMl);
  if (total === 0) {
    return `<section class="ds-card" aria-label="Water intake">
      <h3 class="ds-title">Water today</h3>
      ${renderEmpty({
        title: 'No water logged today',
        message: `Your goal is ${fmtMl(goal)}. Log a glass to start.`,
        actionLabel: 'Add water',
        actionHref: 'water.html',
      })}
    </section>`;
  }
  return `<section class="ds-card" aria-label="Water intake">
    <h3 class="ds-title">Water today</h3>
    <div class="ds-big">${fmtMl(total)}<span class="ds-unit">of ${fmtMl(goal)}</span></div>
    <div class="ds-progress${reached ? ' is-complete' : ''}" role="progressbar"
         aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"
         aria-label="Water intake: ${percent}% of daily goal">
      <div class="ds-progress-fill" style="width:${percent}%"></div>
    </div>
    <p class="ds-sub">${reached ? 'Goal reached 🎉' : `${percent}% · ${fmtMl(goal - total)} to go`}</p>
  </section>`;
}

/* ---------- Mounting ---------- */

/**
 * Render both stat cards into `container`.
 * `source` is either a state object ({sessions, water, goals, settings}) or an
 * async function returning one (shows the spinner while it loads, and an error
 * state if it rejects).
 *
 * Example (in app.js):
 *   import { mountDashboardStats } from './dashboard-stats.js';
 *   mountDashboardStats(document.getElementById('dashboard-stats'), () => state);
 */
export async function mountDashboardStats(container, source) {
  if (!container) return;
  container.classList.add('ds-grid');
  container.setAttribute('aria-busy', 'true');
  container.innerHTML = renderLoading('Loading your stats…');
  try {
    const data = typeof source === 'function' ? await source() : source;
    container.innerHTML =
      renderWeeklySessions(data?.sessions ?? [], data?.settings?.weekStart ?? 1) +
      renderWaterProgress(data?.water ?? [], data?.goals?.water ?? DEFAULT_WATER_GOAL_ML);
  } catch (err) {
    container.innerHTML = renderEmpty({
      title: 'Could not load stats',
      message: 'Something went wrong while reading your data. Please refresh and try again.',
    });
    console.error('[dashboard-stats]', err);
  } finally {
    container.removeAttribute('aria-busy');
  }
}
