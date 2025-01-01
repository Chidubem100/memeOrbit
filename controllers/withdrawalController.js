const {
    findAllWithdrawalForUser,
    findWithdrawalById,
    createWithdrawal
} = require("../service/withdrawalServices");
const {findUserById} = require("../service/userService");
const {findMostRecentInvestment} = require("../service/investmentService");
const axios = require("axios");
const sendWithdrawalEmail = require("../utils/wthEmail");
const { userAuthMiddleware } = require("../middlewares/01-authMid");

const getConversionRate = async (method) => {
    let apiEndpoint;

    // Define API endpoints for each currency
    switch (method) {
        case "btc":
            apiEndpoint = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"; // Replace with a BTC-to-USD API if needed
            break;
        case "usdt":
            apiEndpoint = "https://api.coingecko.com/api/v3/simple/price?ids=usdt&vs_currencies=usd"; // Replace with an appropriate USDT-to-USD API
            break;
        default:
            throw new Error("Invalid deposit method");
    }

    // Fetch conversion rate
    const response = await axios.get(apiEndpoint);

    // Extract conversion rate based on API response structure
    let conversionRate;
    if (method === "btc") {
        conversionRate = response.data.bitcoin.usd; // Adjust based on the API's BTC response structure
    } else if (method === "usdt") {
        conversionRate = 1; // USDT is pegged to USD
    }

    return parseFloat(conversionRate);
};

// request withdrawal
async function requestWithdrawal(req,res) {
    const userId = req.user.id;
    const {amount, method, walletAdd} = req.body;
    const user = await findUserById({userId});
    const recentInvestment = await findMostRecentInvestment({userId})
    
    try {

        if(!amount||!method||!walletAdd){
            return res.status(404).json({error: "Please provide the needed value(s)"})
        }

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }

        // Validate method and amount
        if (!["btc", "usdt"].includes(method)) {
            return res.status(400).json({ error: "Invalid withdrawal method" });
        }
    
        if(!recentInvestment){
            return res.status(400).json({ error: "No recent Investment" });
        }

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        // Get the conversion rate
        const conversionRate = await getConversionRate(method);

        // Convert the deposit amount to USDT
        const usdtEquivalentAmount = parseFloat(amount) * conversionRate;

        if (usdtEquivalentAmount > user.walletBalance) {
             return res.status(400).json({
            error: "Insufficient wallet balance for the EUR equivalent amount.",
            });
        }
        
        const plan = recentInvestment.plan;
        const maxWithdrawalLimits = {
            basic: 100,
            moon: 500,
            boom: Infinity,
        }

        if(usdtEquivalentAmount > maxWithdrawalLimits[plan]){
            const nextPlan = plan === "moon plan" ? "basic plan" : "boom plan";
            return res.status(400).json({
                error: `Upgrade to the ${nextPlan} to process this withdrawal amount.`,
            });
        }

        

        

    // Deduct EUR equivalent from user's wallet
    user.walletBalance -= usdtEquivalentAmount;
    await user.save();

    const trxnId = `WD-${Date.now()}`;
    const withdrawal = await createWithdrawal({
        userId, amount, trxnId,method, euEquAmount:usdtEquivalentAmount, walletAdd, status:"pending"
    });

    await sendWithdrawalEmail({
        email: user.email,
        username: user.username,
        method: method,
        amount: amount,
        status: "Pending"
    });

    return res.status(200).json({
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