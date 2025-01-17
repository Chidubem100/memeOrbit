// const {sendEmail} = require("../utils/sendEmailConfig");
const {sendEmail} = require("../utils/emailConfig");

const sendCeoMail = async({username, email}) =>{

    const  message = `

            <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Meme-Orbit</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; margin: 0; padding: 0;">
    <table
        style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <tr>
            <td style="text-align: center;">
                <h1 style="color: #004aad;">🚀 Welcome to Meme-Orbit 🌌</h1>
                <p style="font-size: 1.2em; color: #555;">Your journey into effortless memecoin trading starts here!</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: left; color: #333;">
                <p>Dear <strong>${username}</strong>,</p>
                
                <p>Welcome to <strong>Meme-Orbit</strong>, your gateway to easy and secure memecoin
                    trading and investments! Here’s what you can look forward to:</p>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li><strong>✨ Simple Investments</strong> – Pick your plan and let your money work for you.</li>
                    <li><strong>💸 Worry-Free Returns</strong> – Sit back and watch your investments grow.</li>
                    <li><strong>🌟 Seamless Experience</strong> – Focus on your goals while we handle the rest.</li>
                </ul>
                <p>Your financial freedom in the memecoin universe begins today. <a href="https//www.meme-orbit.com/pages/login.html"
                        style="color: #004aad; text-decoration: none; font-weight: bold;">Log in to your dashboard</a>
                    to explore and get started.</p>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; padding: 20px;">
                <a href="https//www.meme-orbit.com/pages/login.html"
                    style="background: #004aad; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 1.1em;">Start
                    Exploring</a>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; padding: 10px; font-size: 0.9em; color: #888;">
                <p>We’re here to support you every step of the way—let’s make your orbit unforgettable!</p>
                <p>Best wishes,<br><strong>The Meme-Orbit Team</strong></p>
            </td>
        </tr>
    </table>
</body>

</html>

    `;

    return sendEmail({
        to: email,
        subject: "Welcome to Meme-Orbit",
        html: message
    });
}

module.exports = sendCeoMail;