'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/types';

export default function GaleriPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/galeri').then((r) => r.json()).then(setGalleryItems);
  }, []);

  const categories = ['Tümü', ...new Set(galleryItems.map((item) => item.category))];
  const filteredItems = selectedCategory === 'Tümü' ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory);
  const selectedItem = galleryItems.find((i) => i.id === selectedImage);
  const currentIndex = selectedItem ? filteredItems.findIndex((i) => i.id === selectedImage) : -1;

  const goToPrev = () => { if (currentIndex > 0) setSelectedImage(filteredItems[currentIndex - 1].id); };
  const goToNext = () => { if (currentIndex < filteredItems.length - 1) setSelectedImage(filteredItems[currentIndex + 1].id); };

  return (
    <main>
      <section className="pt-32 pb-16 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Galeri</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
              Fotoğraf <span className="text-gray-400 font-light">Galerisi</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
              Etkinlikler, toplantılar ve önemli anlardan kareler.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 text-sm font-medium transition-all ${selectedCategory === category ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-400 hidden sm:block">{filteredItems.length} fotoğraf</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          {galleryItems.length === 0 ? (
            <div className="text-center py-32 text-gray-400">Yükleniyor...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedImage(item.id)}
                  className="group relative aspect-4/3 overflow-hidden bg-gray-200"
                >
                  {item.src && (
                    <Image src={item.src} alt={item.alt} fill className="object-cover" unoptimized />
                  )}
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/70 transition-all duration-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                      <span className="text-white text-sm font-medium">{item.category}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {filteredItems.length === 0 && galleryItems.length > 0 && (
            <div className="text-center py-32">
              <p className="text-gray-500 text-lg">Bu kategoride fotoğraf bulunamadı.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setSelectedImage(null)}>
          <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          {currentIndex > 0 && (
            <button onClick={(e) => { e.stopPropagation(); goToPrev(); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-white/60 hover:text-white transition-colors">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          {currentIndex < filteredItems.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-white/60 hover:text-white transition-colors">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
          <div className="max-w-6xl max-h-[85vh] w-full mx-20 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 bg-gray-900 flex items-center justify-center min-h-0 relative">
              <div className="relative w-full max-h-[70vh] aspect-4/3">
                {selectedItem.src && (
                  <Image src={selectedItem.src} alt={selectedItem.alt} fill className="object-contain" unoptimized />
                )}
              </div>
            </div>
            <div className="bg-black py-6 px-8 flex items-center justify-between">
              <div>
                <span className="text-white/60 text-sm">{selectedItem.category}</span>
                <p className="text-white mt-1">{selectedItem.description}</p>
              </div>
              <div className="text-white/40 text-sm">{currentIndex + 1} / {filteredItems.length}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
