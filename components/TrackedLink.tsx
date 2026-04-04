'use client';

import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName?: string;
  eventPayload?: Record<string, string | number | boolean | null | undefined>;
  children: ReactNode;
};

export default function TrackedLink({ eventName, eventPayload, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        if (eventName) {
          trackEvent(eventName, eventPayload);
        }
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
