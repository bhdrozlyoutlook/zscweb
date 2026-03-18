// Variant 1: Tam Ekran Fotoğraf - Fotoğraf arka planda, metin üzerinde
import Link from 'next/link';
import Image from 'next/image';

export default function HeroVariant1() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/profile.png"
          alt="Zeki Sertan Çelik"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">
            İş İnsanı • Siyasetçi • Sivil Toplum Gönüllüsü
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Zeki Sertan
            <br />
            Çelik
          </h1>

          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
            Topluma değer katmak, fayda üretmek ve hakkı tutup kaldırmak için çalışıyorum.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/hakkimda"
              className="px-8 py-4 bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
            >
              Hikayemi Keşfedin
            </Link>
            <Link
              href="/iletisim"
              className="px-8 py-4 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex justify-center gap-16">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Yıl Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Faaliyet Alanı</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Üniversite</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
