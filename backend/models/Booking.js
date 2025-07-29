
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  chargerType: {
    type: String,
    enum: ['AC', 'DC', 'Fast DC'],
    required: true
  },
  timeSlot: {
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true // in hours
    }
  },
  vehicleInfo: {
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    batteryCapacity: {
      type: Number,
      required: true
    },
    currentCharge: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    targetCharge: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  payment: {
    amount: {
      type: Number,
      required: true
    },
    method: {
      type: String,
      enum: ['wallet', 'card'],
      default: 'wallet'
    },
    transactionId: {
      type: String
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  qrCode: {
    type: String
  },
  estimatedCost: {
    type: Number,
    required: true
  },
  actualCost: {
    type: Number,
    default: 0
  },
  energyConsumed: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
