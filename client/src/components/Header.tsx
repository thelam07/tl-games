import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../store/cart';
import { useAuth } from '../store/auth';

export default function Header() {
  const totalItems = useCart((s) => s.totalItems());
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium ${isActive ? 'text-brand' : 'text-neutral-600 hover:text-ink'}`;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4">
        <Link to="/" className="mr-4 text-lg font-bold">
          TL<span className="text-brand">Tech</span> Store
        </Link>

        <nav className="flex flex-1 items-center">
          <NavLink to="/" className={linkClass} end>Trang chu</NavLink>
          {user && <NavLink to="/don-hang" className={linkClass}>Don hang</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin" className={linkClass}>Quan tri</NavLink>}
        </nav>

        <Link to="/gio-hang" className="relative px-3 py-2 text-sm font-medium">
          Gio hang
          {totalItems > 0 && (
            <span className="absolute -top-1 right-0 rounded-full bg-brand px-1.5 text-xs font-bold text-ink">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <button onClick={logout} className="ml-2 text-sm text-neutral-600 hover:text-ink">
            Dang xuat ({user.full_name})
          </button>
        ) : (
          <Link to="/dang-nhap" className="ml-2 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white">
            Dang nhap
          </Link>
        )}
      </div>
    </header>
  );
}
