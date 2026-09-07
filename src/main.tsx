import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

try {
  const rootPersist = localStorage.getItem('persist:root')
  if (rootPersist) {
    const parsedRoot = JSON.parse(rootPersist)
    if (parsedRoot && typeof parsedRoot === 'object' && 'wishlist' in parsedRoot) {
      delete parsedRoot.wishlist
      localStorage.setItem('persist:root', JSON.stringify(parsedRoot))
    }
  }
  localStorage.removeItem('persist:wishlist')
} catch {
  localStorage.removeItem('persist:wishlist')
}

// redux
import { store, persistor } from './store'

// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'

// persist data
import { PersistGate } from 'redux-persist/integration/react'

import RouteApp from './routes/RouteApp'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouteApp />
    </PersistGate>
  </Provider>
)
