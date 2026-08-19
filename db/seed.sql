-- Du lieu mau. Chay SAU schema.sql
-- Tai khoan admin: admin@tltech.vn / admin123
-- Tai khoan user : user@tltech.vn  / user123
-- (hash bcrypt tao san — muon doi mat khau thi chay: npm --prefix server run hash <matkhau>)

insert into users (email, password_hash, full_name, role) values
('admin@tltech.vn', '$2b$10$CT0nCD8vsbZY5ezv2GPsbuyQuvWfP/Psp4YSZnn1yeYIjWyjP9hda', 'Quan tri vien', 'admin'),
('user@tltech.vn',  '$2b$10$XwQMBfh//6IxfgVv/W5cROtqdIVJPHAuRsw2W3I3AONJj3hrt7Cbm', 'Nguyen Van A',  'user');

insert into categories (name, slug) values
('Laptop',      'laptop'),
('Ban phim',    'ban-phim'),
('Chuot',       'chuot'),
('Man hinh',    'man-hinh'),
('Phu kien',    'phu-kien');

insert into products (name, slug, description, price, stock, category_id, images) values
('MacBook Air M3 13"',      'macbook-air-m3-13',   'Chip M3, 8GB RAM, 256GB SSD, man hinh Liquid Retina 13.6"', 27990000, 12, 1, '{}'),
('MacBook Pro M4 14"',      'macbook-pro-m4-14',   'Chip M4 Pro, 24GB RAM, 512GB SSD, man hinh XDR 120Hz',      52990000,  5, 1, '{}'),
('Dell XPS 13 Plus',        'dell-xps-13-plus',    'Core Ultra 7, 16GB RAM, 512GB SSD, vien man hinh sieu mong',34990000,  8, 1, '{}'),
('ThinkPad X1 Carbon G12',  'thinkpad-x1-carbon',  'Core Ultra 7, 32GB RAM, 1TB SSD, ban phim tot nhat phan khuc',41990000, 4, 1, '{}'),
('Asus ROG Zephyrus G14',   'rog-zephyrus-g14',    'Ryzen 9, RTX 4060, 16GB RAM, man hinh OLED 165Hz',          38990000,  6, 1, '{}'),
('Keychron K2 Pro',         'keychron-k2-pro',     'Ban phim co khong day, hot-swap, switch Gateron Brown',      2490000, 25, 2, '{}'),
('Logitech MX Keys S',      'logitech-mx-keys-s',  'Ban phim khong day, den nen thong minh, pin 10 ngay',        2790000, 18, 2, '{}'),
('Akko 3068B Plus',         'akko-3068b-plus',     'Ban phim co 65%, 3 mode ket noi, keycap PBT',                1690000, 30, 2, '{}'),
('Logitech MX Master 3S',   'logitech-mx-master-3s','Chuot khong day, cam bien 8000 DPI, click yen tinh',        2390000, 22, 3, '{}'),
('Razer DeathAdder V3',     'razer-deathadder-v3', 'Chuot gaming, 30000 DPI, sieu nhe 59g',                      1590000, 20, 3, '{}'),
('Logitech G Pro X Superlight 2','g-pro-x-superlight-2','Chuot gaming khong day 60g, cam bien HERO 2',           3290000, 10, 3, '{}'),
('Dell UltraSharp U2723QE', 'dell-u2723qe',        'Man hinh 27" 4K IPS Black, USB-C 90W',                      15990000,  7, 4, '{}'),
('LG UltraGear 27GR93U',    'lg-27gr93u',          'Man hinh gaming 27" 4K 144Hz, HDMI 2.1',                    18990000,  5, 4, '{}'),
('Samsung Odyssey G5',      'samsung-odyssey-g5',  'Man hinh cong 27" QHD 165Hz',                                6990000, 14, 4, '{}'),
('Anker 737 Power Bank',    'anker-737-powerbank', 'Pin du phong 24000mAh, sac nhanh 140W',                      2990000, 40, 5, '{}'),
('Hub USB-C Ugreen 9-in-1', 'ugreen-hub-9in1',     'Hub 9 cong: HDMI 4K, USB 3.0, SD, LAN, PD 100W',             1290000, 35, 5, '{}'),
('Tai nghe Sony WH-1000XM5','sony-wh-1000xm5',     'Tai nghe chong on chu dong, pin 30 gio',                      7490000, 15, 5, '{}'),
('Balo Tomtoc Urban',       'tomtoc-urban',        'Balo laptop 16", chong nuoc, ngan chong soc',                 1190000, 50, 5, '{}');
