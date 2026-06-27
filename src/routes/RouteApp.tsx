import { lazy, Suspense } from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
const RouteError =lazy(()=>import('../pages/Error'));

import Home from '../pages/Home';
const  Products = lazy(()=>import("../pages/Products/Products"))
const  About = lazy(()=>import("../pages/About"));
const  Contact = lazy(()=>import('../pages/Contact'));
const  Categories = lazy(()=>import('../pages/Categories/Categories'));

const  MainLayout = lazy(()=>import('../layouts/MainLayout/MainLayout')) 
const  CartPage = lazy(()=>import('../pages/Cart/Cart'));
const  Wishlist =lazy(()=>import('../pages/Wishlist/Wishlist'));



const router = createBrowserRouter([
    {
        path:'/',
        errorElement:<Suspense fallback="Loading from lazy load"><RouteError/></Suspense>,
        element:<Suspense fallback="Loading from lazy load"><MainLayout/></Suspense>,
        children:[
                  {
                     element:<Home/>,
                     index:true
                  },
                   {
                    path:'products/:prefex',
                    element:<Suspense fallback="Loading from lazy load"><Products/></Suspense>,
                    loader: ({ params }) => {
                       if ( typeof params.prefex !== "string" || !/^[a-z]+$/i.test(params.prefex)) {

                           throw new Response("Bad Request", {
                              statusText: "Category not found",
                              status: 404,
                          });
                       }
                      return true;
                      },
                   },
                    {
                    path:'products',
                    element:<Suspense fallback="Loading from lazy load"><Products/></Suspense>
                  },
                    {
                    path:'cart',
                    element:<Suspense fallback="Loading from lazy load"><CartPage/></Suspense>
                  },
                    {
                    path:'wishlist',
                    element:<Suspense fallback="Loading from lazy load"><Wishlist/></Suspense>
                  },


                  { 
                    path:'about-us',
                    element:<Suspense fallback="Loading from lazy load"><About/></Suspense>

                  },
                    { 
                    path:'contact',
                    element:<Suspense fallback="Loading from lazy load"><Contact/></Suspense>

                  },
                    { 
                    path:'categories',
                    element:<Suspense fallback="Loading from lazy load"><Categories/></Suspense>

                  }
        ]
    }
])

function RouteApp() {
 
  return (
    <RouterProvider router={router}/>
  )
}

export default RouteApp;