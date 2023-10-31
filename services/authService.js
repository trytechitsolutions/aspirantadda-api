const genericService = require('./sequelizeGenericService');
const bcrypt = require("bcryptjs");
const commonService = require('../services/common');
const logger = require("../logger");
// const Institute = require('../sequalizeModels/institute');
const Users = require('../sequalizeModels/users');
// const Components = require('../sequalizeModels/components');
const sendEmail = require('./sendEmail');
const config = require('../config/constants');
const _ = require('lodash');
const { synchronizeSchema } = require('../config/sequelize');

async function login(req, t) {
    try {
        const { email, password } = req.body;
        
        const logginData = await genericService.findOneRecord(req, Users, { email: email }, t);
        if (!logginData || (logginData?.length === 0)) {
            await t.rollback();
            return { message: "Not found." };
        }
        const passwordIsValid = bcrypt.compareSync(
            password,
            logginData.password
        );

        if (!passwordIsValid) {
            await t.rollback();
            return {
                message: "Invalid Password!",
            };

        }
        const userToken = await commonService.generateToken(logginData);
        // const defaultcomponents = config.defaultComponentsForAdminLogin;
        // let components = await genericService.readAllRecords(req, Components, {}, t);
        // components = _.get(components, 'rows')
        // components = components?.map((row) => row.get({ plain: true }));
        // if (type.toLowerCase() === 'admin') {
        //     if (components?.length) {
        //         components = components.concat(defaultcomponents)
        //     } else {
        //         components = defaultcomponents
        //     }
        // }
        await t.commit();
        return {
            id: logginData.id,
            email: logginData.email,
            token: userToken,
            // components: components
            //   roles: authorities,
        };
    } catch (err) {
        logger.error('Error occured at signin', err)
    }
}
async function register(req, t) {
    try {
        const reqObj = req.body;
        reqObj.password = bcrypt.hashSync(reqObj.password, 8);
        const schemaName = Math.floor(new Date().getTime() / 1000).toString();
        reqObj.schemaName = 's_'+schemaName;
        await genericService.createRecord(req, Users, reqObj, t);
        await synchronizeSchema('public', reqObj.schemaName);
        await t.commit();
        return true;
    } catch (err) {
        logger.error('Error occured at register', err);
        await t.rollback();
        throw err;
    }
}
async function resetPassword(req, t) {
    try {
        const { email, password, newPassword, type } = req.body;
        let model;

        if (type.toLowerCase() === 'admin') {
            model = Users;
        } else if (type.toLowerCase() === 'institute') {
            model = Institute;
        }
        const logginData = await genericService.findOneRecord(req, model, { email: email }, t);
        if (!logginData || (logginData?.length === 0)) {
            await t.rollback();
            return { message: "Not found." };
        }
        const passwordIsValid = bcrypt.compareSync(
            password,
            logginData.password
        );

        if (!passwordIsValid) {
            await t.rollback();
            return {
                message: "Invalid Password!",
            };

        }
        return await genericService.updateRecord(req, model, logginData.id, { password: bcrypt.hashSync(newPassword, 8) })
    } catch (err) {
        logger.error('Error occured at resetPassword', err)
    }
}
async function forgotPassword(req, t) {
    try {
        const { email, type } = req.body;
        let model;

        if (type.toLowerCase() === 'admin') {
            model = Users;
        } else if (type.toLowerCase() === 'institute') {
            model = Institute;
        }
        const logginData = await genericService.findOneRecord(req, model, { email: email }, t);
        if (!logginData || (logginData?.length === 0)) {
            await t.rollback();
            return { message: "Not found." };
        }
        const pin = commonService.generateRandomPin();
        const updateOtp = await genericService.updateRecord(req, model, logginData.id, { otp: pin }, t);
        logginData.otp = pin;
        const template = await commonService.getforgotPasswordTemplate(config.forgotPasswordTemplatePath, logginData);
        const response = await sendEmail(req, {
            instituteId: logginData.id,
            subject: config.email.forgotPasswordSubject,
            toEmail: logginData.email,
            template: template
        }, { transaction: t });
        if (!response) {
            await t.rollback();
            throw new Error('Email sending failed');
        } else {
            await t.commit();
            return true;
        }
    } catch (err) {
        logger.error('Error occured at forgotPassword', err)
    }
}
async function updatePassword(req, t) {
    try {
        const { email, type, password, otp } = req.body;
        let model;

        if (type.toLowerCase() === 'admin') {
            model = Users;
        } else if (type.toLowerCase() === 'institute') {
            model = Institute;
        }
        const logginData = await genericService.findOneRecord(req, model, { email: email, otp: otp }, t);
        if (!logginData || (logginData?.length === 0)) {
            await t.rollback();
            return { message: "Not found." };
        }
        const updateOtp = await genericService.updateRecord(req, model, logginData.id, { password: bcrypt.hashSync(password, 8), otp: null }, t);
        if (!updateOtp) {
            await t.rollback();
            throw new Error('password update failed');
        } else {
            await t.commit();
            return "password updated successfully";
        }
    } catch (err) {
        logger.error('Error occured at forgotPassword', err)
    }
}

module.exports = { login, resetPassword, forgotPassword, updatePassword, register };
