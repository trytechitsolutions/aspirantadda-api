
const genericService = require('../services/sequelizeGenericService');
const { sequelize } = require('../config/sequelize');
const commonService = require('../services/common');
const bcrypt = require("bcryptjs");

module.exports = {
    saveOrUpdateAdminUser: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            let data;
            if (req.body.id) {
                data = await genericService.updateRecordRaw('users', reqObj, { id: reqObj.id }, 'public', t)
            } else {
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
    saveOrUpdateComponents: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            let data;
            if (req.body.id) {
                data = await genericService.updateRecordRaw('components', reqObj, { id: reqObj.id }, 'public', t)
            } else {
                delete reqObj.id;
                data = await genericService.createRecordRaw('components', reqObj, 'public', t);
            }
            await t.commit();
            return data;

        } catch (err) {
            await t.rollback();
            throw err;
        }

    },
    saveOrUpdateRoles: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            let data;
            const { id, schemaName } = commonService.parseJwt(req.headers.authorization);
            if (req.body.id) {
                data = await genericService.updateRecordRaw('roles', reqObj, { id: reqObj.id }, schemaName, t)
            } else {
                delete reqObj.id;
                data = await genericService.createRecordRaw('roles', reqObj, schemaName, t);
            }
            await t.commit();
            return data;

        } catch (err) {
            await t.rollback();
            throw err;
        }

    },
    saveOrUpdateRoleMapping: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            let data;
            const { id, schemaName } = commonService.parseJwt(req.headers.authorization);
            if (reqObj.length > 0) {
                delete reqObj.id;
                const deleteQuery = `DELETE FROM ${schemaName}.role_component_mapping WHERE role_id=${reqObj[0].role_id}`;
                await genericService.executeRawDeleteQuery(deleteQuery, t);
                data = await genericService.createManyRaw('role_component_mapping', reqObj, schemaName, t);
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
            const query = `SELECT ${selColmns} FROM public.users where id=${id}`;
            const data = await genericService.executeRawSelectQuery(query, t);
            await t.commit();
            if (data?.length > 0) {
                return data[0];
            } else {
                return {};
            }
        } catch (err) {
            await t.rollback();
            throw err;
        }


    },
    getRoles: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { schemaName } = commonService.parseJwt(req.headers.authorization);
            const selColmns = `id, name,  CASE
            WHEN is_active THEN 'Active' ELSE 'Not Active' END AS is_active`
            const query = `SELECT ${selColmns} FROM ${schemaName}.roles`;
            const data = await genericService.executeRawSelectQuery(query, t);
            await t.commit();
            if (data?.length > 0) {
                return data;
            } else {
                return [];
            }
        } catch (err) {
            await t.rollback();
            throw err;
        }


    },
    getRoleAccess: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const {schemaName, role} = commonService.parseJwt(req.headers.authorization);
            const query = `select rcm.role_id, rcm.component_id, rcm."read", rcm."write", rcm.edit, rcm."delete", 
            c."path", c.title from ${schemaName}.role_component_mapping rcm
            left join components c on c.id = rcm.component_id where role_id = ${role} and c.is_active=true;`
            const data = await genericService.executeRawSelectQuery(query, t);
            await t.commit();
            if (data?.length > 0) {
                return data;
            } else {
                return [];
            }
        } catch (err) {
            await t.rollback();
            throw err;
        }


    },
    getMappedRoles: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            let query;
            const { schemaName } = commonService.parseJwt(req.headers.authorization);
            if (req.query.role_id) {
                query = `SELECT * FROM ${schemaName}.role_component_mapping WHERE role_id=${req.query.role_id}`
            } else {
                query = `SELECT
            rcm.role_id as id,
            roles.name,
            STRING_AGG(components.title, ', ') AS component_names,
            ARRAY_TO_STRING(ARRAY_AGG(components.id), ', ') AS component_ids
          FROM
            ${schemaName}.role_component_mapping rcm
          JOIN
            ${schemaName}.roles roles ON rcm.role_id = roles.id
          JOIN
            public.components components ON rcm.component_id = components.id
          GROUP BY
            rcm.role_id, roles.name;`;
            }
            const data = await genericService.executeRawSelectQuery(query, t);
            await t.commit();
            if (data?.length > 0) {
                return data;
            } else {
                return [];
            }
        } catch (err) {
            await t.rollback();
            throw err;
        }


    },
    getComponents: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = commonService.parseJwt(req.headers.authorization);
            const selColmns = `id, path, title,  CASE
            WHEN is_active THEN 'Active' ELSE 'Not Active' END AS is_active`
            const query = `SELECT ${selColmns} FROM public.components`;
            const data = await genericService.executeRawSelectQuery(query, t);
            await t.commit();
            if (data?.length > 0) {
                return data;
            } else {
                return [];
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
            let data;
            const { id, schemaName } = commonService.parseJwt(req.headers.authorization);
            reqObj.created_by = id;
            reqObj.updated_by = id;
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
            const query = `SELECT ${selColmns} FROM ${schemaName}.academy_building`;
            const data = await genericService.executeRawSelectQuery(query, t);
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