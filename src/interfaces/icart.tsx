import { IProduct } from "./iproduct";

export interface ICart {
  id: number;
  products_id: number;
  qty: number;
  user_id: number;
  _products: IProduct ;
  checked: boolean;
}
