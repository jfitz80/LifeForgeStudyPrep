import { track } from '@vercel/analytics';

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: string, payload?: AnalyticsPayload) {
  if (typeof window === 'undefined') return;
  try {
    track(name, payload);
  } catch {}
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', name, payload ?? {});
  }
}
