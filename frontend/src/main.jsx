import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import WishListProvider from './context/WishListProvider.jsx'
import AuthProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <WishListProvider>
        <App />
        <ToastContainer position='top-right' autoClose={2000} />
      </WishListProvider>
    </AuthProvider>
  </BrowserRouter>

)
