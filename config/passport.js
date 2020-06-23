const localStrategy = require('passport-local').Strategy;
const User = require('./../models/userModel');
const chalk = require('chalk');
const bcrypt = require('bcrypt');

const configPassport = function (passport) {
    const authenticateUser = async function (email, password, done) {
        try {
            console.log('Login request for', email);
            const user = await User.findOne({ email });
            console.log(user);
            console.log(user.isVerified);
            if ((!user) || (!user.isVerified))
                return done(null, false, { message: 'No registered Username/Email found' });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                // req.flash('errorLogs'['Password Incorrect']);
                console.log(chalk.blue('Password Incorrect for login by', email));
                return done(null, false, {message: 'Password Incorrect' });
            }
            console.log(chalk.yellow('Password Correct for login by', email));
            return done(null, user);
        } catch (err) {
            console.log(chalk.red('Some error occurred for login by', email, err));
            done(err, null);
        }
    }
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}

module.exports = configPassport;