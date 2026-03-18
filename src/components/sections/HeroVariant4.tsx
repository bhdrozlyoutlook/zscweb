// Variant 4: Asimetrik - Fotoğraf büyük bir köşede, metin diğer köşede
import Link from 'next/link';
import Image from 'next/image';

export default function HeroVariant4() {
  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      {/* Large Background Image - Right Side */}
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full">
        <Image
          src="/images/gallery/profile.png"
          alt="Zeki Sertan Çelik"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:via-white/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 min-h-screen flex items-center">
        <div className="py-32 max-w-xl">
          {/* Vertical Line Accent */}
          <div className="flex items-start gap-8 mb-8">
            <div className="w-px h-24 bg-gray-900" />
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Portfolio</p>
              <p className="text-sm text-gray-400">İş İnsanı • Siyasetçi • Sivil Toplum</p>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 leading-none mb-8">
            Zeki Sertan
            <span className="block text-gray-400 font-light">Çelik</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Topluma değer katmak, fayda üretmek ve hakkı tutup kaldırmak için çalışıyorum.
            15 yılı aşkın deneyimle sanayi, ticaret ve sivil toplum alanlarında aktif rol alıyorum.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-8">
            <Link
              href="/hakkimda"
              className="group flex items-center gap-4"
            >
              <span className="w-14 h-14 rounded-full border-2 border-gray-900 flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                <svg className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="font-medium text-gray-900">Keşfet</span>
            </Link>

            <Link
              href="/iletisim"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              İletişim
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex gap-8 mt-16 pt-8 border-t border-gray-200">
            <div>
              <div className="text-4xl font-light text-gray-900">15<span className="text-xl">+</span></div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Yıl</div>
            </div>
            <div>
              <div className="text-4xl font-light text-gray-900">6</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Alan</div>
            </div>
            <div>
              <div className="text-4xl font-light text-gray-900">3</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Derece</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Label */}
      <div className="absolute bottom-8 right-8 text-right hidden lg:block">
        <p className="text-xs uppercase tracking-widest text-gray-400">Istanbul, Türkiye</p>
        <p className="text-xs text-gray-300 mt-1">2024</p>
      </div>
    </section>
  );
}
