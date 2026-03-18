// Variant 3: Merkezli Tasarım - Fotoğraf ortada, isim büyük
import Link from 'next/link';
import Image from 'next/image';

export default function HeroVariant3() {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-32">
        <div className="container">
          <div className="text-center">
            {/* Small Label */}
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-12">
              İş İnsanı / Siyasetçi / Sivil Toplum
            </p>

            {/* Profile Image */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-12">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src="/images/gallery/profile.png"
                  alt="Zeki Sertan Çelik"
                  fill
                  className="object-cover object-top scale-150"
                  priority
                />
              </div>
              {/* Ring */}
              <div className="absolute -inset-3 border border-gray-300 rounded-full" />
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 tracking-tight mb-6">
              ZEKİ SERTAN ÇELİK
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-12">
              Topluma değer katmak, fayda üretmek ve hakkı tutup kaldırmak için çalışıyorum.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <Link
                href="/hakkimda"
                className="px-8 py-4 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Hikayem
              </Link>
              <Link
                href="/iletisim"
                className="px-8 py-4 border border-gray-300 text-gray-700 font-medium hover:border-gray-900 transition-colors"
              >
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="border-t border-gray-200">
        <div className="container">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <div className="py-8 text-center">
              <div className="text-3xl font-light text-gray-900">15+</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Yıl Deneyim</div>
            </div>
            <div className="py-8 text-center">
              <div className="text-3xl font-light text-gray-900">6</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Faaliyet Alanı</div>
            </div>
            <div className="py-8 text-center">
              <div className="text-3xl font-light text-gray-900">3</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Üniversite</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
