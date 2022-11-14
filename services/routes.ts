import { PostgrestError } from '@supabase/supabase-js'
import IRoute from "~~/interfaces/IRoute"

export const getRoutes = async (): Promise<IRoute[] | PostgrestError> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IRoute>('route')
    .select('*, seller: seller_id(*)')
    .order('id', { ascending: true })
  console.log(data)
  if (error) return error
  return data
}

export const addRoute = async (route: IRoute): Promise<IRoute | PostgrestError> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IRoute>('route')
    .insert({
      ...route,
    })
    .select('*, seller: seller_id(*)')
  if (error) return error
  return data[0]
}

export const updateRoute = async (routeId: number, newRoute: IRoute): Promise<IRoute | PostgrestError> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IRoute>('route')
    .update(newRoute)
    .match({ id: routeId })
    .select('*, seller: seller_id(*)')
  if (error) return error
  return data[0]
}

export const deleteRoute = async (routeId: number): Promise<IRoute | PostgrestError> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IRoute>('route')
    .delete()
    .match({ id: routeId })
  if (error) return error
  return data[0]
}