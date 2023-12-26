const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Comment = sequelize.define('Comment', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Comment;