
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

// redux

import store from './store';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/global.css"

import RouteApp from './routes/RouteApp';



createRoot(document.getElementById('root')!).render(

<Provider store={store}>
   <RouteApp/>
</Provider>

)
