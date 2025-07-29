
const Booking = require('../models/Booking');
const Station = require('../models/Station');
const Wallet = require('../models/Wallet');

const createBooking = async (req, res) => {
  try {
    const {
      stationId,
      chargerType,
      timeSlot,
      vehicleInfo,
      estimatedCost
    } = req.body;

    // Check if station exists
    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    // Check user's wallet balance
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet || wallet.balance < estimatedCost) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      station: stationId,
      'timeSlot.startTime': { $lt: new Date(timeSlot.endTime) },
      'timeSlot.endTime': { $gt: new Date(timeSlot.startTime) },
      status: { $in: ['pending', 'confirmed', 'active'] }
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Time slot not available' });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      station: stationId,
      chargerType,
      timeSlot,
      vehicleInfo,
      estimatedCost,
      payment: {
        amount: estimatedCost,
        method: 'wallet',
        status: 'pending'
      }
    });

    // Deduct amount from wallet
    wallet.balance -= estimatedCost;
    wallet.transactions.push({
      type: 'debit',
      amount: estimatedCost,
      description: `Booking payment for ${station.name}`,
      reference: booking._id.toString()
    });
    await wallet.save();

    // Update booking payment status
    booking.payment.status = 'completed';
    booking.status = 'confirmed';
    await booking.save();

    await booking.populate([
      { path: 'station', select: 'name location pricing' },
      { path: 'user', select: 'name email phone' }
    ]);

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = { user: req.user.id };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('station', 'name location pricing images')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: bookings,
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

const getStationBookings = async (req, res) => {
  try {
    const { stationId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    // Check if user owns the station
    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    if (station.provider.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    let query = { station: stationId };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: bookings,
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

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Only allow cancellation for pending or confirmed bookings
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({ message: 'Cannot cancel this booking' });
    }

    // Check if cancellation is allowed (e.g., at least 1 hour before start time)
    const now = new Date();
    const startTime = new Date(booking.timeSlot.startTime);
    const timeDiff = startTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 1) {
      return res.status(400).json({ message: 'Cannot cancel booking less than 1 hour before start time' });
    }

    // Refund to wallet
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (wallet) {
      wallet.balance += booking.payment.amount;
      wallet.transactions.push({
        type: 'credit',
        amount: booking.payment.amount,
        description: `Refund for cancelled booking`,
        reference: booking._id.toString()
      });
      await wallet.save();
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.payment.status = 'refunded';
    await booking.save();

    res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getStationBookings,
  cancelBooking
};
