const nodemailer = require("nodemailer");
const nodemailerConfig = require("../config/nodemailer.config");

const sendEmail = ({to,subject,html}) =>{

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // transporter.sendMail
    
    return transporter.sendMail({
        from: 'Neo cloud',
        to,
        subject,
        html,
    } , (error, info) =>{
        if(error){
            
            return null;
            
        }else{
            
            return true
        }
    });
};


module.exports = {sendEmail};