import { AxiosResponse } from "axios";
import { instance } from "./instance";

interface IService {
  getOrders(): Promise<IResponse>;
  staticgetOrdersDetails(orderId: number): Promise<IResponse>;
}

interface IOrderResponse {
  id: number;
  description: string;
  title: string;
  details: string;
  status: string;
}

interface IResponse {
  orders: Array<IOrderResponse>;
}


export async function getOrders(){
  return instance.get("/orders").then((orders: AxiosResponse) => orders.data);
}

export async function getOrderDetails(orderId: number){
  return instance.get(`/orders/${orderId}`).then((orders: AxiosResponse) => orders.data);
}
