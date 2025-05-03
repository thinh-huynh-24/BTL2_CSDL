import { useState, useEffect } from 'react';

export default function DonHangTable() {
  const [donHangs, setDonHangs] = useState([]);
  const [search, setSearch] = useState('');
  const [trangThai, setTrangThai] = useState('');
  const [maKhachHang, setMaKhachHang] = useState('');

  useEffect(() => {
    if (!maKhachHang) return; // Không fetch nếu chưa nhập mã khách hàng

    const fetchDonHangs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/donhang/${maKhachHang}?trang_thai=${trangThai}`);
        const data = await response.json();
        setDonHangs(data);
      } catch (err) {
        console.error('Lỗi khi tải đơn hàng:', err);
      }
    };

    fetchDonHangs();
  }, [maKhachHang, trangThai]);

  const filtered = Array.isArray(donHangs)
  ? donHangs.filter(dh =>
      dh.ma_don_hang.toLowerCase().includes(search.toLowerCase())
    )
  : [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>

      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Nhập mã khách hàng"
          className="border px-2 py-1 rounded"
          value={maKhachHang}
          onChange={(e) => setMaKhachHang(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tìm kiếm mã đơn hàng"
          className="border px-2 py-1 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-2 py-1 rounded"
          onChange={(e) => setTrangThai(e.target.value)}
          value={trangThai}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đã hoàn thành">Đã hoàn thành</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã đơn hàng</th>
            <th className="border p-2">Khách hàng</th>
            <th className="border p-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((dh) => (
            <tr key={dh.ma_don_hang}>
              <td className="border p-2">{dh.ma_don_hang}</td>
              <td className="border p-2">{dh.ma_khach_hang}</td>
              <td className="border p-2">{dh.trang_thai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
