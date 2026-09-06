import { useEffect } from 'react'
import Header from '@components/shared/Header/Header'
import styles from './styles.module.css'
import Footer from '@components/shared/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { ActGetWishlistProducts, ClearWishlist } from '@store/wishlist/wishlistSlice'

const { container, pageContent } = styles

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.auth.user?.id)

  useEffect(() => {
    if (!userId) {
      dispatch(ClearWishlist())
      return
    }

    const promise = dispatch(ActGetWishlistProducts())

    return () => {
      promise.abort()
    }
  }, [dispatch, userId])

  return (
    <div className={container}>
      <Header />
      <main className={pageContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
