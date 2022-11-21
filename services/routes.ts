import IRoute from "~~/interfaces/IRoute"
import ISupabaseQuery from '~~/interfaces/ISupabaseQuery'

export const getRoutes = async (): Promise<ISupabaseQuery<IRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IRoute>('route')
    .select('*, seller: seller_id(*)')
    .order('id', { ascending: true })
  return { data, error }
}

export const getRoute = async (routeId: number): Promise<ISupabaseQuery<IRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IRoute>('route')
    .select('*, seller: seller_id(*)')
    .eq('id', routeId)
    .single()
  
  return { data, error }
}

export const addRoute = async (route: IRoute): Promise<ISupabaseQuery<IRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IRoute>('route')
    .insert({
      ...route,
    })
    .select('*, seller: seller_id(*)')
    .single()
  return { data, error }
}

export const updateRoute = async (routeId: number, newRoute: IRoute): Promise<ISupabaseQuery<IRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IRoute>('route')
    .update(newRoute)
    .match({ id: routeId })
    .select('*, seller: seller_id(*)')
    .single()
  return { data, error }
}

export const deleteRoute = async (routeId: number): Promise<ISupabaseQuery<IRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IRoute>('route')
    .delete()
    .match({ id: routeId })
  return { data, error }
}