const { Sequelize, Model, DataTypes } = require('sequelize');
const chalk = require('chalk');
const { db } = require('../config/db');
const bcrypt = require('bcrypt');
const validator = require('validator');

const User = db.define('user', {
    username: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    isverified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    verificationcode: {
        type: DataTypes.INTEGER,
        allowNull: true //change to false afterwards
    },
    coderequesttime:{
        type: DataTypes.DATE,
        allowNull: true
    },
    played: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ongoing: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    won: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

User.beforeCreate(async (user, options) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 8);
        user.password = hashedPassword;
    } catch (err) {
        throw err;
    }
});

User.findByCredential = function (useridentity, password) //user identity is either email or username ...
{
    return new Promise(async (resolve, reject) => {
        let user;
        if (validator.isEmail(useridentity))
            user = await User.findOne({ where: { email: useridentity } });
        else
            user = await User.findOne({ where: { username: useridentity } });
        if (!user) 
            reject('Given Username/Email does not exist');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            reject('Given Username/Email does not exist');
        resolve(user);
    });
}

db.sync({ alter: true })
    .then(() => console.log(chalk.green("DataBase Synchronised")));


module.exports = { User };

