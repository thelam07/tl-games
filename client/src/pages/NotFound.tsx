import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-5xl font-bold text-neutral-300">404</p>
      <p className="mt-2 text-neutral-600">Trang nay khong ton tai.</p>
      <Link to="/" className="mt-4 inline-block font-medium text-brand-dark">Ve trang chu</Link>
    </div>
  );
}
