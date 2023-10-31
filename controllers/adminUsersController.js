
const AdminUser = require('../sequalizeModels/adminUsers');
const genericService = require('../services/sequelizeGenericService');
const { sequelize } = require('../config/sequelize');
const bcrypt = require("bcryptjs");

module.exports = {
    saveAdminUser: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            reqObj.password = bcrypt.hashSync(reqObj.password, 8);
            const data = await genericService.createRecord(req, AdminUser, reqObj, t);
            await t.commit();
            return data;

        } catch (err) {
            await t.rollback();
            throw err;
        }

    },
    getAdminUsers: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const data = await genericService.readAllRecords(req, AdminUser, {}, t);
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }

    },
    getAdminUserById: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const data = await genericService.findOneRecord(req, AdminUser, { id: req.params.id }, t);
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }


    },
    updateAdminUserById: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            const data = await genericService.updateRecord(req, AdminUser, req.params.id, reqObj, t);
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }


    },
    deleteAdminUser: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const data = await genericService.deleteRecord(req, AdminUser, {}, t);
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }
    },
    deleteAdminUserById: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const data = await genericService.deleteRecord(req, AdminUser, { id: req.params.id }, t);
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }


    }
}