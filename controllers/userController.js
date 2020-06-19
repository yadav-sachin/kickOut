const User = require('./../models/userModel');
const sgMail = require('../utils/mail');
const authMiddleware = require('./../middlewares/authMiddleware');
const chalk = require('chalk');

exports.signupUser = async (req, res) => {
    const signupErrors = [], logs = [];
    try {
        const user = new User(req.body);
        await user.save();
        logs.push('User Created Successfully');
        await sgMail.sendVerification(user);
        logs.push('Verification Mail sent successfully to the given email. The mail may shifted to Promotions/Span Category.');
        logs.push('Verification Code will expire in 6 hours');
        res.status(201).render('login', { signupErrors, logs });
    } catch (err) {
        signupErrors.push(err);
        const formData = req.body;
        res.status(400).render('login', { signupErrors, logs, formData });
    }
}

exports.loginUser = async (req, res) => {
    const loginErrors = [];
    try {
        const user = await User.findByCredentials(req.body.useridentity, req.body.password);
        const token = await user.genereateAuthToken();
        user.authTokens = user.authTokens.concat(token);
        await user.save();
        res.redirect('/dashboard');
    } catch (err) {
        loginErrors.push(err);
        res.render('login', { loginErrors });
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
        if (req.body.password.trim !== req.body.password2.trim)
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