import IZone from "./IZone"

export default interface IClient {
  id?: number
  name: string
  lat: string
  lng: string
  zone_id: number
  zone: IZone
  created_at?: string
}