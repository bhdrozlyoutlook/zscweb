import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      {/* Left - Content */}
      <div className="flex items-center bg-white px-8 lg:px-16 xl:px-24 py-32">
        <div className="w-full max-w-xl">
          {/* Subtitle */}
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">
            İş İnsanı • Siyasetçi • Sivil Toplum
          </p>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight mb-6">
            Zeki Sertan <span className="text-gray-400 font-light">ÇELİK</span>
          </h1>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-gray-900 mb-6" />

          {/* Description */}
          <p className="text-lg text-gray-500 leading-relaxed mb-12">
            Topluma değer katmak, fayda üretmek ve hakkı tutup kaldırmak için çalışıyorum.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-200">
            <div>
              <div className="text-4xl font-semibold text-gray-900 mb-1">15<span className="text-2xl">+</span></div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Yıl Deneyim</div>
            </div>
            <div>
              <div className="text-4xl font-semibold text-gray-900 mb-1">6</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Faaliyet Alanı</div>
            </div>
            <div>
              <div className="text-4xl font-semibold text-gray-900 mb-1">3</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Üniversite</div>
            </div>
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
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>
    </section>
  );
}
