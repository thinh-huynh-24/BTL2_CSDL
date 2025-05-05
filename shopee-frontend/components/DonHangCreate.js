import { useEffect, useState } from 'react';

export default function DonHangCreate() {
  const [formData, setFormData] = useState({
    ma_don_hang: '',
    ma_nguoi_ban: '',
    ma_dia_chi: '',
    phi_van_chuyen: 0,
    ma_khach_hang: '',
    ma_kho: '',
    phuong_thuc_thanh_toan: '',
    trang_thai: '',
    trang_thai_thanh_toan: 0,
    ngay_thanh_toan: new Date().toISOString().split('T')[0],
    tong_tien: 0
  });

  

  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/ma-lien-quan')
      .then(res => res.json())
      .then(data => setOptions(data))
      .catch(err => console.error('Lỗi khi tải mã liên quan:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'trang_thai_thanh_toan' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      MaDonHang: formData.ma_don_hang,
      MaNguoiBan: formData.ma_nguoi_ban,
      MaDiaChi: formData.ma_dia_chi,
      PhiVanChuyen: Number(formData.phi_van_chuyen) || 0,
      MaKhachHang: formData.ma_khach_hang,
      MaKho: formData.ma_kho,
      PhuongThucThanhToan: formData.phuong_thuc_thanh_toan,
      TrangThai: formData.trang_thai,
      TrangThaiThanhToan: Number(formData.trang_thai_thanh_toan) || 0,
      NgayThanhToan: formData.ngay_thanh_toan,
      TongTien: Number(formData.tong_tien) || 0,
    };

    try {
      const res = await fetch('http://localhost:3000/api/donhang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error);
      }

      setMessage({ type: 'success', text: result.message || 'Tạo đơn hàng thành công' });
      setFormData({
        ma_don_hang: '',
        ma_nguoi_ban: '',
        ma_dia_chi: '',
        phi_van_chuyen: 0,
        ma_khach_hang: '',
        ma_kho: '',
        phuong_thuc_thanh_toan: '',
        trang_thai: '',
        trang_thai_thanh_toan: 0,
        ngay_thanh_toan: new Date().toISOString().split('T')[0],
        tong_tien: 0
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="text-lg font-semibold mb-4">Thêm đơn hàng</h2>

      {message && (
        <div className={`mb-4 p-2 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="ma_don_hang" value={formData.ma_don_hang} onChange={handleChange}
          placeholder="Mã đơn hàng (VD: DH001)" className="w-full border p-2 rounded" required pattern="DH\d{3}" title="Mã đơn hàng phải có định dạng DHxxx" />
        <input
          type="text"
          name="ma_nguoi_ban"
          value={formData.ma_nguoi_ban}
          onChange={handleChange}
          placeholder="Nhập mã người bán"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="ma_dia_chi"
          value={formData.ma_dia_chi}
          onChange={handleChange}
          placeholder="Nhập mã địa chỉ"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="phi_van_chuyen"
          value={formData.phi_van_chuyen}
          onChange={handleChange}
          placeholder="Phí vận chuyển"
          className="w-full border p-2 rounded"
          min="0"
          required
        />
        <input
          type="text"
          name="ma_khach_hang"
          value={formData.ma_khach_hang}
          onChange={handleChange}
          placeholder="Nhập mã khách hàng"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="ma_kho"
          value={formData.ma_kho}
          onChange={handleChange}
          placeholder="Nhập mã kho"
          className="w-full border p-2 rounded"
          required
        />
        <select name="phuong_thuc_thanh_toan" value={formData.phuong_thuc_thanh_toan} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Chọn phương thức thanh toán</option>
          <option value="Tiền mặt">Tiền mặt</option>
          <option value="Chuyển khoản">Chuyển khoản</option>
          <option value="Thanh toán online">Thanh toán online</option>
        </select>

        <select name="trang_thai" value={formData.trang_thai} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Chọn trạng thái</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Đã hủy">Đã hủy</option>
          <option value="Hoàn trả">Hoàn trả</option>
        </select>

        <select name="trang_thai_thanh_toan" value={formData.trang_thai_thanh_toan} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value={0}>Chưa thanh toán</option>
          <option value={1}>Đã thanh toán</option>
        </select>

        <input type="date" name="ngay_thanh_toan" value={formData.ngay_thanh_toan} onChange={handleChange} className="w-full border p-2 rounded" required max={new Date().toISOString().split('T')[0]} />

        <input type="number" name="tong_tien" value={formData.tong_tien} onChange={handleChange}
          placeholder="Tổng tiền" className="w-full border p-2 rounded" min="0" required />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          Thêm đơn hàng
        </button>
      </form>
    </div>
  );
}
