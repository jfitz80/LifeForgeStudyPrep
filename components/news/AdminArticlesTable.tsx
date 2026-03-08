'use client';

import { useState } from 'react';

type Item = {
  id: string;
  title: string;
  status: string;
  isFeatured: boolean;
  source: { name: string };
  publishedAtLabel: string;
};

export default function AdminArticlesTable({ items }: { items: Item[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function update(id: string, payload: { status?: 'PENDING' | 'APPROVED' | 'REJECTED'; isFeatured?: boolean }) {
    setLoadingId(id);
    await fetch(`/api/admin/news/articles/${id}`, {
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
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-slate-100 align-top">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">{item.publishedAtLabel}</p>
              </td>
              <td className="px-4 py-3 text-slate-600">{item.source.name}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{item.status}</span>
                {item.isFeatured && <span className="ml-2 rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-800">Featured</span>}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={loadingId === item.id}
                    onClick={() => update(item.id, { status: 'APPROVED' })}
                    className="rounded-md border border-emerald-300 px-2 py-1 text-xs font-semibold text-emerald-700"
                  >
                    Approve
                  </button>
                  <button
                    disabled={loadingId === item.id}
                    onClick={() => update(item.id, { status: 'REJECTED' })}
                    className="rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700"
                  >
                    Reject
                  </button>
                  <button
                    disabled={loadingId === item.id}
                    onClick={() => update(item.id, { isFeatured: !item.isFeatured })}
                    className="rounded-md border border-brand-300 px-2 py-1 text-xs font-semibold text-brand-700"
                  >
                    {item.isFeatured ? 'Unpin' : 'Pin'}
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
