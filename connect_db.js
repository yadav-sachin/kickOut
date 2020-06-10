const { Sequelize, Model, DataTypes } = require('sequelize');

const db = new Sequelize('mytestdb', 'myuser', 'mypass', {
    host: 'localhost',
    dialect: 'mysql'
});

db.authenticate()
    .then( () => { console.log('connection successfull'); })
    .catch( (err) => { console.error(err); });

module.exports = {db};