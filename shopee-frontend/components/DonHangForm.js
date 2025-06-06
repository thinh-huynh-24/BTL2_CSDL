import { useState, useEffect } from 'react';

export default function DonHangForm() {
  const [form, setForm] = useState({
    MaDonHang: '',
    MaNguoiBan: '',
    MaDiaChi: '',
    PhiVanChuyen: '',
    MaKhachHang: '',
    MaKho: '',
    PhuongThucThanhToan: '',
    TrangThai: '',
    TrangThaiThanhToan: 0,
    NgayThanhToan: '',
    TongTien: '',
  });

  const [donHangs, setDonHangs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editingDonHang, setEditingDonHang] = useState(null); 

  const [maLienQuan, setMaLienQuan] = useState({
    nguoiBan: [],
    diaChi: [],
    khachHang: [],
    kho: [],
  });

  const fetchDonHangs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/donhang/all');
      const data = await response.json();
      setDonHangs(Array.isArray(data) ? data : []); 
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng:', error);
      setDonHangs([]); 
  };
}

  useEffect(() => {
    fetchDonHangs();
  }, []);

  // Lấy mã liên quan khi mở modal chỉnh sửa
  useEffect(() => {
    if (isModalOpen) {
      fetch('http://localhost:3000/api/ma-lien-quan')
        .then(res => res.json())
        .then(data => setMaLienQuan(data))
        .catch(() => setMaLienQuan({ nguoiBan: [], diaChi: [], khachHang: [], kho: [] }));
    }
  }, [isModalOpen]);

  // Hàm xóa đơn hàng
  const handleDelete = async (maDonHang) => {
    try {
      const response = await fetch(`http://localhost:3000/api/donhang/${maDonHang}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.message || 'Lỗi khi xóa đơn hàng');
      alert(data.message || 'Đơn hàng đã được xóa thành công');
      fetchDonHangs();
    } catch (error) {
      alert('Lỗi: ' + error.message);
    }
  };

  // Hàm chỉnh sửa đơn hàng
  const handleEdit = (donHang) => {
    setEditingDonHang({
      MaDonHang: donHang.ma_don_hang,
      MaNguoiBan: donHang.ma_nguoi_ban,
      MaDiaChi: donHang.ma_dia_chi,
      PhiVanChuyen: donHang.phi_van_chuyen,
      MaKhachHang: donHang.ma_khach_hang,
      MaKho: donHang.ma_kho,
      PhuongThucThanhToan: donHang.phuong_thuc_thanh_toan,
      TrangThai: donHang.trang_thai,
      TrangThaiThanhToan: donHang.trang_thai_thanh_toan,
      NgayThanhToan: donHang.ngay_thanh_toan
        ? new Date(donHang.ngay_thanh_toan).toISOString().split('T')[0]
        : '',
      TongTien: donHang.tong_tien,
    });
    setIsModalOpen(true);
  };

  // Hàm xử lý khi submit form chỉnh sửa
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = { ...editingDonHang };
    Object.keys(updated).forEach((key) => {
      if (
        (updated[key] === '' || updated[key] === undefined || updated[key] === null)
        && key !== 'MaDonHang'
      ) {
        delete updated[key];
      }
    });

    if (!updated.MaDonHang) {
      alert('Thiếu mã đơn hàng!');
      return;
    }

    if (updated.PhiVanChuyen !== undefined) updated.PhiVanChuyen = parseFloat(updated.PhiVanChuyen);
    if (updated.TrangThaiThanhToan !== undefined) updated.TrangThaiThanhToan = parseInt(updated.TrangThaiThanhToan);
    if (updated.TongTien !== undefined) updated.TongTien = parseFloat(updated.TongTien);
    if (updated.NgayThanhToan === '') updated.NgayThanhToan = null;

    try {
      const res = await fetch(`http://localhost:3000/api/donhang`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Lỗi khi cập nhật đơn hàng');
      alert(data.message || 'Đơn hàng đã được cập nhật thành công');
      setIsModalOpen(false);
      fetchDonHangs();
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="text-xl font-semibold mt-8 mb-4">Danh sách đơn hàng</h2>
      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã đơn hàng</th>
            <th className="border p-2">Mã người bán</th>
            <th className="border p-2">Mã địa chỉ</th>
            <th className="border p-2">Phí vận chuyển</th>
            <th className="border p-2">Mã khách hàng</th>
            <th className="border p-2">Mã kho</th>
            <th className="border p-2">Phương thức thanh toán</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Trạng thái thanh toán</th>
            <th className="border p-2">Ngày thanh toán</th>
            <th className="border p-2">Tổng tiền</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {donHangs && donHangs.length > 0 ? (
            donHangs.map((dh) => (
              <tr key={dh.ma_don_hang}>
                <td className="border p-2">{dh.ma_don_hang}</td>
                <td className="border p-2">{dh.ma_nguoi_ban}</td>
                <td className="border p-2">{dh.ma_dia_chi}</td>
                <td className="border p-2">{dh.phi_van_chuyen}</td>
                <td className="border p-2">{dh.ma_khach_hang}</td>
                <td className="border p-2">{dh.ma_kho}</td>
                <td className="border p-2">{dh.phuong_thuc_thanh_toan}</td>
                <td className="border p-2">{dh.trang_thai}</td>
                <td className="border p-2">{dh.trang_thai_thanh_toan === 1 ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                <td className="border p-2">{dh.ngay_thanh_toan ? new Date(dh.ngay_thanh_toan).toLocaleDateString() : ''}</td>
                <td className="border p-2">{dh.tong_tien}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                    onClick={() => handleEdit(dh)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded"
                    onClick={() => handleDelete(dh.ma_don_hang)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center p-4">Không có đơn hàng nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa đơn hàng</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="MaDonHang"
                className="border p-2 w-full rounded bg-gray-100"
                placeholder="Mã đơn hàng"
                value={editingDonHang.MaDonHang || ''}
                disabled
                readOnly
              />

              <input
                type="text" 
                name="MaNguoiBan"
                className="border p-2 w-full rounded"
                placeholder="Mã người bán"
                value={editingDonHang.MaNguoiBan || ''}
                onChange={(e) => setEditingDonHang({...editingDonHang, MaNguoiBan: e.target.value})}
              />

              <input
                type="text"
                name="MaKhachHang" 
                className="border p-2 w-full rounded"
                placeholder="Mã khách hàng"
                value={editingDonHang.MaKhachHang || ''}
                onChange={(e) => setEditingDonHang({...editingDonHang, MaKhachHang: e.target.value})}
              />

              <input
                type="text"
                name="MaKho"
                className="border p-2 w-full rounded"
                placeholder="Mã kho"
                value={editingDonHang.MaKho || ''}
                onChange={(e) => setEditingDonHang({...editingDonHang, MaKho: e.target.value})}
              />

              <input
                type="number"
                name="PhiVanChuyen"
                className="border p-2 w-full rounded"
                placeholder="Phí vận chuyển"
                value={editingDonHang.PhiVanChuyen || ''}
                onChange={e => setEditingDonHang({ ...editingDonHang, PhiVanChuyen: e.target.value })}
                min={0}
                step="0.01"
                required
              />

              <select
                name="PhuongThucThanhToan"
                className="border p-2 w-full rounded"
                value={editingDonHang.PhuongThucThanhToan || ''}
                onChange={e => setEditingDonHang({ ...editingDonHang, PhuongThucThanhToan: e.target.value })}
              >
                <option value="">Chọn phương thức thanh toán</option>
                <option value="Tiền mặt">Tiền mặt</option>
                <option value="Chuyển khoản">Chuyển khoản</option>
                <option value="Thanh toán online">Thanh toán online</option>
              </select>

              <select
                name="TrangThai"
                className="border p-2 w-full rounded"
                value={editingDonHang.TrangThai || ''}
                onChange={e => setEditingDonHang({ ...editingDonHang, TrangThai: e.target.value })}
                required
              >
                <option value="">Chọn trạng thái</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
                <option value="Hoàn trả">Hoàn trả</option>
              </select>

              <select
                name="TrangThaiThanhToan"
                className="border p-2 w-full rounded"
                value={editingDonHang.TrangThaiThanhToan}
                onChange={e => setEditingDonHang({ ...editingDonHang, TrangThaiThanhToan: e.target.value })}
                required
              >
                <option value={0}>Chưa thanh toán</option>
                <option value={1}>Đã thanh toán</option>
              </select>

              <input
                type="date"
                name="NgayThanhToan"
                className="border p-2 w-full rounded"
                placeholder="Ngày thanh toán (yyyy-mm-dd)"
                value={editingDonHang.NgayThanhToan || ''}
                onChange={e => setEditingDonHang({ ...editingDonHang, NgayThanhToan: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                required
              />

              <input
                type="number"
                name="TongTien"
                className="border p-2 w-full rounded"
                placeholder="Tổng tiền"
                value={editingDonHang.TongTien || ''}
                onChange={e => setEditingDonHang({ ...editingDonHang, TongTien: e.target.value })}
                min={0}
                step="0.01"
                required
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Xác nhận
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)} 
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
