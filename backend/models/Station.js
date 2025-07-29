
const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chargerTypes: [{
    type: {
      type: String,
      enum: ['AC', 'DC', 'Fast DC'],
      required: true
    },
    power: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  pricing: {
    price: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      enum: ['per_kWh', 'per_hour'],
      default: 'per_kWh'
    }
  },
  amenities: [{
    type: String,
    enum: ['parking', 'restroom', 'food', 'wifi', 'shopping']
  }],
  operatingHours: {
    open: {
      type: String,
      required: true
    },
    close: {
      type: String,
      required: true
    },
    is24x7: {
      type: Boolean,
      default: false
    }
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for geospatial queries
stationSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Station', stationSchema);
