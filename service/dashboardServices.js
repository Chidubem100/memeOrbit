const { User } = require("../models");
const {  Withdrawal} = require("../models");
const { Investment } = require("../models");
const { Deposit } = require("../models");

/**
 * Fetch user dashboard data.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - The dashboard data.
 */
const getDashboardData = async (userId) => {
  try {
    // Fetch user data
    const user = await User.findByPk(userId, {
      attributes: ["username", "walletBalance"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Fetch and sum total investment
    const totalInvestment = await Investment.sum("amount", {
      where: { userId },
    });

    // Fetch and sum total withdrawal
    const totalWithdrawal = await Withdrawal.sum("amount", {
      where: { userId },
    });

    // Fetch and sum total deposit
    const totalDeposit = await Deposit.sum("amount", {
      where: { userId },
    });

    // Fetch the most recent ongoing investment
    const currentInvestment = await Investment.findOne({
      where: { userId, status: "ongoing" },
      order: [["createdAt", "DESC"]],
      attributes: ["amount", "plan", "createdAt"],
    });

    // Return the dashboard data
    return {
      username: user.username,
      walletBalance: user.walletBalance,
      totalInvestment: totalInvestment || 0.0,
      totalWithdrawal: totalWithdrawal || 0.0,
      totalDeposit: totalDeposit || 0.0,
      currentInvestment: currentInvestment || null,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    throw error;
  }
};

module.exports = { getDashboardData };


