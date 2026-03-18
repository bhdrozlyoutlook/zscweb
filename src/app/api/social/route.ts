import { NextRequest, NextResponse } from 'next/server';
import { getSocialLinks, addSocialLink, seedSocialLinks } from '@/lib/firestore';
import { verifyToken, SESSION_COOKIE } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    let items = await getSocialLinks();
    if (items.length === 0) {
      await seedSocialLinks();
      items = await getSocialLinks();
    }
    const all = request.nextUrl.searchParams.get('all');
    return NextResponse.json(all ? items : items.filter((i) => i.visible !== false));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }
  const data = await request.json();
  const item = await addSocialLink({ name: data.name, href: data.href, icon: data.icon, order: data.order ?? 999, visible: data.visible ?? true });
  return NextResponse.json(item, { status: 201 });
}
