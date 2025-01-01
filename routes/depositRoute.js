const express = require('express');
const {
    fundWallet,
    getAllDeposit,
    getOneDeposit
} = require("../controllers/depositController");
const { userAuthMiddleware, authMiddleware} = require("../middlewares/01-authMid");
const router = express.Router();

// withdrawal route
router.post('/fund-wallet', authMiddleware,fundWallet);
router.get('/history', authMiddleware,getAllDeposit);
router.get('/deposit-history/:id', authMiddleware,getOneDeposit);

module.exports = router;
