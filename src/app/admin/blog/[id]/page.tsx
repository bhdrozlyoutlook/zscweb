'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import type { BlogPost } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch('/api/blog').then((r) => r.json()).then((posts: BlogPost[]) => {
      const post = posts.find((p) => p.id === id);
      if (post) setForm(post);
      setLoading(false);
    });
  }, [id]);

  function set(field: keyof BlogPost, value: string) {
    setForm((prev) => prev ? { ...prev, [field]: value } : prev);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    const res = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
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

  if (loading) return <div className="p-8 text-gray-400">Yükleniyor...</div>;
  if (!form) return <div className="p-8 text-gray-400">Yazı bulunamadı.</div>;

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="text-gray-400 hover:text-gray-900 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Yazıyı Düzenle</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-mono text-sm"
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
            />
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
              />
            </div>
            <ImageUpload
              label="Görsel"
              value={form.image ?? ''}
              onChange={(url) => set('image', url)}
              folder="blog"
              aspect="aspect-video"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Okuma Süresi</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => set('readTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
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
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <Link href={`/blog/${form.slug}`} target="_blank" className="px-6 py-3 text-gray-500 hover:text-gray-900 transition-colors text-sm">
            Önizleme →
          </Link>
          <Link href="/admin/blog" className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors">
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
