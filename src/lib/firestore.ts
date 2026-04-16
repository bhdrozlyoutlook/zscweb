import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  setDoc,
} from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import type { BlogPost, GalleryItem, PressItem, NavItem, SocialLink, HeroSlide, AboutPage, PoliticsPage, BusinessPage, SocietyPage, ArticlesPage, ContactPage } from '@/types';
import { navItems as defaultNavItems, socialLinks as defaultSocialLinks } from '@/data/site';
import { getBlogPosts as getLocalBlog, saveBlogPosts, getGalleryItems as getLocalGallery, saveGalleryItems, getPressItems as getLocalPress, savePressItems, getMessages as getLocalMessages, saveMessages } from './data';

export type { ContactMessage } from './data';

// ─── Hero Slides ─────────────────────────────────────────────────────────────

const defaultHeroSlides: Omit<HeroSlide, 'id'>[] = [
  {
    title: 'Zeki Sertan Çelik',
    subtitle: 'İş İnsanı • Siyasetçi • Sivil Toplum',
    description: 'Topluma değer katmak, fayda üretmek ve hakkı tutup kaldırmak için çalışıyorum.',
    image: '/images/gallery/profile.png',
    buttonText: 'Hakkımda',
    buttonLink: '/hakkimda',
    order: 0,
    visible: true,
  },
];

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const snap = await getDocs(query(collection(db, 'heroSlides'), orderBy('order', 'asc')));
    if (snap.empty) return defaultHeroSlides.map((s, i) => ({ ...s, id: String(i) }));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as HeroSlide));
  } catch {
    return defaultHeroSlides.map((s, i) => ({ ...s, id: String(i) }));
  }
}

export async function addHeroSlide(data: Omit<HeroSlide, 'id'>): Promise<HeroSlide> {
  const ref = await addDoc(collection(db, 'heroSlides'), data);
  return { id: ref.id, ...data };
}

export async function updateHeroSlide(id: string, data: Partial<HeroSlide>): Promise<void> {
  await updateDoc(doc(db, 'heroSlides', id), data as Record<string, unknown>);
}

export async function deleteHeroSlide(id: string): Promise<void> {
  await deleteDoc(doc(db, 'heroSlides', id));
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const snap = await getDocs(query(collection(db, 'blog'), orderBy('date', 'desc')));
    if (snap.empty) return getLocalBlog();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
  } catch {
    return getLocalBlog();
  }
}

export async function addBlogPost(data: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  try {
    const ref = await addDoc(collection(db, 'blog'), data);
    return { id: ref.id, ...data };
  } catch {
    const posts = getLocalBlog();
    const newPost: BlogPost = { ...data, id: Date.now().toString() };
    saveBlogPosts([newPost, ...posts]);
    return newPost;
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<void> {
  try {
    await updateDoc(doc(db, 'blog', id), data as Record<string, unknown>);
  } catch {
    const posts = getLocalBlog();
    const idx = posts.findIndex((p) => p.id === id);
    if (idx !== -1) { posts[idx] = { ...posts[idx], ...data }; saveBlogPosts(posts); }
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'blog', id));
  } catch {
    saveBlogPosts(getLocalBlog().filter((p) => p.id !== id));
  }
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const snap = await getDocs(query(collection(db, 'gallery'), orderBy('date', 'desc')));
    if (snap.empty) return getLocalGallery();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
  } catch {
    return getLocalGallery();
  }
}

export async function addGalleryItem(data: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
  try {
    const ref = await addDoc(collection(db, 'gallery'), data);
    return { id: ref.id, ...data };
  } catch {
    const items = getLocalGallery();
    const newItem: GalleryItem = { ...data, id: Date.now().toString() };
    saveGalleryItems([...items, newItem]);
    return newItem;
  }
}

export async function updateGalleryItem(id: string, data: Partial<GalleryItem>): Promise<void> {
  try {
    await updateDoc(doc(db, 'gallery', id), data as Record<string, unknown>);
  } catch {
    const items = getLocalGallery();
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) { items[idx] = { ...items[idx], ...data }; saveGalleryItems(items); }
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch {
    saveGalleryItems(getLocalGallery().filter((i) => i.id !== id));
  }
}

// ─── Press ────────────────────────────────────────────────────────────────────

export async function getPressItems(): Promise<PressItem[]> {
  try {
    const snap = await getDocs(query(collection(db, 'press'), orderBy('date', 'desc')));
    if (snap.empty) return getLocalPress();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PressItem));
  } catch {
    return getLocalPress();
  }
}

export async function addPressItem(data: Omit<PressItem, 'id'>): Promise<PressItem> {
  try {
    const ref = await addDoc(collection(db, 'press'), data);
    return { id: ref.id, ...data };
  } catch {
    const items = getLocalPress();
    const newItem: PressItem = { ...data, id: Date.now().toString() };
    savePressItems([...items, newItem]);
    return newItem;
  }
}

export async function updatePressItem(id: string, data: Partial<PressItem>): Promise<void> {
  try {
    await updateDoc(doc(db, 'press', id), data as Record<string, unknown>);
  } catch {
    const items = getLocalPress();
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) { items[idx] = { ...items[idx], ...data }; savePressItems(items); }
  }
}

export async function deletePressItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'press', id));
  } catch {
    savePressItems(getLocalPress().filter((i) => i.id !== id));
  }
}

// ─── Messages ─────────────────────────────────────────────────────────────────

export async function getMessages() {
  try {
    const snap = await getDocs(query(collection(db, 'messages'), orderBy('date', 'desc')));
    if (snap.empty) return getLocalMessages();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ReturnType<typeof getLocalMessages>;
  } catch {
    return getLocalMessages();
  }
}

export async function addMessage(data: Omit<ReturnType<typeof getLocalMessages>[0], 'id'>) {
  try {
    const ref = await addDoc(collection(db, 'messages'), data);
    return { id: ref.id, ...data };
  } catch {
    const messages = getLocalMessages();
    const newMsg = { ...data, id: Date.now().toString() };
    saveMessages([newMsg, ...messages]);
    return newMsg;
  }
}

export async function updateMessage(id: string, data: Record<string, unknown>) {
  try {
    await updateDoc(doc(db, 'messages', id), data);
  } catch {
    const messages = getLocalMessages();
    const idx = messages.findIndex((m) => m.id === id);
    if (idx !== -1) { messages[idx] = { ...messages[idx], ...data } as typeof messages[0]; saveMessages(messages); }
  }
}

export async function deleteMessage(id: string) {
  try {
    await deleteDoc(doc(db, 'messages', id));
  } catch {
    saveMessages(getLocalMessages().filter((m) => m.id !== id));
  }
}

// ─── Nav Items ────────────────────────────────────────────────────────────────

export async function getNavItems(): Promise<NavItem[]> {
  try {
    const snap = await getDocs(query(collection(db, 'navItems'), orderBy('order', 'asc')));
    if (snap.empty) return defaultNavItems.map((item, i) => ({ ...item, order: i, visible: true }));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as NavItem));
  } catch {
    return defaultNavItems.map((item, i) => ({ ...item, order: i, visible: true }));
  }
}

export async function addNavItem(data: Omit<NavItem, 'id'>): Promise<NavItem> {
  const ref = await addDoc(collection(db, 'navItems'), data);
  return { id: ref.id, ...data };
}

export async function updateNavItem(id: string, data: Partial<NavItem>): Promise<void> {
  await updateDoc(doc(db, 'navItems', id), data as Record<string, unknown>);
}

export async function deleteNavItem(id: string): Promise<void> {
  await deleteDoc(doc(db, 'navItems', id));
}

// ─── Social Links ─────────────────────────────────────────────────────────────

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const snap = await getDocs(query(collection(db, 'socialLinks'), orderBy('order', 'asc')));
    if (snap.empty) return defaultSocialLinks.map((s, i) => ({ ...s, order: i, visible: true }));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SocialLink));
  } catch {
    return defaultSocialLinks.map((s, i) => ({ ...s, order: i, visible: true }));
  }
}

export async function addSocialLink(data: Omit<SocialLink, 'id'>): Promise<SocialLink> {
  const ref = await addDoc(collection(db, 'socialLinks'), data);
  return { id: ref.id, ...data };
}

export async function updateSocialLink(id: string, data: Partial<SocialLink>): Promise<void> {
  await updateDoc(doc(db, 'socialLinks', id), data as Record<string, unknown>);
}

export async function deleteSocialLink(id: string): Promise<void> {
  await deleteDoc(doc(db, 'socialLinks', id));
}

export async function seedSocialLinks(): Promise<void> {
  const snap = await getDocs(collection(db, 'socialLinks'));
  if (!snap.empty) return;
  for (let i = 0; i < defaultSocialLinks.length; i++) {
    await setDoc(doc(collection(db, 'socialLinks')), { ...defaultSocialLinks[i], order: i, visible: true });
  }
}

// ─── About Page ──────────────────────────────────────────────────────────────

export const defaultAboutPage: AboutPage = {
  heroLabel: 'Hakkımda',
  heroTitle: 'Zeki Sertan Çelik',
  heroSubtitle:
    'İş İnsanı, Siyasetçi ve Sivil Toplum Gönüllüsü olarak topluma değer katmayı hedefleyen bir yolculuk.',
  stats: [
    { value: '1994', label: 'İstanbul Doğumlu' },
    { value: '3', label: 'Üniversite' },
    { value: '15+', label: 'Yıl Deneyim' },
    { value: '6', label: 'Faaliyet Alanı' },
  ],

  profileImage: '/images/gallery/profile.png',
  profileLocation: 'Istanbul, Türkiye',
  profileBirth: '1994 doğumlu',

  whoHeading: 'Ben Kimim?',
  whoParagraphs: [
    "1994'ün soğuk bir Aralık sabahında İstanbul'da dünyaya geldim. Şehrin kalabalığında değil ama insanının sıcaklığında büyüdüm.",
    'İlkokul çağından önce sokakta su satarak başladığım ticaret yolculuğu, bugün yönettiğim şirketlerin çatısı altında hâlâ aynı ruhla devam ediyor.',
  ],

  educationHeading: 'Eğitim Yolculuğu',
  education: [
    { type: 'Lisans', school: 'İstanbul Sabahattin Zaim Üniversitesi', field: 'İngilizce Siyaset Bilimi ve Uluslararası İlişkiler' },
    { type: 'Değişim', school: 'Rhein-Waal Üniversitesi, Almanya', field: 'Uluslararası İlişkiler Eğitimi' },
    { type: 'Yüksek Lisans', school: 'Marmara Üniversitesi', field: 'Dış Ticaret' },
  ],

  quote1Text: 'Elimden geleni yapmak. Bir konuda faydam dokunacaksa, kenarda durmamak.',
  quote1Footer: 'Çocukluğumdan beri tek bir ortak çizgim bu oldu.',

  breakImage: '',

  businessLabel: 'İş Dünyası',
  businessTitle: 'İlkokulda esprili plastik ataç satarak başlayan ticaret maceram',
  businessDescription:
    'Bugün sahip olduğum ve yönettiğim şirketlerde hâlâ aynı çocukluk heyecanı vardır: Üretmek, değer katmak, insanlara fayda sağlamak.',
  businessAreas: [
    { title: 'Sanayi Yapıları', desc: 'Endüstriyel tesis projeleri' },
    { title: 'İthalat – İhracat', desc: 'Uluslararası ticaret' },
    { title: 'Çelik Konstrüksiyon', desc: 'Yapısal çelik çözümleri' },
    { title: 'Sanayi Yatırımları', desc: 'Stratejik yatırım danışmanlığı' },
    { title: 'OSB Projeleri', desc: 'Organize sanayi bölgeleri' },
    { title: 'Teknoloji Geliştirme', desc: 'İnovasyon ve Ar-Ge' },
  ],

  characterLabel: 'Karakterim',
  characterTitle: 'Kendimi anlatırken abartıya kaçmayı sevmem ama gerçekleri söylemekten de çekinmem.',
  characterImage: '',
  characteristics: [
    { text: 'Merhametli biriyim.' },
    { text: 'Empati gücüm yüksektir; muhatabımı anlamadan konuşmam.' },
    { text: 'Hizmetkâr liderliğe inanırım; başkanlık değil sorumluluk duygusu taşırım.' },
    { text: 'Yalnız kalmayı severim ama toplumsal sorumluluk gerektiğinde kimseyi beklemeden harekete geçerim.' },
    { text: 'Yolda taşı kaldırırım; rahatsız olmayana da rahatsızlık verircesine anlatırım.' },
    { text: 'Kibirden hoşlanmam; markacı değil kaliteciyim.' },
    { text: 'İyi bir evlat, iyi bir dost, iyi bir vatandaş olmayı önemserim.' },
  ],

  struggleLabel: 'İnsanlık ve Mücadele',
  struggleText:
    'Hayatım boyunca zulme, haksızlığa, hukuksuzluğa karşı tavır almayı hem dini, hem insani, hem ahlaki bir borç bildim.',
  struggleHighlight: 'Gerekirse tek başıma da olsam bir meydanda ses çıkarabilirim.',
  struggleFooter: 'Ama bilirim ki kalıcı etki için ekip, omuzdaşlık ve ortak irade şarttır.',

  politicalLabel: 'Siyasi Duruşum',
  politicalTitle: 'Siyaset benim için bir "hedef" değil, bir "araçtır."',
  politicalDescription:
    'Topluma fayda üretmenin, adaleti savunmanın, yanlış karşısında durmanın kurumsal dilidir.',
  politicalStances: [
    { text: 'Diplomasiye hâkim' },
    { text: 'Siyaset bilimi eğitimi almış' },
    { text: 'Yerelden evrensele bakan bir perspektife sahip' },
    { text: 'Kutuplaşmayı değil sağduyuyu önceleyen' },
  ],
  politicalFooter: 'bir çizgiyi temsil ederim.',
  politicalImage: '',

  todayLabel: 'Bugün',
  todayDescription:
    'Sanayi yatırımları, üretim projeleri, teknoloji ve siyaset alanında eş zamanlı çalışmalar yürütüyorum.',
  summaryLabel: 'Yaşamımın Özeti',
  summaryQuote: 'İyi bir insan olmaya, fayda üretmeye ve hakkı tutup kaldırmaya çalışıyorum.',
};

export async function getAboutPage(): Promise<AboutPage> {
  try {
    const snap = await getDoc(doc(db, 'pages', 'hakkimda'));
    if (!snap.exists()) return defaultAboutPage;
    return { ...defaultAboutPage, ...(snap.data() as Partial<AboutPage>) };
  } catch {
    return defaultAboutPage;
  }
}

export async function updateAboutPage(data: AboutPage): Promise<void> {
  await setDoc(doc(db, 'pages', 'hakkimda'), data as unknown as Record<string, unknown>);
}

// ─── Politics Page ───────────────────────────────────────────────────────────

export const defaultPoliticsPage: PoliticsPage = {
  heroLabel: 'Siyaset',
  heroTitleLine1: 'Millet İçin Yola Çıkan',
  heroTitleLine2: 'Bir Gönlün Hikâyesi',
  heroSubtitle:
    'Siyaset hayatım; makam arayışıyla değil, milletime ve devletime duyduğum sadakatin bir gereği olarak başladı.',
  stats: [
    { value: 'Anahtar', label: 'Parti Kurucu Üyesi' },
    { value: 'Başdanışman', label: 'Genel Başkan' },
    { value: 'Milli', label: 'Değerler Odaklı' },
  ],

  quote1Text: 'Fayda üretmeyen bir ömür,',
  quote1Highlight: 'eksik bir ömürdür.',

  journeyLabel: 'Yola Çıkış',
  journeyTitle: 'İnandım ki bu ülkenin yükü, omuz vermek isteyen herkesin omuzunda hafifler.',
  journeyParagraphs: [
    'Ben de gençliğimin enerjisiyle, aldığım eğitimlerin birikimiyle ve içimde büyüyen sorumluluk hissiyle bu yükün altına girmeyi kendime vazife bildim.',
    'Çocukluğumdan beri şuna inandım: Siyaset benim için bir üstünlük değil; millete hizmet etmek için açılan en geniş kapıdır.',
  ],
  journeyImage: '',
  journeyImageCaption: 'Saha Çalışması',

  anahtarDate: '28 Ekim 2024',
  anahtarTitleLine1: "Anahtar Parti'nin",
  anahtarTitleLine2: 'Kurucu Üyesi',
  anahtarParagraphs: [
    "Anahtar Parti, Türkiye'nin yarınlarına dair temiz bir heyecanın ve sağduyulu bir arayışın adıdır.",
    'Bu partinin kuruluşunda yer almak; benim için bir "siyasi pozisyon" değil, milletimin geleceğine dair duyduğum mesuliyetin bir tezahürü oldu.',
  ],
  partySpiritLabel: "Anahtar Parti'nin Kuruluş Ruhu",
  partySpirit: [
    'Kirlenmemiş bir siyaset dili',
    'Devlet-millet bütünlüğünü önceleyen bir anlayış',
    'Adaletin gölgesinde büyüyen bir vizyon',
    'Ötekileştirmeyen, birleştiren bir duruş',
    'Milli kimliğini ve manevi değerlerini koruyan bir tavır',
  ],
  partySpiritFooter: 'Ben de bu ruha gönlümle ve aklımla katkı sunmaya devam ediyorum.',

  breakImage: '',
  breakImageCaption: 'Parti Etkinliği / Kongre Fotoğrafı',
  breakQuote: 'Siyasette duruşu en kıymetli şey olarak gördüm.',

  advisorLabel: 'Genel Başkan Başdanışmanlığı',
  advisorTitle: 'Omuz Omuza Bir Yürüyüş',
  advisorDescription:
    'Sayın Yavuz Ağıralioğlu ile yol arkadaşlığım; sadece bir "danışmanlık" değil, devlet ve millet adına dertlenen iki insanın omuz omuza verdiği bir yürüyüştür.',
  advisorQuote:
    'Sayın Genel Başkanımızın vakur tavrı, samimiyeti ve milletle kurduğu gönül bağı benim için büyük bir ilham kaynağıdır.',
  advisorRolesLabel: 'Sorumluluk Alanlarım',
  advisorRoles: [
    { title: 'Politika Geliştirme', desc: 'Stratejik politika oluşturma ve analiz' },
    { title: 'Diplomasi', desc: 'Uluslararası ilişkiler ve diplomasi' },
    { title: 'Teşkilat Yapılanması', desc: 'Organizasyonel geliştirme' },
    { title: 'Saha Analizleri', desc: 'Toplum ve saha analizleri' },
    { title: 'Stratejik Planlama', desc: 'Uzun vadeli vizyon belirleme' },
    { title: 'Değerler Temsili', desc: 'Milli ve manevi değerlerin siyasette temsili' },
  ],

  visionLabel: 'Siyasete Bakışım',
  visionTitle: 'Üç Temel Sütun',
  pillars: [
    {
      title: 'Devlet Ciddiyeti',
      desc: 'Devlet, şahsi hesaplarla değil, kutsiyet hissiyle taşıdığımız bir emanettir. Bu emanetin ağırlığı; dilimizi, duruşumuzu ve kararlarımızı belirler.',
    },
    {
      title: 'Milletin Haysiyeti',
      desc: 'Her şeyin başı millettir. Bir siyasetçi, milletinin izzetini korur; bölmez, ayırmaz, ayrıştırmaz. Görevi, milleti için siper olmaktır.',
    },
    {
      title: 'Manevi Kökler',
      desc: 'Kökü olmayanın gölgesi olmaz. Vatan sevgisi, bayrağa saygı, milli gelenekler, aile yapısının korunması, merhamet ve adalet asla taviz verilmeyen değerlerdir.',
    },
  ],

  futureLabel: 'Yarına Dair Niyetim',
  futureTitle: 'Ben bir makamdan ziyade, bir iz bırakmak istiyorum.',
  futureVision: [
    'Gençlerin önünü açan',
    'Ahlâkı siyasetin merkezine koyan',
    'Devletin vakarını koruyan',
    'Milletin gönlünü incitmeyen',
    'Adaletin yanında, haksızın karşısında duran',
  ],
  futureFooter: 'bir yürüyüşün içinde olmayı sorumluluk görüyorum.',
  futureImage: '',
  futureImageCaption: 'Meclis / Konuşma Fotoğrafı',

  closingLabel: 'Siyasi Yolculuğumun Özeti',
  closingQuote: 'Ömrüm yettiğince bu sorumluluğu taşımaya devam edeceğim.',
};

export async function getPoliticsPage(): Promise<PoliticsPage> {
  try {
    const snap = await getDoc(doc(db, 'pages', 'siyaset'));
    if (!snap.exists()) return defaultPoliticsPage;
    return { ...defaultPoliticsPage, ...(snap.data() as Partial<PoliticsPage>) };
  } catch {
    return defaultPoliticsPage;
  }
}

export async function updatePoliticsPage(data: PoliticsPage): Promise<void> {
  await setDoc(doc(db, 'pages', 'siyaset'), data as unknown as Record<string, unknown>);
}

// ─── Business Page ───────────────────────────────────────────────────────────

export const defaultBusinessPage: BusinessPage = {
  heroLabel: 'İş Dünyası',
  heroTitleLine1: "Üreten Türkiye'nin",
  heroTitleLine2: 'Genç Girişimcisi',
  heroSubtitle:
    "Yerelden dünyaya uzanan bir yolculuk… Türkiye'nin imkânlarına inanan, üretim gücünü kendi potansiyeliyle birleştiren genç bir iş insanı.",
  stats: [
    { value: '31', label: 'Yaş' },
    { value: '6', label: 'Sektör' },
    { value: '15+', label: 'Yıl Tecrübe' },
  ],

  quote1Text: "Türkiye'nin yarınını",
  quote1Highlight: 'bugünden hazırlamak.',
  quote1Footer: 'İş dünyasında attığım her adımın temel motivasyonu budur.',

  aboutLabel: 'İş Dünyasına Bakışım',
  aboutTitle: 'Ben kendimi hiçbir zaman sadece "iş adamı" olarak tanımlamadım.',
  aboutDescription:
    'Benim için girişimcilik, ülkesinin geleceğini dert eden, sorumluluk üstlenen ve attığı her adımı bir değere dönüştürmeye çalışan bir insanın yolculuğudur.',
  aboutImage: '/images/gallery/profile.png',
  visionBoxLabel: 'Benim İçin Girişimcilik',
  businessVision: [
    'Ülkeye değer katmak',
    'İnsanlara istihdam sağlamak',
    "Yurt içinde ve yurt dışında Türkiye'nin adını güçlendirmek",
    'Üretim ve ticarete yeni bir nefes getirmek',
    'Gençlere örnek olabilecek bir ekosistem yaratmak',
  ],

  globalLabel: 'Türkiye Merkezli Global Vizyon',
  globalTitle:
    'Türkiye, doğru stratejiler ve doğru yatırımlarla sadece bölgesinde değil, küresel ölçekte söz sahibi bir üretim ve teknoloji üssü olabilir.',
  globalDescription:
    'Bu inançla hareket ediyor; yükte hafif, pahada ağır ürünlere yönelen, katma değerli üretimi destekleyen, uluslararası pazarlara entegre stratejik sektörlerde ilerleyen bir yaklaşımı benimsiyorum.',
  globalImage: '',
  globalImageCaption: 'Global Ticaret / Dünya Haritası',

  expertiseLabel: 'Deneyim ve Uzmanlık Alanlarım',
  expertiseTitle: 'Şu ana kadarki iş hayatımda çok farklı alanlarda tecrübe biriktirdim.',
  expertiseAreas: [
    { title: 'Çelik Konstrüksiyon', desc: 'Büyük ölçekli endüstriyel yapıların üretimi ve kurulumu' },
    { title: 'OSB Projeleri', desc: 'Organize Sanayi Bölgeleri içinde modern tesis projelendirme' },
    { title: 'Uluslararası Ticaret', desc: 'Tedarik zinciri yönetimi ve dış ticaret' },
    { title: 'Teknoloji Tedariki', desc: 'Uzak Doğu başta olmak üzere ileri teknoloji ürün ve makine tedariki' },
    { title: 'Yatırım Danışmanlığı', desc: "Türkiye'de üretim yapan şirketlere stratejik danışmanlık" },
    { title: 'Kamu İş Birlikleri', desc: 'Kamu kurumlarıyla proje bazlı iş birlikleri' },
  ],
  expertiseQuote: 'Gerçek başarı, doğru insanlarla doğru zamanda kurulan sağlam iş birliklerinin sonucudur.',
  expertiseQuoteFooter: 'Bu süreçte edindiğim en önemli tecrübe bu oldu.',

  sourcesLabel: 'Ülkem İçin Çalışan Bir Girişimci',
  sourcesTitle: 'Girişimci ruhumun beslendiği iki ana kaynak var:',
  sources: [
    {
      title: "Türkiye'nin Potansiyeli",
      desc: "Bu toprakların gücüne inanıyorum. Doğru projeler, doğru ekipler, akılcı planlama ve inovasyon merkezli bir iş anlayışıyla Türkiye'nin global yarışta daha güçlü aktörlerden biri olacağına eminim.",
    },
    {
      title: 'Gençlerin Geleceği',
      desc: 'Kurduğum her girişimde; sürdürülebilir, verimli, katma değer yaratan, gençlere fırsat açan, ülkenin üretim kültürünü güçlendiren bir anlayışla hareket ediyorum.',
    },
  ],

  futureLabel: 'Yarın İçin Vizyonum',
  futureTitle: "Türkiye'nin üretim gücünü uluslararası seviyede daha görünür ve etkili kılmak.",
  futureGoals: [
    'Global markalar çıkaran bir girişimcilik çizgisi oluşturmak',
    'Endüstriyel yapılarda verimliliği artıran yeni modeller geliştirmek',
    'Daha hızlı, modern ve modüler üretim yapıları inşa etmek',
    "Türkiye'nin stratejik sektörlerde ihracat kapasitesini büyütmek",
    'Gençlere ilham verecek yeni girişim ekosistemleri oluşturmak',
    'Kamu–özel sektör iş birliklerini uzun vadeli kalkınma planlarına dönüştürmek',
  ],
  futureQuote: 'Ülkemin yararına olan her iş, benim için en doğru iştir.',
  futureImage: '',
  futureImageCaption: 'Büyüme / İstatistik Görseli',

  traitsLabel: 'Mütevazı Ama Kararlı Bir Yolculuk',
  traitsTitle: 'İş dünyasında kendimi böyle tanımlıyorum:',
  traits: [
    { title: 'Mütevazı ama bilinçli', desc: 'Ayakları yere basan' },
    { title: 'Vizyonu yüksek', desc: 'Kibirden uzak' },
    { title: 'Dünyayı takip eden', desc: 'Halkın arasında' },
    { title: 'Sözünü işine yansıtan', desc: 'Üreten, emek veren' },
  ],

  closingQuote: 'Her geçen gün, bu yolculuğu daha da güçlendirmek için çalışıyorum.',
};

export async function getBusinessPage(): Promise<BusinessPage> {
  try {
    const snap = await getDoc(doc(db, 'pages', 'is-dunyasi'));
    if (!snap.exists()) return defaultBusinessPage;
    return { ...defaultBusinessPage, ...(snap.data() as Partial<BusinessPage>) };
  } catch {
    return defaultBusinessPage;
  }
}

export async function updateBusinessPage(data: BusinessPage): Promise<void> {
  await setDoc(doc(db, 'pages', 'is-dunyasi'), data as unknown as Record<string, unknown>);
}

// ─── Society Page ────────────────────────────────────────────────────────────

export const defaultSocietyPage: SocietyPage = {
  heroLabel: 'Toplum & İnsan',
  heroTitleLine1: 'Sivil Toplum ve',
  heroTitleLine2: 'Gönüllülük Yolculuğum',
  heroSubtitle: 'Bir insanın dokunduğu yüzler değişir, dokunduğu toplum dönüşür.',
  stats: [
    { value: '3+', label: 'Gönüllülük Kurumu' },
    { value: '4', label: 'Uluslararası Üyelik' },
    { value: 'Aile', label: 'Vakfı Mütevelli Üyesi' },
  ],

  quote1Text: 'Eğer bir yanlışlık varsa düzeltmek için',
  quote1Highlight: 'önce ben harekete geçmeliyim.',

  storyLabel: 'Seyirci Kalmama İradesi',
  storyTitle: 'Çocukluğumdan beri hayatımın yönünü belirleyen en güçlü özellik.',
  storyParagraphs: [
    'İlkokulda satranç kulüplerinden münazara gruplarına, spor ve öğrenci temsilciliklerinden sosyal sorumluluk etkinliklerine kadar her alanda örgütleyen, sorumluluk alan, elini taşın altına koyan bir yapım vardı.',
    'Bugün geldiğim noktada, iş dünyasında, siyasette ve sivil toplumda yürüttüğüm her görevde bu duyguyu merkezimde tutuyorum:',
  ],
  storyHighlight: 'İnsan için, toplum için, ülkem için fayda üretmek.',
  storyImage: '',
  storyImageCaption: 'Sivil Toplum Etkinliği Fotoğrafı',

  familyLabel: 'Aile & Toplum',
  familyRole: 'İstanbul Aile Vakfı Mütevelli Heyeti Üyesi',
  familyTitle: 'Toplumun en temel taşı ailedir.',
  familyDescription:
    "İstanbul Aile Vakfı'nda mütevelli heyeti üyesi olarak, hem Türkiye'de hem de küresel ölçekte aile kurumunun güçlendirilmesi için çalışmalar yürütüyoruz.",
  familyQuote: 'Aile, benim için sadece bir kurum değil; milletin direncini ayakta tutan omurgadır.',
  familyWorkLabel: 'Bu Kapsamda',
  familyWork: [
    'Aile yapısının modern dünyada karşılaştığı tehditlere karşı bilinç artırma programları',
    'Genç ailelere yönelik rehberlik ve destek projeleri',
    'Kadın, çocuk ve aile bütünlüğünü koruyan toplumsal projeler',
    'Ahlaki ve kültürel değerlerimizi koruyarak gelecek nesilleri destekleme çalışmaları',
  ],

  breakImage: '',
  breakImageCaption: 'Gönüllülük / Sosyal Sorumluluk Fotoğrafı',
  breakQuote: 'Gençliğe inanan, genç beynin dinamizmini ve üretkenliğini en büyük sermaye olarak gören biriyim.',

  youthLabel: 'Gençler & Liderlik',
  youthRole: 'Uluslararası Genç Liderler ve Girişimciler Platformu Başkan Yardımcısı',
  youthDescription:
    'Gençler hak ettikleri fırsatları bulduklarında yalnızca kendi hayatlarını değil, toplumun kaderini de değiştirebilecek potansiyele sahiptir.',
  youthWork: [
    'Genç girişimcilere mentorluk yapılması',
    'Küresel liderlik programlarının Türkiye ile entegrasyonu',
    'Yeni neslin uluslararası ağlarda görünürlüğünün artırılması',
    'Girişimci ruhu destekleyen projelerin geliştirilmesi',
    'Gençler arası sosyal diplomasi çalışmalarının sürdürülmesi',
  ],
  youthImage: '',
  youthImageCaption: 'Liderlik Etkinliği Fotoğrafı',

  volunteerLabel: 'Sosyal Sorumluluk',
  volunteerTitle: 'Hayatım boyunca iyiliğin mümkün olan en sade hâlini önemsedim.',
  volunteerDescription: 'Bu yüzden gönüllülük, benim için bir "hobi" değil; bir sorumluluk biçimidir.',
  volunteerOrgs: [
    {
      name: 'Darülaceze',
      desc: 'Yıllardır emek ve merhametle hizmet veren bu önemli kurumda gönüllülük yapmak, insana dair en sahici duyguları hatırlatır.',
      quote: 'İnsanların yalnız bırakılmadığı bir Türkiye hayalimde Darülaceze özel bir yere sahiptir.',
    },
    {
      name: 'AFAD',
      desc: 'Afetlerde devlet–millet omuz omuza olmalıdır. AFAD gönüllüsü olarak hem eğitimlere katılıyor hem de ihtiyaç hâlinde sahaya destek oluyorum.',
      quote: 'Dayanışmayı bir görev olarak görüyorum.',
    },
    {
      name: 'TEMA Vakfı',
      desc: "Toprakla bağını kaybetmiş toplumların geleceği olmaz. TEMA'daki gönüllülük faaliyetlerimle doğayı koruyan bir yaklaşımı destekliyorum.",
      quote: 'Gelecek nesillere emaneti sağlıklı devretmek.',
    },
  ],

  membershipsLabel: 'Uluslararası Üyeliklerim & Ticari Diplomasi',
  membershipsTitle: "Dünyayı okumadan, Türkiye'yi güçlendiremezsiniz.",
  membershipsDescription:
    'Bu nedenle hem ticarette hem de uluslararası ilişkilerde farklı küresel çatı kurumlarda aktif üyeliklerim bulunuyor.',
  memberships: [
    {
      org: 'Dünya Ticaret Örgütü (WTO)',
      parent: 'Birleşmiş Milletler',
      desc: 'Küresel ticaret standartlarını, düzenlemelerini ve uluslararası rekabet alanlarını yakından takip ediyorum.',
    },
    {
      org: 'ICC – Uluslararası Ticaret Odası',
      parent: 'International Chamber of Commerce',
      desc: 'Dünya ticaretinin en güçlü çatı kuruluşlarından birinde iş yapma modelleri ve global ticaret kurallarını takip ediyorum.',
    },
    {
      org: 'TİM – Türkiye İhracatçılar Meclisi',
      parent: 'Türkiye',
      desc: "Türkiye'nin ihracat vizyonuna katkı sunan projelerde bulunuyor, ülkemizin üretim ve dış ticaret hedeflerine paralel çalışmalar yapıyorum.",
    },
    {
      org: 'JCI – Junior Chamber International',
      parent: '100+ Ülke',
      desc: 'Genç profesyonellerin liderlik, girişimcilik ve sosyal sorumluluk alanlarında gelişimini destekleyen projelerde yer alıyorum.',
    },
  ],
  pastOrgsLabel: 'Geçmişte Rol Aldığım Kurumlar',
  pastOrganizations: [
    'MÜSİAD',
    'DEİK – Dış Ekonomik İlişkiler Kurulu',
    'PAGEV – Türk Plastik Sanayicileri Araştırma Geliştirme ve Eğitim Vakfı',
  ],

  humanLabel: 'İnsan Merkezli Bir Yolculuk',
  humanTitle: 'Ekonomide, siyasette, sivil toplumda ve sosyal yaşamda attığım her adımın ortak bir noktası var:',
  humanSubtitle: 'İnsanı merkeze almak.',
  humanApproach: [
    { action: 'Bir ailenin derdine yetişmek' },
    { action: 'Gençlerin önünü açmak' },
    { action: 'Doğaya sahip çıkmak' },
    { action: "Uluslararası platformlarda Türkiye'nin gücünü görünür kılmak" },
  ],

  closingIntro: 'Hayatım boyunca şuna inandım:',
  closingQuote: 'Topluma dokunamayan bir insan, ne kadar başarı elde ederse etsin eksiktir.',
  closingFooter: 'Bu yüzden yolculuğumun bütününde derdim hep aynı kaldı:',
  closingEmphasis: 'Ellerimi cebime değil, meselelerin üzerine koymak.',
};

export async function getSocietyPage(): Promise<SocietyPage> {
  try {
    const snap = await getDoc(doc(db, 'pages', 'toplum-insan'));
    if (!snap.exists()) return defaultSocietyPage;
    return { ...defaultSocietyPage, ...(snap.data() as Partial<SocietyPage>) };
  } catch {
    return defaultSocietyPage;
  }
}

export async function updateSocietyPage(data: SocietyPage): Promise<void> {
  await setDoc(doc(db, 'pages', 'toplum-insan'), data as unknown as Record<string, unknown>);
}

// ─── Articles Page ───────────────────────────────────────────────────────────

export const defaultArticlesPage: ArticlesPage = {
  heroLabel: 'Yazılar & Makaleler',
  heroTitleLine1: 'Düşüncelerimi',
  heroTitleLine2: 'Yazıyla Paylaşıyorum',
  heroSubtitle:
    'Siyaset, iş dünyası ve toplumsal meseleler üzerine kaleme aldığım yazılar ve makaleler; bir fikir birikiminin ve mesuliyetin kağıda dökülmüş hâlidir.',
  stats: [
    { value: 'Siyaset', label: 'Analiz ve Görüşler' },
    { value: 'Ekonomi', label: 'Üretim ve Ticaret' },
    { value: 'Toplum', label: 'İnsan ve Değerler' },
  ],

  quote1Text: 'Yazmak,',
  quote1Highlight: 'düşünceyi disipline etmenin en samimi yoludur.',
  quote1Footer: 'Her yazı, bir sorumluluk üstlenme biçimidir.',

  aboutLabel: 'Neden Yazıyorum?',
  aboutTitle: 'Fikirler ancak paylaşıldığında değer kazanır.',
  aboutParagraphs: [
    'Yazmak, zihnimdeki meseleleri tarayıp süzmek için kullandığım bir pusula gibidir. Hem kendimi hem de çevremdekileri doğru sorularla baş başa bırakır.',
    'Siyasetten iş dünyasına, toplumsal meselelerden uluslararası ilişkilere uzanan farklı alanlarda kaleme aldığım metinlerde ortak bir arayış var: Doğruyu görmek, sorumluluğu paylaşmak, faydayı büyütmek.',
  ],
  aboutImage: '',
  aboutImageCaption: 'Çalışma / Yazı Masası Fotoğrafı',

  topicsLabel: 'Yazı Alanlarım',
  topicsTitle: 'Farklı meseleler, ortak bir dert.',
  topicsDescription:
    'Yazdıklarım genelde şu alanlarda yoğunlaşır; ancak hepsinin ortak noktası insanı ve toplumu önceleyen bir bakış açısıdır.',
  topics: [
    { title: 'Siyasi Analiz', desc: 'Güncel siyasi meseleler, duruş ve değerlendirmeler' },
    { title: 'Ekonomi & Üretim', desc: 'Türkiye ekonomisi, üretim stratejileri ve iş dünyası' },
    { title: 'Uluslararası İlişkiler', desc: 'Diplomasi, küresel ticaret ve stratejik denklemler' },
    { title: 'Toplum & Aile', desc: 'Değerler, aile yapısı ve toplumsal dönüşüm' },
    { title: 'Gençlik & Liderlik', desc: 'Gençlerin geleceği, girişimcilik ve liderlik' },
    { title: 'Sivil Toplum', desc: 'Gönüllülük, sosyal sorumluluk ve dayanışma' },
  ],

  highlightsLabel: 'Öne Çıkan Yazılar',
  highlightsTitle: 'Son dönem kaleme aldıklarımdan bir seçki.',
  highlightsDescription: 'Tamamına blog sayfasından ulaşabilirsiniz.',
  highlights: [],
  highlightsCtaText: 'Tüm Yazıları Gör',
  highlightsCtaLink: '/blog',

  closingIntro: 'Her yazının ardında bir niyet var:',
  closingQuote: 'Kelimelerle de olsa hakkı tutup kaldırmak.',
};

export async function getArticlesPage(): Promise<ArticlesPage> {
  try {
    const snap = await getDoc(doc(db, 'pages', 'yazilar-makaleler'));
    if (!snap.exists()) return defaultArticlesPage;
    return { ...defaultArticlesPage, ...(snap.data() as Partial<ArticlesPage>) };
  } catch {
    return defaultArticlesPage;
  }
}

export async function updateArticlesPage(data: ArticlesPage): Promise<void> {
  await setDoc(doc(db, 'pages', 'yazilar-makaleler'), data as unknown as Record<string, unknown>);
}

// ─── Contact Page ────────────────────────────────────────────────────────────

export const defaultContactPage: ContactPage = {
  heroLabel: 'İletişim',
  heroTitleLine1: 'Benimle',
  heroTitleLine2: 'İletişime Geçin',
  heroSubtitle: 'Sorularınız, önerileriniz veya işbirliği talepleriniz için formu kullanabilirsiniz.',

  formLabel: 'Mesaj Gönderin',
  formTitle: 'Size nasıl yardımcı olabilirim?',
  successMessage: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
  submitText: 'Mesaj Gönder',
  subjects: [
    { value: 'general', label: 'Genel' },
    { value: 'media', label: 'Medya / Röportaj' },
    { value: 'partnership', label: 'İşbirliği' },
    { value: 'event', label: 'Etkinlik Daveti' },
    { value: 'other', label: 'Diğer' },
  ],

  infoLabel: 'İletişim Bilgileri',
  infoTitle: 'Doğrudan ulaşın',
  emailLabel: 'E-posta',
  email: 'iletisim@example.com',
  phoneLabel: 'Telefon',
  phone: '+90 500 123 45 67',
  locationLabel: 'Konum',
  location: 'İstanbul, Türkiye',
  socialLabel: 'Sosyal Medya',

  quoteText: 'Her mesaj, yeni bir',
  quoteHighlight: 'başlangıç olabilir.',
};

export async function getContactPage(): Promise<ContactPage> {
  try {
    const snap = await getDoc(doc(db, 'pages', 'iletisim'));
    if (!snap.exists()) return defaultContactPage;
    return { ...defaultContactPage, ...(snap.data() as Partial<ContactPage>) };
  } catch {
    return defaultContactPage;
  }
}

export async function updateContactPage(data: ContactPage): Promise<void> {
  await setDoc(doc(db, 'pages', 'iletisim'), data as unknown as Record<string, unknown>);
}

export async function seedNavItems(): Promise<void> {
  const snap = await getDocs(collection(db, 'navItems'));
  if (!snap.empty) return;
  for (let i = 0; i < defaultNavItems.length; i++) {
    const item = defaultNavItems[i];
    await setDoc(doc(collection(db, 'navItems')), { ...item, order: i, visible: true });
  }
}
