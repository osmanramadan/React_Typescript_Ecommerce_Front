export interface Product {
  id: string
  name: string
  category: string // matches a Category slug
  price: number
  oldPrice?: number
  rating: number // 0–5
  reviewCount: number
  image: string
  badge?: 'new' | 'sale' | 'bestseller'
  inStock: boolean
}