const sequelize = require('../config/sequelize.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    displayPhoto:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    topArtists: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
});

module.exports = User;