// Type dung chung giua client va server.
export type SanPham = {
  id: number;
  ten: string;
  anh_url: string | null;
  mo_ta: string | null;
  nen_tang: string;
  khuyen_mai: number;
  gia_goc: number;
  loai: 'key' | 'account' | 'giftcard';
  dang_ban: boolean;
  ngay_tao: string;
};