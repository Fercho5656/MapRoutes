import { PostgrestError } from '@supabase/supabase-js'
import IZone from "~~/interfaces/IZone"

export const getZones = async (): Promise<IZone[] | PostgrestError> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IZone>('zone')
    .select('*')
    .order('name', { ascending: true })

  if (error) return error
  return data
}

export const addZone = async (zone: IZone): Promise<IZone | PostgrestError> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IZone>('zone')
    .insert(zone)

  if (error) return error
  return data[0]
}

export const updateZone = async (zoneId: number, newZone: IZone): Promise<IZone | PostgrestError> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IZone>('zone')
    .update(newZone)
    .eq('id', zoneId)

  if (error) return error
  return data[0]
}

export const deleteZone = async (zoneId: number): Promise<IZone | PostgrestError> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IZone>('zone')
    .delete()
    .eq('id', zoneId)

  if (error) return error
  return data[0]
}