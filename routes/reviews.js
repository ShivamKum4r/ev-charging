
const express = require('express');
const { protect } = require('../middlewares/auth');
const { validateRequest, schemas } = require('../middlewares/validation');
const {
  createReview,
  getStationReviews
} = require('../controllers/reviewController');

const router = express.Router();

router.post('/', protect, validateRequest(schemas.review), createReview);
router.get('/:stationId', getStationReviews);

module.exports = router;
