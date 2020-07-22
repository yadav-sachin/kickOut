const Games = require('./../models/gameModel');
const chalk = require('chalk');
const Users = require('./../models/userModel');

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
        const { numTokens, numRows, numCols } = req.body;
        if (numRows <= 1 || numRows > 9)
            throw new Error('Rows must be between 2 to 9');
        if (numCols <= 1 || numCols > 9)
            throw new Error('Columns must be between 2 to 9');
        if (numTokens < 2)
            throw new Error('Tokens must be greater than 1');
        next();
    } catch (err) {
        console.log(chalk.red('Invalid Game Data', req.body));
        const formData = { numRows, numCols, numTokens } = req.body;
        req.flash('formData', formData);
        req.flash('error', err.message);
        res.redirect('/game/create');
    }
}

exports.createGame = async (req, res) => {
    try {
        let { numTokens, numRows, numCols } = req.body;
        numTokens = parseInt(numTokens);
        numCols = parseInt(numCols);
        numRows = parseInt(numRows);
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
        req.flash('success', 'Game Successfully Created.')
        const user = Users.findOne({ _id: req.user._id });
        user.games.push(game._id);
        req.flash('success', 'Added in your Games List');
        res.redirect('/user/login');
    } catch (err) {
        const formData = { numRows, numCols, numTokens } = req.body;
        req.flash('formData', formData);
        console.log(chalk.red('Trouble creating Game', err));
        req.flash('error', err.message);
        res.redirect('/game/create');
    }
}

exports.joinGame = async (req, res) => {
    try {
        const GameId = req.params.gameId;
        const game = await Games.findOne({ _id: gameId });
        if (!game)
            throw new Error('Game Does Not Exist. Check the GameID.');
        if (!game.player2) {
            player2 = req.user._id;
            const user = await Users.findOne({ _id: req.user._id });
            user.games.push(game._id);
            await user.save();
        }
        await game.save();
        res.redirect(`/game/play/${game._id}`);
    } catch (err) {
        console.log(chalk.red('Trouble joining Game', err));
        req.flash('error', err.message);
        res.redirect('/user/login');
    }
}

exports.getGameData = async (req, res) => {
    try {
        const gameId = req.params.gameId;
        const game = await Games.findOne({ _id: gameId });
        if (!game)
            throw new Error('No Game Found');
        res.send({ data: game });
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}


