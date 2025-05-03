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
  const [isModalOpen, setIsModalOpen] = useState(false); // Kiểm tra modal có mở không
  const [editingDonHang, setEditingDonHang] = useState(null); // Lưu đơn hàng đang chỉnh sửa

  // Hàm lấy tất cả đơn hàng
  const fetchDonHangs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/donhang/all');
      const data = await response.json();
      setDonHangs(Array.isArray(data) ? data : []); // Đảm bảo rằng donHangs là một mảng
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng:', error);
      setDonHangs([]); // Đảm bảo donHangs là mảng rỗng khi có lỗi
    }
  };

  // Gọi hàm lấy đơn hàng khi component được render
  useEffect(() => {
    fetchDonHangs();
  }, []);

  // Hàm xóa đơn hàng
  const handleDelete = async (maDonHang) => {
    try {
      const response = await fetch(`http://localhost:3000/api/donhang/${maDonHang}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Đơn hàng đã được xóa thành công');
        fetchDonHangs(); // Lấy lại danh sách đơn hàng sau khi xóa
      } else {
        alert('Lỗi khi xóa đơn hàng');
      }
    } catch (error) {
      console.error('Lỗi khi xóa đơn hàng:', error);
    }
  };

  // Hàm chỉnh sửa đơn hàng
  const handleEdit = (donHang) => {
    setEditingDonHang(donHang); // Gán đơn hàng vào state
    setIsModalOpen(true); // Mở modal
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/donhang/${editingDonHang.MaDonHang}`, {
        method: 'P', // Sử dụng phương thức PUT để cập nhật
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingDonHang,
          PhiVanChuyen: parseFloat(editingDonHang.PhiVanChuyen),
          TrangThaiThanhToan: parseInt(editingDonHang.TrangThaiThanhToan),
          TongTien: parseFloat(editingDonHang.TongTien),
          NgayThanhToan: editingDonHang.NgayThanhToan || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert(data.message);
      setIsModalOpen(false); // Đóng modal sau khi chỉnh sửa thành công
      fetchDonHangs(); // Làm mới danh sách đơn hàng
    } catch (err) {
      console.error(err);
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
            <th className="border p-2">Khách hàng</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {donHangs && donHangs.length > 0 ? (
            donHangs.map((dh) => (
              <tr key={dh.ma_don_hang}>
                <td className="border p-2">{dh.ma_don_hang}</td>
                <td className="border p-2">{dh.MaKhachHang}</td>
                <td className="border p-2">{dh.trang_thai}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                    onClick={() => handleEdit(dh)} // Mở modal chỉnh sửa
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
              <td colSpan="5" className="text-center p-4">Không có đơn hàng nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal chỉnh sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa đơn hàng</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              {[
                ['MaDonHang', 'Mã đơn hàng'],
                ['MaNguoiBan', 'Mã người bán'],
                ['MaDiaChi', 'Mã địa chỉ'],
                ['PhiVanChuyen', 'Phí vận chuyển'],
                ['MaKhachHang', 'Mã khách hàng'],
                ['MaKho', 'Mã kho'],
                ['PhuongThucThanhToan', 'Phương thức thanh toán'],
                ['TrangThai', 'Trạng thái đơn hàng'],
                ['TrangThaiThanhToan', 'Trạng thái thanh toán (số)'],
                ['NgayThanhToan', 'Ngày thanh toán (yyyy-mm-dd)'],
                ['TongTien', 'Tổng tiền']
              ].map(([name, placeholder]) => (
                <input
                  key={name}
                  type="text"
                  name={name}
                  className="border p-2 w-full rounded"
                  placeholder={placeholder}
                  value={editingDonHang[name] || ''}
                  onChange={(e) => setEditingDonHang({ ...editingDonHang, [name]: e.target.value })}
                />
              ))}
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
                  onClick={() => setIsModalOpen(false)} // Đóng modal khi hủy
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
