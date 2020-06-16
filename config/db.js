const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', (err) => console.log(chalk.red.inverse('Connection to Database Failed\n', err)));
db.on('open', () => console.log(chalk.green.inverse('Database Connected')));
