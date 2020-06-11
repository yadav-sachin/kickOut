const express = require('express');
const chalk = require('chalk');
const router = express.Router();
const { User } = require('./../models/User');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try{
        const user = await User.findByCredential(req.body.useridentity, req.body.password);
        res.send(user);
    } catch(err)
    {
        res.send(err);
    }
});

router.post('/signup', async (req, res) => {
    console.log(chalk.blue(req.body));
    await User.create(req.body)
        .then((new_user) => { 
            res.send(new_user); 
            console.log(chalk.green('User created successfully')); 
        })
        .catch(() => { 
            res.redirect('/user'); 
            console.log(chalk.red('Cannot create User')); 
        });
});

module.exports = router;