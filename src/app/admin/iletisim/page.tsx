'use client';

import { useEffect, useState } from 'react';
import type { ContactPage } from '@/types';

export default function AdminIletisimPage() {
  const [form, setForm] = useState<ContactPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/contact-page');
      setForm(await res.json());
      setLoading(false);
    })();
  }, []);

  function set<K extends keyof ContactPage>(key: K, value: ContactPage[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateSubject(idx: number, field: 'value' | 'label', value: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...prev.subjects];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, subjects: list };
    });
  }

  function addSubject() {
    setForm((prev) => (prev ? { ...prev, subjects: [...prev.subjects, { value: '', label: '' }] } : prev));
  }

  function removeSubject(idx: number) {
    setForm((prev) => (prev ? { ...prev, subjects: prev.subjects.filter((_, i) => i !== idx) } : prev));
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/contact-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setError(data.error || `Kayıt başarısız (HTTP ${res.status})`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ağ hatası');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  const inputCls = 'w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-gray-900 focus:outline-none transition-colors';
  const labelCls = 'block text-sm font-bold text-gray-700 mb-2';
  const sectionCls = 'bg-white rounded-xl border border-gray-200 p-6 space-y-4';
  const sectionHeading = 'text-lg font-bold text-gray-900 border-b border-gray-200 pb-3 mb-2';
  const addBtn = 'text-xs font-bold text-blue-600 hover:underline';
  const delBtn = 'px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-bold';

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">İletişim Sayfası</h1>
            <p className="text-sm text-gray-600 mt-1">Tüm alanları buradan düzenleyin</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-green-600 font-semibold">Kaydedildi ✓</span>}
            {error && <span className="text-sm text-red-600 font-semibold max-w-md truncate" title={error}>Hata: {error}</span>}
            <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-700 active:scale-95 transition-all shadow-lg disabled:opacity-50">
              {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6 max-w-5xl mx-auto">
        {/* Hero */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Hero</h2>
          <div><label className={labelCls}>Üst Etiket</label><input className={inputCls} value={form.heroLabel} onChange={(e) => set('heroLabel', e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Başlık 1. Satır</label><input className={inputCls} value={form.heroTitleLine1} onChange={(e) => set('heroTitleLine1', e.target.value)} /></div>
            <div><label className={labelCls}>Başlık 2. Satır (gri)</label><input className={inputCls} value={form.heroTitleLine2} onChange={(e) => set('heroTitleLine2', e.target.value)} /></div>
          </div>
          <div><label className={labelCls}>Alt Başlık</label><textarea className={inputCls} rows={3} value={form.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} /></div>
        </div>

        {/* Form */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>İletişim Formu</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.formLabel} onChange={(e) => set('formLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><input className={inputCls} value={form.formTitle} onChange={(e) => set('formTitle', e.target.value)} /></div>
          <div><label className={labelCls}>Gönder Butonu</label><input className={inputCls} value={form.submitText} onChange={(e) => set('submitText', e.target.value)} /></div>
          <div><label className={labelCls}>Başarı Mesajı</label><textarea className={inputCls} rows={2} value={form.successMessage} onChange={(e) => set('successMessage', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Konu Seçenekleri</label><button onClick={addSubject} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-2">
              {form.subjects.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} placeholder="Değer (İng.)" value={s.value} onChange={(e) => updateSubject(i, 'value', e.target.value)} />
                  <input className={inputCls} placeholder="Etiket" value={s.label} onChange={(e) => updateSubject(i, 'label', e.target.value)} />
                  <button onClick={() => removeSubject(i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>İletişim Bilgileri</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.infoLabel} onChange={(e) => set('infoLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><input className={inputCls} value={form.infoTitle} onChange={(e) => set('infoTitle', e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>E-posta Etiketi</label><input className={inputCls} value={form.emailLabel} onChange={(e) => set('emailLabel', e.target.value)} /></div>
            <div><label className={labelCls}>E-posta Adresi</label><input type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Telefon Etiketi</label><input className={inputCls} value={form.phoneLabel} onChange={(e) => set('phoneLabel', e.target.value)} /></div>
            <div><label className={labelCls}>Telefon Numarası</label><input type="tel" className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Konum Etiketi</label><input className={inputCls} value={form.locationLabel} onChange={(e) => set('locationLabel', e.target.value)} /></div>
            <div><label className={labelCls}>Konum</label><input className={inputCls} value={form.location} onChange={(e) => set('location', e.target.value)} /></div>
          </div>
          <div><label className={labelCls}>Sosyal Medya Etiketi</label><input className={inputCls} value={form.socialLabel} onChange={(e) => set('socialLabel', e.target.value)} /></div>
          <p className="text-xs text-gray-500 italic">Not: Sosyal medya linkleri "Sosyal Medya" sekmesinden yönetilmektedir.</p>
        </div>

        {/* Quote */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Alt Alıntı</h2>
          <div><label className={labelCls}>Alıntı Metni</label><input className={inputCls} value={form.quoteText} onChange={(e) => set('quoteText', e.target.value)} /></div>
          <div><label className={labelCls}>Vurgu (gri)</label><input className={inputCls} value={form.quoteHighlight} onChange={(e) => set('quoteHighlight', e.target.value)} /></div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-gray-700 active:scale-95 transition-all shadow-lg disabled:opacity-50">
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
