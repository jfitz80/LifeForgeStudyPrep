'use client';

import { useState } from 'react';

type Source = {
  id: string;
  name: string;
  feedUrl: string;
  isActive: boolean;
  requiresReview: boolean;
  priority: number;
};

export default function AdminSourcesTable({ items }: { items: Source[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function update(id: string, payload: Partial<Source>) {
    setLoadingId(id);
    await fetch(`/api/admin/news/sources/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    window.location.reload();
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Settings</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((source) => (
            <tr key={source.id} className="border-t border-slate-100 align-top">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{source.name}</p>
                <p className="break-all text-xs text-slate-500">{source.feedUrl}</p>
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                <p>Active: {source.isActive ? 'Yes' : 'No'}</p>
                <p>Manual review: {source.requiresReview ? 'On' : 'Off'}</p>
                <p>Priority: {source.priority}</p>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={loadingId === source.id}
                    onClick={() => update(source.id, { isActive: !source.isActive })}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
                  >
                    {source.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    disabled={loadingId === source.id}
                    onClick={() => update(source.id, { requiresReview: !source.requiresReview })}
                    className="rounded-md border border-brand-300 px-2 py-1 text-xs font-semibold text-brand-700"
                  >
                    {source.requiresReview ? 'Turn Review Off' : 'Turn Review On'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
