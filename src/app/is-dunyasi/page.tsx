import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'İş Dünyası',
  description: 'Zeki Sertan Çelik - Üreten Türkiye\'nin genç bir girişimcisi olarak, yerelden dünyaya uzanan bir yolculuk.',
};

const businessVision = [
  "Ülkeye değer katmak",
  "İnsanlara istihdam sağlamak",
  "Yurt içinde ve yurt dışında Türkiye'nin adını güçlendirmek",
  "Üretim ve ticarete yeni bir nefes getirmek",
  "Gençlere örnek olabilecek bir ekosistem yaratmak",
];

const expertiseAreas = [
  { title: "Çelik Konstrüksiyon", desc: "Büyük ölçekli endüstriyel yapıların üretimi ve kurulumu", icon: "building" },
  { title: "OSB Projeleri", desc: "Organize Sanayi Bölgeleri içinde modern tesis projelendirme", icon: "factory" },
  { title: "Uluslararası Ticaret", desc: "Tedarik zinciri yönetimi ve dış ticaret", icon: "globe" },
  { title: "Teknoloji Tedariki", desc: "Uzak Doğu başta olmak üzere ileri teknoloji ürün ve makine tedariki", icon: "chip" },
  { title: "Yatırım Danışmanlığı", desc: "Türkiye'de üretim yapan şirketlere stratejik danışmanlık", icon: "chart" },
  { title: "Kamu İş Birlikleri", desc: "Kamu kurumlarıyla proje bazlı iş birlikleri", icon: "handshake" },
];

const futureGoals = [
  "Global markalar çıkaran bir girişimcilik çizgisi oluşturmak",
  "Endüstriyel yapılarda verimliliği artıran yeni modeller geliştirmek",
  "Daha hızlı, modern ve modüler üretim yapıları inşa etmek",
  "Türkiye'nin stratejik sektörlerde ihracat kapasitesini büyütmek",
  "Gençlere ilham verecek yeni girişim ekosistemleri oluşturmak",
  "Kamu–özel sektör iş birliklerini uzun vadeli kalkınma planlarına dönüştürmek",
];

const characterTraits = [
  { title: "Mütevazı ama bilinçli", desc: "Ayakları yere basan" },
  { title: "Vizyonu yüksek", desc: "Kibirden uzak" },
  { title: "Dünyayı takip eden", desc: "Halkın arasında" },
  { title: "Sözünü işine yansıtan", desc: "Üreten, emek veren" },
];

export default function IsDunyasiPage() {
  return (
    <main>
      {/* Hero Section - Minimal Text Based */}
      <section className="pt-32 pb-20 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">İş Dünyası</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
              Üreten Türkiye&apos;nin<br />
              <span className="text-gray-400 font-light">Genç Girişimcisi</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-500 leading-relaxed max-w-3xl mb-12">
              Yerelden dünyaya uzanan bir yolculuk… Türkiye&apos;nin imkânlarına inanan,
              üretim gücünü kendi potansiyeliyle birleştiren genç bir iş insanı.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-12 pt-8 border-t border-gray-200">
              <div>
                <span className="block text-4xl font-semibold text-gray-900">31</span>
                <span className="text-sm text-gray-500">Yaş</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-gray-900">6</span>
                <span className="text-sm text-gray-500">Sektör</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-gray-900">15+</span>
                <span className="text-sm text-gray-500">Yıl Tecrübe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Quote */}
      <section className="py-28 bg-gray-900 text-white">
        <div className="container">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              &quot;Türkiye&apos;nin yarınını <span className="text-gray-300">bugünden hazırlamak.</span>&quot;
            </p>
            <footer className="mt-6 text-gray-400">İş dünyasında attığım her adımın temel motivasyonu budur.</footer>
          </blockquote>
        </div>
      </section>

      {/* About Business Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                <Image
                  src="/images/gallery/profile.png"
                  alt="Zeki Sertan Çelik"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gray-900 -z-10" />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">İş Dünyasına Bakışım</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                Ben kendimi hiçbir zaman sadece &quot;iş adamı&quot; olarak tanımlamadım.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Benim için girişimcilik, ülkesinin geleceğini dert eden, sorumluluk üstlenen
                ve attığı her adımı bir değere dönüştürmeye çalışan bir insanın yolculuğudur.
              </p>

              <div className="bg-white p-8 border border-gray-200">
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Benim İçin Girişimcilik</p>
                <div className="space-y-3">
                  {businessVision.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="text-gray-300 font-light">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Vision - Full Width */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="bg-gray-900 text-white p-8 md:p-16 flex items-center">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Türkiye Merkezli Global Vizyon</h2>
                <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
                  Türkiye, doğru stratejiler ve doğru yatırımlarla sadece bölgesinde değil,
                  küresel ölçekte söz sahibi bir üretim ve teknoloji üssü olabilir.
                </p>
                <p className="text-gray-400">
                  Bu inançla hareket ediyor; yükte hafif, pahada ağır ürünlere yönelen,
                  katma değerli üretimi destekleyen, uluslararası pazarlara entegre stratejik
                  sektörlerde ilerleyen bir yaklaşımı benimsiyorum.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-square lg:aspect-auto bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">Global Ticaret / Dünya Haritası</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Deneyim ve Uzmanlık Alanlarım</h2>
            <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug max-w-3xl mx-auto">
              Şu ana kadarki iş hayatımda çok farklı alanlarda tecrübe biriktirdim.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="group relative p-8 bg-white border border-gray-200 hover:border-gray-900 transition-all hover:-translate-y-1">
                <span className="absolute top-8 right-8 text-5xl font-light text-gray-100 group-hover:text-gray-200 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-500">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed">
              &quot;Gerçek başarı, doğru insanlarla doğru zamanda kurulan sağlam iş birliklerinin sonucudur.&quot;
            </p>
            <footer className="mt-4 text-gray-500">Bu süreçte edindiğim en önemli tecrübe bu oldu.</footer>
          </blockquote>
        </div>
      </section>

      {/* Two Sources Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Ülkem İçin Çalışan Bir Girişimci</h2>
            <p className="text-2xl md:text-3xl font-light text-gray-300">
              Girişimci ruhumun beslendiği iki ana kaynak var:
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 max-w-5xl mx-auto">
            {/* Source 1 */}
            <div className="relative p-12 md:p-16 border-b lg:border-b-0 lg:border-r border-gray-800">
              <div className="absolute top-8 left-8 text-9xl font-light text-gray-800/50">01</div>
              <div className="relative pt-16">
                <h3 className="text-3xl font-semibold mb-6">Türkiye&apos;nin Potansiyeli</h3>
                <p className="text-gray-400 leading-relaxed">
                  Bu toprakların gücüne inanıyorum. Doğru projeler, doğru ekipler, akılcı planlama
                  ve inovasyon merkezli bir iş anlayışıyla Türkiye&apos;nin global yarışta daha güçlü
                  aktörlerden biri olacağına eminim.
                </p>
              </div>
            </div>

            {/* Source 2 */}
            <div className="relative p-12 md:p-16">
              <div className="absolute top-8 left-8 text-9xl font-light text-gray-800/50">02</div>
              <div className="relative pt-16">
                <h3 className="text-3xl font-semibold mb-6">Gençlerin Geleceği</h3>
                <p className="text-gray-400 leading-relaxed">
                  Kurduğum her girişimde; sürdürülebilir, verimli, katma değer yaratan,
                  gençlere fırsat açan, ülkenin üretim kültürünü güçlendiren bir anlayışla hareket ediyorum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision + Image */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Yarın İçin Vizyonum</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                Türkiye&apos;nin üretim gücünü uluslararası seviyede daha görünür ve etkili kılmak.
              </p>

              <div className="space-y-4">
                {futureGoals.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-px bg-gray-900 mt-3" />
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>

              <blockquote className="mt-10 pt-10 border-t border-gray-200">
                <p className="text-xl font-light text-gray-900 italic">
                  &quot;Ülkemin yararına olan her iş, benim için en doğru iştir.&quot;
                </p>
              </blockquote>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-sm">Büyüme / İstatistik Görseli</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-gray-900 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Character Traits */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Mütevazı Ama Kararlı Bir Yolculuk</h2>
              <p className="text-xl text-gray-600">İş dünyasında kendimi böyle tanımlıyorum:</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {characterTraits.map((trait, index) => (
                <div key={index} className="p-6 bg-white border border-gray-200 text-center">
                  <p className="text-lg font-medium text-gray-900 mb-2">{trait.title}</p>
                  <p className="text-sm text-gray-500">{trait.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8">
              &quot;Her geçen gün, bu yolculuğu daha da güçlendirmek için çalışıyorum.&quot;
            </blockquote>
            <div className="w-16 h-1 bg-gray-900 mx-auto" />
          </div>
        </div>
      </section>
    </main>
  );
}
