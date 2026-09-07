// File nhap de tap React. Khong lien quan project, thoai mai pha.
// Xem tai: http://localhost:5173/nhap
import { useState } from 'react'

const dsSanPham = [
  { id: 1, ten: 'Key Elden Ring', gia_goc: 1200000, nen_tang: 'Steam' },
  { id: 2, ten: 'Acc Free Fire', gia_goc: 500000, nen_tang: 'Garena' },
  { id: 3, ten: 'GC 1000 MineCoin', gia_goc: 300000, nen_tang: 'Microsoft' },
  { id: 4, ten: 'Key Dragon Ball Xenoverse 2', gia_goc: 899000, nen_tang: 'Steam' },
  { id: 5, ten: 'GC 500 MineCoin', gia_goc: 200000, nen_tang: 'Microsoft' }
]

type Props = {
  ten: string;
  gia: number;
  nen_tang: string;
};

function TheSanPham({ ten, gia, nen_tang }: Props) {
  return (
    <div className="p-4 border rounded mb-2">
      <h3>{ten}</h3>
      <p>{gia} - {nen_tang}</p>
    </div>
  );
}

export default function Nhap() {
  const [soLuongGio, setSoLuongGio] = useState(0);
  return (
    <div className="p-8">
      <p>Giỏ hàng: {soLuongGio}</p>
      <button className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer' onClick={() => setSoLuongGio(soLuongGio + 1)}>Thêm vào giỏ</button>
      {dsSanPham.map(sp =>
        <TheSanPham key={sp.id} ten={sp.ten} gia={sp.gia_goc} nen_tang={sp.nen_tang} />
      )}
    </div>
  );
}


