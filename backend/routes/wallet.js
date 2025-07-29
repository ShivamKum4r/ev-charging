
const express = require('express');
const { protect } = require('../middlewares/auth');
const {
  getWallet,
  topupWallet,
  processPayment,
  getTransactions
} = require('../controllers/walletController');

const router = express.Router();

router.get('/', protect, getWallet);
router.post('/topup', protect, topupWallet);
router.post('/pay', protect, processPayment);
router.get('/transactions', protect, getTransactions);

module.exports = router;
