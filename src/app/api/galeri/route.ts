import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, SESSION_COOKIE } from '@/lib/auth';
import { getGalleryItems, addGalleryItem } from '@/lib/firestore';
import type { GalleryItem } from '@/types';

async function checkAuth() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token ? verifyToken(token) : false;
}

export async function GET() {
  return NextResponse.json(await getGalleryItems());
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  const body = await request.json() as Omit<GalleryItem, 'id'>;
  const item = await addGalleryItem(body);
  return NextResponse.json(item, { status: 201 });
}
