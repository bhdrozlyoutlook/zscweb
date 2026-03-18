import Link from 'next/link';
import { pressItems } from '@/data/site';

export default function Press() {
  const latestPress = pressItems.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">Medya</p>
            <h2 className="text-2xl font-semibold text-gray-900">Basında Ben</h2>
          </div>
          <Link
            href="/basinda"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Tümünü Gör
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Press Items */}
        <div className="grid md:grid-cols-3 gap-6">
          {latestPress.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 border border-gray-200 hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 font-medium text-sm">{item.source}</div>
                  <div className="text-gray-400 text-xs">{item.date}</div>
                </div>
              </div>

              <h3 className="text-gray-900 font-semibold mb-2 group-hover:text-gray-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm line-clamp-2">
                {item.excerpt}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
