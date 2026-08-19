-- =========================================================
-- TL-Tech Store — Schema cho Supabase (PostgreSQL)
-- Chay trong Supabase Dashboard > SQL Editor
-- =========================================================

-- Xoa bang cu (chi dung luc dev, cho quen tay tren du lieu that)
drop table if exists reviews      cascade;
drop table if exists order_items  cascade;
drop table if exists orders       cascade;
drop table if exists products     cascade;
drop table if exists categories   cascade;
drop table if exists users        cascade;

-- ---------- users ----------
create table users (
  id            bigserial primary key,
  email         text not null unique,
  password_hash text not null,              -- KHONG BAO GIO luu password dang thuong
  full_name     text not null,
  role          text not null default 'user' check (role in ('user','admin')),
  created_at    timestamptz not null default now()
);

-- ---------- categories ----------
create table categories (
  id   bigserial primary key,
  name text not null,
  slug text not null unique
);

-- ---------- products ----------
create table products (
  id          bigserial primary key,
  name        text    not null,
  slug        text    not null unique,
  description text    not null default '',
  price       numeric(12,0) not null check (price >= 0),   -- VND, khong co phan le
  stock       integer not null default 0 check (stock >= 0),
  category_id bigint  references categories(id) on delete set null,
  images      text[]  not null default '{}',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);
create index products_category_idx on products(category_id);
create index products_name_idx     on products using gin (to_tsvector('simple', name));

-- ---------- orders ----------
create table orders (
  id            bigserial primary key,
  user_id       bigint not null references users(id) on delete cascade,
  status        text   not null default 'pending'
                check (status in ('pending','confirmed','shipping','delivered','cancelled')),
  total         numeric(12,0) not null default 0,
  receiver_name text not null,
  phone         text not null,
  address       text not null,
  created_at    timestamptz not null default now()
);
create index orders_user_idx on orders(user_id);

-- ---------- order_items ----------
create table order_items (
  id                bigserial primary key,
  order_id          bigint not null references orders(id) on delete cascade,
  product_id        bigint not null references products(id),
  quantity          integer not null check (quantity > 0),
  price_at_purchase numeric(12,0) not null   -- gia CHOT luc mua, gia product doi sau khong anh huong don cu
);
create index order_items_order_idx on order_items(order_id);

-- ---------- reviews ----------
create table reviews (
  id         bigserial primary key,
  product_id bigint not null references products(id) on delete cascade,
  user_id    bigint not null references users(id) on delete cascade,
  rating     integer not null check (rating between 1 and 5),
  comment    text not null default '',
  created_at timestamptz not null default now(),
  unique (product_id, user_id)   -- moi nguoi chi danh gia 1 lan / 1 san pham
);

-- =========================================================
-- RPC: dat hang trong 1 transaction
-- Vi sao can? Neu tru stock o client hoac chay nhieu cau lenh roi rac,
-- 2 nguoi mua cung luc co the mua qua so luong ton kho.
-- Ham nay khoa dong san pham (for update) roi moi tru -> an toan.
-- =========================================================
create or replace function create_order(
  p_user_id       bigint,
  p_receiver_name text,
  p_phone         text,
  p_address       text,
  p_items         jsonb           -- [{"product_id":1,"quantity":2}, ...]
) returns bigint
language plpgsql
as $$
declare
  v_order_id bigint;
  v_total    numeric(12,0) := 0;
  v_item     jsonb;
  v_pid      bigint;
  v_qty      integer;
  v_price    numeric(12,0);
  v_stock    integer;
  v_name     text;
begin
  insert into orders (user_id, receiver_name, phone, address, total)
  values (p_user_id, p_receiver_name, p_phone, p_address, 0)
  returning id into v_order_id;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_pid := (v_item ->> 'product_id')::bigint;
    v_qty := (v_item ->> 'quantity')::integer;

    -- khoa dong san pham lai, khong cho request khac doc-ghi xen vao
    select price, stock, name into v_price, v_stock, v_name
    from products where id = v_pid and is_active = true
    for update;

    if not found then
      raise exception 'San pham % khong ton tai', v_pid;
    end if;
    if v_stock < v_qty then
      raise exception 'San pham "%" chi con % cai', v_name, v_stock;
    end if;

    update products set stock = stock - v_qty where id = v_pid;

    insert into order_items (order_id, product_id, quantity, price_at_purchase)
    values (v_order_id, v_pid, v_qty, v_price);

    v_total := v_total + v_price * v_qty;
  end loop;

  update orders set total = v_total where id = v_order_id;
  return v_order_id;
end;
$$;
