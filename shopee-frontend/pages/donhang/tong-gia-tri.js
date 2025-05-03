import { useState } from 'react';
import Layout from '../../components/Layout';

export default function TongGiaTriDonHang() {
  const [maDonHang, setMaDonHang] = useState('');
  const [tongGiaTri, setTongGiaTri] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/api/donhang/tong-gia-tri/${maDonHang}`);
      const data = await response.json();
      if (response.ok) {
        setTongGiaTri(data.tong_gia_tri);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <Layout>
    <div>
      <h2 className="text-xl font-semibold mb-4">Tính tổng giá trị đơn hàng</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Nhập mã đơn hàng"
          value={maDonHang}
          onChange={(e) => setMaDonHang(e.target.value)}
          className="border px-2 py-1 mb-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          Tính tổng
        </button>
      </form>
      {tongGiaTri !== null && (
        <div className="mt-4">Tổng giá trị đơn hàng: {tongGiaTri} VNĐ</div>
      )}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  </Layout>
    
  );
}
