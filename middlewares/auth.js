const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./../models/userModel');

const auth = async (req, res, next) => {
    //Yet to complete
    try{
        const bearerToken = req.headers('Authorization');


        jwt.verify()
    }catch(err){
        res.redirect('/user/login');
    }
}

module.exports = auth;
