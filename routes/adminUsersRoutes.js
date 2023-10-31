const express = require('express');
const router = express.Router();
const adminUsersController = require('../controllers/adminUsersController');
const validators = require('../services/validators');
const validateHandlers = require('../services/validationHandler');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/sendResponse');

router.get('/', async function (req, res, next) {
    try {
        const response = await adminUsersController.getAdminUsers(req, res);
        sendSuccessResponse(res, 'Success', response);
    } catch (err) {
        sendErrorResponse(res, 500, 'AdminUserRoutes::', err);
    }
});
router.get('/:id', async function (req, res, next) {
    try {
        const response = await adminUsersController.getAdminUserById(req, res);
        sendSuccessResponse(res, 'Success', response);
    } catch (err) {
        sendErrorResponse(res, 500, 'AdminUserRoutes::', err);
    }
});
router.post('/', validators.adminUsers, validateHandlers.validatePayload, async function (req, res, next) {
    try {
        const response = await adminUsersController.saveAdminUser(req, res);
        sendSuccessResponse(res, 'Success', response);
    } catch (err) {
        sendErrorResponse(res, 500, 'AdminUserRoutes::', err);
    }
});
router.put('/:id', validators.adminUsers, validateHandlers.validatePayload, async function (req, res, next) {
    try {
        const response = await adminUsersController.updateAdminUserById(req, res);
        sendSuccessResponse(res, 'Success', response);
    } catch (err) {
       sendErrorResponse(res, 500, 'AdminUserRoutes::', err);
    }
});

// router.delete('/', async function (req, res, next) {
//     try {

//         const response = await qualificationsController.deleteInsti(req, res);
//         sendSuccessResponse(res, 'Success', response);
//     } catch (err) {
//            sendErrorResponse(res, 500, 'AdminUserRoutes::', err);
//     }
// });
router.delete('/:id', async function (req, res, next) {
    try {
        const response = await adminUsersController.deleteAdminUserById(req, res);
        sendSuccessResponse(res, 'Success', response);
    } catch (err) {
       sendErrorResponse(res, 500, 'AdminUserRoutes::', err);
    }
});
module.exports = router;