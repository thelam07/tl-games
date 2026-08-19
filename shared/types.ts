// Type dung chung cho ca client va server.
// Sua o day 1 lan -> ca 2 ben deu doi theo, khong bao gio lech field.

export type Role = 'user' | 'admin';

export type OrderStatus =
  | 'pending'      // vua dat, cho xac nhan
  | 'confirmed'    // admin da xac nhan
  | 'shipping'     // dang giao
  | 'delivered'    // da giao xong
  | 'cancelled';   // da huy

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: Role;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  images: string[];
  is_active: boolean;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number; // gia LUC MUA, khong lay gia hien tai cua product
}

export interface Order {
  id: number;
  user_id: number;
  status: OrderStatus;
  total: number;
  receiver_name: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number; // 1..5
  comment: string;
  created_at: string;
}

// ----- Kieu du lieu di qua API -----

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CreateOrderPayload {
  receiver_name: string;
  phone: string;
  address: string;
  items: { product_id: number; quantity: number }[];
}

export interface Paginated<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

export interface ApiError {
  error: string;
}

// Chi cho phep chuyen trang thai theo dung luong nay
export const NEXT_STATUS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['shipping', 'cancelled'],
  shipping: ['delivered'],
  delivered: [],
  cancelled: [],
};
