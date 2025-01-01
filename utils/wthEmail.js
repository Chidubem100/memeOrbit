const  { sendEmail} = require("./emailConfig");

const sendWithdrawalEmail = async({email, username, method, amount, status}) =>{
    const message = `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Confirmation</title>
</head>

<body style="background: #181a1e; margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto; padding: 20px;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <!-- Main Email Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                    style="background: #121316; border-radius: 12px; padding: 20px; max-width: 600px; width: 100%;">
                    <!-- Logo Section -->
                    <tr>
                        <td align="center" style="padding-bottom: 20px;">
                            <a href="#" style="display: inline-block;">
                                <img src="https://i.ibb.co/0ZJ6XR1/MEMEORBIT-LOGO-122256.png" alt="Meme-Orbit Logo"
                                    style="width: 80px; height: auto; display: block;">
                            </a>
                        </td>
                    </tr>
                    <!-- Withdrawal Section -->
                    <tr>
                        <td align="center" style="color: #fff; padding: 0 20px;">
                            <h1 style="font-size: 24px; font-weight: bold; color: #8672FF; margin-bottom: 10px;">
                                Withdrawal Request Approved</h1>
                            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 15px;">Hello ${username},</h2>
                            <p style="font-size: 15px; line-height: 1.5; margin-bottom: 20px;">
                                Your withdrawal request has been approved. Please check your wallet to confirm the
                                transfer.
                            </p>
                            <!-- Transaction Details Section -->
                            <h2 style="font-size: 16px; font-weight: 600; color: #8672FF; margin-bottom: 10px;">
                                Transaction Details</h2>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                                style="width: 100%; margin-bottom: 15px;">
                                <tr>
                                    <td style="color: #fff;">
                                        <strong>Gateway:</strong> <span style="color: #8672FF;">${method}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #fff;">
                                        <strong>Amount:</strong> <span style="color: #8672FF;">${amount}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #fff;">
                                        <strong>Status:</strong> <span style="color: #8672FF;">${status}</span>
                                    </td>
                                </tr>
                            </table>
                            <p style="font-size: 14px; color: #fff; margin-bottom: 15px;">Log in to check your balance.
                            </p>
                            <a href="https//www.meme-orbit.com/pages/login.html"
                                style="background: #8672FF; color: #fff; text-align: center; font-size: 16px; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                Visit Your Dashboard
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    `;

    return sendEmail({to: email, subject: "Meme-Orbit-Withdrawal", html: message});
}

module.exports = sendWithdrawalEmail;