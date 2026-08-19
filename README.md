# TL-Tech Store — BTL Lập trình Web

Website bán laptop & phụ kiện. **React + TypeScript + Vite** (client) · **Express + TypeScript** (server) · **Supabase/PostgreSQL** (database).

## Cấu trúc

```
btl-ltw/
├── client/          React + TS + Vite + Tailwind v4
│   └── src/
│       ├── api/         gọi API (fetch wrapper, tự gắn token)
│       ├── components/  Header, Layout, ProductCard, RequireAuth
│       ├── lib/         format tiền / ngày
│       ├── pages/       mỗi route 1 file
│       └── store/       zustand: auth, cart (cart tự lưu localStorage)
├── server/          Express + TS
│   ├── scripts/hash.ts  tạo bcrypt hash cho tài khoản admin
│   └── src/
│       ├── lib/         env (validate bằng zod), supabase, jwt
│       ├── middleware/  requireAuth, requireAdmin, errorHandler
│       └── routes/      auth, products, categories, orders
├── shared/types.ts  type dùng chung cả 2 bên — sửa 1 lần, 2 bên đổi theo
└── db/
    ├── schema.sql   tạo bảng + hàm create_order (transaction trừ kho)
    └── seed.sql     18 sản phẩm mẫu + 2 tài khoản
```

## Chạy lần đầu

**1. Tạo database**

Vào [supabase.com](https://supabase.com) → New project → SQL Editor → chạy lần lượt `db/schema.sql` rồi `db/seed.sql`.

**2. Điền biến môi trường**

`server/.env` (copy từ `.env.example`) — lấy từ Supabase → Project Settings → Data API:

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=<service_role key>
JWT_SECRET=<đã sinh sẵn, giữ nguyên>
```

> `service_role` key bỏ qua toàn bộ RLS — **chỉ để ở server**, không bao giờ đưa xuống trình duyệt.

**3. Chạy**

```bash
npm run install:all   # chỉ cần lần đầu
npm run dev           # chạy song song server (3000) + client (5173)
```

Mở http://localhost:5173

Tài khoản mẫu: `admin@tltech.vn / admin123` · `user@tltech.vn / user123`

## Lệnh hay dùng

| Lệnh | Việc |
|---|---|
| `npm run dev` | chạy cả client + server |
| `npm --prefix server run dev` | chỉ server |
| `npm --prefix client run dev` | chỉ client |
| `npm run build` | typecheck server + build client |
| `npm --prefix server run hash <mật-khẩu>` | sinh bcrypt hash |

## API

| Method | Endpoint | Quyền |
|---|---|---|
| POST | `/api/auth/register` · `/api/auth/login` | ai cũng gọi được |
| GET | `/api/auth/me` | đã đăng nhập |
| GET | `/api/products?q=&category=&min=&max=&sort=&page=` | công khai |
| GET | `/api/products/:slug` | công khai |
| POST/PUT/DELETE | `/api/products` · `/api/products/:id` | admin |
| GET | `/api/categories` | công khai |
| POST | `/api/orders` | đã đăng nhập |
| GET | `/api/orders/me` · `/api/orders/:id` | đã đăng nhập |
| GET | `/api/orders?status=` | admin |
| PATCH | `/api/orders/:id/status` | admin |

## Còn phải làm

Các trang đang là stub, mở file ra sẽ thấy gợi ý từng bước:

- [ ] `pages/Register.tsx` — form đăng ký
- [ ] `pages/Checkout.tsx` — đặt hàng
- [ ] `pages/MyOrders.tsx` — lịch sử đơn
- [ ] `pages/admin/Dashboard.tsx` — CRUD sản phẩm, quản lý đơn, thống kê
- [ ] Đánh giá sản phẩm (bảng `reviews` đã có sẵn trong schema)
- [ ] Upload ảnh lên Supabase Storage
- [ ] Deploy: client → Vercel, server → Render

## Deploy

- **Client (Vercel)**: root `client`, build `npm run build`, output `dist`, thêm env `VITE_API_URL=https://<server>.onrender.com`
- **Server (Render)**: root `server`, build `npm install`, start `npm start`, thêm 4 biến trong `.env` + `CLIENT_ORIGIN=https://<app>.vercel.app`
- Render bản free ngủ sau 15 phút không dùng → request đầu tiên chờ ~50s. Trước khi demo nhớ gọi trước cho server thức dậy.
