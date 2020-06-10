const { db } = require('./connect_db');
const { LeaderBoard } = require('./models/Leaderboard');

const task = async () => {
    try{
        await db.sync();
        console.log("Okay , so DB is synced");
        const leaderboards = await LeaderBoard.findAll();
        leaderboards.forEach( entry => console.log(entry.dataValues) );
        // console.log(leaderboards);
    }catch(err){
        console.log("HI an error occuresd");
        console.error(err);
    }
}
task();