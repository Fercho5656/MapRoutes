import ISupabaseQuery from '~~/interfaces/ISupabaseQuery'
import IProduct from "~~/interfaces/IProduct"

export const getProducts = async (): Promise<ISupabaseQuery<IProduct>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProduct>('product')
    .select('*')
    .order('name', { ascending: true })

  return { data, error }
}

export const addProduct = async (product: IProduct): Promise<ISupabaseQuery<IProduct>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProduct>('product')
    .insert(product)
    .select()
    .single()

  return { data, error }
}

export const updateProduct = async (productId: number, newproduct: IProduct): Promise<ISupabaseQuery<IProduct>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProduct>('product')
    .update(newproduct)
    .eq('id', productId)
    .select()
    .single()
  return { data, error }
}

export const deleteProduct = async (productId: number): Promise<ISupabaseQuery<IProduct>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IProduct>('product')
    .delete()
    .eq('id', productId)

  return { data, error }
}