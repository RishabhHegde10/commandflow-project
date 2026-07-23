const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

// Note: For demo simplicity, we will just use basic verifyToken, but some routes might need requireRole('admin')

router.get('/', verifyToken, orderController.getOrders);
router.put('/:orderId/status', verifyToken, requireRole('admin'), orderController.updateOrderStatus);
router.delete('/:orderId', verifyToken, requireRole('admin'), orderController.deleteOrder);
router.post('/seed', orderController.seedDummyOrder);

module.exports = router;
