// const { Sequelize, DataTypes } = require('sequelize');
// const { sequelize } = require('../config/sequelize');

// const AcademyBuilding = sequelize.define('academy_building', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     short_description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     long_description: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//     },
//     logo: {
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
//     tableName: 'academy_building',
//     // Define unique constraints
//     indexes: [
//         {
//             unique: true,
//             fields: ['name'],
//         },
//     ],
// });

// module.exports = AcademyBuilding;
