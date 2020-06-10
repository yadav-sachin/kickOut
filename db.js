const { Sequelize, Model, DataTypes } = require('sequelize');

const db = new Sequelize('mytestdb', 'myuser', 'mypass', {
    host: 'localhost',
    dialect: 'mysql'
});

const LeaderBoard = db.define('leaderboard', {
    username: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    played: DataTypes.INTEGER,
    won: DataTypes.INTEGER,
    lost: DataTypes.INTEGER
});

module.exports = {db, LeaderBoard};