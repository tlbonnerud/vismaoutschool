import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface User {
   email: string;
   password: string;
}

export async function loginUser(request: { json: () => Promise<User> }) {

   const { email, password } = await request.json();

   // query database for user with matching email and password
   const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
   });

   if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
   } else {

      const response = NextResponse.json({ user: data.user });
      response.cookies.set('sb-session', data.session?.access_token || '', {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax',

      });

      return response;
   }
}

