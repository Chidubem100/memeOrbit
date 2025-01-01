const axios = require("axios");

const getConversionRate = async (method) => {
    let apiEndpoint;

    // Define API endpoints for each currency
    switch (method) {
        case "btc":
            apiEndpoint = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"; // Replace with a BTC-to-USD API if needed
            break;
        case "eth":
            apiEndpoint = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"; // Replace with an appropriate ETH-to-USD API
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
    } else if (method === "eth") {
        conversionRate = response.data.ethereum; // Adjust based on the API's ETH response structure
    } else if (method === "usdt") {
        conversionRate = 1; // USDT is pegged to USD
    }

    return parseFloat(conversionRate);
};

const handleDeposit = async (req, res) => {
    const { method, amount } = req.body;

    try {
        // Validate method and amount
        if (!["btc", "eth", "usdt"].includes(method)) {
            return res.status(400).json({ error: "Invalid deposit method" });
        }

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        // Get the conversion rate
        const conversionRate = await getConversionRate(method);

        // Convert the deposit amount to USDT
        const usdtEquivalentAmount = parseFloat(amount) * conversionRate;

        // Ensure the minimum deposit equivalent in USDT
        if (usdtEquivalentAmount < 300) {
            return res.status(400).json({ error: "Minimum deposit is 300 USDT" });
        }

        // If the deposit is valid
        return res.status(200).json({
            message: "Deposit successful",
            convertedAmount: usdtEquivalentAmount.toFixed(2),
            currency: "USDT",
        });

    } catch (error) {
        console.error("Error handling deposit:", error.message);
        return res.status(500).json({ error: "An error occurred while processing the deposit" });
    }
};

module.exports = { handleDeposit };
