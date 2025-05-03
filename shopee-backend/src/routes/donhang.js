const express = require('express');
const router = express.Router();
const { getConnectionPool, sql } = require('../services/dbConnect');

// API để thêm đơn hàng
router.post('', async (req, res) => {
  const {
    MaDonHang,
    MaNguoiBan,
    MaDiaChi,
    PhiVanChuyen,
    MaKhachHang,
    MaKho,
    PhuongThucThanhToan,
    TrangThai,
    TrangThaiThanhToan,
    NgayThanhToan,
    TongTien
  } = req.body;

  // Input validation
  if (!MaDonHang || !MaKhachHang || TongTien === undefined || TongTien === null) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  try {
    const pool = await getConnectionPool();

    const result = await pool.request()
      .input('MaDonHang', sql.VarChar(10), MaDonHang)
      .input('MaNguoiBan', sql.VarChar(10), MaNguoiBan)
      .input('MaDiaChi', sql.VarChar(10), MaDiaChi)
      .input('PhiVanChuyen', sql.Decimal(18, 2), PhiVanChuyen)
      .input('MaKhachHang', sql.VarChar(10), MaKhachHang)
      .input('MaKho', sql.VarChar(10), MaKho)
      .input('PhuongThucThanhToan', sql.NVarChar(50), PhuongThucThanhToan)
      .input('TrangThai', sql.NVarChar(50), TrangThai)
      .input('TrangThaiThanhToan', sql.Int, TrangThaiThanhToan)
      .input('NgayThanhToan', sql.Date, NgayThanhToan || null)
      .input('TongTien', sql.Decimal(18, 2), TongTien)
      .output('ErrorMessage', sql.NVarChar(200))
      .execute('INSERT_DonHang');

    if (result.output.ErrorMessage) {
      return res.status(400).json({ error: result.output.ErrorMessage });
    }

    res.status(201).json({
      success: true,
      message: 'Đơn hàng đã được thêm thành công!',
      orderId: MaDonHang
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API để cập nhật đơn hàng
router.patch('', async (req, res) => {
  const {
    MaDonHang,
    MaDiaChi,
    PhiVanChuyen,
    PhuongThucThanhToan,
    TrangThai,
    TrangThaiThanhToan,
    NgayThanhToan,
    TongTien
  } = req.body;

  try {
    const pool = await getConnectionPool();

    // Kiểm tra nếu mã đơn hàng không tồn tại
    const existingOrder = await pool.request()
      .input('MaDonHang', sql.VarChar(50), MaDonHang)
      .query('SELECT COUNT(1) AS count FROM don_hang WHERE ma_don_hang = @MaDonHang');

    if (existingOrder.recordset[0].count === 0) {
      return res.status(400).json({ error: 'Mã đơn hàng không tồn tại.' });
    }

    // Xây dựng câu truy vấn động
    let query = 'UPDATE don_hang SET ';
    const updates = [];

    if (MaDiaChi !== undefined) updates.push('ma_dia_chi = @MaDiaChi');
    if (PhiVanChuyen !== undefined) updates.push('phi_van_chuyen = @PhiVanChuyen');
    if (PhuongThucThanhToan !== undefined) updates.push('phuong_thuc_thanh_toan = @PhuongThucThanhToan');
    if (TrangThai !== undefined) updates.push('trang_thai = @TrangThai');
    if (TrangThaiThanhToan !== undefined) updates.push('trang_thai_thanh_toan = @TrangThaiThanhToan');
    if (NgayThanhToan !== undefined) updates.push('ngay_thanh_toan = @NgayThanhToan');
    if (TongTien !== undefined) updates.push('tong_tien = @TongTien');

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Không có trường nào để cập nhật.' });
    }

    query += updates.join(', ') + ' WHERE ma_don_hang = @MaDonHang';

    const request = pool.request()
      .input('MaDonHang', sql.VarChar(50), MaDonHang)
      .input('MaDiaChi', sql.VarChar(10), MaDiaChi)
      .input('PhiVanChuyen', sql.Decimal(18,2), PhiVanChuyen)
      .input('PhuongThucThanhToan', sql.NVarChar(50), PhuongThucThanhToan)
      .input('TrangThai', sql.NVarChar(50), TrangThai)
      .input('TrangThaiThanhToan', sql.Int, TrangThaiThanhToan)
      .input('NgayThanhToan', sql.Date, NgayThanhToan)
      .input('TongTien', sql.Decimal(18,2), TongTien);

    await request.query(query);

    res.status(200).json({ message: 'Đơn hàng đã được cập nhật thành công!' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API lấy tất cả đơn hàng
router.get('/all', async (req, res) => {
  try {
    const pool = await getConnectionPool();
    const result = await pool.request()
      .query(`
        SELECT 
          ma_don_hang,
          ma_nguoi_ban,
          ma_dia_chi,
          phi_van_chuyen,
          ma_khach_hang,
          ma_kho,
          phuong_thuc_thanh_toan,
          trang_thai,
          trang_thai_thanh_toan,
          ngay_thanh_toan,
          tong_tien
        FROM don_hang
      `);
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API xóa đơn hàng
router.delete('/:ma_don_hang', async (req, res) => {
  const { ma_don_hang } = req.params;

  if (!ma_don_hang) {
    return res.status(400).json({ error: 'Mã đơn hàng không hợp lệ' });
  }

  try {
    const pool = await getConnectionPool();

    // Kiểm tra nếu đơn hàng có tồn tại trong cơ sở dữ liệu trước khi xóa
    const checkExistQuery = 'SELECT COUNT(*) AS count FROM don_hang WHERE ma_don_hang = @ma_don_hang';
    const checkExistResult = await pool.request()
      .input('ma_don_hang', sql.VarChar, ma_don_hang)
      .query(checkExistQuery);

    if (checkExistResult.recordset[0].count === 0) {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng để xóa.' });
    }

    // Xóa đơn hàng
    const deleteQuery = 'DELETE FROM don_hang WHERE ma_don_hang = @ma_don_hang';
    const result = await pool.request()
      .input('ma_don_hang', sql.VarChar, ma_don_hang)
      .query(deleteQuery);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng để xóa.' });
    }

    res.status(200).json({ message: 'Đơn hàng đã được xóa thành công!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy danh sách đơn hàng của khách hàng theo trạng thái
router.get('/:ma_khach_hang', async (req, res) => {
  const { ma_khach_hang } = req.params;
  const { trang_thai } = req.query;

  try {
    const pool = await getConnectionPool();

    const result = await pool.request()
      .input('ma_khach_hang', sql.VarChar(50), ma_khach_hang)
      .input('trang_thai', sql.NVarChar(50), trang_thai || null)
      .execute('sp_danh_sach_don_hang');

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API lấy chi tiết đơn hàng
router.get('/:ma_don_hang', async (req, res) => {
  const { ma_don_hang } = req.params;

  try {
    const pool = await getConnectionPool();
    const result = await pool.request()
      .input('ma_don_hang', sql.VarChar, ma_don_hang)
      .execute('sp_chi_tiet_don_hang');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin chi tiết đơn hàng' });
    }

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
