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
import type { BlogPost, GalleryItem, PressItem, NavItem, SocialLink, HeroSlide } from '@/types';
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

export async function seedNavItems(): Promise<void> {
  const snap = await getDocs(collection(db, 'navItems'));
  if (!snap.empty) return;
  for (let i = 0; i < defaultNavItems.length; i++) {
    const item = defaultNavItems[i];
    await setDoc(doc(collection(db, 'navItems')), { ...item, order: i, visible: true });
  }
}
