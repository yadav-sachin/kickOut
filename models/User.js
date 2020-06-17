const mongoose = require('mongoose');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is Required']
        },
        password: {
            type: String,
            required: [true, 'Password is Required'],
            validate: {
                validator(val) {
                    return val.length >= 6;
                },
                message: 'Password must be at least 6 characters'
            }
        },
        firstName: {
            type: String,
            required: [true, 'First Name is Required'],
            validate: {
                validator: function (val) {
                    return validator.isAlpha(val);
                },
                message: 'The first name should only contain latin alphabets.',
            },
        },
        lastName: {
            type: String,
            validate: {
                validator: function (val) {
                    return validator.isAlpha(val);
                },
                message: 'The last name should only contain latin alphabets.',
            },
        },
        email: {
            type: String,
            required: [true, 'Email is Required'],
            unique: true,
            validate: {
                validator: function (val) {
                    return validator.isEmail(val);
                },
                message: 'Invalid Email',
            }
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
        },
        verificationRequestTime: {
            type: Date
        },
        played: {
            type: Number,
            default: 0
        },
        completed: {
            type: Number,
            default: 0
        },
        won: {
            type: Number,
            default: 0
        }
    }
);

userSchema.virtual('lost').get(function () {
    return this.completed - this.won;
});

userSchema.virtual('ongoing').get(function () {
    return this.played - this.completed;
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = { User };