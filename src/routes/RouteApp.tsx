import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RouteError from '@pages/Error'
const Home   =  lazy(() => import('@pages/Home'))
import PageSuspenseFallback from '@/components/message/SuspenseFallback/SuspenseFallback'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile/Profile'
import ProtectedRoute from '@/components/ecommerce/Auth/ProtectedRoute'
import AdminRoute from '@/components/ecommerce/Auth/AdminRoute'
const Products = lazy(() => import('@pages/Products/Products'))
const About = lazy(() => import('@pages/About'))
const Contact = lazy(() => import('@pages/Contact'))
const Categories = lazy(() => import('@pages/Categories/Categories'))
const {
  NewArrivalsPage,
  BestSellersPage,
  DealsPage,
  GiftCardsPage,
  TrackOrderPage,
  ReturnsPage,
  ShippingInfoPage,

  PrivacyPage,
  TermsPage,
  CookiesPage,
} = await import('@/pages/FooterSectionPages')

const MainLayout = lazy(() => import('@layouts/MainLayout/MainLayout'))
const CartPage = lazy(() => import('@pages/Cart/Cart'))
const PaymentPage = lazy(() => import('@pages/Payment/Payment'))
const OrdersPage = lazy(() => import('@pages/Orders/Orders'))
const Wishlist = lazy(() => import('@pages/Wishlist/Wishlist'))
const EditProfile = lazy(() => import('@pages/Profile/EditProfile'))
const AdminDashboard = lazy(() => import('@pages/Admin/AdminDashboard'))

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: (
        <RouteError />
    ),

    element: (
      <PageSuspenseFallback initLoad>
         <MainLayout />
      </PageSuspenseFallback>
        
    ),

    children: [
      {
        element: <Home />,
        index: true,
      },
        {
        path: 'signup',
        element: (
          <PageSuspenseFallback>
            <Register/>
          </PageSuspenseFallback>
        )
      },
      {
        path: 'login',
        element: (
          <PageSuspenseFallback>
            <Login/>
          </PageSuspenseFallback>
        )
      },
            {
        path: 'profile',
        element: (
          <PageSuspenseFallback>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </PageSuspenseFallback>
        )
      },
            {
              path: 'profile/edit',
              element: (
                <PageSuspenseFallback>
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                </PageSuspenseFallback>
              ),
            },
      {
        path: 'products/:prefex',
        element: (
          <PageSuspenseFallback>
            <Products />
          </PageSuspenseFallback>
        ),
        loader: ({ params }) => {
          if (typeof params.prefex !== 'string' || !/^[a-z]+$/i.test(params.prefex)) {
            throw new Response('Bad Request', {
              statusText: 'Category not found',
              status: 404,
            })
          }
          return true
        },
      },
      {
        path: 'products',
        element: (
           <PageSuspenseFallback>
            <Products />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'cart',
        element: (
          <PageSuspenseFallback>
            <CartPage />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <PageSuspenseFallback>
            <Wishlist />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'payment',
        element: (
          <PageSuspenseFallback>
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'orders',
        element: (
          <PageSuspenseFallback>
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'admin',
        element: (
          <PageSuspenseFallback>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </PageSuspenseFallback>
        ),
      },

      {
        path: 'about-us',
        element: (
          <PageSuspenseFallback>
            <About />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'contact',
        element: (
          <PageSuspenseFallback>
            <Contact />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'categories',
        element: (
          <PageSuspenseFallback>
            <Categories />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'new-arrivals',
        element: <PageSuspenseFallback><NewArrivalsPage /></PageSuspenseFallback>,
      },
      {
        path: 'best-sellers',
        element: <PageSuspenseFallback><BestSellersPage /></PageSuspenseFallback>,
      },
      {
        path: 'deals',
        element: <PageSuspenseFallback><DealsPage /></PageSuspenseFallback>,
      },
      {
        path: 'gift-cards',
        element: <PageSuspenseFallback><GiftCardsPage /></PageSuspenseFallback>,
      },
      {
        path: 'track-order',
        element: <PageSuspenseFallback><TrackOrderPage /></PageSuspenseFallback>,
      },
      {
        path: 'returns',
        element: <PageSuspenseFallback><ReturnsPage /></PageSuspenseFallback>,
      },
      {
        path: 'shipping-info',
        element: <PageSuspenseFallback><ShippingInfoPage /></PageSuspenseFallback>,
      },
      {
        path: 'privacy',
        element: <PageSuspenseFallback><PrivacyPage /></PageSuspenseFallback>,
      },
      {
        path: 'terms',
        element: <PageSuspenseFallback><TermsPage /></PageSuspenseFallback>,
      },
      {
        path: 'cookies',
        element: <PageSuspenseFallback><CookiesPage /></PageSuspenseFallback>,
      },
    ],
  },
])

function RouteApp() {
  return <RouterProvider router={router} />
}

export default RouteApp
