const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./../models/userModel');
const chalk = require('chalk');

passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password'}, async function (email, password, done) {
    try {
        console.log('Login request for', email);    
        const user = await User.find({ email });
        if ((!user) || (!user.isVerified))
            return done(null, false, { message: 'No registered Username/Email found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            {
                req.flash('errorLogs' ['Password Incorrect']);
                return done(null, false);
            }
        return done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});