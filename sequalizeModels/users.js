const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    logo:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    mobilePhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    schemaName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    updatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    }
}, {
    tableName:'users',
    // Define unique constraints
    indexes: [
        {
            unique: true,
            fields: ['email', 'mobilePhone'],
        },
    ],
});

module.exports = Users;
