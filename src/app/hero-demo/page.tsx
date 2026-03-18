'use client';

import { useState } from 'react';
import HeroVariant1 from '@/components/sections/HeroVariant1';
import HeroVariant2 from '@/components/sections/HeroVariant2';
import HeroVariant3 from '@/components/sections/HeroVariant3';
import HeroVariant4 from '@/components/sections/HeroVariant4';

const variants = [
  { id: 1, name: 'Tam Ekran Fotoğraf', desc: 'Fotoğraf arka planda, metin üzerinde' },
  { id: 2, name: 'Split Minimal', desc: 'Sol metin, sağ fotoğraf - minimal' },
  { id: 3, name: 'Merkezli', desc: 'Fotoğraf ortada, isim büyük' },
  { id: 4, name: 'Asimetrik', desc: 'Fotoğraf köşede, dinamik yerleşim' },
];

export default function HeroDemoPage() {
  const [activeVariant, setActiveVariant] = useState(1);

  return (
    <div>
      {/* Selector Bar */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white shadow-lg rounded-full px-2 py-2 flex gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVariant(v.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeVariant === v.id
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {v.id}. {v.name}
          </button>
        ))}
      </div>

      {/* Active Hero */}
      {activeVariant === 1 && <HeroVariant1 />}
      {activeVariant === 2 && <HeroVariant2 />}
      {activeVariant === 3 && <HeroVariant3 />}
      {activeVariant === 4 && <HeroVariant4 />}

      {/* Info Box */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white shadow-lg rounded-lg px-6 py-4 text-center">
        <p className="font-medium text-gray-900">
          {variants.find(v => v.id === activeVariant)?.name}
        </p>
        <p className="text-sm text-gray-500">
          {variants.find(v => v.id === activeVariant)?.desc}
        </p>
      </div>
    </div>
  );
}
