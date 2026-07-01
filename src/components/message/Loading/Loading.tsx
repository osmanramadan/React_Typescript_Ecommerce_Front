import type { ReactNode } from 'react'
import type { Tloading } from '@types'
import ProductsSkeleton from '@components/message/Skeletons/ProductsSkeleton'
import CategoriesSkeleton from '@components/message/Skeletons/CategoriesSkeleton'
import CartSkeleton from '@components/message/Skeletons/CartSkeleton'
import LottieHandler from '../LottieHandler/LottieHandler'

type LoadingProps = {
  status: Tloading
  error: null | string
  children: ReactNode
  type: keyof typeof skeletonsItems
}

const skeletonsItems = {
  product: ProductsSkeleton,
  category: CategoriesSkeleton,
  cart: CartSkeleton,
  wishlist: ProductsSkeleton
}

export default function Loading({ status, children, error, type }: LoadingProps) {
  const Component = skeletonsItems[type]

  if (status === 'pending') {
    return <Component />
  }

  if (status === 'failed') {
    return <LottieHandler type='error' autoplay={false} message={`${typeof error === 'string' ? `${error}` : "Un Expected Error"}`}/>
  }

  return <div>{children}</div>
}
