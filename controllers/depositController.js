const {
    createdeposit,
    findAllDepositForUser,
    findDepositById
} = require("../service/depositServic");
const { findUserById } = require("../service/userService");

// fund wallet
async function fundWallet(req,res) {
    try {
        const userId = req.user.id;
        const {method, amount, } = req.body;
        const user =  await findUserById({userId});

        if(!amount || !method){
            return res.status(404).json({error: "Please provide the needed value(s)"})
        }

        if(!user){
            return res.status(404).json({error: "User not found!"})
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


        if(euEquAmount < 300){
            return res.status(400).json({error: "Minimum deposit is 300 usdt"});
        }
        const trxnId = `WD-${Date.now()}`;

        const deposit = await createdeposit({userId, method, status:"pending", amount, euEquAmount, trxnId})
        return res.status(200).json({msg: "Deposit is successful. It is been processes.", deposit})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// deposit history
async function getAllDeposit(req,res) {
    try {
        const userId = req.user.id;
        const deposit = findAllDepositForUser({userId});

        if(!deposit || deposit.length === 0){
            return res.status(404).json({msg: "No deposit found"})
        }
        res.status(200).json({deposit});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// deposit receipt
async function getOneDeposit(req,res) {
    try {
        const {depositId} = req.params;
        const deposit =  await findDepositById({id: depositId});
        if(!deposit){
            return res.status(404).json({error: "No deposit history found"})
        }
        res.status(200).json({deposit})
    } catch (error) {
         console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    fundWallet,
    getAllDeposit,
    getOneDeposit
}