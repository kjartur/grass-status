// Har du klippet gresset? — status logic.
//
// Reads a single date (from a gist, falling back to the bundled status.txt),
// and works out "Ja." (mowed within the last 10 days) or "Nei." plus the
// day-count, entirely client-side, every time the page loads.

const GIST_RAW_URL = document.body.dataset.gistUrl || 'https://gist.githubusercontent.com/kjartur/2c77026c84788cb333b9a6bafedb0f8b/raw/0e8a852749da2d7382e13ee5847d24aa6b5d6890/grass-status';
const RECENT_THRESHOLD_DAYS = 10;

async function fetchDate(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Kunne ikke hente status: ' + res.status);
  return (await res.text()).trim();
}

async function loadDate() {
  const bust = '?t=' + Date.now();
  if (GIST_RAW_URL) {
    try {
      return await fetchDate(GIST_RAW_URL + bust);
    } catch (err) {
      console.warn('Fikk ikke hentet status fra gist, bruker lokal fallback.', err);
    }
  }
  return fetchDate('/status.txt' + bust);
}

function daysSince(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const last = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today - last) / 86400000);
}

async function renderStatus() {
  const wordEl = document.getElementById('status-word');
  const daysEl = document.getElementById('days-count');

  try {
    const dateStr = await loadDate();
    const days = daysSince(dateStr);
    const clampedDays = Math.max(days, 0);
    const cutRecently = days >= 0 && days <= RECENT_THRESHOLD_DAYS;

    wordEl.textContent = cutRecently ? 'Ja.' : 'Nei.';
    wordEl.dataset.state = cutRecently ? 'yes' : 'no';
    daysEl.textContent = String(clampedDays);
  } catch (err) {
    wordEl.textContent = '?';
    wordEl.dataset.state = 'error';
    daysEl.textContent = '–';
    console.error(err);
  }
}

renderStatus();
