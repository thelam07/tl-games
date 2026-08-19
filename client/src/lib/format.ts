// Dinh dang tien Viet Nam: 27990000 -> "27.990.000 ₫"
export const formatVND = (value: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

// Dinh dang ngay: "2026-08-19T..." -> "19/08/2026 09:30"
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso));
