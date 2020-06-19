const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const chalk = require('chalk');

async function sendVerification(user) {
    try {
        const msg = {
            to: user.email,
            from: process.env.EMAIL_ID,
            subject: 'Complete Account Verification',
            text: `Thanks for Signing up ${user.firstName}.
            Please verify your mail to get access to ton of fun in our Multiplayer Games.
            Thank You!
            Your Verification Code is ${user.verificationCode}.`,
            html: `<h3>Thanks for Signing up ${user.firstName} !</h3>
            <p>Please verify your mail to get access to ton of fun in our Multiplayer Game. The link will expire in 24 hours.</p>
            <p style = "color: green;"><strong>Thank You!</strong></p>
            <br>
            <a href="https://kick-out.herokuapp.com/user/verify/${user.username}/${user.verificationCode}">Proceed Here to Verify</a>`
        }
        await sgMail.send(msg);
        console.log(chalk.yellow('Verification Code sent to  ' + user.email));
    } catch (err) {
        console.error(err);
        throw new Error('Verification Mail could not be sent. Register Again after 6 hrs');
    }
}

async function forgotPassword(user) {
    try {
        const msg = {
            to: user.email,
            from: process.env.EMAIL_ID,
            subject: 'Password Recovery',
            text: `Thanks for Signing up ${user.firstName}.
        Please verify your mail to get access to ton of fun in out Multiplayer Games.
        Thank You!
        Your Verification Code is ${user.verificationCode}.`,
            html: `<h3>You requested for password change ${user.firstName} ?</h3>
        <p>Proceed to the link below to reset your password. The link will expire in 24 hours.</p>
        <br>
        <a href="https://kick-out.herokuapp.com/user/resetpassword/${user.username}/${user.verificationCode}">Proceed Here to Verify</a>`
        }
        await sgMail.send(msg);
        console.log(chalk.yellow('Password reset sent to ' + user.email));
    }catch(err)
    {
        console.error(err);
        throw new Error('Password Reset Instructions could not be sent. Try Again after few minutes.');
    }
}

module.exports = {
    sendVerification,
    forgotPassword
}

