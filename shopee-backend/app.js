const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const donhangRoutes = require('../shopee-backend/src/routes/donhang'); // Import route cho đơn hàng
const tongGiaTriDonHangRouter = require('./src/routes/tongGiaTriDonHang');
const demDonHangTheoTrangThaiRouter = require('./src/routes/demDonHangTheoTrangThai'); 
const cors = require('cors');

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Sử dụng routes
app.use('/api/donhang', donhangRoutes);

app.use('/api/donhang/tong-gia-tri', tongGiaTriDonHangRouter);

app.use('/api/dem-don-hang-theo-khach-hang-trang-thai', demDonHangTheoTrangThaiRouter);


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
