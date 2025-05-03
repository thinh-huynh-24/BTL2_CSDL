import { useState, useEffect } from 'react';

export default function DonHangTable() {
  const [donHangs, setDonHangs] = useState([]);
  const [search, setSearch] = useState('');
  const [trangThai, setTrangThai] = useState('');
  const [maKhachHang, setMaKhachHang] = useState('');
  const [khachHangOptions, setKhachHangOptions] = useState([]);

  // Lấy danh sách mã khách hàng cho dropdown
  useEffect(() => {
    fetch('http://localhost:3000/api/ma-lien-quan')
      .then(res => res.json())
      .then(data => setKhachHangOptions(data.khachHang || []))
      .catch(() => setKhachHangOptions([]));
  }, []);

  useEffect(() => {
    if (!maKhachHang) return;

    const fetchDonHangs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/donhang/${maKhachHang}?trang_thai=${trangThai}`);
        const data = await response.json();
        setDonHangs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Lỗi khi tải đơn hàng:', err);
        setDonHangs([]);
      }
    };

    fetchDonHangs();
  }, [maKhachHang, trangThai]);

  const filtered = Array.isArray(donHangs)
    ? donHangs.filter(dh =>
        !search || dh.ma_don_hang === search
      )
    : [];

  // Lấy danh sách mã đơn hàng duy nhất cho dropdown
  const maDonHangOptions = Array.from(
    new Set((donHangs || []).map(dh => dh.ma_don_hang))
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>

      <div className="mb-4 space-x-2">
        <select
          className="border px-2 py-1 rounded"
          value={maKhachHang}
          onChange={(e) => setMaKhachHang(e.target.value)}
        >
          <option value="">Chọn mã khách hàng</option>
          {khachHangOptions.map(ma => (
            <option key={ma} value={ma}>{ma}</option>
          ))}
        </select>
        <select
          className="border px-2 py-1 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        >
          <option value="">Tất cả mã đơn hàng</option>
          {maDonHangOptions.map(ma => (
            <option key={ma} value={ma}>{ma}</option>
          ))}
        </select>
        <select
          className="border px-2 py-1 rounded"
          onChange={(e) => setTrangThai(e.target.value)}
          value={trangThai}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Đã hủy">Đã hủy</option>
          <option value="Hoàn trả">Hoàn trả</option>
        </select>
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã đơn hàng</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Trạng thái thanh toán</th>
            <th className="border p-2">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((dh) => (
            <tr key={dh.ma_don_hang}>
              <td className="border p-2">{dh.ma_don_hang}</td>
              <td className="border p-2">{dh.trang_thai}</td>
              <td className="border p-2">{dh.trang_thai_thanh_toan === 1 ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
              <td className="border p-2">{dh.tong_tien}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
