const express = require('express');
const router = express.Router();
const { getConnectionPool, sql } = require('../services/dbConnect');

// API đếm đơn hàng theo trạng thái
router.get('/:ma_khach_hang/:trang_thai', async (req, res) => {
  try {
    const pool = await getConnectionPool();
    const result = await pool.request()
      .input('ma_khach_hang', sql.VarChar, req.params.ma_khach_hang)
      .input('trang_thai', sql.NVarChar, req.params.trang_thai)
      .query('SELECT dbo.fn_dem_don_hang_theo_trang_thai(@ma_khach_hang, @trang_thai) AS don_hang_count');
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
