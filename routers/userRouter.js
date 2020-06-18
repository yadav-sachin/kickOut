const express = require('express');
const Sequelize = require('sequelize');
const chalk = require('chalk');
const router = express.Router();
const { User } = require('./../models/userModel');
const Mail = require('../utils/mail');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');

function verifyToken(req, res, next){
    const tokenHead = req.headers.authorization;
    // if(!)
}

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', userController.loginUser);

router.get('/verify/:username/:code', async (req, res) => {
    try {
        const user = await User.verify(req.params.username, req.params.code);
        res.send('Set Your Password');
        const token = jwt.sign({userID: user.id}, process.env.SECRET_KEY,{expiresIn: '24 hrs'});
    } catch (err) {
        res.send({ error: err });
    }
});

router.get('/setpassword', verifyToken, (req, res) => {
    ;
});

router.post('/signup', userController.signupUser);

module.exports = router;