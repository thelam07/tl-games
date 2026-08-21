-- TL-Games — du lieu mau
-- Chay SAU khi da chay schema.sql
--
-- TODO

insert into nguoi_dung (username, email, mat_khau_hash, ten_hien_thi, sdt, vai_tro) values
  ('thelam07', 'ntn07@gmail.com', 'abcd1', 'Nguyen The Lam', '0843243207', 'admin'),
  ('huyhoang05', 'nhh05@gmail.com', 'xyz123', 'Huy Hoang', '0912387165', default);

insert into san_pham (ten, anh_url, mo_ta, nen_tang, gia_goc, khuyen_mai, loai) values
  ('Key Elden Ring', 'https://abcd.png', 'ABC!@#$. Hang xin xo', 'Steam', 1200000, default, 'key'),
  ('Acc Free Fire', null, null, 'Garena', 500000, 30, 'account'),
  ('GC 1000 MineCoin', 'https://abc.png', 'Card 1000 MineCoin', 'Microsoft', 300000, 50, 'giftcard'),
  ('Key Dragon Ball Xenoverse 2', 'https://key.png', null, 'Steam', 899000, 40, 'key'),
  ('GC 500 MineCoin', null, '500 MineCoin', 'Microsoft', 200000, 50, 'giftcard');

insert into kho (san_pham_id, noi_dung, trang_thai) values
  (1, 'ST-0001-1782-MPSF', 'con'),
  (1, 'ST-0001-1632-ATQK', 'da_ban'),
  (2, 'buiquoc8|Bquoc08@', default),
  (2, 'nguyen206hanam|Tank@123?', 'con'),
  (3, 'MC-1111-AAAA', 'con'),
  (3, 'MC-1111-ADTF', 'con'),
  (4, 'ST-0018-2142-AUTQ', default),
  (4, 'ST-0018-1182-AUTQ', 'da_ban');
