import { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { getPressItems } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Basında Ben',
  description: `${siteConfig.name} hakkında basında çıkan haberler ve röportajlar.`,
};

export default async function BasindaPage() {
  const pressItems = await getPressItems();

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gray-900">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Medya</p>
            <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              <span className="text-gray-400">Basında</span> Ben
            </h1>
            <p className="text-xl text-gray-400">
              Ulusal ve uluslararası medyada hakkımda çıkan haberler, röportajlar ve köşe yazıları.
            </p>
          </div>
        </div>
      </section>

      {/* Press Items */}
      <section className="py-20 bg-white">
        <div className="container">
          {pressItems.length === 0 && (
            <p className="text-gray-400 text-center py-20">Henüz basın haberi yok.</p>
          )}

          {/* Featured */}
          {pressItems.length > 0 && (
            <div className="mb-12">
              <a href={pressItems[0].link} target="_blank" rel="noopener noreferrer" className="group block border border-gray-100 hover:border-gray-900 transition-colors">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto bg-gray-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div className="p-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-semibold text-gray-900">{pressItems[0].source}</span>
                      <span className="text-gray-400 text-sm">{pressItems[0].date}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 group-hover:text-gray-600 transition-colors">
                      {pressItems[0].title}
                    </h2>
                    <p className="text-gray-500 mb-6">{pressItems[0].excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-gray-900 font-medium">
                      Haberi Oku
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressItems.slice(1).map((item) => (
              <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="group block border border-gray-100 hover:border-gray-900 transition-colors">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-medium text-gray-900 text-sm">{item.source}</span>
                    <span className="text-gray-400 text-sm">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-gray-900 text-sm font-medium">
                    Haberi Oku
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Media Contact */}
          <div className="mt-16 bg-gray-900 p-10 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Medya İletişim</h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Röportaj talepleri, basın açıklamaları ve medya sorularınız için iletişim ekibimizle bağlantıya geçebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:basin@example.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                basin@example.com
              </a>
              <a href="tel:+905001234567" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +90 500 123 45 67
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
