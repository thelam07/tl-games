import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Login() {
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-6 text-2xl font-bold">Dang nhap</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2"
        />
        <input
          type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Mat khau"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2"
        />

        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit" disabled={loading}
          className="w-full rounded-lg bg-brand py-2.5 font-semibold text-ink disabled:opacity-50"
        >
          {loading ? 'Dang xu ly...' : 'Dang nhap'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-neutral-600">
        Chua co tai khoan? <Link to="/dang-ky" className="font-medium text-brand-dark">Dang ky</Link>
      </p>
    </div>
  );
}
