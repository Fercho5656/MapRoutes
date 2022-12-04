import IProduct from "./IProduct"
import IRoute from "./IRoute"

export default interface IProductRoute {
  id?: number
  product_id?: number
  route_id?: number
  product?: IProduct
  route?: IRoute
  created_at?: string
}