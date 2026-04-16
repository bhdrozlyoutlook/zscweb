import { Metadata } from 'next';
import Image from 'next/image';
import { getSocietyPage } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Toplum & İnsan',
  description: 'Zeki Sertan Çelik - Sivil toplum, gönüllülük ve uluslararası üyelikler. İnsan için, toplum için, ülkem için fayda üretmek.',
};

export default async function ToplumInsanPage() {
  const data = await getSocietyPage();

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
              &quot;{data.heroSubtitle}&quot;
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
          </blockquote>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">{data.storyLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
                {data.storyTitle}
              </p>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                {data.storyParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                {data.storyHighlight && (
                  <p className="text-gray-900 font-medium text-xl">{data.storyHighlight}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-4/3 bg-gray-100 overflow-hidden relative">
                {data.storyImage ? (
                  <Image src={data.storyImage} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-sm">{data.storyImageCaption}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gray-900 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Family */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.familyLabel}</h2>
              <p className="text-lg text-gray-900 font-medium mb-4">{data.familyRole}</p>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                {data.familyTitle}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {data.familyDescription}
              </p>
              {data.familyQuote && (
                <blockquote className="text-xl text-gray-500 leading-relaxed border-l-2 border-gray-300 pl-6 italic">
                  &quot;{data.familyQuote}&quot;
                </blockquote>
              )}
            </div>

            <div className="lg:col-span-3">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">{data.familyWorkLabel}</p>
              <div className="grid gap-4">
                {data.familyWork.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-white border border-gray-200 hover:border-gray-400 transition-colors">
                    <span className="text-2xl font-light text-gray-200">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-gray-700 pt-1">{item}</p>
                  </div>
                ))}
              </div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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

      {/* Youth */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative aspect-square lg:aspect-auto bg-gray-100">
              {data.youthImage ? (
                <Image src={data.youthImage} alt="" fill className="object-cover" unoptimized />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-sm">{data.youthImageCaption}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-8 md:p-16 flex items-center">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.youthLabel}</h2>
                <p className="text-lg text-gray-900 font-medium mb-4">{data.youthRole}</p>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {data.youthDescription}
                </p>

                <div className="space-y-3">
                  {data.youthWork.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
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

      {/* Volunteer */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.volunteerLabel}</h2>
            <p className="text-2xl md:text-3xl font-light text-gray-300 mb-4">
              {data.volunteerTitle}
            </p>
            <p className="text-gray-400">{data.volunteerDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.volunteerOrgs.map((org, i) => (
              <div key={i} className="relative p-8 border border-gray-800 hover:border-gray-700 transition-colors">
                <span className="text-7xl font-light text-gray-800 absolute top-4 right-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <h3 className="text-2xl font-semibold mb-4">{org.name}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{org.desc}</p>
                  {org.quote && (
                    <p className="text-sm text-gray-400 italic border-t border-gray-800 pt-4">
                      &quot;{org.quote}&quot;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.membershipsLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
                {data.membershipsTitle}
              </p>
            </div>
            <div>
              <p className="text-xl text-gray-600 leading-relaxed">
                {data.membershipsDescription}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.memberships.map((m, i) => (
              <div key={i} className="group p-8 bg-white border border-gray-200 hover:border-gray-900 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl font-light text-gray-100 group-hover:text-gray-200 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {m.parent && <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1">{m.parent}</span>}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{m.org}</h3>
                <p className="text-gray-500">{m.desc}</p>
              </div>
            ))}
          </div>

          {data.pastOrganizations.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gray-200">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">{data.pastOrgsLabel}</p>
              <div className="flex flex-wrap gap-4">
                {data.pastOrganizations.map((org, i) => (
                  <span key={i} className="px-6 py-3 bg-white border border-gray-200 text-gray-600">
                    {org}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Human Centered */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{data.humanLabel}</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
                {data.humanTitle}
              </p>
              <p className="text-2xl text-gray-500 mt-6">{data.humanSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.humanApproach.map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 text-center">
                  <span className="text-4xl font-light text-gray-200 mb-4 block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-gray-700">Yeri geldiğinde {item.action.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-32 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-500 mb-8">{data.closingIntro}</p>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-10">
              &quot;{data.closingQuote}&quot;
            </blockquote>
            <div className="w-16 h-1 bg-gray-900 mx-auto mb-10" />
            <p className="text-xl text-gray-600 mb-4">{data.closingFooter}</p>
            <p className="text-2xl text-gray-900 font-medium">{data.closingEmphasis}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
