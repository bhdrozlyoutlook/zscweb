'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { HeroSlide } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

const EMPTY: Omit<HeroSlide, 'id'> = {
  title: '',
  subtitle: '',
  description: '',
  image: '',
  buttonText: '',
  buttonLink: '',
  order: 0,
  visible: true,
};

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: HeroSlide | null }>({ open: false, editing: null });
  const [form, setForm] = useState<Omit<HeroSlide, 'id'>>(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch('/api/hero');
    const data = await res.json();
    setSlides(data.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setForm({ ...EMPTY, order: slides.length });
    setModal({ open: true, editing: null });
  }

  function openEdit(slide: HeroSlide) {
    setForm({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image,
      buttonText: slide.buttonText ?? '',
      buttonLink: slide.buttonLink ?? '',
      order: slide.order,
      visible: slide.visible,
    });
    setModal({ open: true, editing: slide });
  }

  function closeModal() { setModal({ open: false, editing: null }); }
  function set(field: string, value: string | boolean) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function handleSave() {
    if (!form.title || !form.image) return;
    setSaving(true);
    if (modal.editing) {
      const res = await fetch(`/api/hero/${modal.editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { await load(); closeModal(); }
    } else {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { await load(); closeModal(); }
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu slaytı silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/hero/${id}`, { method: 'DELETE' });
    setSlides((prev) => prev.filter((s) => s.id !== id));
  }

  async function toggleVisibility(slide: HeroSlide) {
    await fetch(`/api/hero/${slide.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: !slide.visible }),
    });
    setSlides((prev) => prev.map((s) => s.id === slide.id ? { ...s, visible: !s.visible } : s));
  }

  async function moveSlide(index: number, direction: 'up' | 'down') {
    const newSlides = [...slides];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newSlides.length) return;

    const tempOrder = newSlides[index].order;
    newSlides[index].order = newSlides[swapIndex].order;
    newSlides[swapIndex].order = tempOrder;

    await Promise.all([
      fetch(`/api/hero/${newSlides[index].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newSlides[index].order }),
      }),
      fetch(`/api/hero/${newSlides[swapIndex].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newSlides[swapIndex].order }),
      }),
    ]);

    newSlides.sort((a, b) => a.order - b.order);
    setSlides(newSlides);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Hero Slider</h1>
            <p className="text-sm text-gray-600 mt-1">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                {slides.filter((s) => s.visible).length} aktif / {slides.length} toplam slayt
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
            Slayt Ekle
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mb-4">Henüz slayt eklenmemiş</p>
            <button onClick={openNew} className="text-blue-600 font-medium hover:underline">
              İlk slaytı ekle
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                style={{ opacity: slide.visible ? 1 : 0.5 }}
              >
                <div className="flex items-stretch">
                  {/* Image Preview */}
                  <div className="w-48 h-32 relative shrink-0 bg-gray-200">
                    {slide.image && (
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div
                      className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold"
                      style={{
                        backgroundColor: slide.visible ? '#059669' : '#6b7280',
                        color: '#ffffff',
                      }}
                    >
                      {slide.visible ? 'Aktif' : 'Gizli'}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4 flex items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-lg font-bold text-gray-300">#{index + 1}</span>
                        <h3 className="text-lg font-bold text-gray-900">{slide.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{slide.subtitle}</p>
                      <p className="text-sm text-gray-600 line-clamp-1">{slide.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      {/* Move Up */}
                      <button
                        onClick={() => moveSlide(index, 'up')}
                        disabled={index === 0}
                        className="p-2 rounded-lg disabled:opacity-30"
                        style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      {/* Move Down */}
                      <button
                        onClick={() => moveSlide(index, 'down')}
                        disabled={index === slides.length - 1}
                        className="p-2 rounded-lg disabled:opacity-30"
                        style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {/* Toggle Visibility */}
                      <button
                        onClick={() => toggleVisibility(slide)}
                        className="px-3 py-2 rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: slide.visible ? '#d97706' : '#059669',
                          color: '#ffffff',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {slide.visible ? 'Gizle' : 'Göster'}
                      </button>
                      {/* Edit */}
                      <button
                        onClick={() => openEdit(slide)}
                        className="px-3 py-2 rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: '#1d4ed8',
                          color: '#ffffff',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Düzenle
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(slide.id)}
                        className="px-3 py-2 rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: '#dc2626',
                          color: '#ffffff',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="px-8 py-5 flex items-center justify-between" style={{ backgroundColor: '#111827' }}>
              <h2 className="text-lg font-bold text-white">
                {modal.editing ? 'Slayt Düzenle' : 'Yeni Slayt Ekle'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-5">
              <ImageUpload
                label="Görsel *"
                value={form.image}
                onChange={(url) => set('image', url)}
                folder="hero"
                aspect="aspect-video"
              />

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Başlık *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Zeki Sertan Çelik"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Alt Başlık</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => set('subtitle', e.target.value)}
                  placeholder="İş İnsanı • Siyasetçi • Sivil Toplum"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Açıklama</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={3}
                  placeholder="Kısa bir açıklama..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Button Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Buton Yazısı</label>
                  <input
                    type="text"
                    value={form.buttonText}
                    onChange={(e) => set('buttonText', e.target.value)}
                    placeholder="Hakkımda"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Buton Linki</label>
                  <input
                    type="text"
                    value={form.buttonLink}
                    onChange={(e) => set('buttonLink', e.target.value)}
                    placeholder="/hakkimda"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: '#f3f4f6', color: '#374151', border: 'none', cursor: 'pointer' }}
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.image}
                className="px-6 py-3 rounded-xl text-sm font-bold disabled:opacity-50"
                style={{ backgroundColor: '#111827', color: '#ffffff', border: 'none', cursor: 'pointer' }}
              >
                {saving ? 'Kaydediliyor...' : modal.editing ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
