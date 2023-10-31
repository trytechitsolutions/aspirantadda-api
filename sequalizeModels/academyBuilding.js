const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const AcademyBuilding = sequelize.define('academy_building', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shortDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName:'academy_building',
    // Define unique constraints
    indexes: [
        {
            unique: true,
            fields: ['name'],
        },
    ],
});

module.exports = AcademyBuilding;
