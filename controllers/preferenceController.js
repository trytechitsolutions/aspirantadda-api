
const genericService = require('../services/sequelizeGenericService');
const { sequelize} = require('../config/sequelize');
const commonService = require('../services/common');
const bcrypt = require("bcryptjs");

module.exports = {
    saveOrUpdateAdminUser: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            let data;
            if(req.body.id){
                data = await genericService.updateRecordRaw('users',reqObj,{id: reqObj.id},'public',t)
            } else{
            reqObj.password = bcrypt.hashSync(reqObj.password, 8);
            data = await genericService.createRecordRaw('users', reqObj, 'public', t);
            } 
            await t.commit();
            return data;

        } catch (err) {
            await t.rollback();
            throw err;
        }

    },
    // getUserProfile: async (req, res) => {
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
    getUserById: async (req, res) => {
        const t = await sequelize.transaction();
        try {

            const { id } = commonService.parseJwt(req.headers.authorization);
            const selColmns = `id, first_name, last_name, middle_name, email, brand_name, logo, mobile_phone, role`
            const query = `SELECT ${selColmns} FROM users where id=${id}`;
            const data = await genericService.executeRawSelectQuery(query, 'public', t);
            await t.commit();
            if(data?.length>0){
                return data[0];
            } else {
            return {};
            }
        } catch (err) {
            await t.rollback();
            throw err;
        }


    },

    saveAcademy: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            reqObj.created_at = '2023-11-11 23:01:31';
            reqObj.updated_at = '2023-11-11 23:01:31';
            reqObj.created_by = 1,
            reqObj.updated_by = 1
            let data;
            const { id, schemaName } = commonService.parseJwt(req.headers.authorization);
            if (reqObj.id) {
                data = await genericService.updateRecordRaw('academy_building', reqObj, { id: reqObj.id }, schemaName, t);
            } else {
                data = await genericService.createRecordRaw('academy_building', reqObj, schemaName, t);

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
            const { id, schemaName } = commonService.parseJwt(req.headers.authorization);
            const selColmns = `id, short_description, long_description, logo, name`
            const query = `SELECT ${selColmns} FROM academy_building where id=${id}`;
            const data = await genericService.executeRawSelectQuery(query, schemaName, t);
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }

    },

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