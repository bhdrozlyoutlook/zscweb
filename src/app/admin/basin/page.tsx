'use client';

import { useEffect, useState } from 'react';
import type { PressItem } from '@/types';

const EMPTY: Omit<PressItem, 'id'> = { title: '', source: '', date: '', excerpt: '', link: '', image: '' };

export default function AdminBasinPage() {
  const [items, setItems] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: PressItem | null }>({ open: false, editing: null });
  const [form, setForm] = useState<Omit<PressItem, 'id'>>(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch('/api/basin');
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() { setForm(EMPTY); setModal({ open: true, editing: null }); }
  function openEdit(item: PressItem) {
    setForm({ title: item.title, source: item.source, date: item.date, excerpt: item.excerpt, link: item.link, image: item.image ?? '' });
    setModal({ open: true, editing: item });
  }
  function closeModal() { setModal({ open: false, editing: null }); }
  function set(field: string, value: string) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function handleSave() {
    setSaving(true);
    if (modal.editing) {
      const res = await fetch(`/api/basin/${modal.editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      if (res.ok) { await load(); closeModal(); }
    } else {
      const res = await fetch('/api/basin', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      if (res.ok) { await load(); closeModal(); }
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu haberi silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/basin/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Basın</h1>
            <p className="text-sm text-gray-600 mt-1">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                {items.length} haber
              </span>
            </p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-700 active:scale-95 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Haber Ekle
          </button>
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
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 py-20 text-center">
            <p className="text-gray-500 font-medium mb-4">Henüz basın haberi yok</p>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
            >
              İlk Haberi Ekle
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Tablo başlığı */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-6 py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider">
              <span>Başlık</span>
              <span className="hidden md:block">Kaynak</span>
              <span className="hidden md:block">Tarih</span>
              <span>İşlemler</span>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.excerpt}</p>
                  </div>

                  <div className="hidden md:block">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                    >
                      {item.source}
                    </span>
                  </div>

                  <span className="hidden md:block text-xs font-medium text-gray-500">{item.date}</span>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.link && item.link !== '#' && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-colors"
                        style={{ backgroundColor: '#374151' }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="hidden lg:inline">Aç</span>
                      </a>
                    )}
                    <button
                      onClick={() => openEdit(item)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-colors"
                      style={{ backgroundColor: '#1d4ed8' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-gray-900 px-6 py-5 flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {modal.editing ? 'Haberi Düzenle' : 'Haber Ekle'}
              </h2>
              <button onClick={closeModal} className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Başlık <span className="text-red-500">*</span></label>
                <input
                  autoFocus
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Kaynak <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={form.source}
                    onChange={(e) => set('source', e.target.value)}
                    placeholder="Hürriyet, Milliyet..."
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Tarih <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => set('date', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Özet <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => set('excerpt', e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Link</label>
                <input
                  type="text"
                  value={form.link}
                  onChange={(e) => set('link', e.target.value)}
                  placeholder="https://..."
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Görsel Yolu</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => set('image', e.target.value)}
                  placeholder="/images/press/press-4.jpg"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={closeModal}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.source || !form.date}
                className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-700 active:scale-95 transition-all disabled:opacity-50"
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
