import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { OrderProvider } from './contexts/OrderContext'
import { ToastProvider } from './contexts/ToastContext'
import ToastContainer from './components/common/ToastContainer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OrderProvider>
      <ToastProvider>
        <App />
        <ToastContainer />
      </ToastProvider>
    </OrderProvider>
  </StrictMode>,
)
