import { Metadata } from 'next';
import Image from 'next/image';
import { getAboutPage } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hakkımda',
  description: 'Zeki Sertan Çelik hakkında detaylı bilgi. Kariyer yolculuğu, vizyonu ve hedefleri.',
};

export default async function HakkimdaPage() {
  const data = await getAboutPage();

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">{data.heroLabel}</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
              {data.heroTitle}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-500 leading-relaxed max-w-3xl mb-12">
              {data.heroSubtitle}
            </p>

            {data.stats.length > 0 && (
              <div className="flex flex-wrap gap-12 pt-8 border-t border-gray-200">
                {data.stats.map((s, i) => (
                  <div key={i}>
                    <span className="block text-4xl font-semibold text-gray-900">{s.value}</span>
                    <span className="text-sm text-gray-500">{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="aspect-3/4 relative overflow-hidden bg-gray-200">
                  {data.profileImage && (
                    <Image
                      src={data.profileImage}
                      alt={data.heroTitle}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
                <div className="mt-6 flex gap-4 text-sm text-gray-500">
                  <span>{data.profileLocation}</span>
                  <span>•</span>
                  <span>{data.profileBirth}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-12">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">{data.whoHeading}</h2>
                <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                  {data.whoParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>

              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">{data.educationHeading}</h2>
                <div className="space-y-4">
                  {data.education.map((edu, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-200">
                      <span className="text-xs uppercase tracking-widest text-gray-400 w-20 shrink-0 pt-1">{edu.type}</span>
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
              &quot;{data.quote1Text}&quot;
            </p>
            <footer className="mt-8 text-gray-400">{data.quote1Footer}</footer>
          </blockquote>
        </div>
      </section>

      {/* Break Image */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gray-200">
          {data.breakImage ? (
            <Image src={data.breakImage} alt="" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">İş / Profesyonel Fotoğraf</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Business */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.businessLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                {data.businessTitle}
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">{data.businessDescription}</p>
            </div>

            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 gap-4">
                {data.businessAreas.map((area, i) => (
                  <div key={i} className="group p-6 bg-gray-50 hover:bg-gray-900 transition-colors">
                    <span className="text-3xl font-light text-gray-200 group-hover:text-gray-700 transition-colors">
                      {String(i + 1).padStart(2, '0')}
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

      {/* Character */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-square bg-gray-200 overflow-hidden">
              {data.characterImage ? (
                <Image src={data.characterImage} alt="" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm">Portre Fotoğrafı</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.characterLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-10">
                {data.characterTitle}
              </p>

              <div className="space-y-0">
                {data.characteristics.map((item, i) => (
                  <div key={i} className="flex items-start gap-6 py-4 border-b border-gray-200 last:border-0">
                    <span className="text-2xl font-light text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-gray-600 pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Struggle */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8">{data.struggleLabel}</h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-gray-300">
              {data.struggleText}
            </p>
            <p className="text-4xl md:text-5xl font-semibold leading-tight whitespace-pre-line">
              {data.struggleHighlight}
            </p>
            <p className="text-lg text-gray-400 mt-10">{data.struggleFooter}</p>
          </div>
        </div>
      </section>

      {/* Political */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 md:p-16 flex items-center">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.politicalLabel}</h2>
                <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                  {data.politicalTitle}
                </p>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {data.politicalDescription}
                </p>

                <div className="space-y-3">
                  {data.politicalStances.map((stance, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-px bg-gray-900" />
                      <span className="text-gray-700">{stance.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 mt-6 italic">{data.politicalFooter}</p>
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-auto bg-gray-100">
              {data.politicalImage ? (
                <Image src={data.politicalImage} alt="" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-sm">Siyasi Etkinlik Fotoğrafı</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Today */}
      <section className="py-32 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.todayLabel}</h2>
            <p className="text-xl text-gray-600 mb-16">{data.todayDescription}</p>

            <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">{data.summaryLabel}</p>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8">
              &quot;{data.summaryQuote}&quot;
            </blockquote>
            <div className="w-16 h-1 bg-gray-900 mx-auto" />
          </div>
        </div>
      </section>
    </main>
  );
}
