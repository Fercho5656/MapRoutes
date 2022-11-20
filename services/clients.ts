import IClient from "~~/interfaces/IClient"
import ISupabaseQuery from '~~/interfaces/ISupabaseQuery'

export const getClients = async (): Promise<ISupabaseQuery<IClient>> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from<IClient>('client')
    .select('*, zone: zone_id(*)')

  return { data, error }
}

export const addClient = async (newClient: IClient): Promise<ISupabaseQuery<IClient>> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from<IClient>('client')
    .insert(newClient)
    .select('*, zone: zone_id(*)')
    .single()
  return { data, error }
}
export const deleteClient = async (clientId: number): Promise<ISupabaseQuery<IClient>> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from<IClient>('client')
    .delete()
    .eq('id', clientId)
    .select('*')

  return { data, error }
}
export const updateClient = async (clientId: number, updatedClient: IClient): Promise<ISupabaseQuery<IClient>> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from<IClient>('client')
    .update(updatedClient)
    .eq('id', clientId)
    .select('*')
    .single()

  return { data, error }
}