import { useEffect, useState } from 'react';
import type { Category, Paginated, Product } from '@shared/types';
import { get } from '../api/client';
import ProductCard from '../components/ProductCard';

// Trang danh sach san pham: tim kiem + loc danh muc + sap xep + phan trang.
// Day la trang mau — cac trang khac lam theo cung cach nay.
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState('');
  const [category, setCategory] = useState<number | ''>('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    get<Category[]>('/categories').then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    // debounce: doi 300ms sau khi go xong moi goi API, tranh goi lien tuc tung chu
    const timer = setTimeout(() => {
      setLoading(true);
      const params = new URLSearchParams({ sort, page: String(page), limit: String(limit) });
      if (q) params.set('q', q);
      if (category) params.set('category', String(category));

      get<Paginated<Product>>(`/products?${params}`)
        .then((res) => {
          setProducts(res.data);
          setTotal(res.total);
          setError(null);
        })
        .catch((e: Error) => setError(e.message))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer); // huy lan goi cu neu nguoi dung go tiep
  }, [q, category, sort, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">San pham</h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          placeholder="Tim san pham..."
          className="flex-1 min-w-50 rounded-lg border border-neutral-300 px-4 py-2"
        />
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value ? Number(e.target.value) : ''); setPage(1); }}
          className="rounded-lg border border-neutral-300 px-4 py-2"
        >
          <option value="">Tat ca danh muc</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="rounded-lg border border-neutral-300 px-4 py-2"
        >
          <option value="newest">Moi nhat</option>
          <option value="price_asc">Gia tang dan</option>
          <option value="price_desc">Gia giam dan</option>
        </select>
      </div>

      {error && <p className="rounded-lg bg-red-50 p-4 text-red-600">{error}</p>}
      {loading && <p className="text-neutral-500">Dang tai...</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-neutral-500">Khong tim thay san pham nao.</p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-lg border text-sm ${
                n === page ? 'border-brand bg-brand font-bold' : 'border-neutral-300 bg-white'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
