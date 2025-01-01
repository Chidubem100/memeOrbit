const express = require('express');
const {
    withdrawalHistory,
    requestWithdrawal,
    withdrawalReciept
} = require("../controllers/withdrawalController");
const { authMiddleware } = require('../middlewares/01-authMid');
const router = express.Router();

// withdrawal route
router.post('/request-withdrawal', authMiddleware,requestWithdrawal);
router.get('/withdrawal-history', authMiddleware,withdrawalHistory);
router.get('/withdrawal-receipt/:id', authMiddleware,withdrawalReciept);

module.exports = router;
