const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Định nghĩa route API cho đơn hàng
router.get('/orders', ordersController.getAllOrders);
router.get('/orders/:id', ordersController.getOrderById);
router.post('/orders', ordersController.createOrder);
router.put('/orders/:id', ordersController.updateOrder);
router.delete('/orders/:id', ordersController.deleteOrder);

module.exports = router;
