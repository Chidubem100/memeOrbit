const express = require('express');
const {
   createInvestment,
   getAllInvestment,
   getOneInvestment 
} = require("../controllers/investmentController");
const router = express.Router();

const { userAuthMiddleware, authMiddleware} = require("../middlewares/01-authMid");


// Create investment
router.post("/create", createInvestment);

// Get investment history
router.get("/history", getAllInvestment);

// Get single investment receipt
router.get("/:investmentId", getOneInvestment);

module.exports = router;

