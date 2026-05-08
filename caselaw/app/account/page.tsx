// TODO: Admin Portal — create app/admin/page.tsx (and app/admin/layout.tsx as the auth guard).
//       Access control: check claims.app_metadata?.role === 'admin' server-side; redirect to / if not.
//       Set admin role in Supabase Dashboard → Auth → Users → edit app_metadata: { "role": "admin" }.
//       Add RLS policy: CREATE POLICY "Admins can read all profiles" ON public.profiles FOR SELECT
//         USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');
//       Initial content: total user count stat card + basic usage stats.

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AccountForm from './account-form'

export default async function AccountPage() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getClaims()

  if (!data?.claims) {
    redirect('/auth/login')
  }

  return <AccountForm claims={data.claims} />
}
