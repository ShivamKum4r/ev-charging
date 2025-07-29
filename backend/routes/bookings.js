
const express = require('express');
const { protect, restrictTo } = require('../middlewares/auth');
const { validateRequest, schemas } = require('../middlewares/validation');
const {
  createBooking,
  getUserBookings,
  getStationBookings,
  cancelBooking
} = require('../controllers/bookingController');

const router = express.Router();

router.post('/', protect, validateRequest(schemas.booking), createBooking);
router.get('/', protect, getUserBookings);
router.get('/station/:stationId', protect, restrictTo('provider', 'admin'), getStationBookings);
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;
