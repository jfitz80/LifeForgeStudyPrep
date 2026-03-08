'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <main className="mx-auto max-w-3xl px-4 py-20 text-slate-900">
          <h1 className="text-2xl font-bold">Unexpected application error</h1>
          <p className="mt-3 text-slate-600">Please refresh or try again.</p>
          <button
            onClick={reset}
            className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Try again
          </button>
          <pre className="mt-6 overflow-x-auto rounded-lg bg-slate-100 p-3 text-xs text-slate-700">{error.message}</pre>
        </main>
      </body>
    </html>
  );
}
