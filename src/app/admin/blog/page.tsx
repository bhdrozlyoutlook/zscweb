'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/types';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    const res = await fetch('/api/blog');
    setPosts(await res.json());
    setLoading(false);
  }

  useEffect(() => { loadPosts(); }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" yazısını silmek istediğinize emin misiniz?`)) return;
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Blog Yazıları</h1>
            <p className="text-sm text-gray-600 mt-1">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                {posts.length} yazı
              </span>
            </p>
          </div>
          <Link
            href="/admin/blog/yeni"
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-700 active:scale-95 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Yazı
          </Link>
        </div>
      </div>

      <div className="px-8 py-6">
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 py-20 flex items-center justify-center gap-3 text-gray-500">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm font-medium">Yükleniyor...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 py-20 text-center">
            <p className="text-gray-500 font-medium mb-4">Henüz blog yazısı yok</p>
            <Link
              href="/admin/blog/yeni"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
            >
              İlk Yazıyı Ekle
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Tablo başlığı */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-6 py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider">
              <span>Başlık</span>
              <span className="hidden md:block">Kategori</span>
              <span className="hidden md:block">Tarih</span>
              <span>İşlemler</span>
            </div>

            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <div key={post.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{post.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{post.excerpt}</p>
                  </div>

                  <div className="hidden md:block">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <span className="hidden md:block text-xs font-medium text-gray-500">{post.date}</span>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-colors"
                      style={{ backgroundColor: '#374151' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="hidden lg:inline">Görüntüle</span>
                    </a>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-colors"
                      style={{ backgroundColor: '#1d4ed8' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-colors"
                      style={{ backgroundColor: '#dc2626' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
