const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Username is Required']
        },
        password: {
            type: String,
            trim: true,
            minlength: [6, 'Password must be at least 6 characters']
        },
        firstName: {
            type: String,
            trim: true,
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
                    if (!val) return true;
                    return validator.isAlpha(val);
                },
                message: 'The last name should only contain latin alphabets.',
            },
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Email is Required'],
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
            default: () => { return crypto.randomBytes(20).toString('hex'); }
        },
        verificationRequestTime: {
            type: Date,
            default: Date.now
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
        },
        authTokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    }
);

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    return token;
}

userSchema.virtual('lost').get(function () {
    return this.completed - this.won;
});

userSchema.virtual('ongoing').get(function () {
    return this.played - this.completed;
});

userSchema.plugin(uniqueValidator, { message: 'already taken' });

// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.find({email});
//     if ((!user) || (!user.isVerified))
//         throw new Error('No registered Username/Email found');
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//         throw new Error('Incorrect Password');
//     return user;
// }

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;