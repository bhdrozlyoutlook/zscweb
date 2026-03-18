import Link from 'next/link';
import { timeline } from '@/data/site';

export default function About() {
  return (
    <section className="py-20 lg:py-32 bg-navy-800">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-gold-500/10 text-gold-500 text-sm font-medium rounded-full mb-6">
              Hakkımda
            </span>

            <h2 className="heading-lg text-white mb-6">
              Değişim için <span className="text-gold-500">cesaret</span>,
              <br />
              ilerleme için <span className="text-gold-500">vizyon</span>
            </h2>

            <p className="text-gray-300 mb-6">
              Yıllardır iş dünyası, sivil toplum ve siyaset alanlarında aktif olarak
              çalışıyorum. Amacım, edindiğim deneyimleri ülkemizin geleceği için
              kullanmak ve gençlere ilham vermek.
            </p>

            <p className="text-gray-300 mb-8">
              Eğitim, girişimcilik ve sosyal sorumluluk projelerinde yer alarak
              toplumsal kalkınmaya katkıda bulunmayı sürdürüyorum.
            </p>

            <Link href="/hakkimda" className="btn-primary">
              Daha Fazla Bilgi
            </Link>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-navy-600" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 group"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-3 h-3 -translate-x-1/2 rounded-full bg-navy-600 group-hover:bg-gold-500 transition-colors">
                    <div className="absolute inset-0 rounded-full bg-gold-500 scale-0 group-hover:scale-100 transition-transform" />
                  </div>

                  <div className="bg-navy-900/50 p-6 rounded-lg hover:bg-navy-900 transition-colors">
                    <span className="text-gold-500 text-sm font-medium">
                      {item.year}
                    </span>
                    <h3 className="text-white font-semibold mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
