import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import WishListProvider from './context/WishListContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <WishListProvider>
      <App />
      <ToastContainer position='top-right' autoClose={2000} />
    </WishListProvider>
  </BrowserRouter>

)
