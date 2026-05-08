"use client";


import Link from 'next/link';
import { useMemo, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export default function RegisterPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const notConfigured = () => {
    setError('Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local to enable auth.');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!supabase) { notConfigured(); return; }

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
    setLoading(false);

    if (signUpError) { setError(signUpError.message); return; }

    if (!data.session) {
      setMessage('Account created — check your email to confirm, then sign in.');
    } else {
      setMessage('Account created. You are signed in.');
    }
  };

  const handleGoogleRegister = async () => {
    setError(null);
    if (!supabase) { notConfigured(); return; }

    setLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/onboarding` },
    });
    setLoading(false);

    if (oauthError) setError(oauthError.message);
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center px-4">
      <div className="fixed inset-0 -z-10">
        <BackgroundGradientAnimation interactive />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight"
            style={{ background: 'linear-gradient(to right, #a78bfa, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Create account
          </h1>

        </div>

        <div className="bg-[#151518] border border-gray-800 rounded-2xl p-8 shadow-2xl">

          {/* TODO: Refactor inline SVG → import <GoogleIcon /> from '@/components/icons/GoogleIcon' */}
          {/* TODO: Consider making this the primary CTA (bg-white text-black) and email the secondary flow */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full mb-5 px-4 py-3 rounded-full border border-gray-700 hover:border-gray-500 text-gray-200 text-sm transition disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#151518] px-2 text-gray-500">or use email</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-[#0f0f11] border border-gray-800 focus:border-yellow-500/60 outline-none text-sm"
            />
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-[#0f0f11] border border-gray-800 focus:border-yellow-500/60 outline-none text-sm"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            {message && <p className="text-sm text-gray-400">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-yellow-400 hover:text-yellow-300">
              Sign in
            </Link>
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <Link
            href="/"
            className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs hover:bg-white/10 hover:text-gray-300 transition"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
