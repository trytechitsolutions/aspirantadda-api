const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Test = sequelize.define('Test', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  test_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  test_duration: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  test_description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  no_of_questions: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  question_ids: {
    type: DataTypes.TEXT, // Use TEXT for longtext
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN, // Equivalent to tinyint(1)
    allowNull: false,
    defaultValue: false,
  },
  created_by: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  update_by: {
    type: DataTypes.INTEGER(11),
    defaultValue: null,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  is_home_ref: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  no_of_free_attempts: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  attempts_count: {
    type: DataTypes.STRING(10),
    defaultValue: null,
  },
  no_of_attempts: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  scheduled_date: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  is_online: {
    type: DataTypes.INTEGER(11),
    defaultValue: 0,
  },
  is_omr: {
    type: DataTypes.INTEGER(11),
    defaultValue: 0,
  },
}, {
  tableName: 'test', // Specify the table name if it's different
  timestamps: false, // If you don't want Sequelize to manage timestamps
});

module.exports = Test;
