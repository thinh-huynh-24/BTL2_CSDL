const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { dbConfig } = require('../services/dbConnect'); // Import cấu hình kết nối và đối tượng sql


// API lấy tổng giá trị đơn hàng
router.get('/:ma_don_hang', async (req, res) => {
  const ma_don_hang = req.params.ma_don_hang;

  try {
    // Kết nối với cơ sở dữ liệu
    const pool = await sql.connect(dbConfig);

    // Gọi hàm fn_tong_gia_tri_don_hang để tính tổng giá trị đơn hàng
    const result = await pool.request()
      .input('ma_don_hang', sql.VarChar, ma_don_hang)
      .query('SELECT dbo.fn_tong_gia_tri_don_hang(@ma_don_hang) AS tong_gia_tri');

    if (result.recordset.length > 0) {
      const tongGiaTri = result.recordset[0].tong_gia_tri;
      if (tongGiaTri === null) {
        return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
      }
      return res.json({ tong_gia_tri: tongGiaTri });
    } else {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Lỗi khi tính tổng giá trị đơn hàng', error: error.message });
  }
});

module.exports = router;
