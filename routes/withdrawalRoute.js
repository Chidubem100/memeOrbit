const express = require('express');
const {
    withdrawalHistory,
    requestWithdrawal,
    withdrawalReciept
} = require("../controllers/withdrawalController");
const router = express.Router();

// withdrawal route
router.post('/request-withdrawal', requestWithdrawal);
router.get('/withdrawal-history', withdrawalHistory);
router.get('/withdrawal-receipt/:id', withdrawalReciept);

module.exports = router;
