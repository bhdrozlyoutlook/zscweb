import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/data/site';
import { getBlogPosts } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Yazı Bulunamadı' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [siteConfig.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const relatedPosts = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <main>
      {/* Header */}
      <section className="pt-32 pb-12 bg-white">
        <div className="container">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.15] mb-10">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-light">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Author Bar */}
      <section className="py-6 bg-white border-y border-gray-100">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200">
                <Image src="/images/gallery/profile.png" alt={siteConfig.author} width={44} height={44} className="object-cover" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{siteConfig.author}</p>
                <p className="text-xs text-gray-500">Yazar</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:flex items-center text-sm text-gray-500 pr-8 mr-8 border-r border-gray-200">
                <span className="font-medium text-gray-900">{post.category}</span>
                <span className="mx-4 text-gray-300">|</span>
                <span>{post.date}</span>
                <span className="mx-4 text-gray-300">|</span>
                <span>{post.readTime} okuma</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(siteConfig.siteUrl + '/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteConfig.siteUrl + '/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div className="aspect-[16/9] bg-gray-100 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <article
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-[1.8] prose-a:text-gray-900 prose-a:font-medium prose-a:underline prose-a:underline-offset-2 prose-strong:text-gray-900 prose-blockquote:border-l-2 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:font-light prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Etiketler:</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm">{post.category}</span>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-10">
                <div className="p-8 bg-gray-50">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Yazar Hakkında</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                      <Image src="/images/gallery/profile.png" alt={siteConfig.author} width={64} height={64} className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{siteConfig.author}</p>
                      <p className="text-sm text-gray-500">İş İnsanı & Siyasetçi</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Türkiye&apos;nin geleceği için sivil toplum, iş dünyası ve siyasette aktif rol alan bir lider.
                  </p>
                </div>
                {relatedPosts.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Diğer Yazılar</p>
                    <div className="space-y-6">
                      {relatedPosts.map((rp) => (
                        <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                          <p className="text-sm text-gray-400 mb-1">{rp.date}</p>
                          <h4 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">{rp.title}</h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-0 bg-gray-50 border-t border-gray-100">
        <div className="container">
          <div className="grid md:grid-cols-2">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group flex items-center gap-6 py-12 pr-8 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 transition-all">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Önceki Yazı</p>
                  <h4 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{prevPost.title}</h4>
                </div>
              </Link>
            ) : <div className="py-12 pr-8 border-b md:border-b-0 md:border-r border-gray-200" />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group flex items-center justify-end gap-6 py-12 pl-8 text-right hover:bg-gray-100 transition-colors">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Sonraki Yazı</p>
                  <h4 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{nextPost.title}</h4>
                </div>
                <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 transition-all">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </Link>
            ) : <div className="py-12 pl-8" />}
          </div>
        </div>
      </section>
    </main>
  );
}
