const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const chalk = require('chalk');
const { db } = require('../config/db');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');

const User = db.define('user', {
    username: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true             //NULL when yet to be verified and password yet to be set
    },
    first_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    last_name: {
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
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    verification_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    verfication_request_time: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
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

User.beforeCreate((user, options) => {
    user.verification_code = crypto.randomBytes(30).toString('hex');
});

User.findByCredential = async function (useridentity, password) //user identity is either email or username ...
{
    let user;
    if (validator.isEmail(useridentity))
        user = await User.findOne({ where: { email: useridentity } });
    else
        user = await User.findOne({ where: { username: useridentity } });
    if (!user)
        throw new Error('Invalid Username/Email');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error('Wrong Password');
    return user;
}

User.verify = async function (username, code) {
    const user = await User.findOne({
        where: {
            username,
            verification_code: code,
            verfication_request_time: {
                $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
            }
        }
    });
    if (!user)
        throw new Error('No Valid User Found');
}

db.sync({ alter: true })
    .then(() => console.log(chalk.green("DataBase Synchronised")));

module.exports = { User };

