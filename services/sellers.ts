import { PostgrestError } from '@supabase/supabase-js'
import ISeller from '~~/interfaces/ISeller'
import ISupabaseQuery from '~~/interfaces/ISupabaseQuery'

export const getSellers = async (): Promise<ISupabaseQuery<ISeller>> => {
  const client = useSupabaseClient()

  const { error, data } = await client
    .from('seller')
    .select('*')
  return { data, error }
}

export const addSeller = async (seller: ISeller): Promise<ISupabaseQuery<ISeller>> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('seller')
    .insert({
      ...seller
    })
    .select()
    .single()

  return { data, error }
}

export const updateSeller = async (sellerId: number, newSeller: ISeller): Promise<ISupabaseQuery<ISeller>> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('seller')
    .update({
      ...newSeller
    })
    .eq('id', sellerId)
    .select()
    .single()
    
  return { data, error }
}

export const deleteSeller = async (sellerId: number): Promise<ISupabaseQuery<ISeller>> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('seller')
    .delete()
    .eq('id', sellerId)
    .select()

  return { data, error }
}