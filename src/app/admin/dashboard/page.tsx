'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BlogPost, GalleryItem, PressItem } from '@/types';
import type { ContactMessage } from '@/lib/data';

const STAT_STYLES = [
  { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  { bg: '#faf5ff', color: '#7e22ce', dot: '#a855f7' },
  { bg: '#fff7ed', color: '#c2410c', dot: '#f97316' },
];

export default function DashboardPage() {
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [press, setPress] = useState<PressItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/blog').then((r) => r.json()),
      fetch('/api/galeri').then((r) => r.json()),
      fetch('/api/basin').then((r) => r.json()),
      fetch('/api/mesajlar').then((r) => r.json()),
    ]).then(([b, g, p, m]) => {
      setBlog(b);
      setGallery(g);
      setPress(p);
      setMessages(m);
    });
  }, []);

  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { label: 'Blog Yazısı', value: blog.length, href: '/admin/blog', btnLabel: 'Yönet →' },
    { label: 'Galeri Fotoğrafı', value: gallery.length, href: '/admin/galeri', btnLabel: 'Yönet →' },
    { label: 'Basın Haberi', value: press.length, href: '/admin/basin', btnLabel: 'Yönet →' },
    { label: 'Okunmamış Mesaj', value: unread, href: '/admin/mesajlar', btnLabel: 'Görüntüle →' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Sitenizin genel durumu</p>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const style = STAT_STYLES[i];
            return (
              <Link
                key={s.label}
                href={s.href}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-semibold text-gray-500 mb-2">{s.label}</p>
                <p className="text-4xl font-black text-gray-900 mb-3">{s.value}</p>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: style.bg, color: style.color }}
                >
                  {s.btnLabel}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Son Blog Yazıları */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-900">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Son Blog Yazıları</h2>
              <Link
                href="/admin/blog"
                className="text-xs font-bold text-gray-400 hover:text-white transition-colors"
              >
                Tümü →
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {blog.slice(0, 4).map((post) => (
                <div key={post.id} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{post.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{post.category} · {post.date}</p>
                  </div>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="ml-4 flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-colors"
                    style={{ backgroundColor: '#1d4ed8' }}
                  >
                    Düzenle
                  </Link>
                </div>
              ))}
              {blog.length === 0 && (
                <p className="px-6 py-8 text-sm text-gray-400 text-center">Henüz yazı yok</p>
              )}
            </div>
          </div>

          {/* Son Mesajlar */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-900">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Son Mesajlar
                {unread > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: '#f97316', color: '#fff' }}>
                    {unread}
                  </span>
                )}
              </h2>
              <Link
                href="/admin/mesajlar"
                className="text-xs font-bold text-gray-400 hover:text-white transition-colors"
              >
                Tümü →
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {messages.slice(0, 4).map((msg) => (
                <div key={msg.id} className="flex items-start justify-between px-6 py-3 hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />}
                      <p className={`text-sm truncate ${msg.read ? 'text-gray-600' : 'font-bold text-gray-900'}`}>
                        {msg.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{msg.subject}</p>
                  </div>
                  <p className="ml-4 text-xs text-gray-400 flex-shrink-0">
                    {new Date(msg.date).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="px-6 py-8 text-sm text-gray-400 text-center">Henüz mesaj yok</p>
              )}
            </div>
          </div>
        </div>

        {/* Hızlı Erişim */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gray-900">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Hızlı Erişim</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
            {[
              { label: 'Yeni Blog Yazısı', href: '/admin/blog/yeni', color: '#1d4ed8' },
              { label: 'Galeri Yönet', href: '/admin/galeri', color: '#15803d' },
              { label: 'Menü Yönet', href: '/admin/menu', color: '#7e22ce' },
              { label: 'Sosyal Medya', href: '/admin/sosyal', color: '#c2410c' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-2 py-6 hover:bg-gray-50 transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-bold text-gray-900 text-center px-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
