const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Kyc = sequelize.define('kyc', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idProof: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gstNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bankAccountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bankAccountName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bankBranch: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bankIfscCode:{
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
    tableName:'kyc',
    // Define unique constraints
    // indexes: [
    //     {
    //         unique: true,
    //         fields: ['email', 'mobilePhone'],
    //     },
    // ],
});

module.exports = Kyc;
