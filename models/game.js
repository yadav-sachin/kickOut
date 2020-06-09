const db = require('./db').db;
const GameStatus = db.define('leaderboard', {
    currplayer: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 2},
        default: 1
    },
    NumRows : {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 9}
    },
    NumCols : {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 9}
    },
    Mode : {
        type:   Sequelize.ENUM,
        values: ['misere', 'normal'],
        defaultValue: 'normal'
    },
    gamecompleted :{
        type: DataTypes.BOOLEAN, 
        defaultValue: false
    }
});

module.exports = { GameStatus };

