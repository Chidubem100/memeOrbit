const {
    findAllWithdrawalForUser,
    findWithdrawalById,
    createWithdrawal
} = require("../service/withdrawalServices");
const {findUserById} = require("../service/userService");
const {findMostRecentInvestment} = require("../service/investmentService");
const axios = require("axios");

// request withdrawal
async function requestWithdrawal(req,res) {
    try {
        const userId = req.user.id;
        const {amount, method, walletAdd} = req.body;
        const user = await findUserById({userId});
        const recentInvestment = await findMostRecentInvestment({userId})

        if(!amount||!method||!walletAdd){
            return res.status(404).json({error: "Please provide the needed value(s)"})
        }

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }

        // if(!user.walletBalance < amount){
        //     return res.status(400).json({ error: "Insufficient wallet balance" });

        // }

        if(!recentInvestment){
            return res.status(400).json({ error: "No recent Investment" });
        }

        const plan = recentInvestment.plan;
        const maxWithdrawalLimits = {
            basic: 100,
            moon: 500,
            boom: Infinity,
        }

        if(amount > maxWithdrawalLimits[plan]){
            const nextPlan = plan === "moon" ? "basic plan" : "boom plan";
            return res.status(400).json({
                error: `Upgrade to the ${nextPlan} to process this withdrawal amount.`,
            });
        }

        // Fetch EUR equivalent using API
        const apiEndpoint =
            method === "btc"
            ? "https://api.coindesk.com/v1/bpi/currentprice/EUR.json"
            : "https://api.example.com/usdt-to-eur"; // Replace with an appropriate USDT-to-EUR API
        const response = await axios.get(apiEndpoint);

        // Calculate EUR equivalent
        const conversionRate =
        method === "btc"
            ? response.data.bpi.EUR.rate_float
            : response.data.eur_conversion_rate; // Adjust based on API response structure
        const euEquAmount = parseFloat(amount) * parseFloat(conversionRate);

        // if (user.walletBalance < euEquAmount) {
        //      return res.status(400).json({
        //     error: "Insufficient wallet balance for the EUR equivalent amount.",
        //     });
        // }

    // Deduct EUR equivalent from user's wallet
    user.walletBalance -= euEquAmount;
    await user.save();

    const trxnId = `WD-${Date.now()}`;
    const withdrawal = await createWithdrawal({
        userId, amount, trxnId,method, euEquAmount, walletAdd, status:"pending"
    });

    res.status(200).json({
      message: "Withdrawal request submitted successfully.",
      withdrawal,
    });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// withdrawal history
async function withdrawalHistory(req,res) {
    try {
        const userId = req.user.id;
        const withdrawals = findAllWithdrawalForUser({userId});

        if(!withdrawals || withdrawals.length === 0){
            return res.status(404).jdon({msg: "No Withdrawal History Found"})
        }
        res.status(200).json({withdrawals});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// withdrawal receipt
async function withdrawalReciept(req, res) {
    try {
        const {withdrawalId} = req.params;
        const withdrawal = await findWithdrawalById({id:withdrawalId});

        if(!withdrawal){
            return res.status(404).json({msg: `No withdrawal history with the id `})
        }

        res.status(200).json({withdrawal})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    requestWithdrawal,
    withdrawalHistory,
    withdrawalReciept
}