
const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

const schemas = {
  register: Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
    role: Joi.string().valid('user', 'provider').default('user')
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  station: Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required(),
    location: Joi.object({
      address: Joi.string().required(),
      coordinates: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
      }).required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pincode: Joi.string().required()
    }).required(),
    chargerTypes: Joi.array().items(Joi.object({
      type: Joi.string().valid('AC', 'DC', 'Fast DC').required(),
      power: Joi.number().required(),
      count: Joi.number().min(1).required()
    })).required(),
    pricing: Joi.object({
      price: Joi.number().min(0).required(),
      unit: Joi.string().valid('per_kWh', 'per_hour').default('per_kWh')
    }).required(),
    operatingHours: Joi.object({
      open: Joi.string().required(),
      close: Joi.string().required(),
      is24x7: Joi.boolean().default(false)
    }).required()
  }),

  booking: Joi.object({
    stationId: Joi.string().required(),
    chargerType: Joi.string().valid('AC', 'DC', 'Fast DC').required(),
    timeSlot: Joi.object({
      startTime: Joi.date().required(),
      endTime: Joi.date().required(),
      duration: Joi.number().min(0.5).required()
    }).required(),
    vehicleInfo: Joi.object({
      make: Joi.string().required(),
      model: Joi.string().required(),
      batteryCapacity: Joi.number().required(),
      currentCharge: Joi.number().min(0).max(100).required(),
      targetCharge: Joi.number().min(0).max(100).required()
    }).required(),
    estimatedCost: Joi.number().min(0).required()
  }),

  review: Joi.object({
    stationId: Joi.string().required(),
    bookingId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required().trim(),
    categories: Joi.object({
      charging_speed: Joi.number().min(1).max(5),
      accessibility: Joi.number().min(1).max(5),
      cleanliness: Joi.number().min(1).max(5),
      customer_service: Joi.number().min(1).max(5)
    })
  })
};

module.exports = { validateRequest, schemas };
const joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: error.details[0].message 
      });
    }
    next();
  };
};

const schemas = {
  register: joi.object({
    name: joi.string().required().min(2).max(50),
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
    phone: joi.string().required().min(10),
    role: joi.string().valid('user', 'provider', 'admin').default('user')
  }),

  login: joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
  }),

  station: joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    location: joi.object({
      type: joi.string().valid('Point').required(),
      coordinates: joi.array().items(joi.number()).length(2).required()
    }),
    chargerTypes: joi.array().items(joi.object({
      type: joi.string().required(),
      power: joi.number().required(),
      count: joi.number().required()
    })),
    pricing: joi.object({
      price: joi.number().required(),
      currency: joi.string().default('INR')
    }),
    amenities: joi.array().items(joi.string()),
    operatingHours: joi.object({
      open: joi.string().required(),
      close: joi.string().required()
    })
  })
};

module.exports = { validateRequest, schemas };
