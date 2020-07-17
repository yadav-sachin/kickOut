const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const chalk = require('chalk');
const Schema = mongoose.Schema;
require('dotenv').config();


const gameSchema = {
    currPlayer: {
        type: Number,
        default: 1,
        min: 1,
        max: 2
    },
    numRows: {
        type: Number,
        min: 1,
        max: 9
    },
    numCols: {
        type: Number,
        min: 1,
        max: 9
    },
    numTokens: {
        type: Number
    },
    player1 : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    player2: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    gameTokens: [
        {
            row: {
                type: Number,
                min: 1,
                max: 9
            },
            col: {
                type: Number,
                min: 1,
                max: 9
            },
            color : {
                type: String,
                enum: ['black', 'blue', 'red']
            }
        }]
}

gameSchema.virtual('completed').get(function () {
    return this.numTokens === 0;
});

const Games = mongoose.model('Game', gameSchema);

module.exports = Games;