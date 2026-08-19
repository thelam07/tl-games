import type { ApiError } from '@shared/types';

// Luc dev de trong -> goi "/api/..." va Vite proxy sang server.
// Luc deploy dien VITE_API_URL -> goi thang sang server that.
const BASE = import.meta.env.VITE_API_URL ?? '';

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

let token: string | null = localStorage.getItem('token');

export function setToken(value: string | null) {
  token = value;
  if (value) localStorage.setItem('token', value);
  else localStorage.removeItem('token');
}

export function getToken() {
  return token;
}

// Ham goi API dung chung. Generic <T> = kieu du lieu mong doi tra ve,
// nho vay cho goi biet luon minh nhan duoc gi, khong phai doan.
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Loi ${res.status}`;
    try {
      const body = (await res.json()) as ApiError;
      if (body?.error) message = body.error;
    } catch {
      /* response khong phai JSON thi giu message mac dinh */
    }
    if (res.status === 401) setToken(null); // token het han -> xoa luon
    throw new HttpError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const get  = <T,>(path: string) => api<T>(path);
export const post = <T,>(path: string, body: unknown) =>
  api<T>(path, { method: 'POST', body: JSON.stringify(body) });
export const put  = <T,>(path: string, body: unknown) =>
  api<T>(path, { method: 'PUT', body: JSON.stringify(body) });
export const patch = <T,>(path: string, body: unknown) =>
  api<T>(path, { method: 'PATCH', body: JSON.stringify(body) });
export const del  = <T,>(path: string) => api<T>(path, { method: 'DELETE' });
