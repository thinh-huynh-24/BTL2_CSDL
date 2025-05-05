// const dbConnect = require('../services/dbConnect');

// // Lấy tất cả đơn hàng
// const getAllOrders = async (req, res) => {
//   const pool = await dbConnect();
//   if (pool) {
//     try {
//       const result = await pool.request().query('SELECT * FROM don_hang');
//       res.status(200).json(result.recordset);
//     } catch (err) {
//       res.status(500).json({ message: 'Lỗi truy vấn dữ liệu', error: err });
//     }
//   } else {
//     res.status(500).json({ message: 'Không thể kết nối cơ sở dữ liệu' });
//   }
// };

// // Lấy đơn hàng theo ID
// const getOrderById = async (req, res) => {
//   const { id } = req.params;
//   const pool = await dbConnect();
//   if (pool) {
//     try {
//       const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM don_hang WHERE id = @id');
//       res.status(200).json(result.recordset[0]);
//     } catch (err) {
//       res.status(500).json({ message: 'Lỗi truy vấn dữ liệu', error: err });
//     }
//   } else {
//     res.status(500).json({ message: 'Không thể kết nối cơ sở dữ liệu' });
//   }
// };

// // Tạo mới đơn hàng
// const createOrder = async (req, res) => {
//   const { customer_id, total_amount, status } = req.body;
//   const pool = await dbConnect();
//   if (pool) {
//     try {
//       await pool.request()
//         .input('customer_id', sql.Int, customer_id)
//         .input('total_amount', sql.Decimal, total_amount)
//         .input('status', sql.NVarChar, status)
//         .query('INSERT INTO don_hang (customer_id, total_amount, status) VALUES (@customer_id, @total_amount, @status)');
//       res.status(201).json({ message: 'Đơn hàng đã được tạo thành công' });
//     } catch (err) {
//       res.status(500).json({ message: 'Lỗi truy vấn dữ liệu', error: err });
//     }
//   } else {
//     res.status(500).json({ message: 'Không thể kết nối cơ sở dữ liệu' });
//   }
// };

// // Cập nhật đơn hàng
// const updateOrder = async (req, res) => {
//   const { id } = req.params;
//   const { total_amount, status } = req.body;
//   const pool = await dbConnect();
//   if (pool) {
//     try {
//       await pool.request()
//         .input('id', sql.Int, id)
//         .input('total_amount', sql.Decimal, total_amount)
//         .input('status', sql.NVarChar, status)
//         .query('UPDATE don_hang SET total_amount = @total_amount, status = @status WHERE id = @id');
//       res.status(200).json({ message: 'Đơn hàng đã được cập nhật' });
//     } catch (err) {
//       res.status(500).json({ message: 'Lỗi truy vấn dữ liệu', error: err });
//     }
//   } else {
//     res.status(500).json({ message: 'Không thể kết nối cơ sở dữ liệu' });
//   }
// };

// // Xóa đơn hàng
// const deleteOrder = async (req, res) => {
//   const { id } = req.params;
//   const pool = await dbConnect();
//   if (pool) {
//     try {
//       await pool.request().input('id', sql.Int, id).query('DELETE FROM don_hang WHERE id = @id');
//       res.status(200).json({ message: 'Đơn hàng đã được xóa' });
//     } catch (err) {
//       res.status(500).json({ message: 'Lỗi truy vấn dữ liệu', error: err });
//     }
//   } else {
//     res.status(500).json({ message: 'Không thể kết nối cơ sở dữ liệu' });
//   }
// };

// module.exports = {
//   getAllOrders,
//   getOrderById,
//   createOrder,
//   updateOrder,
//   deleteOrder
// };
