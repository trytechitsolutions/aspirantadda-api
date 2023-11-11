const common = require('./common')
const { sequelize } = require('../config/sequelize');
const logger = require('../logger');
const { QueryTypes } = require('sequelize');
async function createRecord(req, model, data, transaction) {
  try {
    if (req.headers?.authorization && req.headers?.authorization !== '1') {
      const { id } = common.parseJwt(req.headers?.authorization);
      if (id) {
        data.createdBy = id;
        data.updatedBy = id;
      }
    }

    return await model.create(data, { transaction });
  } catch (error) {
    console.error('Error creating record:', error);
    throw new Error('Failed to create the record: ' + error.message);
  }
}

async function createRecords(req, model, dataList, transaction) {
  if (req.headers?.authorization) {
    const { id } = common.parseJwt(req.headers?.authorization);
    if (id) {
      // Add createdBy and updatedBy to each data object
      dataList = dataList.map(data => ({ ...data, createdBy: id, updatedBy: id }));
    }
  }

  return await model.bulkCreate(dataList, transaction);
}

async function readAllRecords(req, model, whereClause = {}, transaction) {

  let offset = 0;
  if (req.query.currentPage && req.query.rowsPerPage > 0) {
    offset = req.query.currentPage * req.query.rowsPerPage;
  }
  const data = await model.findAndCountAll({
    where: whereClause, limit: req.query.rowsPerPage,
    offset: offset
  }, transaction);
  return data;


}
const executeRawSelectQuery = async (query, schema, transaction) => {
  try {
    const result = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      searchPath: schema, // Specify the schema here,
      transaction
    });

    return result;
  } catch (error) {
    console.error('Error executing raw query:', error);
    throw new Error('Failed to execute raw query: ' + error.message);
  }
}
const copyTables = async (query, transaction) => {
  try {
    const result = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      transaction
    });

    return result;
  } catch (error) {
    console.error('Error executing copyTables query:', error);
    throw new Error('Failed to execute copyTables query: ' + error.message);
  }
}


async function findOneRecord(req, model, whereClause = {}, transaction) {
  const data = await model.findOne({ where: whereClause }, transaction);
  if (data?.dataValues) {
    return data.dataValues;
  } return data;
}

async function updateRecord(req, model, id, updateData, transaction) {
  const [rowsAffected] = await model.update(updateData, {
    where: { id: id },
    returning: true,
  }, { transaction });
  return rowsAffected > 0 ? true : null;
}

async function deleteRecord(req, model, whereClause, transaction) {

  const rowsDeleted = await model.destroy({
    where: whereClause,

  }, transaction);
  return rowsDeleted > 0;
}
async function executeRawQuery(req, rawQuery, replacements, transaction) {
  return await sequelize
    .query(rawQuery, {
      replacements,
      type: sequelize.QueryTypes.SELECT,
      transaction: transaction
    })
    .catch((error) => {
      logger.log('Error executing raw query:', error);
      throw error;
    });

}
async function createRecordRaw(tableName, data, schema, transaction) {
  try {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map((value) => typeof value === 'string' ? `'${value}'` : value).join(', ');

    const query = `INSERT INTO ${schema}.${tableName} (${columns}) VALUES (${values}) RETURNING *;`;
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT, 
      // searchPath: schema,
       transaction });

    // Extract the inserted record from the result
    const insertedRecord = result.length > 0 ? result[0] : null;

    return insertedRecord;
  } catch (error) {
    console.error('Error creating record:', error);
    throw new Error('Failed to create the record: ' + error.message);
  }
}
async function updateRecordRaw(tableName, data, condition, schema, transaction) {
  try {
    const setClause = Object.entries(data)
      .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
      .join(', ');

    const whereClause = Object.entries(condition)
      .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
      .join(' AND ');

    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause} RETURNING *;`;

    const result = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE, searchPath: schema, transaction });

    // Extract the updated record from the result
    const updatedRecord = result.length > 0 ? result[0] : null;

    return updatedRecord;
  } catch (error) {
    console.error('Error updating record:', error);
    throw new Error('Failed to update the record: ' + error.message);
  }
}

module.exports = {
  executeRawQuery,
  createRecord,
  createRecords,
  readAllRecords,
  findOneRecord,
  updateRecord,
  deleteRecord,
  executeRawSelectQuery,
  createRecordRaw,
  updateRecordRaw,
  copyTables
};
