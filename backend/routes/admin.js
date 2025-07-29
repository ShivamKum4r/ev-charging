
const express = require('express');
const { protect, restrictTo } = require('../middlewares/auth');
const {
  getAllUsers,
  getAllBookings,
  getDashboardStats
} = require('../controllers/adminController');

const router = express.Router();

// All admin routes require admin role
router.use(protect, restrictTo('admin'));

router.get('/users', getAllUsers);
router.get('/bookings', getAllBookings);
router.get('/dashboard', getDashboardStats);

module.exports = router;
