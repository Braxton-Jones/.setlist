const { Sequelize } = require('sequelize');
const config = require('./config.js');
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/crescendo_club');


module.exports = sequelize;
