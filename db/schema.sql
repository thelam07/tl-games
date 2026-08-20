-- TL-Games — cau truc co so du lieu (PostgreSQL / Supabase)
-- Cach dung: copy noi dung file nay -> Supabase Dashboard -> SQL Editor -> Run
--
-- Ban thiet ke bang tieng Viet. SQL that se viet o buoi hoc tiep theo.
-- Cac dong danh dau (*) la 3 cot mentor dien not, con lai sinh vien tu quyet.

drop table if exists chi_tiet_don cascade;
drop table if exists don_hang     cascade;
drop table if exists kho          cascade;
drop table if exists san_pham     cascade;
drop table if exists nguoi_dung   cascade;

-- Bang nguoi dung
-- id
-- ten hien thi
-- username dang nhap     
-- sdt
-- email
-- matkhau (da hash)
-- vai tro                 -- 'user' | 'admin'

create table nguoi_dung (
  id bigint generated always as identity primary key,
  username text not null unique,
  email text not null unique,
  mat_khau_hash text not null,
  ten_hien_thi text not null,
  sdt text,
  ngay_tao timestamptz not null default now(),
  vai_tro text not null default 'user'
        check (vai_tro in ('user', 'admin'))
);

-- Bang san pham           -- MAT HANG: cai khach NHIN THAY tren trang chu
-- id san pham
-- anh minh hoa
-- ten san pham
-- nen tang
-- gia
-- khuyen mai
-- mo ta san pham
-- loai vat pham (acc, key, card)

create table san_pham (
  id bigint generated always as identity primary key,
  ten text not null,
  anh_url text,
  mo_ta text,
  nen_tang text not null,
  gia_goc numeric(12,0) check(gia_goc >= 0) not null,
  khuyen_mai int default 0 check( khuyen_mai between 0 and 100) not null,
  loai text not null check (loai in ('key', 'account', 'giftcard')),
  dang_ban boolean not null default true,
  ngay_tao timestamptz not null default now()
);

-- Bang kho                -- TUNG KEY/ACC CU THE: cai khach NHAN DUOC
-- id
-- id san pham        (*)  -- khoa ngoai -> bang san pham (key nay thuoc mat hang nao)
-- noi dung           (*)  -- "ABCD-1111-XXXX" / "user: abc | pass: 123" / ma the
-- trang thai              -- 'con' | 'da ban'

create table kho (
  id bigint generated always as identity primary key,
  san_pham_id bigint not null references san_pham(id),
  noi_dung text not null,
  trang_thai text not null default 'con' check( trang_thai in ('con', 'da_ban')),
  ngay_tao timestamptz not null default now()
);

-- Bang don hang           -- PHAN DAU HOA DON: 1 don = 1 dong
-- id
-- id ng mua               -- khoa ngoai -> bang nguoi dung
-- date
-- tong tien
-- trang thai              -- cho thanh toan / da thanh toan / da giao / da huy

create table don_hang (
  id bigint generated always as identity primary key,
  nguoi_dung_id bigint not null references nguoi_dung(id),
  tong_tien numeric(12,0) check(tong_tien >= 0) not null,
  trang_thai text not null default 'cho_thanh_toan' check(trang_thai in ('cho_thanh_toan', 'da_thanh_toan', 'da_giao', 'da_huy')),
  ngay_tao timestamptz not null default now()
);

-- Bang chi tiet don       -- PHAN THAN HOA DON: 1 mon = 1 dong
-- id
-- id don hang        (*)  -- khoa ngoai -> bang don hang (dong nay thuoc don nao)
-- id kho hang             -- khoa ngoai -> bang kho (khach duoc giao key nao)
-- gia                     -- gia LUC MUA. Khong lay tu san pham vi gia co the doi sau
--                         -- da bo "so luong": moi dong = 1 key nen luon bang 1

create table chi_tiet_don (
  id bigint generated always as identity primary key,
  don_hang_id bigint not null references don_hang(id),
  kho_id bigint not null references kho(id) unique,
  gia_luc_mua numeric(12,0) check(gia_luc_mua >= 0) not null
);