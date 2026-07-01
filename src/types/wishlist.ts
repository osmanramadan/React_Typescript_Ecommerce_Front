import type { IProduct } from './product'
import type { Tloading } from './shared'

export interface IWishlistState {
  itemsId: number[]
  productsFullData: IProduct[]
  error: null | string
  loading: Tloading
}
