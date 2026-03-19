import { NavItem, SocialLink, BlogPost, GalleryItem, PressItem, TimelineItem, SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: "Zeki Sertan Çelik",
  title: "Zeki Sertan Çelik | Siyasetçi & İş İnsanı",
  description: "Türkiye'nin geleceği için çalışan, sivil toplum ve iş dünyasında liderlik eden bir vizyon.",
  keywords: ["siyaset", "iş dünyası", "sivil toplum", "liderlik", "Türkiye"],
  author: "Zeki Sertan Çelik",
  siteUrl: "https://example.com",
};

export const navItems: NavItem[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Siyaset", href: "/siyaset" },
  { label: "İş Dünyası", href: "/is-dunyasi" },
  { label: "Toplum & İnsan", href: "/toplum-insan" },
  { label: "Yazılar & Makaleler", href: "/blog" },
  { label: "Galeri", href: "/galeri" },
  { label: "İletişim", href: "/iletisim" },
];

export const socialLinks: SocialLink[] = [
  { name: "Twitter", href: "https://twitter.com/", icon: "twitter" },
  { name: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { name: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
  { name: "YouTube", href: "https://youtube.com/", icon: "youtube" },
];

export const timeline: TimelineItem[] = [
  {
    year: "2020 - Günümüz",
    title: "Sivil Toplum Liderliği",
    description: "Çeşitli sivil toplum kuruluşlarında aktif rol ve yönetim kurulu üyelikleri.",
  },
  {
    year: "2015 - 2020",
    title: "İş Dünyası",
    description: "Ulusal ve uluslararası iş projelerinde liderlik ve yatırım faaliyetleri.",
  },
  {
    year: "2010 - 2015",
    title: "Kariyer Başlangıcı",
    description: "Profesyonel kariyer yolculuğunun temelleri ve ilk adımlar.",
  },
  {
    year: "1990",
    title: "Doğum",
    description: "Türkiye'de doğum ve eğitim hayatının başlangıcı.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "turkiyenin-gelecegi",
    title: "Türkiye'nin Geleceği: Gençlik ve Teknoloji",
    excerpt: "Ülkemizin geleceği, gençlerimizin eğitimine ve teknolojiye yapılan yatırımlarda yatıyor.",
    content: `
      <p>Türkiye, genç ve dinamik nüfusuyla büyük bir potansiyele sahip. Bu potansiyeli değerlendirmek için eğitim ve teknoloji alanında köklü reformlara ihtiyacımız var.</p>

      <h2>Eğitimde Dönüşüm</h2>
      <p>Eğitim sistemimizi 21. yüzyılın gereksinimlerine göre yeniden yapılandırmalıyız. Eleştirel düşünme, problem çözme ve yaratıcılık becerilerini ön plana çıkaran bir yaklaşım benimsememiz gerekiyor.</p>

      <h2>Teknolojide Liderlik</h2>
      <p>Dijital dönüşüm artık bir seçenek değil, zorunluluk. Yapay zeka, blockchain ve yeşil teknolojiler alanında yatırımlarımızı artırmalıyız.</p>
    `,
    date: "2024-01-15",
    category: "Vizyon",
    image: "/images/blog/blog-1.jpg",
    readTime: "5 dk",
  },
  {
    id: "2",
    slug: "sivil-toplum-ve-demokrasi",
    title: "Sivil Toplum ve Demokrasi",
    excerpt: "Güçlü bir demokrasi, güçlü sivil toplum kuruluşları üzerine inşa edilir.",
    content: `
      <p>Sivil toplum kuruluşları, demokratik toplumların vazgeçilmez yapı taşlarıdır. Vatandaşların sesini duyuran, hakları koruyan ve toplumsal değişimi sağlayan bu kuruluşlar, devlet ile birey arasında köprü görevi görür.</p>

      <h2>STK'ların Önemi</h2>
      <p>Sivil toplum kuruluşları; eğitim, sağlık, çevre ve insan hakları gibi pek çok alanda kritik rol üstlenir.</p>
    `,
    date: "2024-01-10",
    category: "Sivil Toplum",
    image: "/images/blog/blog-2.jpg",
    readTime: "4 dk",
  },
  {
    id: "3",
    slug: "ekonomide-yeni-donem",
    title: "Ekonomide Yeni Dönem",
    excerpt: "Sürdürülebilir ekonomik büyüme için yenilikçi politikalara ihtiyacımız var.",
    content: `
      <p>Küresel ekonomik dönüşüm sürecinde Türkiye'nin konumunu güçlendirmek için stratejik adımlar atmalıyız.</p>

      <h2>Yatırım Ortamı</h2>
      <p>Yerli ve yabancı yatırımcılar için güvenli, şeffaf ve öngörülebilir bir ortam oluşturmalıyız.</p>
    `,
    date: "2024-01-05",
    category: "Ekonomi",
    image: "/images/blog/blog-3.jpg",
    readTime: "6 dk",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "/images/gallery/photo-1.jpg",
    alt: "Toplantı fotoğrafı",
    category: "Etkinlikler",
    date: "2024-01-20",
    description: "Uluslararası iş forumu katılımı",
  },
  {
    id: "2",
    src: "/images/gallery/photo-2.jpg",
    alt: "Konferans konuşması",
    category: "Konuşmalar",
    date: "2024-01-15",
    description: "Gençlik ve girişimcilik paneli",
  },
  {
    id: "3",
    src: "/images/gallery/photo-3.jpg",
    alt: "STK ziyareti",
    category: "Sivil Toplum",
    date: "2024-01-10",
    description: "Eğitim vakfı ziyareti",
  },
  {
    id: "4",
    src: "/images/gallery/photo-4.jpg",
    alt: "Basın toplantısı",
    category: "Medya",
    date: "2024-01-05",
    description: "Yeni dönem açıklaması",
  },
  {
    id: "5",
    src: "/images/gallery/photo-5.jpg",
    alt: "İş toplantısı",
    category: "Etkinlikler",
    date: "2024-01-25",
    description: "Yönetim kurulu toplantısı",
  },
  {
    id: "6",
    src: "/images/gallery/photo-6.jpg",
    alt: "Panel katılımı",
    category: "Konuşmalar",
    date: "2024-01-22",
    description: "Ekonomi zirvesi paneli",
  },
  {
    id: "7",
    src: "/images/gallery/photo-7.jpg",
    alt: "Vakıf etkinliği",
    category: "Sivil Toplum",
    date: "2024-01-18",
    description: "Gençlik vakfı açılışı",
  },
  {
    id: "8",
    src: "/images/gallery/photo-8.jpg",
    alt: "Röportaj",
    category: "Medya",
    date: "2024-01-12",
    description: "Televizyon röportajı",
  },
  {
    id: "9",
    src: "/images/gallery/photo-9.jpg",
    alt: "Ödül töreni",
    category: "Etkinlikler",
    date: "2024-02-01",
    description: "Yılın iş insanı ödül töreni",
  },
  {
    id: "10",
    src: "/images/gallery/photo-10.jpg",
    alt: "Konferans sunumu",
    category: "Konuşmalar",
    date: "2024-02-05",
    description: "Dijital dönüşüm konferansı",
  },
  {
    id: "11",
    src: "/images/gallery/photo-11.jpg",
    alt: "Okul ziyareti",
    category: "Sivil Toplum",
    date: "2024-02-08",
    description: "Köy okulu ziyareti",
  },
  {
    id: "12",
    src: "/images/gallery/photo-12.jpg",
    alt: "Gazete röportajı",
    category: "Medya",
    date: "2024-02-10",
    description: "Ekonomi gazetesi röportajı",
  },
];

export const pressItems: PressItem[] = [
  {
    id: "1",
    title: "Gençlere Yatırım Çağrısı",
    source: "Hürriyet",
    date: "2024-01-18",
    excerpt: "İş insanı Zeki Sertan Çelik, gençlerin eğitimine ve istihdamına yapılacak yatırımların önemine dikkat çekti.",
    link: "#",
    image: "/images/press/press-1.jpg",
  },
  {
    id: "2",
    title: "Sivil Toplum Ödülü",
    source: "Milliyet",
    date: "2024-01-12",
    excerpt: "Sivil toplum alanındaki çalışmalarıyla tanınan Zeki Sertan Çelik, yılın sivil toplum lideri ödülüne layık görüldü.",
    link: "#",
    image: "/images/press/press-2.jpg",
  },
  {
    id: "3",
    title: "Ekonomi Zirvesi Konuşması",
    source: "Sabah",
    date: "2024-01-08",
    excerpt: "Uluslararası ekonomi zirvesinde konuşan Zeki Sertan Çelik, Türkiye'nin potansiyelini vurguladı.",
    link: "#",
    image: "/images/press/press-3.jpg",
  },
];
