'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-slate-900">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-slate-600">Please try refreshing the page.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Try again
      </button>
    </main>
  );
}
