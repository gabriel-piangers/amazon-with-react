import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrdersPage from './pages/OdersPage.jsx'
import TrackingPage from './pages/TrackingPage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path='checkout' element={<CheckoutPage/>}/>
      <Route path='orders' element={<OrdersPage/>}/>
      <Route path='tracking' element={<TrackingPage/>}/>
    </Routes>
  </BrowserRouter> 
)
