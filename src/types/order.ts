import type { Tloading } from './shared'

export interface IOrderItem {
  productId: number
  name: string
  quantity: number
  price: number
  image?: string
}

export interface IOrder {
  id?: number
  userId: number | null
  items: IOrderItem[]
  total: number
  createdAt: string
  status: 'pending' | 'paid' | 'shipped' | 'completed'
}

export interface IOrderState {
  records: IOrder[]
  loading: Tloading
  error: string | null
  placing: boolean
}
