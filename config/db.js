const { Sequelize, Model, DataTypes } = require('sequelize');
const chalk = require('chalk');
require('dotenv').config();

const db = new Sequelize(process.env.DATABASE_URL);

db.authenticate()
    .then( () => { console.log(chalk.green.inverse('Connected to DataBase Successfully')); })
    .catch( (err) => { console.log(chalk.red.inverse(err)); });

module.exports = {db};