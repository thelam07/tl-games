import { Link } from 'react-router-dom';
import type { Product } from '@shared/types';
import { formatVND } from '../lib/format';
import { useCart } from '../store/cart';

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const soldOut = product.stock === 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:shadow-lg">
      <Link to={`/san-pham/${product.slug}`} className="block aspect-4/3 bg-neutral-100">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            Chua co anh
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/san-pham/${product.slug}`} className="font-medium hover:text-brand-dark">
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{product.description}</p>

        <div className="mt-auto pt-3">
          <p className="text-lg font-bold">{formatVND(product.price)}</p>
          <button
            disabled={soldOut}
            onClick={() => add(product)}
            className="mt-2 w-full rounded-lg bg-brand py-2 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
          >
            {soldOut ? 'Het hang' : 'Them vao gio'}
          </button>
        </div>
      </div>
    </div>
  );
}
