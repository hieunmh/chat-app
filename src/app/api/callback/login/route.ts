import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { NextRequest } from 'next/server';
import type { Database } from '@/types/supabaseType';

export async function name(request: NextRequest) {
  const requestURL = new URL(request.url);
  const code = requestURL.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestURL.origin);
}