const express = require('express');
const Sequelize = require('sequelize');
const chalk = require('chalk');
const router = express.Router();
const { User } = require('./../models/User');
const Mail = require('./../config/mail');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredential(req.body.useridentity, req.body.password);
        res.send(user);
    } catch (err) {
        res.send({ error: err });
    }
});

router.get('/verify/:username/:code', async (req, res) => {
    try {
        const user = User.verify(req.params.username, req.params.code);
        res.send('Set Your Password');
    } catch (err) {
        res.send({ error: err });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.send(newUser);
        const isSent = await Mail.sendVerification(newUser.username, newUser.first_name, newUser.email, newUser.verification_code);
        console.log(chalk.green('User created and sent Verification Mail successfully'));
    } catch (err) {
        res.send({ error: 'User Cannot Be Created' });
    }
});

module.exports = router;