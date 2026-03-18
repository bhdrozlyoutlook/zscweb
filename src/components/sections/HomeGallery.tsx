import Link from 'next/link';
import { getGalleryItems } from '@/lib/firestore';

export default async function HomeGallery() {
  const allItems = await getGalleryItems();
  const previewItems = allItems.slice(0, 4);
  const categories = previewItems.length > 0
    ? previewItems.map((i) => i.category)
    : ['Etkinlikler', 'Konuşmalar', 'Sivil Toplum', 'Medya'];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">Fotoğraflar</p>
            <h2 className="text-2xl font-semibold text-gray-900">Galeri</h2>
          </div>
          <Link href="/galeri" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Tümünü Gör
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href="/galeri" className="group relative aspect-[4/5] bg-gray-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/60 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-medium text-gray-900 group-hover:text-white transition-colors">{category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
