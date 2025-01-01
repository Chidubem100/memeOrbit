const express = require('express');
const {getAndUpdateDashboard} = require("../controllers/dashboard");
const {authMiddleware, userAuthMiddleware} = require("../middlewares/01-authMid")
const {handleChangePassword, handleChangeEmail} =require("../controllers/userController")
const router = express.Router();
const { userAuthMiddleware, authMiddleware} = require("../middlewares/01-authMid");

// 
router.get('/dashboard', authMiddleware,getAndUpdateDashboard);
router.patch("/change-password", authMiddleware,handleChangePassword);
router.patch("/change-email", authMiddleware,handleChangeEmail)

module.exports = router;
