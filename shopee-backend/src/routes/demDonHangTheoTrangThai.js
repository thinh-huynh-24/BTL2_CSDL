const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { dbConfig } = require('../services/dbConnect'); // Import cấu hình kết nối và đối tượng sql

// API đếm đơn hàng theo trạng thái
router.get('/:ma_khach_hang/:trang_thai', async (req, res) => {
  const ma_khach_hang = req.params.ma_khach_hang;
  const trang_thai = req.params.trang_thai;

  try {
    // Kết nối với cơ sở dữ liệu
    const pool = await sql.connect(dbConfig);

    // Gọi function fn_dem_don_hang_theo_trang_thai
    const result = await pool.request()
      .input('ma_khach_hang', sql.VarChar, ma_khach_hang)
      .input('trang_thai', sql.NVarChar, trang_thai)
      .query('SELECT dbo.fn_dem_don_hang_theo_trang_thai(@ma_khach_hang, @trang_thai) AS don_hang_count');

    if (result.recordset.length > 0) {
      const donHangCount = result.recordset[0].don_hang_count;

      // Kiểm tra các trường hợp lỗi
      if (donHangCount === -1) {
        return res.status(404).json({ message: 'Mã khách hàng không tồn tại.' });
      }
      if (donHangCount === -2) {
        return res.status(400).json({ message: 'Trạng thái đơn hàng không hợp lệ.' });
      }

      // Trả về số lượng đơn hàng theo trạng thái
      return res.json({ don_hang_count: donHangCount });
    } else {
      return res.status(500).json({ message: 'Lỗi khi đếm đơn hàng.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Lỗi khi đếm đơn hàng', error: error.message });
  }
});

module.exports = router;
