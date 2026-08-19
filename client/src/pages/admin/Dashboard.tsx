export default function AdminDashboard() {
  return (
    <div className="rounded-xl border border-dashed border-neutral-300 p-6">
      <h1 className="mb-2 text-xl font-bold">Trang quan tri</h1>
      <p className="text-sm text-neutral-600">TODO — Giai doan 4:</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600">
        <li>Bang san pham + them / sua / xoa (API da co san o server)</li>
        <li>Bang don hang + doi trang thai (<code>PATCH /orders/:id/status</code>)</li>
        <li>Thong ke: doanh thu theo ngay, top san pham ban chay</li>
      </ul>
    </div>
  );
}
