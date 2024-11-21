const express = require('express');
const {getAndUpdateDashboard} = require("../controllers/dashboard");
const {authMiddleware, userAuthMiddleware} = require("../middlewares/01-authMid")
const {handleChangePassword, handleChangeEmail} =require("../controllers/userController")
const router = express.Router();

// 
router.get('/dashboard', getAndUpdateDashboard);
router.patch("/change-password", handleChangePassword);
router.patch("/change-email", handleChangeEmail)

module.exports = router;
