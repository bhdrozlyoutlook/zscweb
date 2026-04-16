'use client';

import { useEffect, useState } from 'react';
import type { BusinessPage } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

type ObjListKey = 'stats' | 'expertiseAreas' | 'sources' | 'traits';
type StrListKey = 'businessVision' | 'futureGoals';

export default function AdminIsDunyasiPage() {
  const [form, setForm] = useState<BusinessPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/business');
      setForm(await res.json());
      setLoading(false);
    })();
  }, []);

  function set<K extends keyof BusinessPage>(key: K, value: BusinessPage[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateObjItem(key: ObjListKey, idx: number, field: string, value: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown as Record<string, string>[])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, [key]: list } as BusinessPage;
    });
  }

  function addObjItem(key: ObjListKey, template: Record<string, string>) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.push(template);
      return { ...prev, [key]: list } as BusinessPage;
    });
  }

  function removeObjItem(key: ObjListKey, idx: number) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.splice(idx, 1);
      return { ...prev, [key]: list } as BusinessPage;
    });
  }

  function updateStrItem(key: StrListKey, idx: number, value: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...prev[key]];
      list[idx] = value;
      return { ...prev, [key]: list };
    });
  }

  function addStrItem(key: StrListKey) {
    setForm((prev) => (prev ? { ...prev, [key]: [...prev[key], ''] } : prev));
  }

  function removeStrItem(key: StrListKey, idx: number) {
    setForm((prev) => (prev ? { ...prev, [key]: prev[key].filter((_, i) => i !== idx) } : prev));
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/business', {
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

  const inputCls =
    'w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-gray-900 focus:outline-none transition-colors';
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
            <h1 className="text-2xl font-black text-gray-900">İş Dünyası Sayfası</h1>
            <p className="text-sm text-gray-600 mt-1">Tüm bölümleri buradan düzenleyin</p>
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
          <div>
            <label className={labelCls}>Üst Etiket</label>
            <input className={inputCls} value={form.heroLabel} onChange={(e) => set('heroLabel', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Başlık 1. Satır</label>
              <input className={inputCls} value={form.heroTitleLine1} onChange={(e) => set('heroTitleLine1', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Başlık 2. Satır (gri)</label>
              <input className={inputCls} value={form.heroTitleLine2} onChange={(e) => set('heroTitleLine2', e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Alt Başlık</label>
            <textarea className={inputCls} rows={3} value={form.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>İstatistikler</label>
              <button onClick={() => addObjItem('stats', { value: '', label: '' })} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.stats.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} placeholder="Değer" value={s.value} onChange={(e) => updateObjItem('stats', i, 'value', e.target.value)} />
                  <input className={inputCls} placeholder="Açıklama" value={s.label} onChange={(e) => updateObjItem('stats', i, 'label', e.target.value)} />
                  <button onClick={() => removeObjItem('stats', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Vizyon Alıntısı</h2>
          <div>
            <label className={labelCls}>Alıntı Metni</label>
            <input className={inputCls} value={form.quote1Text} onChange={(e) => set('quote1Text', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Vurgu (gri)</label>
            <input className={inputCls} value={form.quote1Highlight} onChange={(e) => set('quote1Highlight', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Alt Yazı</label>
            <input className={inputCls} value={form.quote1Footer} onChange={(e) => set('quote1Footer', e.target.value)} />
          </div>
        </div>

        {/* About */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>İş Dünyasına Bakışım</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.aboutLabel} onChange={(e) => set('aboutLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <textarea className={inputCls} rows={2} value={form.aboutTitle} onChange={(e) => set('aboutTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Açıklama</label>
            <textarea className={inputCls} rows={3} value={form.aboutDescription} onChange={(e) => set('aboutDescription', e.target.value)} />
          </div>
          <ImageUpload label="Görsel" value={form.aboutImage} onChange={(url) => set('aboutImage', url)} folder="is-dunyasi/about" aspect="aspect-[4/3]" />
          <div>
            <label className={labelCls}>Vizyon Kutusu Etiketi</label>
            <input className={inputCls} value={form.visionBoxLabel} onChange={(e) => set('visionBoxLabel', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Vizyon Maddeleri</label>
              <button onClick={() => addStrItem('businessVision')} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.businessVision.map((v, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={v} onChange={(e) => updateStrItem('businessVision', i, e.target.value)} />
                  <button onClick={() => removeStrItem('businessVision', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Global Vizyon</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.globalLabel} onChange={(e) => set('globalLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <textarea className={inputCls} rows={3} value={form.globalTitle} onChange={(e) => set('globalTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Açıklama</label>
            <textarea className={inputCls} rows={3} value={form.globalDescription} onChange={(e) => set('globalDescription', e.target.value)} />
          </div>
          <ImageUpload label="Görsel" value={form.globalImage} onChange={(url) => set('globalImage', url)} folder="is-dunyasi/global" aspect="aspect-square" />
          <div>
            <label className={labelCls}>Görsel Yer Tutucu Yazısı</label>
            <input className={inputCls} value={form.globalImageCaption} onChange={(e) => set('globalImageCaption', e.target.value)} />
          </div>
        </div>

        {/* Expertise */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Uzmanlık Alanları</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.expertiseLabel} onChange={(e) => set('expertiseLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <textarea className={inputCls} rows={2} value={form.expertiseTitle} onChange={(e) => set('expertiseTitle', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Alanlar</label>
              <button onClick={() => addObjItem('expertiseAreas', { title: '', desc: '' })} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.expertiseAreas.map((a, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} placeholder="Başlık" value={a.title} onChange={(e) => updateObjItem('expertiseAreas', i, 'title', e.target.value)} />
                  <input className={inputCls} placeholder="Açıklama" value={a.desc} onChange={(e) => updateObjItem('expertiseAreas', i, 'desc', e.target.value)} />
                  <button onClick={() => removeObjItem('expertiseAreas', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Alt Alıntı</label>
            <textarea className={inputCls} rows={2} value={form.expertiseQuote} onChange={(e) => set('expertiseQuote', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Alıntı Altı</label>
            <input className={inputCls} value={form.expertiseQuoteFooter} onChange={(e) => set('expertiseQuoteFooter', e.target.value)} />
          </div>
        </div>

        {/* Sources */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Besleyen Kaynaklar</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.sourcesLabel} onChange={(e) => set('sourcesLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <input className={inputCls} value={form.sourcesTitle} onChange={(e) => set('sourcesTitle', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Kaynaklar</label>
              <button onClick={() => addObjItem('sources', { title: '', desc: '' })} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-3">
              {form.sources.map((s, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex gap-2">
                    <input className={inputCls} placeholder="Başlık" value={s.title} onChange={(e) => updateObjItem('sources', i, 'title', e.target.value)} />
                    <button onClick={() => removeObjItem('sources', i)} className={delBtn}>Sil</button>
                  </div>
                  <textarea className={inputCls} rows={3} placeholder="Açıklama" value={s.desc} onChange={(e) => updateObjItem('sources', i, 'desc', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Yarın İçin Vizyon</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.futureLabel} onChange={(e) => set('futureLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <textarea className={inputCls} rows={2} value={form.futureTitle} onChange={(e) => set('futureTitle', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Hedefler</label>
              <button onClick={() => addStrItem('futureGoals')} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.futureGoals.map((g, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={g} onChange={(e) => updateStrItem('futureGoals', i, e.target.value)} />
                  <button onClick={() => removeStrItem('futureGoals', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Alt Alıntı</label>
            <textarea className={inputCls} rows={2} value={form.futureQuote} onChange={(e) => set('futureQuote', e.target.value)} />
          </div>
          <ImageUpload label="Görsel" value={form.futureImage} onChange={(url) => set('futureImage', url)} folder="is-dunyasi/future" aspect="aspect-square" />
          <div>
            <label className={labelCls}>Görsel Yer Tutucu Yazısı</label>
            <input className={inputCls} value={form.futureImageCaption} onChange={(e) => set('futureImageCaption', e.target.value)} />
          </div>
        </div>

        {/* Traits */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Karakter Özellikleri</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.traitsLabel} onChange={(e) => set('traitsLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <input className={inputCls} value={form.traitsTitle} onChange={(e) => set('traitsTitle', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Özellikler</label>
              <button onClick={() => addObjItem('traits', { title: '', desc: '' })} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.traits.map((t, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} placeholder="Başlık" value={t.title} onChange={(e) => updateObjItem('traits', i, 'title', e.target.value)} />
                  <input className={inputCls} placeholder="Açıklama" value={t.desc} onChange={(e) => updateObjItem('traits', i, 'desc', e.target.value)} />
                  <button onClick={() => removeObjItem('traits', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Kapanış</h2>
          <div>
            <label className={labelCls}>Alıntı</label>
            <textarea className={inputCls} rows={3} value={form.closingQuote} onChange={(e) => set('closingQuote', e.target.value)} />
          </div>
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
