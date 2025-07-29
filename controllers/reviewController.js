
const Review = require('../models/Review');
const Station = require('../models/Station');
const Booking = require('../models/Booking');

const createReview = async (req, res) => {
  try {
    const { stationId, bookingId, rating, comment, categories } = req.body;

    // Check if booking exists and belongs to user
    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user.id,
      status: 'completed'
    });

    if (!booking) {
      return res.status(400).json({ 
        message: 'Booking not found or not completed' 
      });
    }

    // Check if review already exists for this booking
    const existingReview = await Review.findOne({
      user: req.user.id,
      booking: bookingId
    });

    if (existingReview) {
      return res.status(400).json({ 
        message: 'Review already exists for this booking' 
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user.id,
      station: stationId,
      booking: bookingId,
      rating,
      comment,
      categories
    });

    // Update station rating
    await updateStationRating(stationId);

    await review.populate('user', 'name avatar');

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getStationReviews = async (req, res) => {
  try {
    const { stationId } = req.params;
    const { page = 1, limit = 10, rating } = req.query;

    let query = { station: stationId };
    if (rating) {
      query.rating = parseInt(rating);
    }

    const reviews = await Review.find(query)
      .populate('user', 'name avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments(query);

    // Calculate rating distribution
    const ratingDistribution = await Review.aggregate([
      { $match: { station: mongoose.Types.ObjectId(stationId) } },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    res.json({
      success: true,
      data: reviews,
      ratingDistribution,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateStationRating = async (stationId) => {
  try {
    const result = await Review.aggregate([
      { $match: { station: mongoose.Types.ObjectId(stationId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    if (result.length > 0) {
      await Station.findByIdAndUpdate(stationId, {
        'rating.average': parseFloat(result[0].averageRating.toFixed(1)),
        'rating.count': result[0].totalReviews
      });
    }
  } catch (error) {
    console.error('Error updating station rating:', error);
  }
};

module.exports = {
  createReview,
  getStationReviews
};
