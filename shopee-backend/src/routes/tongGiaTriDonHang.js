const express = require('express');
const router = express.Router();
const { getConnectionPool, sql } = require('../services/dbConnect');

router.get('/:ma_don_hang', async (req, res) => {
  const ma_don_hang = req.params.ma_don_hang;

  try {
    const pool = await getConnectionPool();
    const result = await pool.request()
      .input('ma_don_hang', sql.VarChar, ma_don_hang)
      .query('SELECT dbo.fn_tong_gia_tri_don_hang(@ma_don_hang) AS tong_gia_tri');

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
