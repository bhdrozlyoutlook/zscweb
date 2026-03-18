'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function YeniBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    image: '',
    readTime: '5 dk',
  });

  function handleTitleChange(title: string) {
    setForm((prev) => ({ ...prev, title, slug: slugify(title) }));
  }

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/admin/blog');
    } else {
      alert('Kaydedilemedi. Tekrar deneyin.');
      setSaving(false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="text-gray-400 hover:text-gray-900 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Yeni Blog Yazısı</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
              placeholder="Yazı başlığı"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-mono text-sm"
              placeholder="url-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Özet *</label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 resize-none"
              placeholder="Kısa özet..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">İçerik (HTML) *</label>
            <textarea
              required
              rows={12}
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 resize-y font-mono text-sm"
              placeholder="<p>Yazı içeriği...</p>"
            />
            <p className="text-xs text-gray-400 mt-1">HTML formatında yazın. Paragraflar için &lt;p&gt;, başlıklar için &lt;h2&gt; kullanın.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tarih *</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
                placeholder="Vizyon, Ekonomi, ..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Görsel Yolu</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => set('image', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
                placeholder="/images/blog/blog-4.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Okuma Süresi</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => set('readTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
                placeholder="5 dk"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {saving ? 'Kaydediliyor...' : 'Yayınla'}
          </button>
          <Link href="/admin/blog" className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors">
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
