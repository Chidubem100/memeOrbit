const  { sendEmail} = require("./emailConfig");

const sendResetPasswordEmail = async({email, username, token}) =>{
    const resetURl = `${origin}/components/change-password.html?token=${token}&email=${email}`
    const message = `
    
            <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>

<body style="background: #181a1e; margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto; padding: 20px;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!-- Main Email Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                    style="background: #121316; border-radius: 12px; padding: 20px; max-width: 400px; width: 100%;">
                    <!-- Logo Section -->
                    <tr>
                        <td align="center" style="padding-bottom: 20px;">
                            <a href="#" style="display: inline-block;">
                                <img src="https://i.ibb.co/0ZJ6XR1/MEMEORBIT-LOGO-122256.png" alt="Meme-Orbit Logo"
                                    style="width: 60px; height: auto; display: block;">
                            </a>
                        </td>
                    </tr>
                    <!-- Content Section -->
                    <tr>
                        <td align="center" style="color: #fff; padding: 0 20px;">
                            <h1 style="font-size: 24px; font-weight: bold; color: #8672FF; margin-bottom: 10px;">Reset
                                Password</h1>
                            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 15px;">Hello ${username},</h2>
                            <p style="font-size: 15px; line-height: 1.5; margin-bottom: 20px;">
                                Forgot your password? No worries! Click the button below to reset it and choose a new
                                one.
                            </p>
                            <!-- Reset Password Button -->
                            <a href="${resetURl}"
                                style="background: #8672FF; color: #fff; font-size: 16px; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                Reset Password
                            </a>
                        </td>
                    </tr>
                    <!-- Footer Section -->
                    <tr>
                        <td align="center" style="padding-top: 20px; color: #888; font-size: 13px; line-height: 1.4;">
                            <p style="margin: 0;">If you didn’t request a password reset, please ignore this email.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    `;

    return sendEmail({to: email, subject: "Reset Password", html: message});
}

module.exports = sendResetPasswordEmail;