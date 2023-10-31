
const Academy = require('../sequalizeModels/academyBuilding');
const genericService = require('../services/sequelizeGenericService');
const { sequelize, getCurrentSchema, setSchema } = require('../config/sequelize');
const commonService = require('../services/common');
const bcrypt = require("bcryptjs");

module.exports = {
    saveAdminUser: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            reqObj.password = bcrypt.hashSync(reqObj.password, 8);
            const data = await genericService.createRecord(req, Users, reqObj, t);
            await t.commit();
            return data;

        } catch (err) {
            await t.rollback();
            throw err;
        }

    },
    getUserProfile: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const data = await genericService.readAllRecords(req, Users, {}, t);
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }

    },
    getUserById: async (req, res) => {
        const t = await sequelize.transaction();
        try {

            const { id } = commonService.parseJwt(req.headers.authorization);
            const data = await genericService.findOneRecord(req, Users, { id: id }, t);
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }


    },

    saveAcademy: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            let data;
            const { schemaName, role, id } = commonService.parseJwt(req.headers.authorization);
            let schema = schemaName;
            if (role?.toLowerCase() === 'super') {
                schema = 'public';
            }
            await setSchema(schema);
            const isExist = await genericService.findOneRecord(req, Academy, {}, t);
            if (isExist) {
                data = await genericService.updateRecord(req, Academy, reqObj.id, reqObj, t);
            } else {
                data = await genericService.createRecord(req, Academy, reqObj, t);
            }
            await t.commit();
            return data;

        } catch (err) {
            await t.rollback();
            throw err;
        }

    },
    getAcademyById: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { schemaName, role, id } = commonService.parseJwt(req.headers.authorization);
            let schema = schemaName;
            if (role?.toLowerCase() === 'super') {
                schema = 'public';
            }
            await setSchema(schema);
            const data = await genericService.findOneRecord(req, Academy, {}, t);
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
            const data = await genericService.updateRecord(req, Users, req.params.id, reqObj, t);
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
            const data = await genericService.deleteRecord(req, Users, {}, t);
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
            const data = await genericService.deleteRecord(req, Users, { id: req.params.id }, t);
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }


    }
}