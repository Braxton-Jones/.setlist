const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    audioTag:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    mediaLink: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Post;