const { Sequelize, Model, DataTypes } = require('sequelize');
const chalk = require('chalk');

const db = new Sequelize('kickout', 'myuser', 'mypass', {
    host: 'localhost',
    dialect: 'mysql'
});
const log = console.log;
const success = chalk.green.inverse;
const error = chalk.red.inverse;

db.authenticate()
    .then( () => { log(success('Connected to DataBase Successfully')); })
    .catch( (err) => { console.log(error(err)); });

module.exports = {db};