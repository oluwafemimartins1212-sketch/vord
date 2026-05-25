'use client';

import { useState } from 'react';

export default function SuggestPage() {
  const [form, setForm] = useState({ name: '', contact: '', topic: '', language: 'English', description: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus({ type: 'success', message: 'Suggestion submitted! Thank you.' });
      setForm({ name: '', contact: '', topic: '', language: 'English', description: '' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-4">Suggest a Feature</h1>
        <p className="text-center text-gray-400 mb-8">Have an idea to improve Vord Wa Bot? We'd love to hear it!</p>
        <form onSubmit={handleSubmit} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input type="tel" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Suggestion Topic *</label>
            <input type="text" required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Language</label>
            <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700">
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
              <option>Arabic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Detailed Description *</label>
            <textarea rows={4} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700"></textarea>
          </div>
          {status.type && <div className={`p-3 rounded-lg ${status.type === 'success' ? 'bg-green-900/50 border-green-700 text-green-200' : 'bg-red-900/50 border-red-700 text-red-200'}`}>{status.message}</div>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 rounded-lg font-semibold transition">Submit Suggestion</button>
        </form>
      </div>
    </main>
  );
}