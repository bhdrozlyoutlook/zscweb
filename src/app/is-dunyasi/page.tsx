import { Metadata } from 'next';
import Image from 'next/image';
import { getBusinessPage } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'İş Dünyası',
  description: "Zeki Sertan Çelik - Üreten Türkiye'nin genç bir girişimcisi olarak, yerelden dünyaya uzanan bir yolculuk.",
};

export default async function IsDunyasiPage() {
  const data = await getBusinessPage();

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">{data.heroLabel}</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
              {data.heroTitleLine1}
              <br />
              <span className="text-gray-400 font-light">{data.heroTitleLine2}</span>
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

      {/* Quote */}
      <section className="py-28 bg-gray-900 text-white">
        <div className="container">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              &quot;{data.quote1Text} <span className="text-gray-300">{data.quote1Highlight}</span>&quot;
            </p>
            <footer className="mt-6 text-gray-400">{data.quote1Footer}</footer>
          </blockquote>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-4/3 bg-gray-200 overflow-hidden relative">
                {data.aboutImage && (
                  <Image src={data.aboutImage} alt="" fill className="object-cover" unoptimized />
                )}
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gray-900 -z-10" />
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">{data.aboutLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                {data.aboutTitle}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {data.aboutDescription}
              </p>

              <div className="bg-white p-8 border border-gray-200">
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">{data.visionBoxLabel}</p>
                <div className="space-y-3">
                  {data.businessVision.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-gray-300 font-light">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="bg-gray-900 text-white p-8 md:p-16 flex items-center">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.globalLabel}</h2>
                <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8">{data.globalTitle}</p>
                <p className="text-gray-400">{data.globalDescription}</p>
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-auto bg-gray-200">
              {data.globalImage ? (
                <Image src={data.globalImage} alt="" fill className="object-cover" unoptimized />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm">{data.globalImageCaption}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.expertiseLabel}</h2>
            <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug max-w-3xl mx-auto">
              {data.expertiseTitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.expertiseAreas.map((area, i) => (
              <div key={i} className="group relative p-8 bg-white border border-gray-200 hover:border-gray-900 transition-all hover:-translate-y-1">
                <span className="absolute top-8 right-8 text-5xl font-light text-gray-100 group-hover:text-gray-200 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-500">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {data.expertiseQuote && (
            <blockquote className="mt-16 max-w-3xl mx-auto text-center">
              <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed">
                &quot;{data.expertiseQuote}&quot;
              </p>
              {data.expertiseQuoteFooter && <footer className="mt-4 text-gray-500">{data.expertiseQuoteFooter}</footer>}
            </blockquote>
          )}
        </div>
      </section>

      {/* Sources */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.sourcesLabel}</h2>
            <p className="text-2xl md:text-3xl font-light text-gray-300">{data.sourcesTitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 max-w-5xl mx-auto">
            {data.sources.map((s, i) => (
              <div
                key={i}
                className={`relative p-12 md:p-16 ${i < data.sources.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-gray-800' : ''}`}
              >
                <div className="absolute top-8 left-8 text-9xl font-light text-gray-800/50">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative pt-16">
                  <h3 className="text-3xl font-semibold mb-6">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.futureLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                {data.futureTitle}
              </p>

              <div className="space-y-4">
                {data.futureGoals.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-px bg-gray-900 mt-3" />
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>

              {data.futureQuote && (
                <blockquote className="mt-10 pt-10 border-t border-gray-200">
                  <p className="text-xl font-light text-gray-900 italic">
                    &quot;{data.futureQuote}&quot;
                  </p>
                </blockquote>
              )}
            </div>

            <div className="relative">
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                {data.futureImage ? (
                  <Image src={data.futureImage} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="text-sm">{data.futureImageCaption}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-gray-900 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Traits */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.traitsLabel}</h2>
              <p className="text-xl text-gray-600">{data.traitsTitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.traits.map((trait, i) => (
                <div key={i} className="p-6 bg-white border border-gray-200 text-center">
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
              &quot;{data.closingQuote}&quot;
            </blockquote>
            <div className="w-16 h-1 bg-gray-900 mx-auto" />
          </div>
        </div>
      </section>
    </main>
  );
}
