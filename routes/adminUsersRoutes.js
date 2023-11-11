const express = require('express');
const router = express.Router();
const adminUsersController = require('../controllers/adminUsersController');
const validators = require('../services/validators');
const validateHandlers = require('../services/validationHandler');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/sendResponse');
const createFileUploadMiddleware = require('../services/fileUploadService');
const { profileSchema } = require('../services/joiValidator');

const upload = createFileUploadMiddleware('bookbo');

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
router.post('/', upload.fields([
    { name: 'logo', maxCount: 1 }]), async function (req, res, next) {
        try {
            const dataToValidate = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                middleName: req.body.middleName,
                email: req.body.email,
                brandName: req.body.brandName,
                mobilePhone: req.body.mobilePhone,
                role: req.body.role
            };
            const { error, value } = profileSchema.validate(dataToValidate);
            if (error) {
                sendErrorResponse(res, 400, error.details[0].message, 'Adminroutes:: save User profile');
            } else {
                if (req.files) {
                    const { logo } = req.files;
                    if (logo) {
                        req.body.logo = logo[0].location;
                    }
                }
            }
            const response = await adminUsersController.saveOrUpdateProfile(req, res);
            sendSuccessResponse(res, 'Success', response);
            
        } catch (err) {
            sendErrorResponse(res, 500, 'AdminUserRoutes::', err);
        }
    });
router.put('/:id', validators.Users, validateHandlers.validatePayload, async function (req, res, next) {
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