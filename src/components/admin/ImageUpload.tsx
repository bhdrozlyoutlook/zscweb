'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/lib/storage';

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
  aspect?: string;
}

export default function ImageUpload({ value, onChange, folder, label, aspect = 'aspect-[3/4]' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Yalnızca görsel dosyaları yükleyebilirsiniz.');
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch {
      setError('Yükleme başarısız. Lütfen tekrar deneyin.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div>
      {label && <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>}
      <div className="flex items-start gap-4">
        <div className={`relative ${aspect} w-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 shrink-0`}>
          {value ? (
            <Image src={value} alt="" fill className="object-cover" unoptimized />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {uploading ? 'Yükleniyor...' : value ? 'Değiştir' : 'Görsel Yükle'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                disabled={uploading}
                className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Kaldır
              </button>
            )}
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="veya URL yapıştırın"
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-700 focus:border-gray-900 focus:outline-none"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
