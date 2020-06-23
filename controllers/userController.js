const User = require('./../models/userModel');
const sgMail = require('../utils/mail');
const chalk = require('chalk');

exports.signupUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        req.flash('success', 'User Created Successfully');
        await sgMail.sendVerification(user);
        req.flash('success', 'Verification Mail sent successfully to the given email. The mail may shifted to Promotions/Span Category.');
        req.flash('success','Verification Code will expire in 6 hours');
        res.status(201).render('login');
    } catch (err) {
        const formData = {email, firstName, lastName, username} = req.body;
        req.flash('formData', formData);
        req.flash('error', err.message);
        res.redirect('/user/login');
    }
}

//for  /verify/:username/:verficationCode
exports.verifyUser = async (req, res) => {
    const { username, verificationCode } = req.params;
    try {
        console.log(username, verificationCode);
        const user = await User.findOne({ username, verificationCode });
        if (!user)
            throw new Error('Invalid Username');
        const currTime = Date.now(), allowedTime = 6 * 60 * 60 * 1000; //6 hours
        if (currTime - user.verificationRequestTime > allowedTime) {
            await User.findByIdAndDelete(user._id);
            throw new Error('Verified Code Expired. Try Registering Again');
        }
        const token = await user.generateAuthToken();
        user.authTokens.push({token});
        await user.save();
        res.redirect('/user/setPassword');
        console.log(chalk.green('User ' + username + ' Successfully got Verification Token. Will Be asked to set Password Now'));
    } catch (err) {
        console.log(chalk.red(username, ' Trouble while verifying token', err));
        err+= '. Could Not Be Verified';
        res.redirect('/user/login/?error='+encodeURIComponent(err));
    }
}


exports.setPassword = async (req, res) => {
    const errorLogs = [];
    try {
        req.body.password = req.body.password.trim();
        req.body.password2 = req.body.password2.trim();
        if (req.body.password !== req.body.password2)
            throw new Error('The two inputs do not match');
        const user = req.body.user;
        if (!user)
            throw new Error('Invalid User');
        user.isVerified = true;
        user.password = req.body.password;
        await user.save();
        res.redirect('/user/dashboard');
    } catch (err) {
        errorLogs.push(err);
        res.render('setPassword', { errorLogs });
    }
}