
const Station = require('../models/Station');
const Review = require('../models/Review');

// Major Indian EV charging networks: Tata Power, Ather Grid, Fortum, Statiq, ChargeZone, Zeon
const getAllStations = async (req, res) => {
  try {
    const {
      location,
      radius = 10,
      chargerType,
      maxPrice,
      availability,
      page = 1,
      limit = 10
    } = req.query;

    let query = { status: 'active' };

    // Filter by charger type
    if (chargerType) {
      query['chargerTypes.type'] = chargerType;
    }

    // Filter by max price
    if (maxPrice) {
      query['pricing.price'] = { $lte: parseFloat(maxPrice) };
    }

    // Geospatial query for location-based search
    if (location) {
      const [lat, lng] = location.split(',').map(Number);
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      };
    }

    const stations = await Station.find(query)
      .populate('provider', 'name email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Station.countDocuments(query);

    res.json({
      success: true,
      data: stations,
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

const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id)
      .populate('provider', 'name email phone');

    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    res.json({ success: true, data: station });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createStation = async (req, res) => {
  try {
    const stationData = {
      ...req.body,
      provider: req.user.id
    };

    const station = await Station.create(stationData);
    await station.populate('provider', 'name email phone');

    res.status(201).json({ success: true, data: station });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateStation = async (req, res) => {
  try {
    let station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    // Check if user owns the station
    if (station.provider.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    station = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('provider', 'name email phone');

    res.json({ success: true, data: station });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    // Check if user owns the station
    if (station.provider.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Station.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Station deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation
};
