'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Firebase Auth ile giriş
      const credential = await signInWithEmailAndPassword(auth, email, password);

      // 2. ID token al
      const idToken = await credential.user.getIdToken();

      // 3. Sunucuya gönder → session cookie oluştur
      const res = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ idToken }),
      });

      if (res.ok) {
        toast.success('Giriş başarılı! Yönlendiriliyorsunuz...');
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error ?? 'Erişim reddedildi.');
        await auth.signOut();
        setLoading(false);
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError('E-posta veya şifre hatalı.');
      } else if (code === 'auth/too-many-requests') {
        setError('Çok fazla başarısız deneme. Lütfen bekleyin.');
      } else if (code === 'auth/invalid-email') {
        setError('Geçerli bir e-posta adresi girin.');
      } else {
        setError('Giriş başarısız. Tekrar deneyin.');
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Sol panel ───────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full border border-gray-800" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full border border-gray-800" />
        <div className="absolute top-1/2 -right-24 w-[280px] h-[280px] rounded-full border border-gray-800 -translate-y-1/2" />

        <div className="relative flex items-center gap-3">
          <div className="w-8 h-8 bg-white" />
          <span className="text-white font-semibold tracking-wide">ZSC Admin</span>
        </div>

        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-4">Yönetim Paneli</p>
          <h2 className="text-4xl font-light text-white leading-snug mb-6">
            Sitenizi kolayca<br />
            <span className="font-semibold">yönetin.</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Blog, galeri, basın haberleri ve iletişim mesajlarını tek bir yerden yönetin.
          </p>
        </div>

        <div className="relative flex items-center gap-6">
          {['Blog', 'Galeri', 'Basın', 'Mesajlar'].map((item) => (
            <p key={item} className="text-xs text-gray-600">{item}</p>
          ))}
        </div>
      </div>

      {/* ── Sağ panel ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-16">
        <div className="w-full max-w-sm">

          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-7 h-7 bg-gray-900" />
            <span className="font-semibold text-gray-900">ZSC Admin</span>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Giriş Yap</h1>
            <p className="text-gray-400 text-sm">Hesap bilgilerinizi girin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">E-posta adresi</label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="ornek@email.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Şifre</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Giriş yapılıyor...
                </>
              ) : 'Giriş Yap'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            Kullanıcıları <span className="text-gray-500">Firebase Console → Authentication</span> üzerinden yönetin
          </p>
        </div>
      </div>
    </div>
  );
}
