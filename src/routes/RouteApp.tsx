import Home from '../pages/Home';
import Products from '../pages/Products/Products';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Categories from '../pages/Categories/Categories';

import MainLayout from '../layouts/MainLayout/MainLayout'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RouteError from '../pages/Error';
import { productsLoader } from '../pages/Products/Products';



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
                    path:'products',
                    element:<Products/>
                  },
                  {
                    path:'products/:prefex',
                    element:<Products/>,
                    loader:productsLoader
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