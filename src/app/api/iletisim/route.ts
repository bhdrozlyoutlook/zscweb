import { NextRequest, NextResponse } from 'next/server';
import { addMessage } from '@/lib/firestore';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, message } = body;
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Tüm alanlar zorunludur' }, { status: 400 });
  }
  await addMessage({
    name: String(name),
    email: String(email),
    subject: String(subject),
    message: String(message),
    date: new Date().toISOString(),
    read: false,
  });
  return NextResponse.json({ ok: true }, { status: 201 });
}
