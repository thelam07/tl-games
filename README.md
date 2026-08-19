# TL-Games — BTL Lập trình Web

Website bán hàng số về game: **key game, account, item, gift card**.
Một cửa hàng (không phải sàn nhiều người bán).

**React + TypeScript + Vite + Tailwind** (client) · **Express + TypeScript** (server) · **Supabase/PostgreSQL** (database).

> Project viết từ đầu. Repo hiện chỉ có khung rỗng + config — mọi code nghiệp vụ sẽ do sinh viên viết.

## Cấu trúc

```
btl-ltw/
├── client/          React + TS + Vite + Tailwind v4
│   └── src/
│       ├── api/         gọi API (fetch wrapper)          — trống
│       ├── components/  UI dùng lại nhiều nơi            — trống
│       ├── lib/         hàm tiện ích (format tiền/ngày)  — trống
│       ├── pages/       mỗi route 1 file                 — trống
│       │   └── Nhap.tsx     sân tập React, không thuộc project
│       ├── store/       zustand: auth, cart              — trống
│       ├── App.tsx      bảng định tuyến                  — tạm
│       └── index.css    Tailwind + màu thương hiệu
├── server/          Express + TS
│   └── src/
│       ├── lib/         env, supabase, jwt               — trống
│       ├── middleware/  requireAuth, errorHandler        — trống
│       ├── routes/      auth, products, orders...        — trống
│       ├── types/       khai báo type cho Express        — trống
│       └── index.ts     điểm khởi động                   — tạm
├── shared/types.ts  type dùng chung cả 2 bên             — trống
└── db/
    ├── schema.sql   tạo bảng                             — trống
    └── seed.sql     dữ liệu mẫu                          — trống
```

## Chạy

```bash
npm run install:all   # chỉ cần lần đầu
npm run dev           # chạy song song server (3000) + client (5173)
```

Mở http://localhost:5173 — hiện ra chữ `TL-Games` là môi trường ổn.
Sân tập React ở http://localhost:5173/nhap

Lúc dev không cần điền `client/.env`: Vite tự chuyển tiếp `/api/...` sang `localhost:3000`
(xem `client/vite.config.ts`), nên không dính lỗi CORS.

## Database

Chưa có. Các bước khi bắt đầu Giai đoạn 0:

1. [supabase.com](https://supabase.com) → New project
2. Thiết kế bảng, viết vào `db/schema.sql`
3. Copy nội dung file → Supabase Dashboard → **SQL Editor** → Run
4. Điền `server/.env` (copy từ `server/.env.example`), lấy giá trị ở Project Settings → Data API

> `service_role` key bỏ qua toàn bộ phân quyền — **chỉ để ở server**, không bao giờ đưa xuống trình duyệt.
> Mọi biến có tiền tố `VITE_` đều bị nhét vào file JS gửi xuống trình duyệt, ai cũng đọc được.

## Lệnh hay dùng

| Lệnh | Việc |
|---|---|
| `npm run dev` | chạy cả client + server |
| `npm --prefix server run dev` | chỉ server |
| `npm --prefix client run dev` | chỉ client |
| `npm run build` | typecheck server + build client |

## Lộ trình

| GĐ | Việc |
|---|---|
| 0 | Thiết kế CSDL, viết `schema.sql` + `seed.sql` |
| 1 | React: JSX, props, `useState`, `.map()`, React Router |
| 2 | Auth: bcrypt + JWT, `requireAuth`, form đăng ký / đăng nhập |
| 3 | Danh sách + tìm kiếm + phân trang, giỏ hàng, đặt hàng (transaction bán key) |
| 4 | Admin CRUD + thống kê, đánh giá, upload ảnh, deploy |

## Deploy

- **Client (Vercel)**: root `client`, build `npm run build`, output `dist`, thêm env `VITE_API_URL=https://<server>.onrender.com`
- **Server (Render)**: root `server`, build `npm install`, start `npm start`, thêm các biến trong `.env` + `CLIENT_ORIGIN=https://<app>.vercel.app`
- Render free ngủ sau 15 phút → request đầu chờ ~50s. Trước khi demo nhớ gọi trước cho server thức dậy.
- Supabase free **tạm dừng project sau ~7 ngày không có request tới database**. Cần một job gọi định kỳ vào endpoint có truy vấn DB thật (endpoint chỉ trả `{ok:true}` mà không chạm DB thì vô tác dụng).

## Tham khảo

Branch `scaffold-goc` giữ scaffold cũ (TL-Tech Store bán laptop) để đối chiếu khi bí:

```bash
git show scaffold-goc:server/src/routes/orders.ts
```

Domain khác nhau nên không dán thẳng được — đọc để hiểu ý tưởng, rồi tự viết lại.
