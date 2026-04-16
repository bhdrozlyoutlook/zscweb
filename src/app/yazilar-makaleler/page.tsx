import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getArticlesPage } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Yazılar & Makaleler',
  description:
    'Zeki Sertan Çelik - Siyaset, iş dünyası ve toplumsal meseleler üzerine kaleme alınan yazılar ve makaleler.',
};

export default async function YazilarMakalelerPage() {
  const data = await getArticlesPage();

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
            {data.quote1Footer && <footer className="mt-6 text-gray-400">{data.quote1Footer}</footer>}
          </blockquote>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">{data.aboutLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                {data.aboutTitle}
              </p>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                {data.aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                {data.aboutImage ? (
                  <Image src={data.aboutImage} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm">{data.aboutImageCaption}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-gray-900 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.topicsLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
                {data.topicsTitle}
              </p>
            </div>
            <div>
              <p className="text-xl text-gray-600 leading-relaxed">
                {data.topicsDescription}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.topics.map((t, i) => (
              <div key={i} className="group relative p-8 bg-gray-50 hover:bg-gray-900 transition-colors">
                <span className="absolute top-8 right-8 text-5xl font-light text-gray-200 group-hover:text-gray-700 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white mb-3 transition-colors">{t.title}</h3>
                  <p className="text-gray-500 group-hover:text-gray-400 transition-colors">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.highlightsLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-4">
                {data.highlightsTitle}
              </p>
              <p className="text-gray-600">{data.highlightsDescription}</p>
            </div>

            {data.highlights.length > 0 && (
              <div className="space-y-4 mb-12">
                {data.highlights.map((h, i) => (
                  <a
                    key={i}
                    href={h.link || '#'}
                    target={h.link?.startsWith('http') ? '_blank' : undefined}
                    rel={h.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block p-6 md:p-8 bg-white border border-gray-200 hover:border-gray-900 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-widest text-gray-400">
                          {h.source && <span>{h.source}</span>}
                          {h.source && h.date && <span>•</span>}
                          {h.date && <span>{h.date}</span>}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                          {h.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{h.excerpt}</p>
                      </div>
                      <svg className="w-6 h-6 text-gray-300 group-hover:text-gray-900 transition-colors shrink-0 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {data.highlightsCtaText && data.highlightsCtaLink && (
              <div className="text-center">
                <Link
                  href={data.highlightsCtaLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium hover:bg-gray-700 transition-colors"
                >
                  {data.highlightsCtaText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-500 mb-8">{data.closingIntro}</p>
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
