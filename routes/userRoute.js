const express = require('express');
const {getAndUpdateDashboard} = require("../controllers/dashboard");
const {authMiddleware, userAuthMiddleware} = require("../middlewares/01-authMid")
const router = express.Router();

// 
router.get('/dashboard', getAndUpdateDashboard);


module.exports = router;
