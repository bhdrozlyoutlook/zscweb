import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hakkımda',
  description: 'Zeki Sertan Çelik hakkında detaylı bilgi. Kariyer yolculuğu, vizyonu ve hedefleri.',
};

const businessAreas = [
  { title: "Sanayi Yapıları", desc: "Endüstriyel tesis projeleri" },
  { title: "İthalat – İhracat", desc: "Uluslararası ticaret" },
  { title: "Çelik Konstrüksiyon", desc: "Yapısal çelik çözümleri" },
  { title: "Sanayi Yatırımları", desc: "Stratejik yatırım danışmanlığı" },
  { title: "OSB Projeleri", desc: "Organize sanayi bölgeleri" },
  { title: "Teknoloji Geliştirme", desc: "İnovasyon ve Ar-Ge" },
];

const characteristics = [
  "Merhametli biriyim.",
  "Empati gücüm yüksektir; muhatabımı anlamadan konuşmam.",
  "Hizmetkâr liderliğe inanırım; başkanlık değil sorumluluk duygusu taşırım.",
  "Yalnız kalmayı severim ama toplumsal sorumluluk gerektiğinde kimseyi beklemeden harekete geçerim.",
  "Yolda taşı kaldırırım; rahatsız olmayana da rahatsızlık verircesine anlatırım.",
  "Kibirden hoşlanmam; markacı değil kaliteciyim.",
  "İyi bir evlat, iyi bir dost, iyi bir vatandaş olmayı önemserim.",
];

const education = [
  { school: "İstanbul Sabahattin Zaim Üniversitesi", field: "İngilizce Siyaset Bilimi ve Uluslararası İlişkiler", type: "Lisans" },
  { school: "Rhein-Waal Üniversitesi, Almanya", field: "Uluslararası İlişkiler Eğitimi", type: "Değişim" },
  { school: "Marmara Üniversitesi", field: "Dış Ticaret", type: "Yüksek Lisans" },
];

const politicalStances = [
  "Diplomasiye hâkim",
  "Siyaset bilimi eğitimi almış",
  "Yerelden evrensele bakan bir perspektife sahip",
  "Kutuplaşmayı değil sağduyuyu önceleyen",
];

export default function HakkimdaPage() {
  return (
    <main>
      {/* Hero Section - Minimal Text Based */}
      <section className="pt-32 pb-20 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Hakkımda</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
              Zeki Sertan Çelik
            </h1>
            <p className="text-2xl md:text-3xl text-gray-500 leading-relaxed max-w-3xl mb-12">
              İş İnsanı, Siyasetçi ve Sivil Toplum Gönüllüsü olarak topluma değer katmayı hedefleyen bir yolculuk.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-12 pt-8 border-t border-gray-200">
              <div>
                <span className="block text-4xl font-semibold text-gray-900">1994</span>
                <span className="text-sm text-gray-500">İstanbul Doğumlu</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-gray-900">3</span>
                <span className="text-sm text-gray-500">Üniversite</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-gray-900">15+</span>
                <span className="text-sm text-gray-500">Yıl Deneyim</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-gray-900">6</span>
                <span className="text-sm text-gray-500">Faaliyet Alanı</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Image Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Image - 2 columns */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="aspect-[3/4] relative overflow-hidden bg-gray-200">
                  <Image
                    src="/images/gallery/profile.png"
                    alt="Zeki Sertan Çelik"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="mt-6 flex gap-4 text-sm text-gray-500">
                  <span>Istanbul, Türkiye</span>
                  <span>•</span>
                  <span>1994 doğumlu</span>
                </div>
              </div>
            </div>

            {/* Content - 3 columns */}
            <div className="lg:col-span-3 space-y-12">
              {/* Ben Kimim */}
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Ben Kimim?</h2>
                <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                  <p>
                    1994&apos;ün soğuk bir Aralık sabahında İstanbul&apos;da dünyaya geldim. Şehrin kalabalığında
                    değil ama insanının sıcaklığında büyüdüm.
                  </p>
                  <p>
                    İlkokul çağından önce sokakta su satarak başladığım ticaret yolculuğu, bugün yönettiğim
                    şirketlerin çatısı altında hâlâ aynı ruhla devam ediyor.
                  </p>
                </div>
              </div>

              {/* Eğitim */}
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Eğitim Yolculuğu</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white border border-gray-200">
                      <span className="text-xs uppercase tracking-widest text-gray-400 w-20 flex-shrink-0 pt-1">{edu.type}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{edu.school}</h3>
                        <p className="text-sm text-gray-500">{edu.field}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-28 bg-gray-900 text-white">
        <div className="container">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-4xl font-light leading-relaxed">
              &quot;Elimden geleni yapmak. Bir konuda faydam dokunacaksa, <span className="text-gray-500">kenarda durmamak.</span>&quot;
            </p>
            <footer className="mt-8 text-gray-500">Çocukluğumdan beri tek bir ortak çizgim bu oldu.</footer>
          </blockquote>
        </div>
      </section>

      {/* Full Width Image Break */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">İş / Profesyonel Fotoğraf</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">İş Dünyası</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                İlkokulda esprili plastik ataç satarak başlayan ticaret maceram
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Bugün sahip olduğum ve yönettiğim şirketlerde hâlâ aynı çocukluk heyecanı vardır:
                <span className="text-gray-900 font-medium"> Üretmek, değer katmak, insanlara fayda sağlamak.</span>
              </p>
            </div>

            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 gap-4">
                {businessAreas.map((area, index) => (
                  <div key={index} className="group p-6 bg-gray-50 hover:bg-gray-900 transition-colors">
                    <span className="text-3xl font-light text-gray-200 group-hover:text-gray-700 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-medium text-gray-900 group-hover:text-white mt-4 mb-1 transition-colors">{area.title}</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{area.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Character Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative aspect-square bg-gray-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm">Portre Fotoğrafı</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Karakterim</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-10">
                Kendimi anlatırken abartıya kaçmayı sevmem ama gerçekleri söylemekten de çekinmem.
              </p>

              <div className="space-y-0">
                {characteristics.map((item, index) => (
                  <div key={index} className="flex items-start gap-6 py-4 border-b border-gray-200 last:border-0">
                    <span className="text-2xl font-light text-gray-300">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-gray-600 pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Struggle Section - Full Width Dark */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8">İnsanlık ve Mücadele</h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-gray-300">
              Hayatım boyunca zulme, haksızlığa, hukuksuzluğa karşı tavır almayı
              hem dini, hem insani, hem ahlaki bir borç bildim.
            </p>
            <p className="text-4xl md:text-5xl font-semibold leading-tight">
              Gerekirse tek başıma da olsam<br />bir meydanda ses çıkarabilirim.
            </p>
            <p className="text-lg text-gray-400 mt-10">
              Ama bilirim ki kalıcı etki için ekip, omuzdaşlık ve ortak irade şarttır.
            </p>
          </div>
        </div>
      </section>

      {/* Political Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 md:p-16 flex items-center">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Siyasi Duruşum</h2>
                <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                  Siyaset benim için bir &quot;hedef&quot; değil, bir &quot;araçtır.&quot;
                </p>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Topluma fayda üretmenin, adaleti savunmanın, yanlış karşısında durmanın kurumsal dilidir.
                </p>

                <div className="space-y-3">
                  {politicalStances.map((stance, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-px bg-gray-900" />
                      <span className="text-gray-700">{stance}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 mt-6 italic">bir çizgiyi temsil ederim.</p>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-square lg:aspect-auto bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-sm">Siyasi Etkinlik Fotoğrafı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today Section - Closing */}
      <section className="py-32 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Bugün</h2>
            <p className="text-xl text-gray-600 mb-16">
              Sanayi yatırımları, üretim projeleri, teknoloji ve siyaset alanında eş zamanlı çalışmalar yürütüyorum.
            </p>

            <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">Yaşamımın Özeti</p>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8">
              &quot;İyi bir insan olmaya, fayda üretmeye ve hakkı tutup kaldırmaya çalışıyorum.&quot;
            </blockquote>
            <div className="w-16 h-1 bg-gray-900 mx-auto" />
          </div>
        </div>
      </section>
    </main>
  );
}
