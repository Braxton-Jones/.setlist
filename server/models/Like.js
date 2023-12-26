const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Like = sequelize.define('Like', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Like;