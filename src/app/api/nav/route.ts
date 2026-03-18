import { NextRequest, NextResponse } from 'next/server';
import { getNavItems, addNavItem, seedNavItems } from '@/lib/firestore';
import { verifyToken, SESSION_COOKIE } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    let items = await getNavItems();
    if (items.length === 0) {
      await seedNavItems();
      items = await getNavItems();
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
  const item = await addNavItem({ label: data.label, href: data.href, order: data.order ?? 999, visible: data.visible ?? true });
  return NextResponse.json(item, { status: 201 });
}
