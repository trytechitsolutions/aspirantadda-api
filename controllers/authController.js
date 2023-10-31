const { sequelize } = require('../config/sequelize');
const authService = require('../services/authService');

module.exports = {
    signIn: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            return await authService.login(req, t);
        } catch (error) {
            await t.rollback();
            return res.status(500).send({ message: error.message });
        }
    },
    register: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            return await authService.register(req, t);
        } catch (error) {
            await t.rollback();
            return res.status(500).send({ message: error.message });
        }
    },
    resetPassword: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            return await authService.resetPassword(req, t);
        } catch (error) {
            await t.rollback();
            return res.status(500).send({ message: error.message });
        }
    },
    forgotPassword: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            return await authService.forgotPassword(req, t);
        } catch (error) {
            await t.rollback();
            return res.status(500).send({ message: error.message });
        }
    },
    updatePassword: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            return await authService.updatePassword(req, t);
        } catch (error) {
            await t.rollback();
            return res.status(500).send({ message: error.message });
        }
    }
}