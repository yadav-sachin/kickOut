const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const tokenInfo = jwt.verify(token, JWT_SECRET_KEY);
        const user = User.findOne({_id: tokenInfo._id, 'authTokens.token': token });
        if(!user) 
            throw new Error('No User Found');
        req.user = user;
        if(!req.isVerified)
            res.redirect('/user/setpassword');
        else
            next();
    }catch(err){
        err+= '. User is not authorised to access the page.';
        res.redirect('/user/login/?error='+encodeURIComponent(err));
    }
}

module.exports = auth;
