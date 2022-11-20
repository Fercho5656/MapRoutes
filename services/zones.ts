import { PostgrestError } from '@supabase/supabase-js'
import ISupabaseQuery from '~~/interfaces/ISupabaseQuery'
import IZone from "~~/interfaces/IZone"

export const getZones = async (): Promise<ISupabaseQuery<IZone>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IZone>('zone')
    .select('*')
    .order('name', { ascending: true })

  return { data, error }
}

export const addZone = async (zone: IZone): Promise<ISupabaseQuery<IZone>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IZone>('zone')
    .insert(zone)
    .select()
    .single()

  return { data, error }
}

export const updateZone = async (zoneId: number, newZone: IZone): Promise<ISupabaseQuery<IZone>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IZone>('zone')
    .update(newZone)
    .eq('id', zoneId)
    .select()
    .single()
  return { data, error }
}

export const deleteZone = async (zoneId: number): Promise<ISupabaseQuery<IZone>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from<IZone>('zone')
    .delete()
    .eq('id', zoneId)

  return { data, error }
}