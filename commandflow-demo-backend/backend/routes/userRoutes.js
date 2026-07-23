const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.get('/', verifyToken, userController.getUsers);
router.post('/', verifyToken, requireRole('admin'), userController.createUser);
router.put('/:userId/disable', verifyToken, requireRole('admin'), userController.disableUser);

module.exports = router;
