import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { getBlogPosts } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Yazılar & Makaleler',
  description: `${siteConfig.name} - Vizyon, siyaset, ekonomi ve sivil toplum üzerine düşünceler ve yazılar.`,
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  if (!featuredPost) {
    return (
      <main>
        <section className="pt-32 pb-16 bg-white">
          <div className="container">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Yazılar & Makaleler</p>
            <h1 className="text-5xl font-semibold text-gray-900">Henüz yazı yok</h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Yazılar & Makaleler</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
              Düşünceler,<br />
              <span className="text-gray-400 font-light">Fikirler, Yazılar</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-24 bg-white">
        <div className="container">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] lg:aspect-auto bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Öne Çıkan Yazı Görseli</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors duration-500" />
              </div>
              <div className="bg-gray-900 p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <span className="text-white font-medium">{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight group-hover:text-gray-300 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="inline-flex items-center gap-3 text-white font-medium group-hover:gap-5 transition-all">
                  <span className="text-sm uppercase tracking-widest">Yazıyı Oku</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-28 bg-gray-50 border-y border-gray-100">
        <div className="container">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="text-3xl md:text-4xl font-light text-gray-900 leading-relaxed">
              &quot;Yazı, düşüncenin <span className="text-gray-400">kalıcı hâlidir.</span>&quot;
            </p>
          </blockquote>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Arşiv</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Tüm Yazılar</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium">Tümü</span>
              {categories.map((category) => (
                <span key={category} className="px-5 py-2.5 bg-white text-gray-600 text-sm font-medium border border-gray-200">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {blogPosts.map((post, index) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.slug}`} className="grid md:grid-cols-12 gap-6 md:gap-12 py-12 items-center">
                  <div className="hidden md:block md:col-span-1">
                    <span className="text-5xl font-light text-gray-200 group-hover:text-gray-900 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="text-gray-900 font-medium">{post.category}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="md:col-span-3">
                    <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex md:col-span-1 justify-end">
                    <div className="w-12 h-12 border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gray-900">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Bülten</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Yeni Yazılardan Haberdar Olun</h2>
            <p className="text-gray-400 mb-10">Yeni yazılar ve düşüncelerimden haberdar olmak için e-posta bültenine abone olun.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="E-posta adresiniz" className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors" />
              <button type="submit" className="px-8 py-4 bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors">Abone Ol</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
