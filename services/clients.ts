import {PostgrestError} from '@supabase/supabase-js'
import IClient from "~~/interfaces/IClient"

export const getClients = async (): {Promise<IClient[]> | Promise<PostgrestError>} => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from<IClient>('client')
    .select('*')

  if (error) return error
  return data
}