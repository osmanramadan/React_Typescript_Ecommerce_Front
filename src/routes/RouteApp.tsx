import Home from '../pages/Home';
import Products from '../pages/Products/Products';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Categories from '../pages/Categories/Categories';

import MainLayout from '../layouts/MainLayout/MainLayout'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RouteError from '../pages/Error';
import CartPage from '../pages/Cart/Cart';



const router = createBrowserRouter([
    {
        path:'/',
        errorElement:<RouteError/>,
        element:<MainLayout/>,
        children:[
                  {
                     element:<Home/>,
                     index:true
                  },
                   {
                    path:'products/:prefex',
                    element:<Products/>,
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
                    element:<Products/>
                  },
                    {
                    path:'cart',
                    element:<CartPage/>
                  },

                  { 
                    path:'about-us',
                    element:<About/>

                  },
                    { 
                    path:'contact',
                    element:<Contact/>

                  },
                    { 
                    path:'categories',
                    element:<Categories/>

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