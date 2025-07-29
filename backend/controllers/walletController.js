
const Wallet = require('../models/Wallet');

const getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user: req.user.id });
    
    if (!wallet) {
      wallet = await Wallet.create({
        user: req.user.id,
        balance: 0
      });
    }

    res.json({ success: true, data: wallet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const topupWallet = async (req, res) => {
  try {
    const { amount, paymentMethod = 'card' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // In a real application, you would integrate with a payment gateway here
    // For demo purposes, we'll simulate a successful payment

    let wallet = await Wallet.findOne({ user: req.user.id });
    
    if (!wallet) {
      wallet = await Wallet.create({
        user: req.user.id,
        balance: 0
      });
    }

    // Simulate payment processing
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Add money to wallet
    wallet.balance += amount;
    wallet.transactions.push({
      type: 'credit',
      amount: amount,
      description: `Wallet top-up via ${paymentMethod}`,
      reference: transactionId
    });

    await wallet.save();

    res.json({
      success: true,
      message: 'Wallet topped up successfully',
      data: {
        transactionId,
        newBalance: wallet.balance,
        amount: amount
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const processPayment = async (req, res) => {
  try {
    const { amount, description, reference } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const wallet = await Wallet.findOne({ user: req.user.id });
    
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    // Deduct money from wallet
    wallet.balance -= amount;
    wallet.transactions.push({
      type: 'debit',
      amount: amount,
      description: description || 'Payment',
      reference: reference || `PAY_${Date.now()}`
    });

    await wallet.save();

    res.json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        newBalance: wallet.balance,
        amount: amount
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;

    const wallet = await Wallet.findOne({ user: req.user.id });
    
    if (!wallet) {
      return res.json({
        success: true,
        data: { transactions: [], balance: 0 },
        pagination: { page: 1, pages: 0, total: 0 }
      });
    }

    let transactions = wallet.transactions;
    
    if (type) {
      transactions = transactions.filter(t => t.type === type);
    }

    // Sort by most recent first
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = transactions.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    
    transactions = transactions.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        transactions,
        balance: wallet.balance
      },
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

module.exports = {
  getWallet,
  topupWallet,
  processPayment,
  getTransactions
};
