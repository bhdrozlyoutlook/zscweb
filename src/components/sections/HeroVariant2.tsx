// Variant 2: Split Layout Minimal - Sol metin, sağ fotoğraf (daha minimal)
import Link from 'next/link';
import Image from 'next/image';

export default function HeroVariant2() {
  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      {/* Left - Content */}
      <div className="flex items-center bg-white px-8 lg:px-16 xl:px-24 py-32">
        <div className="w-full">
          {/* Top Info Row */}
          <div className="flex items-center gap-8 mb-12">
            <p className="text-sm text-gray-400">İş İnsanı</p>
            <span className="text-gray-300">•</span>
            <p className="text-sm text-gray-400">Siyasetçi</p>
            <span className="text-gray-300">•</span>
            <p className="text-sm text-gray-400">Sivil Toplum</p>
          </div>

          {/* Name - Horizontal */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-semibold text-gray-900 leading-none mb-8">
            Zeki Sertan <span className="font-light text-gray-400">Çelik</span>
          </h1>

          <div className="w-16 h-px bg-gray-900 mb-8" />

          <p className="text-lg text-gray-500 mb-10 max-w-lg">
            Topluma değer katmak, fayda üretmek ve hakkı tutup kaldırmak için çalışıyorum.
          </p>

          {/* Stats Row - Horizontal */}
          <div className="flex items-center gap-12 mb-12">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-gray-900">15+</span>
              <span className="text-sm text-gray-400">Yıl Deneyim</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-gray-900">6</span>
              <span className="text-sm text-gray-400">Faaliyet Alanı</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-gray-900">3</span>
              <span className="text-sm text-gray-400">Üniversite</span>
            </div>
          </div>

          {/* CTA Row */}
          <div className="flex items-center gap-6">
            <Link
              href="/hakkimda"
              className="group inline-flex items-center gap-4"
            >
              <span className="w-14 h-14 bg-gray-900 flex items-center justify-center group-hover:w-16 transition-all">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="font-medium text-gray-900">Hakkımda</span>
            </Link>

            <Link
              href="/iletisim"
              className="text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>

      {/* Right - Image */}
      <div className="relative bg-gray-100 min-h-[50vh] lg:min-h-screen">
        <Image
          src="/images/gallery/profile.png"
          alt="Zeki Sertan Çelik"
          fill
          className="object-cover object-top"
          priority
        />

        {/* Corner Label */}
        <div className="absolute bottom-8 left-8 bg-white px-6 py-4">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Lokasyon</p>
          <p className="text-sm font-medium text-gray-900">Istanbul, Türkiye</p>
        </div>
      </div>
    </section>
  );
}
