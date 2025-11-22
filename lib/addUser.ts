'use server'

import { supabase } from '@/lib/supabase'

export async function addUser(user_name: string, email: string) {
   if (!user_name || !email) {
      throw new Error('Missing user_name or email')
   }

   const { data, error } = await supabase
      .from('Users')
      .insert([{ user_name, email }])
      .select()

   if (error) {
      throw new Error(error.message)
   }

   return { message: 'User added successfully', user: data }
}
