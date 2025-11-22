'use server'

import { supabase } from '@/lib/supabase'

export async function getUsers() {
   const { data, error } = await supabase
      .from('Users')
      .select('user_id, user_name, email')

   if (error) {
      throw new Error(error.message)
   }

   return { users: data }
}
