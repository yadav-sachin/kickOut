const User = require('./../models/userModel');
const sgMail = require('../utils/mail');
const Auth = require('./../middlewares/auth');
const { all } = require('../routers/userRouter');

exports.signupUser = async (req, res) => {
    const signupErrors = [], logs = [];
    try{
        const user = new User(req.body);
        await user.save();
        logs.push('User Created Successfully');
        await sgMail.sendVerification(user);
        logs.push('Verification Mail sent successfully to the given email. The mail may shifted to Promotions/Span Category.');
        logs.push('Verification Code will expire in 6 hours');
        res.status(201).render('login', {signupErrors, logs});
    }catch(err) {
        signupErrors.push(err);
        const formData = req.body;
        res.status(400).render('login',{signupErrors, logs, formData});
    }
}

exports.loginUser = async (req, res) => {
    const loginErrors = [];
    try{
        const user = await User.findByCredentials(req.body.useridentity, req.body.password);
        const token = await user.genereateAuthToken();
        user.authTokens = user.authTokens.concat(token);
        await user.save();
        res.redirect('/dashboard');
    }catch(err){
        loginErrors.push(err);
        res.render('login', {loginErrors});
    }
}

// /verify/:username/:code
exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findOne({username});
        if(!user)
            throw new Error('Invalid Username');
        const currTime = Date.now(), allowedTime = 6*60*60*1000; //6 hours
        if(currTime - user.verificationRequestTime > allowedTime)
        {
            await User.findByIdAndDelete(user._id);
            throw new Error('Verified Code Expired. Try Registering Again');
        }
        user.isVerified = true;
        const token = await user.genereateAuthToken();
        user.authTokens = user.authTokens.concat(token);
        await user.save();
        res.redirect('/user/setPassword');
    }catch(err)
    {
        res.send(err);
    }
}