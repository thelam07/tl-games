-- TL-Games — cau truc co so du lieu (PostgreSQL / Supabase)
-- Cach dung: copy noi dung file nay -> Supabase Dashboard -> SQL Editor -> Run
--
-- Ban thiet ke bang tieng Viet. SQL that se viet o buoi hoc tiep theo.
-- Cac dong danh dau (*) la 3 cot mentor dien not, con lai sinh vien tu quyet.


-- Bang nguoi dung
-- id
-- ten hien thi
-- username dang nhap     
-- sdt
-- email
-- matkhau (da hash)
-- vai tro                 -- 'user' | 'admin'


-- Bang san pham           -- MAT HANG: cai khach NHIN THAY tren trang chu
-- id san pham
-- anh minh hoa
-- ten san pham
-- nen tang
-- gia
-- khuyen mai
-- mo ta san pham
-- loai vat pham (acc, key, card)


-- Bang kho                -- TUNG KEY/ACC CU THE: cai khach NHAN DUOC
-- id
-- id san pham        (*)  -- khoa ngoai -> bang san pham (key nay thuoc mat hang nao)
-- noi dung           (*)  -- "ABCD-1111-XXXX" / "user: abc | pass: 123" / ma the
-- trang thai              -- 'con' | 'da ban'


-- Bang don hang           -- PHAN DAU HOA DON: 1 don = 1 dong
-- id
-- id ng mua               -- khoa ngoai -> bang nguoi dung
-- date
-- tong tien
-- trang thai              -- cho thanh toan / da thanh toan / da giao / da huy


-- Bang chi tiet don       -- PHAN THAN HOA DON: 1 mon = 1 dong
-- id
-- id don hang        (*)  -- khoa ngoai -> bang don hang (dong nay thuoc don nao)
-- id kho hang             -- khoa ngoai -> bang kho (khach duoc giao key nao)
-- gia                     -- gia LUC MUA. Khong lay tu san pham vi gia co the doi sau
--                         -- da bo "so luong": moi dong = 1 key nen luon bang 1
