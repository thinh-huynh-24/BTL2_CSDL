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
  if (!MaDonHang || !MaKhachHang || !TongTien) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
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
      return res.status(400).json({ message: result.output.ErrorMessage });
    }

    res.status(201).json({ 
      success: true,
      message: 'Đơn hàng đã được thêm thành công!',
      orderId: MaDonHang
    });
  } catch (error) {
    console.error('Lỗi khi thêm đơn hàng:', error);
    res.status(500).json({ 
      success: false,
      message: 'Lỗi hệ thống khi thêm đơn hàng',
      error: error.message
    });
  }
});

// API để cập nhật đơn hàng
router.patch('', async (req, res) => {
    const { MaDonHang, NgayDat, TrangThai, TongTien } = req.body;
  
    try {
      const pool = await dbConnect(); // Kết nối đến SQL Server
  
      // Kiểm tra nếu mã đơn hàng không tồn tại
      const existingOrder = await pool.request()
        .input('MaDonHang', sql.VarChar(50), MaDonHang)
        .query('SELECT COUNT(1) AS count FROM don_hang WHERE ma_don_hang = @MaDonHang');
  
      if (existingOrder.recordset[0].count === 0) {
        return res.status(400).json({ message: 'Mã đơn hàng không tồn tại.' });
      }
  
      // Cập nhật thông tin đơn hàng, chỉ những trường có giá trị từ yêu cầu
      let query = 'UPDATE don_hang SET ';
      const updates = [];
  
      if (NgayDat) {
        updates.push('ngay_dat = @NgayDat');
      }
      if (TrangThai) {
        updates.push('trang_thai = @TrangThai');
      }
      if (TongTien) {
        updates.push('tong_tien = @TongTien');
      }
  
      // Nếu không có trường nào để cập nhật, trả về lỗi
      if (updates.length === 0) {
        return res.status(400).json({ message: 'Không có trường nào để cập nhật.' });
      }
  
      query += updates.join(', ') + ' WHERE ma_don_hang = @MaDonHang';
  
      // Gọi thủ tục cập nhật đơn hàng
      const result = await pool.request()
        .input('MaDonHang', sql.VarChar(50), MaDonHang)
        .input('NgayDat', sql.Date, NgayDat)
        .input('TrangThai', sql.NVarChar(50), TrangThai)
        .input('TongTien', sql.Float, TongTien)
        .query(query);
  
      res.status(200).json({ message: 'Đơn hàng đã được cập nhật thành công!' });
  
    } catch (error) {
      console.error(error);
      // Trả về lỗi tổng quát nếu có sự cố ngoài cơ sở dữ liệu
      res.status(500).json({
        message: 'Lỗi khi cập nhật đơn hàng',
        error: error.message
      });
    }
  });

// API lấy tất cả đơn hàng
router.get('/all', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .query('SELECT * FROM don_hang'); // Thực thi truy vấn lấy tất cả đơn hàng

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: error.message });
  }
});

// API xóa đơn hàng
router.delete('/:ma_don_hang', async (req, res) => {
  const { ma_don_hang } = req.params;

  if (!ma_don_hang) {
    return res.status(400).json({ message: 'Mã đơn hàng không hợp lệ' });
  }

  try {
    const pool = await sql.connect(dbConfig);

    // Kiểm tra nếu đơn hàng có tồn tại trong cơ sở dữ liệu trước khi xóa
    const checkExistQuery = 'SELECT COUNT(*) AS count FROM don_hang WHERE ma_don_hang = @ma_don_hang';
    const checkExistResult = await pool.request()
      .input('ma_don_hang', sql.VarChar, ma_don_hang)
      .query(checkExistQuery);

    if (checkExistResult.recordset[0].count === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa.' });
    }

    // Xóa đơn hàng
    const deleteQuery = 'DELETE FROM don_hang WHERE ma_don_hang = @ma_don_hang';
    const result = await pool.request()
      .input('ma_don_hang', sql.VarChar, ma_don_hang)
      .query(deleteQuery);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa.' });
    }

    res.status(200).json({ message: 'Đơn hàng đã được xóa thành công!' });
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi khi xóa đơn hàng', error: error.message });
  }
});

  

// Lấy danh sách đơn hàng của khách hàng theo trạng thái
router.get('/:ma_khach_hang', async (req, res) => {
    const { ma_khach_hang } = req.params;
    const { trang_thai } = req.query;  // Lấy tham số trạng thái từ query string

    try {
        // Kết nối với SQL Server
        const pool = await sql.connect(dbConfig);

        // Thực thi thủ tục lưu trữ
        const result = await pool.request()
            .input('ma_khach_hang', sql.VarChar(50), ma_khach_hang)
            .input('trang_thai', sql.NVarChar(50), trang_thai || null)  // Nếu không có trang_thai thì gán null
            .execute('sp_danh_sach_don_hang');

        res.status(200).json(result.recordset); // Trả về kết quả từ SQL Server
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// API lấy chi tiết đơn hàng
router.get('/:ma_don_hang', async (req, res) => {
    const { ma_don_hang } = req.params;
    
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('ma_don_hang', sql.VarChar, ma_don_hang)
            .execute('sp_chi_tiet_don_hang');

        // Kiểm tra kết quả trả về
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin chi tiết đơn hàng' });
        }

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
