import { NextRequest, NextResponse } from 'next/server';
import { createToken, SESSION_COOKIE } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
}

export async function POST(request: NextRequest) {
  const { idToken } = await request.json();

  if (!idToken) {
    return NextResponse.json({ error: 'Token bulunamadı.' }, { status: 400 });
  }

  // Verify Firebase ID token via Firebase REST API
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '';
  const tokenInfoRes = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    }
  );

  if (!tokenInfoRes.ok) {
    return NextResponse.json({ error: 'Geçersiz token.' }, { status: 401 });
  }

  const tokenInfo = await tokenInfoRes.json();
  const user = tokenInfo.users?.[0];
  if (!user) {
    return NextResponse.json({ error: 'Geçersiz token.' }, { status: 401 });
  }

  const uid: string = user.localId;

  // Check admin role in Firestore
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists() || userDoc.data().role !== 'admin') {
      return NextResponse.json({ error: 'Erişim reddedildi.' }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: 'Kullanıcı doğrulanamadı.' }, { status: 500 });
  }

  const token = await createToken();
  const res   = NextResponse.json({ ok: true });
  setSessionCookie(res, token);
  return res;
}
