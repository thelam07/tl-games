import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../store/cart';
import { useAuth } from '../store/auth';
import { formatVND } from '../lib/format';

export default function Cart() {
  const { items, setQuantity, remove, totalPrice } = useCart();
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-neutral-500">Gio hang dang trong.</p>
        <Link to="/" className="mt-4 inline-block rounded-lg bg-brand px-6 py-2 font-semibold text-ink">
          Mua sam ngay
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Gio hang</h1>

      <div className="space-y-3">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4">
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-neutral-500">{formatVND(product.price)}</p>
            </div>
            <input
              type="number"
              min={0}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(product.id, Number(e.target.value))}
              className="w-20 rounded-lg border border-neutral-300 px-3 py-2"
            />
            <p className="w-32 text-right font-semibold">{formatVND(product.price * quantity)}</p>
            <button onClick={() => remove(product.id)} className="text-sm text-red-500 hover:underline">
              Xoa
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-6">
        <p className="text-lg">
          Tong cong: <span className="text-2xl font-bold">{formatVND(totalPrice())}</span>
        </p>
        <button
          onClick={() => navigate(user ? '/thanh-toan' : '/dang-nhap')}
          className="rounded-lg bg-ink px-8 py-3 font-semibold text-white"
        >
          {user ? 'Thanh toan' : 'Dang nhap de dat hang'}
        </button>
      </div>
    </>
  );
}
