import { Metadata } from 'next';
import Image from 'next/image';
import { getPoliticsPage } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Siyaset',
  description:
    'Zeki Sertan Çelik - Anahtar Parti Kurucu Üyesi ve Genel Başkan Başdanışmanı. Millet için yola çıkan bir gönlün hikâyesi.',
};

export default async function SiyasetPage() {
  const data = await getPoliticsPage();

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

      {/* Quote 1 */}
      <section className="py-28 bg-gray-900 text-white">
        <div className="container">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              &quot;{data.quote1Text} <span className="text-gray-300">{data.quote1Highlight}</span>&quot;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Journey */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">{data.journeyLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                {data.journeyTitle}
              </p>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                {data.journeyParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-4/3 bg-gray-200 overflow-hidden relative">
                {data.journeyImage ? (
                  <Image src={data.journeyImage} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">{data.journeyImageCaption}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-gray-900 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Anahtar Parti */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">{data.anahtarDate}</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
                  {data.anahtarTitleLine1}
                  <br />
                  {data.anahtarTitleLine2}
                </h2>
              </div>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                {data.anahtarParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className="bg-gray-50 p-8 md:p-12">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">{data.partySpiritLabel}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.partySpirit.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white">
                    <span className="text-2xl font-light text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-gray-700 pt-1">{item}</span>
                  </div>
                ))}
              </div>
              {data.partySpiritFooter && (
                <p className="text-gray-600 mt-8 pt-8 border-t border-gray-200 text-center italic">
                  &quot;{data.partySpiritFooter}&quot;
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Break */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gray-200">
          {data.breakImage ? (
            <Image src={data.breakImage} alt="" fill className="object-cover" unoptimized />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-sm">{data.breakImageCaption}</p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container">
            <p className="text-white text-2xl md:text-3xl font-light max-w-2xl">
              {data.breakQuote}
            </p>
          </div>
        </div>
      </section>

      {/* Advisor */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.advisorLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                {data.advisorTitle}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {data.advisorDescription}
              </p>
              <blockquote className="text-xl text-gray-500 leading-relaxed border-l-2 border-gray-300 pl-6 italic">
                &quot;{data.advisorQuote}&quot;
              </blockquote>
            </div>

            <div className="lg:col-span-3">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">{data.advisorRolesLabel}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.advisorRoles.map((role, i) => (
                  <div key={i} className="group p-6 bg-white border border-gray-200 hover:border-gray-900 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-light text-gray-200 group-hover:text-gray-900 transition-colors">
                        {String(i + 1).padStart(2, '0')}
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

      {/* Vision Pillars */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.visionLabel}</h2>
            <p className="text-3xl md:text-4xl font-light text-white">{data.visionTitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {data.pillars.map((p, i) => (
              <div
                key={i}
                className={`relative p-8 md:p-12 ${i < data.pillars.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-800' : ''}`}
              >
                <div className="text-8xl font-light text-gray-800 absolute top-4 right-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative">
                  <h3 className="text-2xl font-semibold mb-6">{p.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative aspect-square lg:aspect-auto bg-gray-200">
              {data.futureImage ? (
                <Image src={data.futureImage} alt="" fill className="object-cover" unoptimized />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-sm">{data.futureImageCaption}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-8 md:p-16 flex items-center">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.futureLabel}</h2>
                <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                  {data.futureTitle}
                </p>

                <div className="space-y-4 mb-8">
                  {data.futureVision.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-px bg-gray-900" />
                      <p className="text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="text-gray-500 italic">{data.futureFooter}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-32 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">{data.closingLabel}</p>
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
