'use client';

import { useEffect, useState } from 'react';
import type { AboutPage } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

type ListKey = 'stats' | 'whoParagraphs' | 'education' | 'businessAreas' | 'characteristics' | 'politicalStances';

export default function AdminHakkimdaPage() {
  const [form, setForm] = useState<AboutPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/about');
      setForm(await res.json());
      setLoading(false);
    })();
  }, []);

  function set<K extends keyof AboutPage>(key: K, value: AboutPage[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateListItem(key: ListKey, idx: number, field: string, value: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown as Record<string, string>[])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, [key]: list } as AboutPage;
    });
  }

  function updateStringList(key: 'whoParagraphs', idx: number, value: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...prev[key]];
      list[idx] = value;
      return { ...prev, [key]: list };
    });
  }

  function addListItem(key: ListKey, template: Record<string, string> | string) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.push(template);
      return { ...prev, [key]: list } as AboutPage;
    });
  }

  function removeListItem(key: ListKey, idx: number) {
    setForm((prev) => {
      if (!prev) return prev;
      const list = [...(prev[key] as unknown[])];
      list.splice(idx, 1);
      return { ...prev, [key]: list } as AboutPage;
    });
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/about', {
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

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Hakkımda Sayfası</h1>
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
          <div>
            <label className={labelCls}>Başlık</label>
            <input className={inputCls} value={form.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Alt Başlık</label>
            <textarea className={inputCls} rows={3} value={form.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>İstatistikler</label>
              <button
                onClick={() => addListItem('stats', { value: '', label: '' })}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                + Ekle
              </button>
            </div>
            <div className="space-y-2">
              {form.stats.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} placeholder="Değer" value={s.value} onChange={(e) => updateListItem('stats', i, 'value', e.target.value)} />
                  <input className={inputCls} placeholder="Açıklama" value={s.label} onChange={(e) => updateListItem('stats', i, 'label', e.target.value)} />
                  <button onClick={() => removeListItem('stats', i)} className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-bold">Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Profil Görseli ve Bilgileri</h2>
          <ImageUpload
            label="Profil Görseli"
            value={form.profileImage}
            onChange={(url) => set('profileImage', url)}
            folder="hakkimda/profile"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Lokasyon</label>
              <input className={inputCls} value={form.profileLocation} onChange={(e) => set('profileLocation', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Doğum</label>
              <input className={inputCls} value={form.profileBirth} onChange={(e) => set('profileBirth', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Who */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Ben Kimim?</h2>
          <div>
            <label className={labelCls}>Başlık</label>
            <input className={inputCls} value={form.whoHeading} onChange={(e) => set('whoHeading', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Paragraflar</label>
              <button onClick={() => setForm({ ...form, whoParagraphs: [...form.whoParagraphs, ''] })} className="text-xs font-bold text-blue-600 hover:underline">+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.whoParagraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea className={inputCls} rows={3} value={p} onChange={(e) => updateStringList('whoParagraphs', i, e.target.value)} />
                  <button onClick={() => setForm({ ...form, whoParagraphs: form.whoParagraphs.filter((_, j) => j !== i) })} className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-bold h-fit">Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Eğitim</h2>
          <div>
            <label className={labelCls}>Başlık</label>
            <input className={inputCls} value={form.educationHeading} onChange={(e) => set('educationHeading', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Eğitimler</label>
              <button onClick={() => addListItem('education', { type: '', school: '', field: '' })} className="text-xs font-bold text-blue-600 hover:underline">+ Ekle</button>
            </div>
            <div className="space-y-3">
              {form.education.map((e, i) => (
                <div key={i} className="grid grid-cols-12 gap-2">
                  <input className={inputCls + ' col-span-2'} placeholder="Tür" value={e.type} onChange={(ev) => updateListItem('education', i, 'type', ev.target.value)} />
                  <input className={inputCls + ' col-span-5'} placeholder="Okul" value={e.school} onChange={(ev) => updateListItem('education', i, 'school', ev.target.value)} />
                  <input className={inputCls + ' col-span-4'} placeholder="Alan" value={e.field} onChange={(ev) => updateListItem('education', i, 'field', ev.target.value)} />
                  <button onClick={() => removeListItem('education', i)} className="col-span-1 px-2 py-2 bg-red-600 text-white rounded-lg text-xs font-bold">Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote 1 */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Alıntı Bannerı</h2>
          <div>
            <label className={labelCls}>Alıntı Metni</label>
            <textarea className={inputCls} rows={3} value={form.quote1Text} onChange={(e) => set('quote1Text', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Alıntı Altı</label>
            <input className={inputCls} value={form.quote1Footer} onChange={(e) => set('quote1Footer', e.target.value)} />
          </div>
        </div>

        {/* Break Image */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Ara Görsel (Profesyonel Fotoğraf)</h2>
          <div>
            <label className={labelCls}>Görsel URL (boşsa yer tutucu gösterilir)</label>
            <input className={inputCls} value={form.breakImage} onChange={(e) => set('breakImage', e.target.value)} />
          </div>
        </div>

        {/* Business */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>İş Dünyası</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.businessLabel} onChange={(e) => set('businessLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <textarea className={inputCls} rows={2} value={form.businessTitle} onChange={(e) => set('businessTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Açıklama</label>
            <textarea className={inputCls} rows={3} value={form.businessDescription} onChange={(e) => set('businessDescription', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Faaliyet Alanları</label>
              <button onClick={() => addListItem('businessAreas', { title: '', desc: '' })} className="text-xs font-bold text-blue-600 hover:underline">+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.businessAreas.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} placeholder="Başlık" value={b.title} onChange={(e) => updateListItem('businessAreas', i, 'title', e.target.value)} />
                  <input className={inputCls} placeholder="Açıklama" value={b.desc} onChange={(e) => updateListItem('businessAreas', i, 'desc', e.target.value)} />
                  <button onClick={() => removeListItem('businessAreas', i)} className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-bold">Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Character */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Karakterim</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.characterLabel} onChange={(e) => set('characterLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <textarea className={inputCls} rows={2} value={form.characterTitle} onChange={(e) => set('characterTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Portre Görseli URL (boşsa yer tutucu)</label>
            <input className={inputCls} value={form.characterImage} onChange={(e) => set('characterImage', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Karakter Maddeleri</label>
              <button onClick={() => addListItem('characteristics', { text: '' })} className="text-xs font-bold text-blue-600 hover:underline">+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.characteristics.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={c.text} onChange={(e) => updateListItem('characteristics', i, 'text', e.target.value)} />
                  <button onClick={() => removeListItem('characteristics', i)} className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-bold">Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Struggle */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>İnsanlık ve Mücadele</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.struggleLabel} onChange={(e) => set('struggleLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Metin</label>
            <textarea className={inputCls} rows={3} value={form.struggleText} onChange={(e) => set('struggleText', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Vurgu Cümlesi</label>
            <textarea className={inputCls} rows={2} value={form.struggleHighlight} onChange={(e) => set('struggleHighlight', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Alt Yazı</label>
            <input className={inputCls} value={form.struggleFooter} onChange={(e) => set('struggleFooter', e.target.value)} />
          </div>
        </div>

        {/* Political */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Siyasi Duruş</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.politicalLabel} onChange={(e) => set('politicalLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Başlık</label>
            <textarea className={inputCls} rows={2} value={form.politicalTitle} onChange={(e) => set('politicalTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Açıklama</label>
            <textarea className={inputCls} rows={2} value={form.politicalDescription} onChange={(e) => set('politicalDescription', e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>Duruşlar</label>
              <button onClick={() => addListItem('politicalStances', { text: '' })} className="text-xs font-bold text-blue-600 hover:underline">+ Ekle</button>
            </div>
            <div className="space-y-2">
              {form.politicalStances.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={p.text} onChange={(e) => updateListItem('politicalStances', i, 'text', e.target.value)} />
                  <button onClick={() => removeListItem('politicalStances', i)} className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-bold">Sil</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Alt Yazı</label>
            <input className={inputCls} value={form.politicalFooter} onChange={(e) => set('politicalFooter', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Etkinlik Görseli URL (boşsa yer tutucu)</label>
            <input className={inputCls} value={form.politicalImage} onChange={(e) => set('politicalImage', e.target.value)} />
          </div>
        </div>

        {/* Today */}
        <div className={sectionCls}>
          <h2 className={sectionHeading}>Bugün / Yaşamımın Özeti</h2>
          <div>
            <label className={labelCls}>Etiket</label>
            <input className={inputCls} value={form.todayLabel} onChange={(e) => set('todayLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Açıklama</label>
            <textarea className={inputCls} rows={3} value={form.todayDescription} onChange={(e) => set('todayDescription', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Özet Etiketi</label>
            <input className={inputCls} value={form.summaryLabel} onChange={(e) => set('summaryLabel', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Özet Alıntısı</label>
            <textarea className={inputCls} rows={3} value={form.summaryQuote} onChange={(e) => set('summaryQuote', e.target.value)} />
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
