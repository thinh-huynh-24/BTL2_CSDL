import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

export default function TongGiaTriDonHang() {
  const [maDonHang, setMaDonHang] = useState('');
  const [tongGiaTri, setTongGiaTri] = useState(null);
  const [error, setError] = useState('');
  const [donHangOptions, setDonHangOptions] = useState([]);

  // Kiểm tra response trong console
useEffect(() => {
  fetch('http://localhost:3000/api/ma-lien-quan')
    .then(res => res.json())
    .then(data => {
      console.log('API Response:', data);  // Thêm log này
      setDonHangOptions(data.donHang || [])
    })
    .catch(error => {
      console.error('API Error:', error);  // Thêm log lỗi
      setDonHangOptions([])
    });
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/donhang/tong-gia-tri/${maDonHang}`);
      const data = await response.json();
      if (data.donHang === null) {
        console.log(data)
        setError('Không tìm thấy đơn hàng này');
        setTongGiaTri(null);
      } else {
        setTongGiaTri(data.donHang);
        setError('');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Tính tổng giá trị đơn hàng</h2>
        <p className="mb-4 text-gray-700 text-center">
          Trang này cho phép bạn tính tổng giá trị thực tế của các sản phẩm trong một đơn hàng,<br />
          dựa trên chi tiết từng sản phẩm (<b>số lượng × giá bán</b>).<br />
          <b className="text-red-500">Lưu ý:</b> Kết quả <b>không bao gồm</b> phí vận chuyển, voucher hoặc các khoản giảm giá khác.
        </p>
        <form onSubmit={handleSubmit} className="mb-4 space-y-3">
          <div>
            <label className="block mb-1 font-medium">Chọn mã đơn hàng</label>
            <select
              value={maDonHang}
              onChange={(e) => setMaDonHang(e.target.value)}
              className="w-full border px-2 py-2 rounded"
              required
            >
              <option value="">-- Chọn mã đơn hàng --</option>
              {donHangOptions.map(ma => (
                <option key={ma} value={ma}>{ma}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 font-semibold">
            Tính tổng
          </button>
        </form>
        {tongGiaTri !== null && (
          <div className="mt-4 text-center text-lg font-semibold">
            Tổng giá trị đơn hàng: <span className="text-blue-600">{tongGiaTri} VNĐ</span>
          </div>
        )}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div>
    </Layout>
  );
}
