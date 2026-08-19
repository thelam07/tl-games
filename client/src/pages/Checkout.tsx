export default function Checkout() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-dashed border-neutral-300 p-6">
      <h1 className="mb-2 text-xl font-bold">Thanh toan</h1>
      <p className="text-sm text-neutral-600">TODO — Giai doan 3. Cac buoc:</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600">
        <li>Form: ten nguoi nhan, so dien thoai, dia chi</li>
        <li>Hien lai danh sach san pham trong gio + tong tien</li>
        <li>
          Submit: <code>post('/orders', {'{'} receiver_name, phone, address, items {'}'})</code>
          <br />voi <code>items = cart.items.map(i =&gt; ({'{'} product_id: i.product.id, quantity: i.quantity {'}'}))</code>
        </li>
        <li>Thanh cong: <code>cart.clear()</code> roi chuyen sang trang /don-hang</li>
        <li>That bai: hien loi tu server (vd "chi con 3 cai")</li>
      </ul>
    </div>
  );
}
