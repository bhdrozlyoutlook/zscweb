'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

const EMPTY: Omit<GalleryItem, 'id'> = { src: '', alt: '', category: 'Etkinlikler', date: '', description: '' };
const DEFAULT_CATEGORIES = ['Etkinlikler', 'Konuşmalar', 'Sivil Toplum', 'Medya'];

export default function AdminGaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: GalleryItem | null }>({ open: false, editing: null });
  const [form, setForm] = useState<Omit<GalleryItem, 'id'>>(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch('/api/galeri');
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() { setForm(EMPTY); setModal({ open: true, editing: null }); }
  function openEdit(item: GalleryItem) {
    setForm({ src: item.src, alt: item.alt, category: item.category, date: item.date ?? '', description: item.description ?? '' });
    setModal({ open: true, editing: item });
  }
  function closeModal() { setModal({ open: false, editing: null }); }
  function set(field: string, value: string) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function handleSave() {
    setSaving(true);
    if (modal.editing) {
      const res = await fetch(`/api/galeri/${modal.editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      if (res.ok) { await load(); closeModal(); }
    } else {
      const res = await fetch('/api/galeri', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      if (res.ok) { await load(); closeModal(); }
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu fotoğrafı silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/galeri/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Galeri</h1>
            <p className="text-sm text-gray-600 mt-1">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                {items.length} fotoğraf
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
            Fotoğraf Ekle
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
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 font-medium mb-4">Henüz fotoğraf yok</p>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
            >
              İlk Fotoğrafı Ekle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm group">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => openEdit(item)}
                      className="px-3 py-2 rounded-lg text-xs font-bold text-white transition-colors"
                      style={{ backgroundColor: '#1d4ed8' }}
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-2 rounded-lg text-xs font-bold text-white transition-colors"
                      style={{ backgroundColor: '#dc2626' }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-xs font-bold text-gray-900 truncate">{item.alt}</p>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-gray-900 px-6 py-5 flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {modal.editing ? 'Fotoğrafı Düzenle' : 'Fotoğraf Ekle'}
              </h2>
              <button onClick={closeModal} className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-6 space-y-4">
              <ImageUpload
                label="Görsel *"
                value={form.src}
                onChange={(url) => set('src', url)}
                folder="galeri"
                aspect="aspect-square"
              />
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Alt Metin <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.alt}
                  onChange={(e) => set('alt', e.target.value)}
                  placeholder="Fotoğraf açıklaması"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Kategori</label>
                <input
                  type="text"
                  list="galeri-categories"
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  placeholder="Örn. Etkinlikler"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                />
                <datalist id="galeri-categories">
                  {[...new Set([...DEFAULT_CATEGORIES, ...items.map((i) => i.category)])].map((c) => <option key={c} value={c} />)}
                </datalist>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Tarih</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => set('date', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Açıklama</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Kısa açıklama"
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
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
                disabled={saving || !form.src || !form.alt}
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
