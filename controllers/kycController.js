
const genericService = require('../services/sequelizeGenericService');
const { sequelize} = require('../config/sequelize');
const commonService = require('../services/common');

module.exports = {
    getKycDetails: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = commonService.parseJwt(req.headers.authorization);
            const selColmns = `id, gst_number, bank_account_number, bank_account_name, bank_branch, bank_ifsc_code, id_proof`
            const query = `SELECT ${selColmns} FROM public.kyc where user_id=${id}`;
            const data = await genericService.executeRawSelectQuery(query, t);
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

    saveOrUpdateKyc: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const reqObj = req.body;
            const { id } = commonService.parseJwt(req.headers.authorization);
           reqObj.created_by = id;
            reqObj.updated_by = id;
            let data;
            if (reqObj.id) {
                data = await genericService.updateRecordRaw('kyc', reqObj, { id: reqObj.id }, 'public', t);
            } else {
                data = await genericService.createRecordRaw('kyc', reqObj, 'public', t);

            }
            await t.commit();
            return data;
        } catch (err) {
            await t.rollback();
            throw err;
        }
    },
}