'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const CTA_EVENT_MAP: Record<string, string> = {
  'try-free-practice': 'click_try_15_questions',
  'start-free-practice': 'start_free_practice',
  'download-free-app': 'click_download_app',
  'app-store': 'click_app_store',
  'us-landing-page': 'click_us_landing_page',
  'canada-llqp-landing-page': 'click_canada_llqp_landing_page',
  'hero-question-preview': 'click_hero_question_preview',
  'hero-latest-commentary': 'click_hero_latest_commentary',
  'hero-app-update-preview': 'click_hero_app_update_preview',
  'hero-tough-topic': 'click_hero_tough_topic'
};

export default function AnalyticsClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest<HTMLElement>('[data-cta]');
      if (!element) return;

      const cta = element.dataset.cta;
      if (!cta) return;

      const eventName = CTA_EVENT_MAP[cta];
      if (!eventName) return;

      trackEvent(eventName, {
        cta,
        tile_label: element.dataset.tileLabel,
        source: element.dataset.location ?? window.location.pathname,
        source_page: element.dataset.location ?? window.location.pathname,
        campaign: element.dataset.campaign,
        destination: element instanceof HTMLAnchorElement ? element.href : undefined
      });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
