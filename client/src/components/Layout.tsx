import { Outlet } from 'react-router-dom';
import Header from './Header';

// Khung chung cho moi trang: Header o tren, noi dung trang o giua (Outlet), Footer o duoi.
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
        © 2026 TL-Tech Store — Bai tap lon Lap trinh Web
      </footer>
    </div>
  );
}
