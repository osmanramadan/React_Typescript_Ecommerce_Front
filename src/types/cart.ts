import type { IProduct } from "./product";


export default interface ICartState{
  items:Record<number,number>;
  productFullData: IProduct[]
}