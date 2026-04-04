export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    va?: {
      track?: (name: string, payload?: AnalyticsPayload) => void;
    };
  }
}

export function trackEvent(name: string, payload?: AnalyticsPayload) {
  if (typeof window === 'undefined') return;
  window.va?.track?.(name, payload);
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', name, payload ?? {});
  }
}
