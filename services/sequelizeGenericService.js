const common = require('./common')
const { sequelize } = require('../config/sequelize');
const logger = require('../logger');
async function createRecord(req, model, data, transaction) {
  if (req.headers?.authorization && (req.headers?.authorization !=='1')) {
    const { id } = common.parseJwt(req.headers?.authorization);
    if (id) {
      data.createdBy = id;
      data.updatedBy = id;
    }
  }
  return await model.create(data, transaction);
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
async function findOneRecord(req, model, whereClause = {}, transaction) {

  const data = await model.findOne({ where: whereClause }, transaction);
  if (data?.dataValues) {
    return data.dataValues;
  }
}

async function updateRecord(req, model, id, updateData, transaction) {
  const [rowsAffected] = await model.update(updateData, {
    where: { id: id },
    returning: true,
    transaction,
  });
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
module.exports = {
  executeRawQuery,
  createRecord,
  createRecords,
  readAllRecords,
  findOneRecord,
  updateRecord,
  deleteRecord,
};
