const express = require('express');
const router = express.Router();
const { getConnectionPool, sql } = require('../services/dbConnect');

router.get('/', async (req, res) => {
  try {
    const pool = await getConnectionPool();

    // Lấy mã người bán
    const nguoiBan = await pool.request().query('SELECT ma_nguoi_ban FROM nguoi_ban');
    // Lấy mã địa chỉ
    const diaChi = await pool.request().query('SELECT ma_dia_chi FROM dia_chi_nhan_hang');
    // Lấy mã khách hàng
    const khachHang = await pool.request().query('SELECT ma_khach_hang FROM khach_hang');
    // Lấy mã kho
    const kho = await pool.request().query('SELECT ma_kho FROM kho');
    // Thêm query lấy mã đơn hàng
    const donHang = await pool.request().query('SELECT ma_don_hang FROM don_hang');
    res.json({
      nguoiBan: nguoiBan.recordset.map(row => row.ma_nguoi_ban),
      diaChi: diaChi.recordset.map(row => row.ma_dia_chi),
      khachHang: khachHang.recordset.map(row => row.ma_khach_hang),
      kho: kho.recordset.map(row => row.ma_kho),
      donHang: donHang.recordset.map(row => row.ma_don_hang)
    });
  } catch (error) {
    console.error('Lỗi khi lấy mã liên quan:', error);
    res.status(500).json({ message: 'Lỗi khi lấy mã liên quan', error: error.message });
  }
});

module.exports = router;