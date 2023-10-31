const { Sequelize } = require('sequelize');
const config = require('./db.json');
const logger = require('../logger');

const pgp = require('pg-promise')();
const db = pgp(`postgres://${config.development.username}:${config.development.password}@${config.development.host}:${config.development.port}/${config.development.database}`);

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
const setSchema = async (schema) => {
  try {
    await sequelize.query(`SET search_path TO ${schema ? schema : 'public'}`);
  } catch (error) {
    throw new Error(`Error setting schema: ${error.message}`);
  }
};
const createNewSchema = async (newSchema) => {
  try {
    await sequelize.query(`CREATE SCHEMA ${newSchema} AUTHORIZATION postgres;`);
  } catch (error) {
    throw new Error(`Error creating schema: ${error.message}`);
  }
};
const getCurrentSchema = async (newSchema) => {
  try {
    await sequelize.query(`SELECT current_schema();`);
  } catch (error) {
    throw new Error(`Error getCurrentSchema: ${error.message}`);
  }
};
async function synchronizeSchema(defaultSchema, newSchema) {
  try {
    await createNewSchema(newSchema);
    // Step 1: Query table information from the default schema
    const tables = await db.any(
      'SELECT table_name FROM information_schema.tables WHERE table_schema = $1',
      [defaultSchema]
    );
    // Step 2: Generate and execute table creation queries for the new schema
    for (const table of tables) {
      const tableName = table.table_name;
      const createTableQuery = `CREATE TABLE ${newSchema}.${tableName} (LIKE ${defaultSchema}.${tableName} INCLUDING CONSTRAINTS INCLUDING INDEXES);`;
      await db.none(createTableQuery);
      logger.info(`Table structure copied for ${tableName}`);
    }

    logger.info('Table structures copied successfully for ', newSchema);
  } catch (error) {
    logger.error('Error copying table structures for:' + newSchema, error);
    throw new Error(`Error copying table structures for: +${newSchema}, ${error}`);
  } finally {
    pgp.end(); // Close the connection
  }
}
// synchronizeSchema('trytechit10');
module.exports = {sequelize, synchronizeSchema, setSchema, getCurrentSchema};
