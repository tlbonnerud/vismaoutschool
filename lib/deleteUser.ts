'use server'

import { supabase } from '@/lib/supabase'

export async function deleteUser(userId: string) {
   const { data, error } = await supabase
      .from('Users')
      .delete()
      .eq('user_id', userId.trim())
      .select()

   if (error) {
      throw new Error(error.message)
   }

   return { user: data }
}
