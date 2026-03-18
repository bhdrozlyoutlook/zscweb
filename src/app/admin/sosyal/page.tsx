'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { SocialLink } from '@/types';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  DragEndEvent, DragOverlay, DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ICONS = ['twitter', 'instagram', 'linkedin', 'youtube', 'facebook', 'tiktok', 'website'];

const ICON_COLORS: Record<string, string> = {
  twitter:   '#000000',
  instagram: '#E1306C',
  linkedin:  '#0A66C2',
  youtube:   '#FF0000',
  facebook:  '#1877F2',
  tiktok:    '#010101',
  website:   '#6366f1',
};

function SocialIcon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  switch (name) {
    case 'twitter': return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
    case 'instagram': return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
    case 'linkedin': return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
    case 'youtube': return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
    case 'facebook': return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
    case 'tiktok': return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>;
    default: return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
  }
}

function SortableRow({
  item, index, onEdit, onDelete, onToggle,
}: {
  item: SocialLink;
  index: number;
  onEdit: (i: SocialLink) => void;
  onDelete: (i: SocialLink) => void;
  onToggle: (i: SocialLink) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id! });
  const color = ICON_COLORS[item.icon] ?? '#374151';

  const toggleBg = item.visible ? '#d97706' : '#059669';
  const nameFg = item.visible ? '#111827' : '#9ca3af';
  const iconBg = item.visible ? color : '#9ca3af';

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.3 : 1, backgroundColor: '#ffffff' }}
      className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 last:border-0"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 p-2 rounded-lg cursor-grab active:cursor-grabbing touch-none"
        style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
        </svg>
      </button>

      {/* Sıra */}
      <span className="w-6 text-center flex-shrink-0" style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af' }}>{index + 1}</span>

      {/* İkon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg, color: '#ffffff' }}
      >
        <SocialIcon name={item.icon} className="w-4 h-4" />
      </div>

      {/* Platform adı + URL */}
      <div className="flex-1 min-w-0">
        <p className="truncate" style={{ fontSize: '14px', fontWeight: 700, color: nameFg, textDecoration: item.visible ? 'none' : 'line-through' }}>
          {item.name}
        </p>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate block"
          style={{ fontSize: '11px', fontFamily: 'monospace', color: '#6b7280' }}
        >
          {item.href}
        </a>
      </div>

      {/* Durum rozeti */}
      <span
        className="flex-shrink-0 rounded-full"
        style={item.visible
          ? { backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 700, padding: '4px 12px' }
          : { backgroundColor: '#f3f4f6', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 12px' }
        }
      >
        {item.visible ? 'Görünür' : 'Gizli'}
      </span>

      {/* Aksiyonlar */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onToggle(item)}
          className="flex items-center gap-1.5 rounded-lg"
          style={{ backgroundColor: toggleBg, color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '8px 12px', border: 'none', cursor: 'pointer' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {item.visible
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
            }
          </svg>
          {item.visible ? 'Gizle' : 'Göster'}
        </button>

        <button
          onClick={() => onEdit(item)}
          className="flex items-center gap-1.5 rounded-lg"
          style={{ backgroundColor: '#1d4ed8', color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '8px 12px', border: 'none', cursor: 'pointer' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Düzenle
        </button>

        <button
          onClick={() => onDelete(item)}
          className="flex items-center gap-1.5 rounded-lg"
          style={{ backgroundColor: '#dc2626', color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '8px 12px', border: 'none', cursor: 'pointer' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Sil
        </button>
      </div>
    </div>
  );
}

function DragCard({ item }: { item: SocialLink }) {
  const color = ICON_COLORS[item.icon] ?? '#374151';
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-900 rounded-xl shadow-2xl">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: color }}>
        <SocialIcon name={item.icon} className="w-4 h-4" />
      </div>
      <span className="text-sm font-bold text-gray-900">{item.name}</span>
      <span className="text-xs font-mono text-gray-500 truncate max-w-[160px]">{item.href}</span>
    </div>
  );
}

export default function SosyalPage() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<SocialLink | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<SocialLink | null>(null);
  const [formName, setFormName] = useState('');
  const [formHref, setFormHref] = useState('');
  const [formIcon, setFormIcon] = useState('twitter');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    fetch('/api/social?all=1')
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  function handleDragStart(event: DragStartEvent) {
    setActiveItem(items.find((i) => i.id === event.active.id) ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const reordered = arrayMove(items, items.findIndex((i) => i.id === active.id), items.findIndex((i) => i.id === over.id));
    setItems(reordered);
    await Promise.all(reordered.map((item, i) =>
      fetch(`/api/social/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: i }) })
    ));
    toast.success('Sıralama güncellendi');
  }

  function openAdd() { setEditItem(null); setFormName(''); setFormHref(''); setFormIcon('twitter'); setShowForm(true); }
  function openEdit(item: SocialLink) { setEditItem(item); setFormName(item.name); setFormHref(item.href); setFormIcon(item.icon); setShowForm(true); }

  async function saveForm() {
    if (!formName.trim() || !formHref.trim()) { toast.error('Ad ve URL zorunludur'); return; }
    if (editItem) {
      await fetch(`/api/social/${editItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: formName, href: formHref, icon: formIcon }) });
      setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, name: formName, href: formHref, icon: formIcon } : i));
      toast.success('Güncellendi');
    } else {
      const res = await fetch('/api/social', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: formName, href: formHref, icon: formIcon, order: items.length, visible: true }) });
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem]);
      toast.success('Eklendi');
    }
    setShowForm(false);
  }

  async function handleToggle(item: SocialLink) {
    setSaving(item.id!);
    await fetch(`/api/social/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visible: !item.visible }) });
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, visible: !i.visible } : i));
    setSaving(null);
    toast.success(item.visible ? 'Gizlendi' : 'Gösterildi');
  }

  async function handleDelete(item: SocialLink) {
    if (!confirm(`"${item.name}" silinsin mi?`)) return;
    setSaving(item.id!);
    await fetch(`/api/social/${item.id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setSaving(null);
    toast.success('Silindi');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Sosyal Medya</h1>
            <p className="text-sm text-gray-600 mt-1">
              <span className="inline-flex items-center gap-1 mr-3">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                {items.filter(i => i.visible).length} görünür
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                {items.filter(i => !i.visible).length} gizli
              </span>
            </p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-700 active:scale-95 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Ekle
          </button>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Bilgi kutusu */}
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-5">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-700 font-medium">
            Sol taraftaki <strong>⠿</strong> ikonu sürükleyerek sırası değiştirin. Mavi = düzenle, sarı = gizle/göster, kırmızı = sil.
          </p>
        </div>

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
            <p className="text-gray-500 font-medium mb-4">Henüz sosyal medya linki yok</p>
            <button onClick={openAdd} className="bg-gray-900 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors">
              İlk Linki Ekle
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Tablo başlığı */}
            <div className="grid grid-cols-[48px_32px_40px_1fr_auto_auto] gap-3 items-center px-4 py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider">
              <span className="text-center">Sürükle</span>
              <span className="text-center">#</span>
              <span>İkon</span>
              <span>Platform / URL</span>
              <span>Durum</span>
              <span>İşlemler</span>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map((i) => i.id!)} strategy={verticalListSortingStrategy}>
                {items.map((item, index) => (
                  <SortableRow
                    key={item.id ?? index}
                    item={item}
                    index={index}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                  />
                ))}
              </SortableContext>
              <DragOverlay>{activeItem ? <DragCard item={activeItem} /> : null}</DragOverlay>
            </DndContext>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gray-900 px-6 py-5 flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {editItem ? 'Platformu Düzenle' : 'Yeni Sosyal Medya'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Platform Adı <span className="text-red-500">*</span></label>
                <input
                  autoFocus
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Örn: Twitter"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Profil URL <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formHref}
                  onChange={(e) => setFormHref(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveForm()}
                  placeholder="https://twitter.com/kullanici"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">İkon Seç</label>
                <div className="grid grid-cols-4 gap-2">
                  {ICONS.map((icon) => {
                    const selected = formIcon === icon;
                    const color = ICON_COLORS[icon] ?? '#374151';
                    return (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormIcon(icon)}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all"
                        style={selected
                          ? { borderColor: color, backgroundColor: color, color: '#fff' }
                          : { borderColor: '#e5e7eb', color: '#6b7280' }
                        }
                      >
                        <SocialIcon name={icon} className="w-5 h-5" />
                        <span className="text-[10px] font-bold capitalize leading-none">{icon}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={saveForm}
                className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-700 active:scale-95 transition-all"
              >
                {editItem ? 'Kaydet' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
