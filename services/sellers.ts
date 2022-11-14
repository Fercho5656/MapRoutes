import { PostgrestError } from '@supabase/supabase-js'
import ISeller from '~~/interfaces/ISeller'

export const getSellers = async (): Promise<ISeller[] | PostgrestError> => {
  const client = useSupabaseClient()

  const { error, data } = await client
    .from('seller')
    .select('*')
  if (error) return error
  return data
}

export const addSeller = async (seller: ISeller): Promise<ISeller | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('seller')
    .insert({
      ...seller
    })
    .select()

  if (error) return error
  return data[0]
}

export const updateSeller = async (sellerId: number, newSeller: ISeller): Promise<ISeller | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('seller')
    .update({
      ...newSeller
    })
    .eq('id', sellerId)
    .select()

  if (error) return error
  return data[0]
}

export const deleteSeller = async (sellerId: number): Promise<ISeller | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('seller')
    .delete()
    .eq('id', sellerId)
    .select()

  if (error) return error
  return data[0]
}