'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { NavItem } from '@/types';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableRow({
  item,
  index,
  onEdit,
  onDelete,
  onToggle,
  saving,
}: {
  item: NavItem;
  index: number;
  onEdit: (item: NavItem) => void;
  onDelete: (item: NavItem) => void;
  onToggle: (item: NavItem) => void;
  saving: string | null;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id!,
  });

  const toggleBg = item.visible ? '#d97706' : '#059669';
  const nameFg = item.visible ? '#111827' : '#9ca3af';

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

      {/* Menü adı */}
      <div className="flex-1 min-w-0">
        <p className="truncate" style={{ fontSize: '14px', fontWeight: 700, color: nameFg, textDecoration: item.visible ? 'none' : 'line-through' }}>
          {item.label}
        </p>
        <p className="mt-0.5" style={{ fontSize: '11px', fontFamily: 'monospace', color: '#6b7280' }}>{item.href}</p>
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
            {item.visible ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            ) : (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </>
            )}
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

function DragCard({ item }: { item: NavItem }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-900 rounded-xl shadow-2xl">
      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
      </svg>
      <span className="text-sm font-bold text-gray-900">{item.label}</span>
      <span className="text-xs font-mono text-gray-500">{item.href}</span>
    </div>
  );
}

export default function MenuPage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<NavItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<NavItem | null>(null);
  const [formLabel, setFormLabel] = useState('');
  const [formHref, setFormHref] = useState('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    fetch('/api/nav?all=1')
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
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);
    await Promise.all(
      reordered.map((item, i) =>
        fetch(`/api/nav/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: i }),
        })
      )
    );
    toast.success('Sıralama güncellendi');
  }

  function openAdd() {
    setEditItem(null);
    setFormLabel('');
    setFormHref('');
    setShowForm(true);
  }

  function openEdit(item: NavItem) {
    setEditItem(item);
    setFormLabel(item.label);
    setFormHref(item.href);
    setShowForm(true);
  }

  async function saveForm() {
    if (!formLabel.trim() || !formHref.trim()) { toast.error('Ad ve URL zorunludur'); return; }
    if (editItem) {
      await fetch(`/api/nav/${editItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: formLabel, href: formHref }),
      });
      setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, label: formLabel, href: formHref } : i));
      toast.success('Güncellendi');
    } else {
      const res = await fetch('/api/nav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: formLabel, href: formHref, order: items.length, visible: true }),
      });
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem]);
      toast.success('Eklendi');
    }
    setShowForm(false);
  }

  async function handleToggle(item: NavItem) {
    setSaving(item.id!);
    await fetch(`/api/nav/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: !item.visible }),
    });
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, visible: !i.visible } : i));
    setSaving(null);
    toast.success(item.visible ? 'Gizlendi' : 'Gösterildi');
  }

  async function handleDelete(item: NavItem) {
    if (!confirm(`"${item.label}" silinsin mi?`)) return;
    setSaving(item.id!);
    await fetch(`/api/nav/${item.id}`, { method: 'DELETE' });
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
            <h1 className="text-2xl font-black text-gray-900">Menü Yönetimi</h1>
            <p className="text-sm text-gray-600 mt-1">
              <span className="inline-flex items-center gap-1 mr-3"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{items.filter(i => i.visible).length} görünür</span>
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />{items.filter(i => !i.visible).length} gizli</span>
            </p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-700 active:scale-95 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Menü Ekle
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
            <p className="text-gray-500 font-medium mb-4">Henüz menü öğesi yok</p>
            <button onClick={openAdd} className="bg-gray-900 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors">
              İlk Menüyü Ekle
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Tablo başlığı */}
            <div className="grid grid-cols-[48px_32px_1fr_auto_auto] gap-3 items-center px-4 py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider">
              <span className="text-center">Sürükle</span>
              <span className="text-center">#</span>
              <span>Menü / URL</span>
              <span>Durum</span>
              <span>İşlemler</span>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map((i) => i.id!)} strategy={verticalListSortingStrategy}>
                {items.map((item, index) => (
                  <SortableRow
                    key={item.id}
                    item={item}
                    index={index}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                    saving={saving}
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
                {editItem ? '✏️ Menü Öğesini Düzenle' : '➕ Yeni Menü Öğesi'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Menü Adı <span className="text-red-500">*</span></label>
                <input
                  autoFocus
                  type="text"
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveForm()}
                  placeholder="Örn: Hakkımda"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">URL <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formHref}
                  onChange={(e) => setFormHref(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveForm()}
                  placeholder="Örn: /hakkimda"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1.5">Dahili sayfalar için / ile başlayın</p>
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
