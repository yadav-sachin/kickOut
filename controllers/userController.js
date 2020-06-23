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
        req.flash('success', 'Verification Code will expire in 6 hours');
        res.status(201).render('login');
    } catch (err) {
        const formData = { email, firstName, lastName, username } = req.body;
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
        if (!user) {
            req.flash('error', 'Invalid Username');
            throw new Error('Invalid Username');
        }
        const currTime = Date.now(), allowedTime = 6 * 60 * 60 * 1000; //6 hours
        if (currTime - user.verificationRequestTime > allowedTime) {
            await User.findByIdAndDelete(user._id);
            {
                req.flash('error', 'Verified Code Expired. Try Registering Again');
                throw new Error('Verified Code Expired. Try Registering Again');
            }
        }
        user.isVerified = true;
        req.flash('success', 'User Successfully Verified');
        user.password = 'password';
        req.flash('info', "Current Password is Set to 'password'. Change the Password Now");
        await user.save();
        console.log(chalk.green('User ' + username + ' Successfully got Verification. Will Be asked to set Password Now'));
        req.login(user, function (err) {
            if (err) { return next(err); }
            res.redirect('/user/changePassword');
        });
    } catch (err) {
        console.log(chalk.red(username, ' Trouble while verifying token', err));
        req.flash('error', err.message);
        res.redirect('/user/login');
    }
}


exports.changePassword = async (req, res) => {
    try {
        req.body.password = req.body.password.trim();
        req.body.password2 = req.body.password2.trim();
        if (req.body.password !== req.body.password2)
        {
            req.flash('error', 'The two passwords do not match. Try Again');
            throw new Error('The two inputs do not match');
        }
        const user = req.user;
        user.password = req.body.password;
        await user.save();
        req.flash('success', 'Password Successfully Changed');
        req.logout();
        req.flash('info', 'Login with the new password');
        res.redirect('/user/login');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/user/changepassword');
    }
}