import { NextRequest, NextResponse } from 'next/server';
import { updateNavItem, deleteNavItem } from '@/lib/firestore';
import { verifyToken, SESSION_COOKIE } from '@/lib/auth';
import { cookies } from 'next/headers';

async function isAuthed() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return token && (await verifyToken(token));
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  const { id } = await params;
  const data = await request.json();
  await updateNavItem(id, data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  const { id } = await params;
  await deleteNavItem(id);
  return NextResponse.json({ ok: true });
}
