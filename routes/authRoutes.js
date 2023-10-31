const express = require('express');
const router = express.Router();
// const guestInstituteController = require('../controllers/guestInstituteController');
const authController = require('../controllers/authController');
const validators = require('../services/validators');
const validateHandlers = require('../services/validationHandler');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/sendResponse');

router.post('/register', validators.Users, validateHandlers.validatePayload, async function (req, res, next) {
    try {
        const response = await authController.register(req, res);
        if (response.message) {
            sendErrorResponse(res, 400, 'AuthRoutes::/register::', response.message);
        } else {
            sendSuccessResponse(res, 'Success', response);
        }
    } catch (err) {
        sendErrorResponse(res, 500, 'AuthRoutes::/register::', err);
    }
});
router.post('/signin', validators.login, validateHandlers.validatePayload, async function (req, res, next) {
    try {
        const response = await authController.signIn(req, res);
        if (response.message) {
            sendErrorResponse(res, 400, 'AuthRoutes::/signin::', response.message);
        } else {
            sendSuccessResponse(res, 'Success', response);
        }
    } catch (err) {
        sendErrorResponse(res, 500, 'AuthRoutes::/signin::', err);
    }
});
router.post('/reset/password', validators.resetPassword, validateHandlers.validatePayload, async function (req, res, next) {
    try {
        const response = await authController.resetPassword(req, res);
        if (response.message) {
            sendErrorResponse(res, 400, 'AuthRoutes::/reset/password::', response.message);
        } else {
            sendSuccessResponse(res, 'Success', response);
        }
    } catch (err) {
        sendErrorResponse(res, 500, 'AuthRoutes::/reset/password::', err);
    }
});
router.post('/forgot/password', validators.forgotPassword, validateHandlers.validatePayload, async function (req, res, next) {
    try {
        const response = await authController.forgotPassword(req, res);
        if (response.message) {
            sendErrorResponse(res, 400, 'AuthRoutes::/forgot/password::', response.message);
        } else {
            sendSuccessResponse(res, 'Success', response);
        }
    } catch (err) {
        sendErrorResponse(res, 500, 'AuthRoutes::/forgot/password::', err);
    }
});
router.post('/update/password', validators.updatePassword, validateHandlers.validatePayload, async function (req, res, next) {
    try {
        const response = await authController.updatePassword(req, res);
        if (response.message) {
            sendErrorResponse(res, 400, 'AuthRoutes::/update/password::', response.message);
        } else {
            sendSuccessResponse(res, 'Success', response);
        }
    } catch (err) {
        sendErrorResponse(res, 500, 'AuthRoutes::/update/password::', err);
    }
});
router.get('/signout', async function (req, res, next) {
    try {
        const response = await guestInstituteController.getInstitutesById(req, res);
        sendSuccessResponse(res, 'Success', response);
    } catch (err) {
        sendErrorResponse(res, 500, 'AuthRoutes::/signout::', err);
    }
});
module.exports = router;