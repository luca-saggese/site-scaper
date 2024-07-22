export function sendGoogleAnalyticsRequest({ cid, action }: { cid: string; action: 'login' | 'signup' }) {
  return fetch('https://www.google-analytics.com/collect', {
    method: 'POST',
    cache: 'no-cache',
    body: `v=1&t=event&tid=UA-175264857-1&cid=${cid}&ec=app&ea=${action}`,
  });
}
