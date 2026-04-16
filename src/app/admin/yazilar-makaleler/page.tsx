'use client';

import { useEffect, useState } from 'react';
import type { ArticlesPage } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

type ObjListKey = 'stats' | 'topics' | 'highlights';
type StrListKey = 'aboutParagraphs';

export default function AdminYazilarMakalelerPage() {
  const [form, setForm] = useState<ArticlesPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/articles');
      setForm(await res.json());
      setLoading(false);
    })();
  }, []);

  function set<K extends keyof ArticlesPage>(key: K, value: ArticlesPage[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateObjItem(key: ObjListKey, idx: number, field: string, value: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown as Record<string, string>[])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, [key]: list } as ArticlesPage;
    });
  }

  function addObjItem(key: ObjListKey, template: Record<string, string>) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.push(template);
      return { ...prev, [key]: list } as ArticlesPage;
    });
  }

  function removeObjItem(key: ObjListKey, idx: number) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.splice(idx, 1);
      return { ...prev, [key]: list } as ArticlesPage;
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
      const res = await fetch('/api/articles', {
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
            <h1 className="text-2xl font-black text-gray-900">Yazılar & Makaleler Sayfası</h1>
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
          <div><label className={labelCls}>Üst Etiket</label><input className={inputCls} value={form.heroLabel} onChange={(e) => set('heroLabel', e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Başlık 1. Satır</label><input className={inputCls} value={form.heroTitleLine1} onChange={(e) => set('heroTitleLine1', e.target.value)} /></div>
            <div><label className={labelCls}>Başlık 2. Satır (gri)</label><input className={inputCls} value={form.heroTitleLine2} onChange={(e) => set('heroTitleLine2', e.target.value)} /></div>
          </div>
          <div><label className={labelCls}>Alt Başlık</label><textarea className={inputCls} rows={3} value={form.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>İstatistikler</label><button onClick={() => addObjItem('stats', { value: '', label: '' })} className={addBtn}>+ Ekle</button></div>
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
          <h2 className={sectionHeading}>Alıntı</h2>
          <div><label className={labelCls}>Alıntı</label><input className={inputCls} value={form.quote1Text} onChange={(e) => set('quote1Text', e.target.value)} /></div>
          <div><label className={labelCls}>Vurgu (gri)</label><input className={inputCls} value={form.quote1Highlight} onChange={(e) => set('quote1Highlight', e.target.value)} /></div>
          <div><label className={labelCls}>Alt Yazı</label><input className={inputCls} value={form.quote1Footer} onChange={(e) => set('quote1Footer', e.target.value)} /></div>
        </div>

        {/* About */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Neden Yazıyorum</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.aboutLabel} onChange={(e) => set('aboutLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><textarea className={inputCls} rows={2} value={form.aboutTitle} onChange={(e) => set('aboutTitle', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Paragraflar</label><button onClick={() => addStrItem('aboutParagraphs')} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-2">
              {form.aboutParagraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea className={inputCls} rows={3} value={p} onChange={(e) => updateStrItem('aboutParagraphs', i, e.target.value)} />
                  <button onClick={() => removeStrItem('aboutParagraphs', i)} className={delBtn + ' h-fit'}>Sil</button>
                </div>
              ))}
            </div>
          </div>
          <ImageUpload label="Görsel" value={form.aboutImage} onChange={(url) => set('aboutImage', url)} folder="yazilar/about" aspect="aspect-[4/3]" />
          <div><label className={labelCls}>Yer Tutucu Yazısı</label><input className={inputCls} value={form.aboutImageCaption} onChange={(e) => set('aboutImageCaption', e.target.value)} /></div>
        </div>

        {/* Topics */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Yazı Alanları</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.topicsLabel} onChange={(e) => set('topicsLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><textarea className={inputCls} rows={2} value={form.topicsTitle} onChange={(e) => set('topicsTitle', e.target.value)} /></div>
          <div><label className={labelCls}>Açıklama</label><textarea className={inputCls} rows={2} value={form.topicsDescription} onChange={(e) => set('topicsDescription', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Alanlar</label><button onClick={() => addObjItem('topics', { title: '', desc: '' })} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-2">
              {form.topics.map((t, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} placeholder="Başlık" value={t.title} onChange={(e) => updateObjItem('topics', i, 'title', e.target.value)} />
                  <input className={inputCls} placeholder="Açıklama" value={t.desc} onChange={(e) => updateObjItem('topics', i, 'desc', e.target.value)} />
                  <button onClick={() => removeObjItem('topics', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Öne Çıkan Yazılar</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.highlightsLabel} onChange={(e) => set('highlightsLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><textarea className={inputCls} rows={2} value={form.highlightsTitle} onChange={(e) => set('highlightsTitle', e.target.value)} /></div>
          <div><label className={labelCls}>Açıklama</label><input className={inputCls} value={form.highlightsDescription} onChange={(e) => set('highlightsDescription', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Öne Çıkanlar</label><button onClick={() => addObjItem('highlights', { title: '', source: '', date: '', excerpt: '', link: '' })} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-3">
              {form.highlights.map((h, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex gap-2">
                    <input className={inputCls} placeholder="Başlık" value={h.title} onChange={(e) => updateObjItem('highlights', i, 'title', e.target.value)} />
                    <button onClick={() => removeObjItem('highlights', i)} className={delBtn}>Sil</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input className={inputCls} placeholder="Kaynak (ör. Yeni Şafak)" value={h.source} onChange={(e) => updateObjItem('highlights', i, 'source', e.target.value)} />
                    <input className={inputCls} placeholder="Tarih" value={h.date} onChange={(e) => updateObjItem('highlights', i, 'date', e.target.value)} />
                  </div>
                  <textarea className={inputCls} rows={2} placeholder="Özet" value={h.excerpt} onChange={(e) => updateObjItem('highlights', i, 'excerpt', e.target.value)} />
                  <input className={inputCls} placeholder="Bağlantı (/blog/slug ya da https://...)" value={h.link} onChange={(e) => updateObjItem('highlights', i, 'link', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>CTA Buton Yazısı</label><input className={inputCls} value={form.highlightsCtaText} onChange={(e) => set('highlightsCtaText', e.target.value)} /></div>
            <div><label className={labelCls}>CTA Bağlantısı</label><input className={inputCls} value={form.highlightsCtaLink} onChange={(e) => set('highlightsCtaLink', e.target.value)} /></div>
          </div>
        </div>

        {/* Closing */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Kapanış</h2>
          <div><label className={labelCls}>Giriş Cümlesi</label><input className={inputCls} value={form.closingIntro} onChange={(e) => set('closingIntro', e.target.value)} /></div>
          <div><label className={labelCls}>Alıntı</label><textarea className={inputCls} rows={3} value={form.closingQuote} onChange={(e) => set('closingQuote', e.target.value)} /></div>
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
