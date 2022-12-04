import IProductRoute from "~~/interfaces/IProductRoute";
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery";

export const getProductRoutes = async (): Promise<ISupabaseQuery<IProductRoute[]>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProductRoute>("client_route")
    .select("*, client:client_id (*), route:route_id (*)")
  return { data, error }
}

export const getRoutesByProduct = async (productId: number): Promise<ISupabaseQuery<IProductRoute[]>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProductRoute>("product_route")
    .select("*, product:product_id (*), route:route_id (*)")
    .eq("product_id", productId)
    .order("route_id", { ascending: true })
  return { data, error }
}

export const getProductsByRoute = async (routeId: number): Promise<ISupabaseQuery<IProductRoute[]>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProductRoute>("product_route")
    .select("*, product:product_id (*), route:route_id (*)")
    .eq("route_id", routeId)
  return { data, error }
}

export const getProductRoute = async (id: number): Promise<ISupabaseQuery<IProductRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProductRoute>("product_route")
    .select("*, product:product_id (*), route:route_id (*)")
    .eq("id", id)
    .single()
  return { data, error }
}

export const addProductRoute = async (productRoute: IProductRoute): Promise<ISupabaseQuery<IProductRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProductRoute>("product_route")
    .insert(productRoute)
    .select("*, product:product_id (*), route:route_id (*)")
    .single()
  return { data, error }
}

export const updateProductRoute = async (productRouteId: number, productRoute: IProductRoute): Promise<ISupabaseQuery<IProductRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProductRoute>("product_route")
    .update(productRoute)
    .eq("id", productRouteId)
    .select("*, product:product_id (*), route:route_id (*)")
    .single()
  return { data, error }
}

export const deleteProductRoute = async (productRouteId: number): Promise<ISupabaseQuery<IProductRoute>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProductRoute>("product_route")
    .delete()
    .eq("id", productRouteId)
    .select("*, product:product_id (*), route:route_id (*)")
    .single()
  return { data, error }
}