'use client';

import { useEffect, useState } from 'react';
import type { ContactMessage } from '@/lib/data';

export default function AdminMesajlarPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  async function load() {
    const res = await fetch('/api/mesajlar');
    if (res.ok) setMessages(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function markRead(id: string) {
    await fetch(`/api/mesajlar/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    setSelected((prev) => prev?.id === id ? { ...prev, read: true } : prev);
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/mesajlar/${id}`, { method: 'DELETE' });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function openMessage(msg: ContactMessage) {
    setSelected(msg);
    if (!msg.read) markRead(msg.id);
  }

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Mesajlar</h1>
            <p className="text-sm text-gray-600 mt-1">
              <span className="inline-flex items-center gap-1 mr-3">
                <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                {messages.length} toplam
              </span>
              {unread > 0 && (
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                  {unread} okunmamış
                </span>
              )}
            </p>
          </div>
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
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 py-20 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 font-medium">Henüz mesaj yok</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-4">
            {/* Mesaj listesi */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-gray-900">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  Gelen Kutusu
                  {unread > 0 && (
                    <span
                      className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#f97316', color: '#fff' }}
                    >
                      {unread}
                    </span>
                  )}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => openMessage(msg)}
                    className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors"
                    style={selected?.id === msg.id
                      ? { backgroundColor: '#111827', borderLeft: '4px solid #f97316' }
                      : { borderLeft: '4px solid transparent' }
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!msg.read && (
                            <span className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                          )}
                          <p
                            className="text-sm truncate"
                            style={selected?.id === msg.id
                              ? { color: '#fff', fontWeight: 700 }
                              : { color: msg.read ? '#6b7280' : '#111827', fontWeight: msg.read ? 400 : 700 }
                            }
                          >
                            {msg.name}
                          </p>
                        </div>
                        <p
                          className="text-xs truncate mt-0.5"
                          style={{ color: selected?.id === msg.id ? '#d1d5db' : '#9ca3af' }}
                        >
                          {msg.subject}
                        </p>
                        <p
                          className="text-xs truncate"
                          style={{ color: selected?.id === msg.id ? '#9ca3af' : '#d1d5db' }}
                        >
                          {msg.message.slice(0, 50)}...
                        </p>
                      </div>
                      <p
                        className="text-xs flex-shrink-0"
                        style={{ color: selected?.id === msg.id ? '#9ca3af' : '#d1d5db' }}
                      >
                        {new Date(msg.date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mesaj detayı */}
            <div className="lg:col-span-3">
              {selected ? (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  {/* Detay başlığı */}
                  <div className="px-6 py-4 bg-gray-900 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-white truncate">{selected.subject}</h2>
                      <p className="text-xs text-gray-400 mt-1">
                        <span className="font-bold text-gray-300">{selected.name}</span>
                        {' '}·{' '}
                        <span>{selected.email}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(selected.date).toLocaleString('tr-TR')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-colors"
                      style={{ backgroundColor: '#dc2626' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Sil
                    </button>
                  </div>

                  {/* Mesaj içeriği */}
                  <div className="px-6 py-6">
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                      {selected.message}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md"
                      style={{ backgroundColor: '#111827' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Yanıtla
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-64 flex flex-col items-center justify-center gap-3">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-400">Okumak için bir mesaj seçin</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
