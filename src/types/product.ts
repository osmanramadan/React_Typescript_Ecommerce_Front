import type { Tloading } from './shared'

export interface IProduct {
  id: number
  name: string
  category: string // matches a Category slug
  price: number
  oldPrice?: number
  rating: number // 0–5
  reviewCount: number
  image: string
  badge?: 'new' | 'sale' | 'bestseller'
  inStock: boolean
  quantity?: number
  numInStock: number
}

export interface IProductsState {
  records: IProduct[]
  loading: Tloading
  error: string | null
}
