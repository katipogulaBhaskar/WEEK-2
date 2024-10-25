const Sequelize = require('sequelize');
const sequelize = require('../config/config_1');

const User = require('./user') (sequelize, Sequelize.DataTypes);


module.exports = {
    User,
    sequelize,
};