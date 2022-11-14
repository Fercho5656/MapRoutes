import ISeller from "./ISeller"

export default interface IRoute {
  id?: number
  name: string
  seller_id: number
  seller?: ISeller
  is_completed?: boolean
  created_at?: string
}