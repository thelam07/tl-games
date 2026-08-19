export default function Register() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border border-dashed border-neutral-300 p-6">
      <h1 className="mb-2 text-xl font-bold">Dang ky</h1>
      <p className="text-sm text-neutral-600">
        TODO — Giai doan 2. Lam gan giong <code>Login.tsx</code>, chi khac:
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600">
        <li>Them o "Ho ten" va o "Nhap lai mat khau"</li>
        <li>Kiem tra 2 o mat khau khop nhau truoc khi goi API</li>
        <li>Goi <code>useAuth().register(email, password, full_name)</code></li>
      </ul>
    </div>
  );
}
