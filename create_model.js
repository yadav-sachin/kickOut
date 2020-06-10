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


// db.sync({alter : true})
//     .then(() => { console.log('Database Synchronized'); })
//     .catch((err) => { console.error(err); });

//inserting into leaderboard
// const task = async() => {
//     try {
//         await db.sync({force :true});
//         await LeaderBoard.create({
//             username: 'sachin_adm',
//             played: 0,
//             won: 0,
//             lost: 0
//         });
//     }catch(err)
//     {
//         console.error(err);
//     }
// }

// task();


//Query 
const task2 = async () => {
    try{
        await db.sync();
        console.log("Okay , so DB is synced");
        const leaderboards = await LeaderBoard.findAll();
        console.log(leaderboards);
    }catch(err){
        console.log("HI an error occuresd");
        console.error(err);
    }
}
task2();