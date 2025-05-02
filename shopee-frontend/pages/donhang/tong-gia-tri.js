// pages/donhang/tong-gia-tri.js

import { useState } from 'react';

export default function TongGiaTriDonHang() {
  const [maDonHang, setMaDonHang] = useState('');
  const [tongGiaTri, setTongGiaTri] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/donhang/tong-gia-tri/${maDonHang}`);
    const data = await res.json();
    setTongGiaTri(data.tong_gia_tri);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Tính Tổng Giá Trị Đơn Hàng</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Mã Đơn Hàng</label>
          <input
            type="text"
            value={maDonHang}
            onChange={(e) => setMaDonHang(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Tính Tổng
          </button>
        </div>
      </form>

      {tongGiaTri !== null && (
        <div className="mt-4">
          <h3 className="font-semibold">Tổng Giá Trị Đơn Hàng:</h3>
          <p>{tongGiaTri} VND</p>
        </div>
      )}
    </div>
  );
}
