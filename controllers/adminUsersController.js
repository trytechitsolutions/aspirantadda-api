
// const Users = require('../sequalizeModels/adminUsers');
const genericService = require('../services/sequelizeGenericService');
const { sequelize } = require('../config/sequelize');
// const bcrypt = require("bcryptjs");
const Users = require('../sequalizeModels/users');
// const common = require('../services/common');

module.exports = {
    // saveAdminUser: async (req, res) => {
    //     const t = await sequelize.transaction();
    //     try {
    //         const reqObj = req.body;
    //         reqObj.password = bcrypt.hashSync(reqObj.password, 8);
    //         const data = await genericService.createRecord(req, Users, reqObj, t);
    //         await t.commit();
    //         return data;

    //     } catch (err) {
    //         await t.rollback();
    //         throw err;
    //     }

    // },
    // getAdminUsers: async (req, res) => {
    //     const t = await sequelize.transaction();
    //     try {
    //         const data = await genericService.readAllRecords(req, Users, {}, t);
    //         await t.commit();
    //         return data;
    //     } catch (err) {
    //         await t.rollback();
    //         throw err;
    //     }

    // },
    saveOrUpdateProfile: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            if (reqObj.id) {
                data = await genericService.updateRecord(req, Users, reqObj.id, reqObj, t);
            } else {
                data = await genericService.createRecord(req, Users, reqObj, t);
            }
            await t.commit();
            return data;

        } catch (err) {
            await t.rollback();
            throw err;
        }

    },
    // getAdminUserById: async (req, res) => {
    //     // const t = await sequelize.transaction();
        
    //     const t = req.transaction;
    //     try {
    //         const data = await genericService.findOneRecord(req, Users, { id: req.params.id }, t);
    //         await t.commit();
    //         return data;
    //     } catch (err) {
    //         await t.rollback();
    //         throw err;
    //     }


    // },
    // updateAdminUserById: async (req, res) => {
    //     const t = await sequelize.transaction();
    //     try {
    //         const reqObj = req.body;
    //         const data = await genericService.updateRecord(req, Users, req.params.id, reqObj, t);
    //         await t.commit();
    //         return data;
    //     } catch (err) {
    //         await t.rollback();
    //         throw err;
    //     }


    // },
    // deleteAdminUser: async (req, res) => {
    //     const t = await sequelize.transaction();
    //     try {
    //         const data = await genericService.deleteRecord(req, Users, {}, t);
    //         await t.commit();
    //         return data;
    //     } catch (err) {
    //         await t.rollback();
    //         throw err;
    //     }
    // },
    // deleteAdminUserById: async (req, res) => {
    //     const t = await sequelize.transaction();
    //     try {
    //         const data = await genericService.deleteRecord(req, Users, { id: req.params.id }, t);
    //         await t.commit();
    //         return data;
    //     } catch (err) {
    //         await t.rollback();
    //         throw err;
    //     }


    // }
}