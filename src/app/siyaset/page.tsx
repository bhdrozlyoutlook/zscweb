import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Siyaset',
  description: 'Zeki Sertan Çelik - Anahtar Parti Kurucu Üyesi ve Genel Başkan Başdanışmanı. Millet için yola çıkan bir gönlün hikâyesi.',
};

const partySpirit = [
  "Kirlenmemiş bir siyaset dili",
  "Devlet-millet bütünlüğünü önceleyen bir anlayış",
  "Adaletin gölgesinde büyüyen bir vizyon",
  "Ötekileştirmeyen, birleştiren bir duruş",
  "Milli kimliğini ve manevi değerlerini koruyan bir tavır",
];

const advisorRoles = [
  { title: "Politika Geliştirme", desc: "Stratejik politika oluşturma ve analiz" },
  { title: "Diplomasi", desc: "Uluslararası ilişkiler ve diplomasi" },
  { title: "Teşkilat Yapılanması", desc: "Organizasyonel geliştirme" },
  { title: "Saha Analizleri", desc: "Toplum ve saha analizleri" },
  { title: "Stratejik Planlama", desc: "Uzun vadeli vizyon belirleme" },
  { title: "Değerler Temsili", desc: "Milli ve manevi değerlerin siyasette temsili" },
];

const futureVision = [
  "Gençlerin önünü açan",
  "Ahlâkı siyasetin merkezine koyan",
  "Devletin vakarını koruyan",
  "Milletin gönlünü incitmeyen",
  "Adaletin yanında, haksızın karşısında duran",
];

export default function SiyasetPage() {
  return (
    <main>
      {/* Hero Section - Minimal Text Based */}
      <section className="pt-32 pb-20 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Siyaset</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
              Millet İçin Yola Çıkan<br />
              <span className="text-gray-400 font-light">Bir Gönlün Hikâyesi</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-500 leading-relaxed max-w-3xl mb-12">
              Siyaset hayatım; makam arayışıyla değil, milletime ve devletime duyduğum sadakatin bir gereği olarak başladı.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-12 pt-8 border-t border-gray-200">
              <div>
                <span className="block text-4xl font-semibold text-gray-900">Anahtar</span>
                <span className="text-sm text-gray-500">Parti Kurucu Üyesi</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-gray-900">Başdanışman</span>
                <span className="text-sm text-gray-500">Genel Başkan</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-gray-900">Milli</span>
                <span className="text-sm text-gray-500">Değerler Odaklı</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-28 bg-gray-900 text-white">
        <div className="container">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              &quot;Fayda üretmeyen bir ömür, <span className="text-gray-500">eksik bir ömürdür.</span>&quot;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Why Politics Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Yola Çıkış</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                İnandım ki bu ülkenin yükü, omuz vermek isteyen herkesin omuzunda hafifler.
              </p>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  Ben de gençliğimin enerjisiyle, aldığım eğitimlerin birikimiyle ve içimde
                  büyüyen sorumluluk hissiyle bu yükün altına girmeyi kendime vazife bildim.
                </p>
                <p>
                  Çocukluğumdan beri şuna inandım: Siyaset benim için bir üstünlük değil;
                  millete hizmet etmek için açılan en geniş kapıdır.
                </p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Saha Çalışması</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-gray-900 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Anahtar Parti Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">28 Ekim 2024</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
                  Anahtar Parti&apos;nin<br />Kurucu Üyesi
                </h2>
              </div>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  Anahtar Parti, Türkiye&apos;nin yarınlarına dair temiz bir heyecanın ve sağduyulu bir arayışın adıdır.
                </p>
                <p>
                  Bu partinin kuruluşunda yer almak; benim için bir &quot;siyasi pozisyon&quot; değil,
                  milletimin geleceğine dair duyduğum mesuliyetin bir tezahürü oldu.
                </p>
              </div>
            </div>

            {/* Party Spirit Grid */}
            <div className="bg-gray-50 p-8 md:p-12">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">Anahtar Parti&apos;nin Kuruluş Ruhu</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partySpirit.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white">
                    <span className="text-2xl font-light text-gray-300">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-gray-700 pt-1">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mt-8 pt-8 border-t border-gray-200 text-center italic">
                &quot;Ben de bu ruha gönlümle ve aklımla katkı sunmaya devam ediyorum.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image Break */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm">Parti Etkinliği / Kongre Fotoğrafı</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container">
            <p className="text-white text-2xl md:text-3xl font-light max-w-2xl">
              Siyasette duruşu en kıymetli şey olarak gördüm.
            </p>
          </div>
        </div>
      </section>

      {/* Advisor Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Genel Başkan Başdanışmanlığı</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                Omuz Omuza Bir Yürüyüş
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Sayın Yavuz Ağıralioğlu ile yol arkadaşlığım; sadece bir &quot;danışmanlık&quot; değil,
                devlet ve millet adına dertlenen iki insanın omuz omuza verdiği bir yürüyüştür.
              </p>
              <blockquote className="text-xl text-gray-500 leading-relaxed border-l-2 border-gray-300 pl-6 italic">
                &quot;Sayın Genel Başkanımızın vakur tavrı, samimiyeti ve milletle kurduğu gönül bağı
                benim için büyük bir ilham kaynağıdır.&quot;
              </blockquote>
            </div>

            {/* Right - Roles Grid */}
            <div className="lg:col-span-3">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Sorumluluk Alanlarım</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {advisorRoles.map((role, index) => (
                  <div key={index} className="group p-6 bg-white border border-gray-200 hover:border-gray-900 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-light text-gray-200 group-hover:text-gray-900 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{role.title}</h3>
                        <p className="text-sm text-gray-500">{role.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Political Vision Section - Three Pillars */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Siyasete Bakışım</h2>
            <p className="text-3xl md:text-4xl font-light text-white">
              Üç Temel Sütun
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {/* Pillar 1 */}
            <div className="relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-800">
              <div className="text-8xl font-light text-gray-800 absolute top-4 right-4">01</div>
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-6">Devlet Ciddiyeti</h3>
                <p className="text-gray-400 leading-relaxed">
                  Devlet, şahsi hesaplarla değil, kutsiyet hissiyle taşıdığımız bir emanettir.
                  Bu emanetin ağırlığı; dilimizi, duruşumuzu ve kararlarımızı belirler.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-800">
              <div className="text-8xl font-light text-gray-800 absolute top-4 right-4">02</div>
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-6">Milletin Haysiyeti</h3>
                <p className="text-gray-400 leading-relaxed">
                  Her şeyin başı millettir. Bir siyasetçi, milletinin izzetini korur;
                  bölmez, ayırmaz, ayrıştırmaz. Görevi, milleti için siper olmaktır.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="relative p-8 md:p-12">
              <div className="text-8xl font-light text-gray-800 absolute top-4 right-4">03</div>
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-6">Manevi Kökler</h3>
                <p className="text-gray-400 leading-relaxed">
                  Kökü olmayanın gölgesi olmaz. Vatan sevgisi, bayrağa saygı, milli gelenekler,
                  aile yapısının korunması, merhamet ve adalet asla taviz verilmeyen değerlerdir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image + Future Vision Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative aspect-square lg:aspect-auto bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-sm">Meclis / Konuşma Fotoğrafı</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="bg-gray-50 p-8 md:p-16 flex items-center">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Yarına Dair Niyetim</h2>
                <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                  Ben bir makamdan ziyade, bir iz bırakmak istiyorum.
                </p>

                <div className="space-y-4 mb-8">
                  {futureVision.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-px bg-gray-900" />
                      <p className="text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="text-gray-500 italic">
                  bir yürüyüşün içinde olmayı sorumluluk görüyorum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Quote Section */}
      <section className="py-32 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">Siyasi Yolculuğumun Özeti</p>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8">
              &quot;Ömrüm yettiğince bu sorumluluğu taşımaya devam edeceğim.&quot;
            </blockquote>
            <div className="w-16 h-1 bg-gray-900 mx-auto" />
          </div>
        </div>
      </section>
    </main>
  );
}
