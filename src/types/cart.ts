import type { IProduct } from './product'
import type { Tloading } from './shared'

export interface ICartState {
  items: Record<number, number>
  productsFullData: IProduct[]
  error: null | string
  loading: Tloading
}
