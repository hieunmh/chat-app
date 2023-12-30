import { createClientComponentClient, createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabaseType';
import { tLoginSchema } from '@/app/(auth)/login/page';
import { LoginSchema } from '@/schema/authSchema';

export const dynamic = 'force-dynamic';


export async function POST(request: Request) {
  const formData: tLoginSchema = await request.json();
  const result = LoginSchema.safeParse(formData);
  let zodError = {};

  if (!result.success) {
    result.error.issues.forEach((issue: { path: any[], message: any }) => {
      zodError = { ...zodError, [issue.path[0]]: issue.message };
    })

    return NextResponse.json({ error: zodError }, { status: 400 });
  }

  const email = formData.email;
  const password = formData.password;
  
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const res = await supabase.auth.signInWithPassword({
    email, 
    password,
  })

  return NextResponse.json({ data: res.data, error: res.error });
}