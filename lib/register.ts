'use server'

import { supabase } from '@/lib/supabase'

export async function registerUser(user_name: string, email: string, password: string) {
   if (!user_name || !email || !password) {
      throw new Error('Missing user_name, email, or password')
   }

   const { data, error } = await supabase
      .from('Users')
      .insert([{ user_name, email, password }])
      .select()

   if (error) {
      throw new Error(error.message)
   }

   return { message: 'User added successfully', user: data }
}
