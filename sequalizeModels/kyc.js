// const { Sequelize, DataTypes } = require('sequelize');
// const { sequelize } = require('../config/sequelize');

// const Kyc = sequelize.define('kyc', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     id_proof: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     gst_number: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     bank_account_number: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     bank_account_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     bank_branch: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     bank_ifsc_code:{
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     is_active: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//     },
//     created_at: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//     updated_at: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//     created_by: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: '',
//     },
//     updated_by: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: '',
//     }
// }, {
//     tableName:'kyc',
//     // Define unique constraints
//     // indexes: [
//     //     {
//     //         unique: true,
//     //         fields: ['email', 'mobilePhone'],
//     //     },
//     // ],
// });

// module.exports = Kyc;
