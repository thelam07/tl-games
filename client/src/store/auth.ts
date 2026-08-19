import { create } from 'zustand';
import type { AuthResponse, User } from '@shared/types';
import { post, get, setToken, getToken } from '../api/client';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, full_name: string) => Promise<void>;
  logout: () => void;
  restore: () => Promise<void>; // goi luc mo app: token con han thi lay lai thong tin user
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,

  login: async (email, password) => {
    const res = await post<AuthResponse>('/auth/login', { email, password });
    setToken(res.token);
    set({ user: res.user });
  },

  register: async (email, password, full_name) => {
    const res = await post<AuthResponse>('/auth/register', { email, password, full_name });
    setToken(res.token);
    set({ user: res.user });
  },

  logout: () => {
    setToken(null);
    set({ user: null });
  },

  restore: async () => {
    if (!getToken()) {
      set({ loading: false });
      return;
    }
    try {
      set({ user: await get<User>('/auth/me') });
    } catch {
      setToken(null);
    } finally {
      set({ loading: false });
    }
  },
}));
