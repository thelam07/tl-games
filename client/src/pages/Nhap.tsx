// File nhap de tap React. Khong lien quan project, thoai mai pha.
// Xem tai: http://localhost:5173/nhap
import { useState } from 'react'

function formatVND(so: number) {
  const s = new Intl.NumberFormat('vi-VN').format(so) + ' ₫';
  return s
}

const dsSanPham = [
  { id: 1, ten: 'Key Elden Ring', gia_goc: 1200000, nen_tang: 'Steam', khuyen_mai: 0 },
  { id: 2, ten: 'Acc Free Fire', gia_goc: 500000, nen_tang: 'Garena', khuyen_mai: 30 },
  { id: 3, ten: 'GC 1000 MineCoin', gia_goc: 300000, nen_tang: 'Microsoft', khuyen_mai: 50 },
  { id: 4, ten: 'Key Dragon Ball Xenoverse 2', gia_goc: 899000, nen_tang: 'Steam', khuyen_mai: 40 },
  { id: 5, ten: 'GC 500 MineCoin', gia_goc: 200000, nen_tang: 'Microsoft', khuyen_mai: 50 }
]

type Props = {
  ten: string;
  gia: number;
  nen_tang: string;
  khuyen_mai: number;
  onThem: () => void;
};

function TheSanPham({ ten, gia, nen_tang, khuyen_mai, onThem }: Props) {
  const giaSauGiam = gia * (100 - khuyen_mai) / 100;
  return (
    <div className="p-4 border rounded mb-2">
      <h3>{ten}</h3>
      <p>
        {khuyen_mai > 0 && (
          <span className="line-through text-gray-400 mr-2">
            {formatVND(gia)}
          </span>
        )}
        {formatVND(giaSauGiam)} - {nen_tang}
      </p>
      <button onClick={onThem} className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer' >Thêm vào giỏ</button>
    </div>
  );
}

export default function Nhap() {
  const [soLuongGio, setSoLuongGio] = useState(0);
  return (
    <div className="p-8">
      <p>Giỏ hàng: {soLuongGio}</p>
      {dsSanPham.map(sp =>
        <TheSanPham key={sp.id} ten={sp.ten} gia={sp.gia_goc} nen_tang={sp.nen_tang} khuyen_mai={sp.khuyen_mai} onThem={() => setSoLuongGio(soLuongGio + 1)} />
      )}
    </div>
  );
}


