
const express = require('express');
const { protect } = require('../middlewares/auth');
const { validateRequest, schemas } = require('../middlewares/validation');
const {
  register,
  login,
  googleLogin,
  getProfile,
  updateProfile
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', validateRequest(schemas.register), register);
router.post('/login', validateRequest(schemas.login), login);
router.post('/google', googleLogin);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
