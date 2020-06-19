const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const checkLoggedIn = async (req, res, next) => {
    try{
        const token = req.headers('Authorization').replace('Bearer ','');
        const tokenInfo = jwt.verify(token, JWT_SECRET_KEY);
        const user = User.findOne({_id: tokenInfo._id, 'authTokens.token': token });
        if(!user) 
            throw new Error('No User Found');
        req.user = user;
        res.redirect('/user/dashboard');
    }catch(err){
        next();
    }
}

module.exports = checkLoggedIn;