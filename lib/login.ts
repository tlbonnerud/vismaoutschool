'use server';

import { supabase } from '@/lib/supabase';

type LoginResult = {
   success: boolean;
   message: string;
   user?: any;
   status: number;
   debug?: any; // Remove this after debugging
};

export async function loginUser(credentials: { email: string; password: string }): Promise<LoginResult> {
   const { email, password } = credentials;

   if (!email || !password) {
      return {
         success: false,
         message: 'Missing email or password',
         status: 400
      };
   }

   // First, let's check if the user exists
   const { data: userCheck, error: checkError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email);

   console.log('User lookup result:', {
      found: userCheck?.length,
      error: checkError,
      columns: userCheck?.[0] ? Object.keys(userCheck[0]) : 'No user found'
   });

   // Now check with password
   const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

   console.log('Login attempt result:', {
      success: !!data,
      error: error?.message,
      errorCode: error?.code
   });

   if (error || !data) {
      return {
         success: false,
         message: userCheck?.length === 0
            ? 'User not found'
            : 'Invalid email or password',
         status: 401,
         debug: {
            userExists: userCheck?.length != 0,
            errorCode: error?.code,
            errorMessage: error?.message
         }
      };
   }

   return {
      success: true,
      message: 'Login successful',
      user: data,
      status: 200
   };
}
