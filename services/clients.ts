import IClient from "~~/interfaces/IClient"
import ISupabaseQuery from '~~/interfaces/ISupabaseQuery'

export const getClients = async (): Promise<ISupabaseQuery<IClient>> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from<IClient>('client')
    .select('*')

  return { data, error }
}