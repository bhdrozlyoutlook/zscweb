import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, SESSION_COOKIE } from '@/lib/auth';
import { getPoliticsPage, updatePoliticsPage } from '@/lib/firestore';
import type { PoliticsPage } from '@/types';

async function checkAuth() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token ? verifyToken(token) : false;
}

export async function GET() {
  return NextResponse.json(await getPoliticsPage());
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  try {
    const body = (await request.json()) as PoliticsPage;
    await updatePoliticsPage(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Kayıt başarısız';
    console.error('[api/politics] update failed:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
