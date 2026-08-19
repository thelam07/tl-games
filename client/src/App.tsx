import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { useAuth } from './store/auth';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/admin/Dashboard';
import NotFound from './pages/NotFound';

export default function App() {
  const restore = useAuth((s) => s.restore);

  // Mo app: kiem tra token trong localStorage con han khong
  useEffect(() => { void restore(); }, [restore]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Ai cung xem duoc */}
          <Route index element={<Home />} />
          <Route path="san-pham/:slug" element={<ProductDetail />} />
          <Route path="gio-hang" element={<Cart />} />
          <Route path="dang-nhap" element={<Login />} />
          <Route path="dang-ky" element={<Register />} />

          {/* Phai dang nhap */}
          <Route element={<RequireAuth />}>
            <Route path="thanh-toan" element={<Checkout />} />
            <Route path="don-hang" element={<MyOrders />} />
          </Route>

          {/* Chi admin */}
          <Route element={<RequireAuth adminOnly />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
