import IClientRoute from "~~/interfaces/IClientRoute";
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery";

export const getClientRoutes = async (): Promise<ISupabaseQuery<IClientRoute[]>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IClientRoute>("client_route")
    .select("*, client:client_id (*), route:route_id (*)")
    .order("order", { ascending: true })

  return { data, error }
}

export const getRoutesByClient = async (clientId: number): Promise<ISupabaseQuery<IClientRoute[]>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IClientRoute>("client_route")
    .select("*, client:client_id (*), route:route_id (*)")
    .eq("client_id", clientId)
    .order("order", { ascending: true })
    .order("route_id", { ascending: true })

  return { data, error }
}

export const getClientsByRoute = async (routeId: number): Promise<ISupabaseQuery<IClientRoute[]>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IClientRoute>("client_route")
    .select("*, client:client_id (*), route:route_id (*)")
    .eq("route_id", routeId)
    .order("order", { ascending: true })
    .order("client_id", { ascending: true })

  return { data, error }
}

export const getClientRoute = async (id: number): Promise<ISupabaseQuery<IClientRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IClientRoute>("client_route")
    .select("*, client:client_id (*), route:route_id (*)")
    .eq("id", id)
    .single()

  return { data, error }
}

export const addClientRoute = async (clientRoute: IClientRoute): Promise<ISupabaseQuery<IClientRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IClientRoute>("client_route")
    .insert(clientRoute)
    .select("*, client:client_id (*), route:route_id (*)")
    .single()

  return { data, error }
}

export const updateClientRoute = async (clientRouteId: number, clientRoute: IClientRoute): Promise<ISupabaseQuery<IClientRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IClientRoute>("client_route")
    .update(clientRoute)
    .eq("id", clientRouteId)
    .select("*, client:client_id (*), route:route_id (*)")
    .single()

  return { data, error }
}

export const deleteClientRoute = async (clientRouteId: number): Promise<ISupabaseQuery<IClientRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IClientRoute>("client_route")
    .delete()
    .eq("id", clientRouteId)
    .select("*, client:client_id (*), route:route_id (*)")
    .single()

  return { data, error }
}