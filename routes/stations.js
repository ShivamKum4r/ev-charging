
const express = require('express');
const { protect, restrictTo } = require('../middlewares/auth');
const { validateRequest, schemas } = require('../middlewares/validation');
const {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation
} = require('../controllers/stationController');

const router = express.Router();

router.get('/', getAllStations);
router.get('/:id', getStationById);
router.post('/', protect, restrictTo('provider', 'admin'), validateRequest(schemas.station), createStation);
router.put('/:id', protect, restrictTo('provider', 'admin'), updateStation);
router.delete('/:id', protect, restrictTo('provider', 'admin'), deleteStation);

module.exports = router;
