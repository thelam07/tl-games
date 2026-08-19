import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../store/auth';

// Chan route: chua dang nhap -> day ve trang dang nhap.
// Truyen adminOnly={true} de chi cho admin vao.
export default function RequireAuth({ adminOnly = false }: { adminOnly?: boolean }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="text-center text-neutral-500">Dang tai...</p>;
  if (!user) return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;

  return <Outlet />;
}
