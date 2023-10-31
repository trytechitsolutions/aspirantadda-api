const { Sequelize } = require('sequelize');
const config = require('../config/db.json');
const logger = require('../logger');

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: 'postgres', 
      port: config.development.port,
      dialectOptions: {
        quoteIdentifiers: false,
      },
      logging: (msg) => logger.info(msg)
    },
    
  );

// Test the database connection
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        logger.info('Database connection successful.');
    } catch (error) {
        logger.error('Database connection error:', error);
    }
}

module.exports = {
    testDatabaseConnection
}