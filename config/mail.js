const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendVerification(username,firstname, email, code){
    try{
        const msg = {
            to: email,
            from: process.env.MAIL_ID,
            subject: 'Complete Account Verification',
            text:`Thanks for Signing up ${firstname}.
            Please verify your mail to get access to ton of fun in out Multiplayer Games.
            Thank You!
            Your Verification Code is ${code}.`,
            html: `<h3>Thanks for Signing up ${firstname} !</h3>
            <p>Please verify your mail to get access to ton of fun in our Multiplayer Game. The link will expire in 24 hours.</p>
            <p style = "color: yellow;"><strong>Thank You!</strong></p>
            <br>
            <a href="https://kick-out.herokuapp.com/user/verify/${username}/${code}">Proceed Here to Verify</a>`
        }
        sgMail.send(msg);
        return true;
    }catch(err)
    {
        console.error(err);
        return false;
    }
}

function forgotPassword(username,firstname, email, code){
    try{
        const msg = {
            to: email,
            from: process.env.MAIL_ID,
            subject: 'Password Recovery',
            text:`Thanks for Signing up ${firstname}.
            Please verify your mail to get access to ton of fun in out Multiplayer Games.
            Thank You!
            Your Verification Code is ${code}.`,
            html: `<h3>You requested for password change ${firstname} ?</h3>
            <p>Proceed to the link below to reset your password. The link will expire in 24 hours.</p>
            <br>
            <a href="https://kick-out.herokuapp.com/user/resetpassword/${username}/${code}">Proceed Here to Verify</a>`
        }
        sgMail.send(msg);
        return true;
    }catch(err)
    {
        return false;
    }
}

module.exports = {
    sendVerification,
    forgotPassword
}

