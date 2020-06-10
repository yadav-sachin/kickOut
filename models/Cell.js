const db = require('./db').db;
const Cell = db.define('leaderboard', {
    row: DataTypes.INTEGER,
    col: DataTypes.INTEGER,
    black: DataTypes.INTEGER,
    blue : DataType.INTEGER,
    red: DataType.INTEGER
});

module.exports = { Cell };

