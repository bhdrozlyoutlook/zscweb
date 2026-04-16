'use client';

import { useEffect, useState } from 'react';
import type { SocietyPage } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

type ObjListKey = 'stats' | 'volunteerOrgs' | 'memberships' | 'humanApproach';
type StrListKey = 'storyParagraphs' | 'familyWork' | 'youthWork' | 'pastOrganizations';

export default function AdminToplumInsanPage() {
  const [form, setForm] = useState<SocietyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/society');
      setForm(await res.json());
      setLoading(false);
    })();
  }, []);

  function set<K extends keyof SocietyPage>(key: K, value: SocietyPage[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateObjItem(key: ObjListKey, idx: number, field: string, value: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown as Record<string, string>[])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, [key]: list } as SocietyPage;
    });
  }

  function addObjItem(key: ObjListKey, template: Record<string, string>) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.push(template);
      return { ...prev, [key]: list } as SocietyPage;
    });
  }

  function removeObjItem(key: ObjListKey, idx: number) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.splice(idx, 1);
      return { ...prev, [key]: list } as SocietyPage;
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
      const res = await fetch('/api/society', {
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
            <h1 className="text-2xl font-black text-gray-900">Toplum & İnsan Sayfası</h1>
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
          <div><label className={labelCls}>Alıntı Metni</label><input className={inputCls} value={form.quote1Text} onChange={(e) => set('quote1Text', e.target.value)} /></div>
          <div><label className={labelCls}>Vurgu (gri)</label><input className={inputCls} value={form.quote1Highlight} onChange={(e) => set('quote1Highlight', e.target.value)} /></div>
        </div>

        {/* Story */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Seyirci Kalmama İradesi</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.storyLabel} onChange={(e) => set('storyLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><textarea className={inputCls} rows={2} value={form.storyTitle} onChange={(e) => set('storyTitle', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Paragraflar</label><button onClick={() => addStrItem('storyParagraphs')} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-2">
              {form.storyParagraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea className={inputCls} rows={3} value={p} onChange={(e) => updateStrItem('storyParagraphs', i, e.target.value)} />
                  <button onClick={() => removeStrItem('storyParagraphs', i)} className={delBtn + ' h-fit'}>Sil</button>
                </div>
              ))}
            </div>
          </div>
          <div><label className={labelCls}>Vurgu Cümlesi</label><input className={inputCls} value={form.storyHighlight} onChange={(e) => set('storyHighlight', e.target.value)} /></div>
          <ImageUpload label="Görsel" value={form.storyImage} onChange={(url) => set('storyImage', url)} folder="toplum-insan/story" aspect="aspect-[4/3]" />
          <div><label className={labelCls}>Yer Tutucu Yazısı</label><input className={inputCls} value={form.storyImageCaption} onChange={(e) => set('storyImageCaption', e.target.value)} /></div>
        </div>

        {/* Family */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Aile & Toplum</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.familyLabel} onChange={(e) => set('familyLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Rol / Unvan</label><input className={inputCls} value={form.familyRole} onChange={(e) => set('familyRole', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><input className={inputCls} value={form.familyTitle} onChange={(e) => set('familyTitle', e.target.value)} /></div>
          <div><label className={labelCls}>Açıklama</label><textarea className={inputCls} rows={3} value={form.familyDescription} onChange={(e) => set('familyDescription', e.target.value)} /></div>
          <div><label className={labelCls}>Alıntı</label><textarea className={inputCls} rows={2} value={form.familyQuote} onChange={(e) => set('familyQuote', e.target.value)} /></div>
          <div><label className={labelCls}>Çalışmalar Etiketi</label><input className={inputCls} value={form.familyWorkLabel} onChange={(e) => set('familyWorkLabel', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Çalışmalar</label><button onClick={() => addStrItem('familyWork')} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-2">
              {form.familyWork.map((w, i) => (
                <div key={i} className="flex gap-2">
                  <textarea className={inputCls} rows={2} value={w} onChange={(e) => updateStrItem('familyWork', i, e.target.value)} />
                  <button onClick={() => removeStrItem('familyWork', i)} className={delBtn + ' h-fit'}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Break */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Ara Görsel</h2>
          <ImageUpload label="Görsel" value={form.breakImage} onChange={(url) => set('breakImage', url)} folder="toplum-insan/break" aspect="aspect-video" />
          <div><label className={labelCls}>Yer Tutucu Yazısı</label><input className={inputCls} value={form.breakImageCaption} onChange={(e) => set('breakImageCaption', e.target.value)} /></div>
          <div><label className={labelCls}>Üstüne Binen Alıntı</label><textarea className={inputCls} rows={2} value={form.breakQuote} onChange={(e) => set('breakQuote', e.target.value)} /></div>
        </div>

        {/* Youth */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Gençler & Liderlik</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.youthLabel} onChange={(e) => set('youthLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Rol / Unvan</label><input className={inputCls} value={form.youthRole} onChange={(e) => set('youthRole', e.target.value)} /></div>
          <div><label className={labelCls}>Açıklama</label><textarea className={inputCls} rows={3} value={form.youthDescription} onChange={(e) => set('youthDescription', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Çalışmalar</label><button onClick={() => addStrItem('youthWork')} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-2">
              {form.youthWork.map((w, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={w} onChange={(e) => updateStrItem('youthWork', i, e.target.value)} />
                  <button onClick={() => removeStrItem('youthWork', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
          <ImageUpload label="Görsel" value={form.youthImage} onChange={(url) => set('youthImage', url)} folder="toplum-insan/youth" aspect="aspect-square" />
          <div><label className={labelCls}>Yer Tutucu Yazısı</label><input className={inputCls} value={form.youthImageCaption} onChange={(e) => set('youthImageCaption', e.target.value)} /></div>
        </div>

        {/* Volunteer */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Gönüllülük Kurumları</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.volunteerLabel} onChange={(e) => set('volunteerLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><textarea className={inputCls} rows={2} value={form.volunteerTitle} onChange={(e) => set('volunteerTitle', e.target.value)} /></div>
          <div><label className={labelCls}>Açıklama</label><textarea className={inputCls} rows={2} value={form.volunteerDescription} onChange={(e) => set('volunteerDescription', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Kurumlar</label><button onClick={() => addObjItem('volunteerOrgs', { name: '', desc: '', quote: '' })} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-3">
              {form.volunteerOrgs.map((o, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex gap-2">
                    <input className={inputCls} placeholder="Kurum Adı" value={o.name} onChange={(e) => updateObjItem('volunteerOrgs', i, 'name', e.target.value)} />
                    <button onClick={() => removeObjItem('volunteerOrgs', i)} className={delBtn}>Sil</button>
                  </div>
                  <textarea className={inputCls} rows={3} placeholder="Açıklama" value={o.desc} onChange={(e) => updateObjItem('volunteerOrgs', i, 'desc', e.target.value)} />
                  <textarea className={inputCls} rows={2} placeholder="Alıntı" value={o.quote} onChange={(e) => updateObjItem('volunteerOrgs', i, 'quote', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Memberships */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Uluslararası Üyelikler</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.membershipsLabel} onChange={(e) => set('membershipsLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><textarea className={inputCls} rows={2} value={form.membershipsTitle} onChange={(e) => set('membershipsTitle', e.target.value)} /></div>
          <div><label className={labelCls}>Açıklama</label><textarea className={inputCls} rows={2} value={form.membershipsDescription} onChange={(e) => set('membershipsDescription', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Üyelikler</label><button onClick={() => addObjItem('memberships', { org: '', parent: '', desc: '' })} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-3">
              {form.memberships.map((m, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input className={inputCls} placeholder="Kurum" value={m.org} onChange={(e) => updateObjItem('memberships', i, 'org', e.target.value)} />
                    <input className={inputCls} placeholder="Üst Kurum / Bağlı" value={m.parent} onChange={(e) => updateObjItem('memberships', i, 'parent', e.target.value)} />
                  </div>
                  <div className="flex gap-2">
                    <textarea className={inputCls} rows={2} placeholder="Açıklama" value={m.desc} onChange={(e) => updateObjItem('memberships', i, 'desc', e.target.value)} />
                    <button onClick={() => removeObjItem('memberships', i)} className={delBtn + ' h-fit'}>Sil</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div><label className={labelCls}>Geçmiş Kurumlar Etiketi</label><input className={inputCls} value={form.pastOrgsLabel} onChange={(e) => set('pastOrgsLabel', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Geçmiş Kurumlar</label><button onClick={() => addStrItem('pastOrganizations')} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-2">
              {form.pastOrganizations.map((o, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={o} onChange={(e) => updateStrItem('pastOrganizations', i, e.target.value)} />
                  <button onClick={() => removeStrItem('pastOrganizations', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Human Centered */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>İnsan Merkezli Yolculuk</h2>
          <div><label className={labelCls}>Etiket</label><input className={inputCls} value={form.humanLabel} onChange={(e) => set('humanLabel', e.target.value)} /></div>
          <div><label className={labelCls}>Başlık</label><textarea className={inputCls} rows={2} value={form.humanTitle} onChange={(e) => set('humanTitle', e.target.value)} /></div>
          <div><label className={labelCls}>Alt Başlık</label><input className={inputCls} value={form.humanSubtitle} onChange={(e) => set('humanSubtitle', e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className={labelCls + ' mb-0'}>Yaklaşımlar</label><button onClick={() => addObjItem('humanApproach', { action: '' })} className={addBtn}>+ Ekle</button></div>
            <div className="space-y-2">
              {form.humanApproach.map((a, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={a.action} onChange={(e) => updateObjItem('humanApproach', i, 'action', e.target.value)} />
                  <button onClick={() => removeObjItem('humanApproach', i)} className={delBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Kapanış</h2>
          <div><label className={labelCls}>Giriş Cümlesi</label><input className={inputCls} value={form.closingIntro} onChange={(e) => set('closingIntro', e.target.value)} /></div>
          <div><label className={labelCls}>Ana Alıntı</label><textarea className={inputCls} rows={3} value={form.closingQuote} onChange={(e) => set('closingQuote', e.target.value)} /></div>
          <div><label className={labelCls}>Alt Cümle</label><input className={inputCls} value={form.closingFooter} onChange={(e) => set('closingFooter', e.target.value)} /></div>
          <div><label className={labelCls}>Vurgu</label><input className={inputCls} value={form.closingEmphasis} onChange={(e) => set('closingEmphasis', e.target.value)} /></div>
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
