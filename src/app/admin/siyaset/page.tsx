'use client';

import { useEffect, useState } from 'react';
import type { PoliticsPage } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

type ObjListKey = 'stats' | 'advisorRoles' | 'pillars';
type StrListKey = 'journeyParagraphs' | 'anahtarParagraphs' | 'partySpirit' | 'futureVision';

export default function AdminSiyasetPage() {
  const [form, setForm] = useState<PoliticsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/politics');
      setForm(await res.json());
      setLoading(false);
    })();
  }, []);

  function set<K extends keyof PoliticsPage>(key: K, value: PoliticsPage[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateObjItem(key: ObjListKey, idx: number, field: string, value: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown as Record<string, string>[])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, [key]: list } as PoliticsPage;
    });
  }

  function addObjItem(key: ObjListKey, template: Record<string, string>) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.push(template);
      return { ...prev, [key]: list } as PoliticsPage;
    });
  }

  function removeObjItem(key: ObjListKey, idx: number) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.splice(idx, 1);
      return { ...prev, [key]: list } as PoliticsPage;
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
      const res = await fetch('/api/politics', {
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Siyaset Sayfası</h1>
            <p className="text-sm text-gray-600 mt-1">Tüm bölümleri buradan düzenleyin</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-green-600 font-semibold">Kaydedildi ✓</span>}
            {error && <span className="text-sm text-red-600 font-semibold max-w-md truncate" title={error}>Hata: {error}</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-700 active:scale-95 transition-all shadow-lg disabled:opacity-50"
            >
              {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6 max-w-5xl mx-auto">
        {/* Hero */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Hero Bölümü</h2>
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

        {/* Quote 1 */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>İlk Alıntı</h2>
          <div>
            <label className={labelCls}>Alıntı Metni</label>
            <input className={inputCls} value={form.quote1Text} onChange={(e) => set('quote1Text', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Vurgu (gri renk)</label>
            <input className={inputCls} value={form.quote1Highlight} onChange={(e) => set('quote1Highlight', e.target.value)} />
          </div>
        </div>

        {/* Journey */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Yola Çıkış</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.journeyLabel} onChange={(e) => set('journeyLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <textarea className={inputCls} rows={2} value={form.journeyTitle} onChange={(e) => set('journeyTitle', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Paragraflar</label>
              <button onClick={() => addStrItem('journeyParagraphs')} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.journeyParagraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea className={inputCls} rows={3} value={p} onChange={(e) => updateStrItem('journeyParagraphs', i, e.target.value)} />
                  <button onClick={() => removeStrItem('journeyParagraphs', i)} className={delBtn + ' h-fit'}>Sil</button>
                </div>
              ))}
            </div>
          </div>
          <ImageUpload label="Saha Görseli" value={form.journeyImage} onChange={(url) => set('journeyImage', url)} folder="siyaset/journey" aspect="aspect-[4/3]" />
          <div>
            <label className={labelCls}>Görsel Yer Tutucu Yazısı</label>
            <input className={inputCls} value={form.journeyImageCaption} onChange={(e) => set('journeyImageCaption', e.target.value)} />
          </div>
        </div>

        {/* Anahtar Parti */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Anahtar Parti Bölümü</h2>
          <div>
            <label className={labelCls}>Tarih</label>
            <input className={inputCls} value={form.anahtarDate} onChange={(e) => set('anahtarDate', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Başlık 1. Satır</label>
              <input className={inputCls} value={form.anahtarTitleLine1} onChange={(e) => set('anahtarTitleLine1', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Başlık 2. Satır</label>
              <input className={inputCls} value={form.anahtarTitleLine2} onChange={(e) => set('anahtarTitleLine2', e.target.value)} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Paragraflar</label>
              <button onClick={() => addStrItem('anahtarParagraphs')} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.anahtarParagraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea className={inputCls} rows={3} value={p} onChange={(e) => updateStrItem('anahtarParagraphs', i, e.target.value)} />
                  <button onClick={() => removeStrItem('anahtarParagraphs', i)} className={delBtn + ' h-fit'}>Sil</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Kuruluş Ruhu Etiketi</label>
            <input className={inputCls} value={form.partySpiritLabel} onChange={(e) => set('partySpiritLabel', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Kuruluş Ruhu Maddeleri</label>
              <button onClick={() => addStrItem('partySpirit')} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.partySpirit.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={p} onChange={(e) => updateStrItem('partySpirit', i, e.target.value)} />
                  <button onClick={() => removeStrItem('partySpirit', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Alt Alıntı</label>
            <input className={inputCls} value={form.partySpiritFooter} onChange={(e) => set('partySpiritFooter', e.target.value)} />
          </div>
        </div>

        {/* Break */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Ara Görsel</h2>
          <ImageUpload label="Görsel" value={form.breakImage} onChange={(url) => set('breakImage', url)} folder="siyaset/break" aspect="aspect-video" />
          <div>
            <label className={labelCls}>Yer Tutucu Yazısı</label>
            <input className={inputCls} value={form.breakImageCaption} onChange={(e) => set('breakImageCaption', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Üstüne Binen Alıntı</label>
            <textarea className={inputCls} rows={2} value={form.breakQuote} onChange={(e) => set('breakQuote', e.target.value)} />
          </div>
        </div>

        {/* Advisor */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Başdanışmanlık</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.advisorLabel} onChange={(e) => set('advisorLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <input className={inputCls} value={form.advisorTitle} onChange={(e) => set('advisorTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Açıklama</label>
            <textarea className={inputCls} rows={3} value={form.advisorDescription} onChange={(e) => set('advisorDescription', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Alıntı</label>
            <textarea className={inputCls} rows={3} value={form.advisorQuote} onChange={(e) => set('advisorQuote', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Roller Etiketi</label>
            <input className={inputCls} value={form.advisorRolesLabel} onChange={(e) => set('advisorRolesLabel', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Sorumluluk Alanları</label>
              <button onClick={() => addObjItem('advisorRoles', { title: '', desc: '' })} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.advisorRoles.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} placeholder="Başlık" value={r.title} onChange={(e) => updateObjItem('advisorRoles', i, 'title', e.target.value)} />
                  <input className={inputCls} placeholder="Açıklama" value={r.desc} onChange={(e) => updateObjItem('advisorRoles', i, 'desc', e.target.value)} />
                  <button onClick={() => removeObjItem('advisorRoles', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Pillars */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Siyasete Bakış (Sütunlar)</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.visionLabel} onChange={(e) => set('visionLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <input className={inputCls} value={form.visionTitle} onChange={(e) => set('visionTitle', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Sütunlar</label>
              <button onClick={() => addObjItem('pillars', { title: '', desc: '' })} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-3">
              {form.pillars.map((p, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex gap-2">
                    <input className={inputCls} placeholder="Başlık" value={p.title} onChange={(e) => updateObjItem('pillars', i, 'title', e.target.value)} />
                    <button onClick={() => removeObjItem('pillars', i)} className={delBtn}>Sil</button>
                  </div>
                  <textarea className={inputCls} rows={3} placeholder="Açıklama" value={p.desc} onChange={(e) => updateObjItem('pillars', i, 'desc', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Yarına Dair Niyet</h2>
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
              <label className={labelCls + ' mb-0'}>Vizyon Maddeleri</label>
              <button onClick={() => addStrItem('futureVision')} className={addBtn}>+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.futureVision.map((v, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={v} onChange={(e) => updateStrItem('futureVision', i, e.target.value)} />
                  <button onClick={() => removeStrItem('futureVision', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Alt Yazı</label>
            <input className={inputCls} value={form.futureFooter} onChange={(e) => set('futureFooter', e.target.value)} />
          </div>
          <ImageUpload label="Görsel" value={form.futureImage} onChange={(url) => set('futureImage', url)} folder="siyaset/future" aspect="aspect-square" />
          <div>
            <label className={labelCls}>Yer Tutucu Yazısı</label>
            <input className={inputCls} value={form.futureImageCaption} onChange={(e) => set('futureImageCaption', e.target.value)} />
          </div>
        </div>

        {/* Closing */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Kapanış</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.closingLabel} onChange={(e) => set('closingLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Alıntı</label>
            <textarea className={inputCls} rows={3} value={form.closingQuote} onChange={(e) => set('closingQuote', e.target.value)} />
          </div>
        </div>

        {/* Bottom save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-gray-700 active:scale-95 transition-all shadow-lg disabled:opacity-50"
          >
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
