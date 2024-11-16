const nodemailer = require("nodemailer");
const nodemailerConfig = require("../config/nodemailer.config");

const sendEmail = ({to,subject,html}) =>{

    const transporter = nodemailer.createTransport(nodemailerConfig)

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