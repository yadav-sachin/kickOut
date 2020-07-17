const Games = require('./../models/gameModel');
const chalk = require('chalk');

let createGameToken = (numRows, numCols) => {
    let colors = ['black', 'blue', 'red'];
    let token = new Object();
    token.row = Math.floor(Math.random() * numRows) + 1;
    token.col = Math.floor(Math.random() * numCols) + 1;
    token.color = colors[Math.floor(Math.random() * 2)];
    return token;
}

exports.validateGame = async (req, res, next) => {
    try {
        if (numRows <= 1 || numRows > 9)
            throw new Error('Rows must be between 2 to 9');
        if (numCols <= 1 || numCols > 9)
            throw new Error('Columns must be between 2 to 9');
        if (numTokens < 2)
            throw new Error('Tokens must be greater than 1');
        next();
    } catch (err) {
        console.log(chalk.red('Invalid Game Data', req.body));
        req.flash('error', err.message);
        res.redirect('/game/create');
    }

}

exports.createGame = async (req, res) => {
    try {
        const { numTokens, numRows, numCols } = req.body;
        const game = new Games({
            numRows,
            numCols,
            numTokens,
            player1: req.user._id
        });
        for (let i = 0; i < numTokens; ++i) {
            game.gameTokens.push(createGameToken(numRows, numCols));
        }
        await game.save();
        req.flash('success', 'Game Successfully Created');
    } catch (err) {
        console.log(chalk.red('Trouble creating Game', err));
        req.flash('error', err.message);
        res.redirect('/game/create');
    }
}