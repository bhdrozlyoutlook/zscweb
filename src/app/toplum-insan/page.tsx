import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Toplum & İnsan',
  description: 'Zeki Sertan Çelik - Sivil toplum, gönüllülük ve uluslararası üyelikler. İnsan için, toplum için, ülkem için fayda üretmek.',
};

const familyFoundationWork = [
  "Aile yapısının modern dünyada karşılaştığı tehditlere karşı bilinç artırma programları",
  "Genç ailelere yönelik rehberlik ve destek projeleri",
  "Kadın, çocuk ve aile bütünlüğünü koruyan toplumsal projeler",
  "Ahlaki ve kültürel değerlerimizi koruyarak gelecek nesilleri destekleme çalışmaları",
];

const youthLeadershipWork = [
  "Genç girişimcilere mentorluk yapılması",
  "Küresel liderlik programlarının Türkiye ile entegrasyonu",
  "Yeni neslin uluslararası ağlarda görünürlüğünün artırılması",
  "Girişimci ruhu destekleyen projelerin geliştirilmesi",
  "Gençler arası sosyal diplomasi çalışmalarının sürdürülmesi",
];

const volunteerOrgs = [
  {
    name: "Darülaceze",
    desc: "Yıllardır emek ve merhametle hizmet veren bu önemli kurumda gönüllülük yapmak, insana dair en sahici duyguları hatırlatır.",
    quote: "İnsanların yalnız bırakılmadığı bir Türkiye hayalimde Darülaceze özel bir yere sahiptir.",
  },
  {
    name: "AFAD",
    desc: "Afetlerde devlet–millet omuz omuza olmalıdır. AFAD gönüllüsü olarak hem eğitimlere katılıyor hem de ihtiyaç hâlinde sahaya destek oluyorum.",
    quote: "Dayanışmayı bir görev olarak görüyorum.",
  },
  {
    name: "TEMA Vakfı",
    desc: "Toprakla bağını kaybetmiş toplumların geleceği olmaz. TEMA'daki gönüllülük faaliyetlerimle doğayı koruyan bir yaklaşımı destekliyorum.",
    quote: "Gelecek nesillere emaneti sağlıklı devretmek.",
  },
];

const internationalMemberships = [
  {
    org: "Dünya Ticaret Örgütü (WTO)",
    parent: "Birleşmiş Milletler",
    desc: "Küresel ticaret standartlarını, düzenlemelerini ve uluslararası rekabet alanlarını yakından takip ediyorum.",
  },
  {
    org: "ICC – Uluslararası Ticaret Odası",
    parent: "International Chamber of Commerce",
    desc: "Dünya ticaretinin en güçlü çatı kuruluşlarından birinde iş yapma modelleri ve global ticaret kurallarını takip ediyorum.",
  },
  {
    org: "TİM – Türkiye İhracatçılar Meclisi",
    parent: "Türkiye",
    desc: "Türkiye'nin ihracat vizyonuna katkı sunan projelerde bulunuyor, ülkemizin üretim ve dış ticaret hedeflerine paralel çalışmalar yapıyorum.",
  },
  {
    org: "JCI – Junior Chamber International",
    parent: "100+ Ülke",
    desc: "Genç profesyonellerin liderlik, girişimcilik ve sosyal sorumluluk alanlarında gelişimini destekleyen projelerde yer alıyorum.",
  },
];

const pastOrganizations = ["MÜSİAD", "DEİK – Dış Ekonomik İlişkiler Kurulu", "PAGEV – Türk Plastik Sanayicileri Araştırma Geliştirme ve Eğitim Vakfı"];

const humanCenteredApproach = [
  { action: "Bir ailenin derdine yetişmek", icon: "heart" },
  { action: "Gençlerin önünü açmak", icon: "star" },
  { action: "Doğaya sahip çıkmak", icon: "leaf" },
  { action: "Uluslararası platformlarda Türkiye'nin gücünü görünür kılmak", icon: "globe" },
];

export default function ToplumInsanPage() {
  return (
    <main>
      {/* Hero Section - Minimal Text Based */}
      <section className="pt-32 pb-20 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Toplum & İnsan</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
              Sivil Toplum ve<br />
              <span className="text-gray-400 font-light">Gönüllülük Yolculuğum</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-500 leading-relaxed max-w-3xl mb-12">
              &quot;Bir insanın dokunduğu yüzler değişir, dokunduğu toplum dönüşür.&quot;
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-12 pt-8 border-t border-gray-200">
              <div>
                <span className="block text-4xl font-semibold text-gray-900">3+</span>
                <span className="text-sm text-gray-500">Gönüllülük Kurumu</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-gray-900">4</span>
                <span className="text-sm text-gray-500">Uluslararası Üyelik</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-gray-900">Aile</span>
                <span className="text-sm text-gray-500">Vakfı Mütevelli Üyesi</span>
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
              &quot;Eğer bir yanlışlık varsa düzeltmek için <span className="text-gray-500">önce ben harekete geçmeliyim.</span>&quot;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Seyirci Kalmama İradesi</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                Çocukluğumdan beri hayatımın yönünü belirleyen en güçlü özellik.
              </p>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  İlkokulda satranç kulüplerinden münazara gruplarına, spor ve öğrenci
                  temsilciliklerinden sosyal sorumluluk etkinliklerine kadar her alanda
                  örgütleyen, sorumluluk alan, elini taşın altına koyan bir yapım vardı.
                </p>
                <p>
                  Bugün geldiğim noktada, iş dünyasında, siyasette ve sivil toplumda
                  yürüttüğüm her görevde bu duyguyu merkezimde tutuyorum:
                </p>
                <p className="text-gray-900 font-medium text-xl">
                  İnsan için, toplum için, ülkem için fayda üretmek.
                </p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-sm">Sivil Toplum Etkinliği Fotoğrafı</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gray-900 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Family Foundation Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Aile & Toplum</h2>
              <p className="text-lg text-gray-900 font-medium mb-4">
                İstanbul Aile Vakfı Mütevelli Heyeti Üyesi
              </p>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                Toplumun en temel taşı ailedir.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                İstanbul Aile Vakfı&apos;nda mütevelli heyeti üyesi olarak,
                hem Türkiye&apos;de hem de küresel ölçekte aile kurumunun güçlendirilmesi için çalışmalar yürütüyoruz.
              </p>
              <blockquote className="text-xl text-gray-500 leading-relaxed border-l-2 border-gray-300 pl-6 italic">
                &quot;Aile, benim için sadece bir kurum değil; milletin direncini ayakta tutan omurgadır.&quot;
              </blockquote>
            </div>

            {/* Right - Work Areas */}
            <div className="lg:col-span-3">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Bu Kapsamda</p>
              <div className="grid gap-4">
                {familyFoundationWork.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white border border-gray-200 hover:border-gray-400 transition-colors">
                    <span className="text-2xl font-light text-gray-200">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-gray-700 pt-1">{item}</p>
                  </div>
                ))}
              </div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-sm">Gönüllülük / Sosyal Sorumluluk Fotoğrafı</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container">
            <p className="text-white text-2xl md:text-3xl font-light max-w-2xl">
              Gençliğe inanan, genç beynin dinamizmini ve üretkenliğini en büyük sermaye olarak gören biriyim.
            </p>
          </div>
        </div>
      </section>

      {/* Youth Leadership Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-square lg:aspect-auto bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-sm">Liderlik Etkinliği Fotoğrafı</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-gray-50 p-8 md:p-16 flex items-center">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Gençler & Liderlik</h2>
                <p className="text-lg text-gray-900 font-medium mb-4">
                  Uluslararası Genç Liderler ve Girişimciler Platformu Başkan Yardımcısı
                </p>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Gençler hak ettikleri fırsatları bulduklarında yalnızca kendi hayatlarını değil,
                  toplumun kaderini de değiştirebilecek potansiyele sahiptir.
                </p>

                <div className="space-y-3">
                  {youthLeadershipWork.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-px bg-gray-900" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section - Three Cards */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Sosyal Sorumluluk</h2>
            <p className="text-2xl md:text-3xl font-light text-gray-300 mb-4">
              Hayatım boyunca iyiliğin mümkün olan en sade hâlini önemsedim.
            </p>
            <p className="text-gray-500">
              Bu yüzden gönüllülük, benim için bir &quot;hobi&quot; değil; bir sorumluluk biçimidir.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {volunteerOrgs.map((org, index) => (
              <div key={index} className="relative p-8 border border-gray-800 hover:border-gray-700 transition-colors">
                <span className="text-7xl font-light text-gray-800 absolute top-4 right-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <h3 className="text-2xl font-semibold mb-4">{org.name}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{org.desc}</p>
                  <p className="text-sm text-gray-500 italic border-t border-gray-800 pt-4">
                    &quot;{org.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Memberships Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Uluslararası Üyeliklerim & Ticari Diplomasi</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
                Dünyayı okumadan, Türkiye&apos;yi güçlendiremezsiniz.
              </p>
            </div>
            <div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Bu nedenle hem ticarette hem de uluslararası ilişkilerde farklı küresel çatı kurumlarda aktif üyeliklerim bulunuyor.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {internationalMemberships.map((membership, index) => (
              <div key={index} className="group p-8 bg-white border border-gray-200 hover:border-gray-900 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl font-light text-gray-100 group-hover:text-gray-200 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1">{membership.parent}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{membership.org}</h3>
                <p className="text-gray-500">{membership.desc}</p>
              </div>
            ))}
          </div>

          {/* Past Organizations */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Geçmişte Rol Aldığım Kurumlar</p>
            <div className="flex flex-wrap gap-4">
              {pastOrganizations.map((org, index) => (
                <span key={index} className="px-6 py-3 bg-white border border-gray-200 text-gray-600">
                  {org}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Human Centered Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">İnsan Merkezli Bir Yolculuk</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
                Ekonomide, siyasette, sivil toplumda ve sosyal yaşamda attığım her adımın ortak bir noktası var:
              </p>
              <p className="text-2xl text-gray-500 mt-6">İnsanı merkeze almak.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {humanCenteredApproach.map((item, index) => (
                <div key={index} className="p-6 bg-gray-50 text-center">
                  <span className="text-4xl font-light text-gray-200 mb-4 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-gray-700">Yeri geldiğinde {item.action.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-32 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-500 mb-8">Hayatım boyunca şuna inandım:</p>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-10">
              &quot;Topluma dokunamayan bir insan, ne kadar başarı elde ederse etsin eksiktir.&quot;
            </blockquote>
            <div className="w-16 h-1 bg-gray-900 mx-auto mb-10" />
            <p className="text-xl text-gray-600 mb-4">
              Bu yüzden yolculuğumun bütününde derdim hep aynı kaldı:
            </p>
            <p className="text-2xl text-gray-900 font-medium">
              Ellerimi cebime değil, meselelerin üzerine koymak.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
