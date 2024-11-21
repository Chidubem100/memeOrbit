const { Investment, User } = require("../models");
const { v4: uuidv4 } = require("uuid");

/**
 * Create a new investment
 * @param {Object} investmentData - Data for creating the investment
 * @returns {Promise<Object>} - Created investment
 */
const createInvestment = async (investmentData) => {
  const { userId, plans, amount } = investmentData;

  // Fetch user
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Deduct investment amount from walletBalance
  if (amount > user.walletBalance) {
    throw new Error("Insufficient balance in wallet");
  }

  await user.update({
    walletBalance: user.walletBalance - amount,
    totalInvestment: user.totalInvestment + amount,
  });

  // Create investment record
  const investment = await Investment.create({
    id: uuidv4(),
    userId,
    plans,
    amount,
    investmentId: uuidv4(),
    investmentDate: new Date(),
    count: plans === "basic plan" ? 24 : plans === "moon plan" ? 48 : 72,
    returnOnInvestment: 0,
  });

  return investment;
};



////////
/**
 * Get all investments for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - List of investments
 */
const getInvestmentHistory = async (userId) => {
  const investments = await Investment.findAll({
    where: { userId },
    order: [["investmentDate", "DESC"]],
  });

  if (!investments.length) {
    throw new Error("No investments found for this user");
  }

  return investments;
};
 ///
/////////

/**
 * Get single investment by ID
 * @param {string} investmentId - Investment ID
 * @returns {Promise<Object>} - Investment details
 */
const getSingleInvestmentById = async (investmentId, userId) => {
  const investment = await Investment.findOne({
    where: { id: investmentId, userId },
    include: [{ model: User, as: "user", attributes: ["username", "email"] }],
  });

  if (!investment) {
    throw new Error("Investment not found or does not belong to this user");
  }

  return investment;
};

//////
/**
 * Update return on investment after the plan duration
 */
const updateReturnOnInvestment = async () => {
  const investments = await Investment.findAll({
    where: { status: "ongoing" },
  });

  for (const investment of investments) {
    const { count, amount, plans } = investment;

    // Check if duration has expired
    const expirationTime = investment.investmentDate.getTime() + count * 60 * 60 * 1000;
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      let roiPercentage = 0;

      // Calculate ROI based on plan
      if (plans === "basic plan") roiPercentage = 10; // 10% ROI
      if (plans === "moon plan") roiPercentage = 20; // 20% ROI
      if (plans === "boom plan") roiPercentage = 30; // 30% ROI

      const roi = (roiPercentage / 100) * amount;

      // Update the investment record
      await investment.update({
        status: "completed",
        returnOnInvestment: roi,
      });

      // Credit the user's wallet balance
      const user = await User.findByPk(investment.userId);
      await user.update({
        walletBalance: user.walletBalance + roi,
      });
    }
  }
};

///
const { createInvestment } = require("../service/investmentService");

/**
 * Controller for creating a new investment
 */
const handleCreateInvestment = async (req, res) => {
  try {
    const { plans, amount } = req.body;
    const userId = req.user.id;

    const investment = await createInvestment({ userId, plans, amount });

    res.status(201).json({
      success: true,
      message: "Investment created successfully",
      data: investment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/////
const { getInvestmentHistory } = require("../service/investmentService");

/**
 * Controller for fetching investment history
 */
const handleGetInvestmentHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const investments = await getInvestmentHistory(userId);

    res.status(200).json({
      success: true,
      data: investments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


////
const { getSingleInvestmentById } = require("../service/investmentService");

/**
 * Controller for fetching single investment receipt
 */
const handleGetSingleInvestmentReceipt = async (req, res) => {
  try {
    const userId = req.user.id;
    const { investmentId } = req.params;

    const investment = await getSingleInvestmentById(investmentId, userId);

    res.status(200).json({
      success: true,
      data: investment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

////

const cron = require("node-cron");
const { updateReturnOnInvestment } = require("../service/investmentService");

// Run every hour to check and update investments
cron.schedule("0 * * * *", async () => {
  console.log("Checking for completed investments...");
  await updateReturnOnInvestment();
});
