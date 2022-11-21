import IClient from "./IClient";
import IRoute from "./IRoute";

export default interface IClientRoute {
  id?: number;
  client_id: number;
  client?: IClient;
  route_id: number;
  route?: IRoute;
  order: number;
  created_at?: Date;
}