import fs from 'fs';
import path from 'path';
import type { BlogPost, GalleryItem, PressItem } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');

function readJson<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T[];
  } catch {
    return [];
  }
}

function writeJson<T>(filename: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export const getBlogPosts = () => readJson<BlogPost>('blog.json');
export const saveBlogPosts = (posts: BlogPost[]) => writeJson('blog.json', posts);

export const getGalleryItems = () => readJson<GalleryItem>('gallery.json');
export const saveGalleryItems = (items: GalleryItem[]) => writeJson('gallery.json', items);

export const getPressItems = () => readJson<PressItem>('press.json');
export const savePressItems = (items: PressItem[]) => writeJson('press.json', items);

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export const getMessages = () => readJson<ContactMessage>('messages.json');
export const saveMessages = (messages: ContactMessage[]) => writeJson('messages.json', messages);
