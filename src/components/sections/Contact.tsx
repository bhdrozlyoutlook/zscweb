import Link from 'next/link';

export default function Contact() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">İletişim</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Birlikte Çalışalım
          </h2>

          <p className="text-gray-600 mb-8">
            Projeleriniz, fikirleriniz veya işbirliği önerileriniz için benimle iletişime geçebilirsiniz.
          </p>

          <Link
            href="/iletisim"
            className="inline-block text-gray-900 font-medium hover:text-gray-600 transition-colors"
          >
            İletişime Geç →
          </Link>
        </div>
      </div>
    </section>
  );
}
