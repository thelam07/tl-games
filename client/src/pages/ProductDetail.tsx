import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '@shared/types';
import { get } from '../api/client';
import { formatVND } from '../lib/format';
import { useCart } from '../store/cart';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const add = useCart((s) => s.add);

  useEffect(() => {
    get<Product>(`/products/${slug}`).then(setProduct).catch((e: Error) => setError(e.message));
  }, [slug]);

  if (error) return <p className="rounded-lg bg-red-50 p-4 text-red-600">{error}</p>;
  if (!product) return <p className="text-neutral-500">Dang tai...</p>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="aspect-4/3 overflow-hidden rounded-xl bg-neutral-100">
        {product.images[0] && (
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-4 text-3xl font-bold text-brand-dark">{formatVND(product.price)}</p>
        <p className="mt-2 text-sm text-neutral-500">Con lai: {product.stock} san pham</p>
        <p className="mt-4 whitespace-pre-line text-neutral-700">{product.description}</p>

        <div className="mt-6 flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 rounded-lg border border-neutral-300 px-3 py-2"
          />
          <button
            disabled={product.stock === 0}
            onClick={() => add(product, quantity)}
            className="rounded-lg bg-brand px-6 py-2 font-semibold text-ink disabled:bg-neutral-200"
          >
            Them vao gio
          </button>
        </div>

        {/* TODO (giai doan 4): hien thi danh sach danh gia + form danh gia */}
      </div>
    </div>
  );
}
