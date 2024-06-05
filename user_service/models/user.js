const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female', 'other'],
        allowNull: false,
    },
    problems: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, { timestamps: true });

module.exports = User;