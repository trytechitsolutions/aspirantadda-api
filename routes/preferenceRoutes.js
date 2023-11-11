const express = require('express');
const router = express.Router();
// const guestInstituteController = require('../controllers/guestInstituteController');
const preferenceController = require('../controllers/preferenceController');
const validators = require('../services/validators');
const validateHandlers = require('../services/validationHandler');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/sendResponse');
const createFileUploadMiddleware = require('../services/fileUploadService');
const { academySchema, profileSchema } = require('../services/joiValidator');

const upload = createFileUploadMiddleware('bookbo');

router.get('/user', async function (req, res, next) {
    try {
        const response = await preferenceController.getUserById(req, res);
        if (response?.message) {
            sendErrorResponse(res, 400, 'AuthRoutes::/register::', response.message);
        } else {
            sendSuccessResponse(res, 'Success', response);
        }
    } catch (err) {
        sendErrorResponse(res, 500, 'AuthRoutes::/register::', err);
    }
});
router.post('/user', upload.fields([
    { name: 'logo', maxCount: 1 }]), async function (req, res, next) {
        try {
            const dataToValidate = {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                middleName: req.body.middle_name,
                email: req.body.email,
                brandName: req.body.brand_name,
                mobilePhone: req.body.mobile_phone,
                role: req.body.role
            };
          

            const { error, value } = profileSchema.validate(dataToValidate);
            if (error) {
                sendErrorResponse(res, 400, error.details[0].message, 'Preferences Routes:: save academy');
            } else {
                if (req.files) {
                    const { logo } = req.files;
                    if (logo) {
                        req.body.logo = logo[0].location;
                    }
                }
                const response = await preferenceController.saveOrUpdateAdminUser(req, res);
                if (response.message) {
                    sendErrorResponse(res, 400, 'AuthRoutes::/signin::', response.message);
                } else {
                    sendSuccessResponse(res, 'Success', response);
                }
            }
        } catch (err) {
            sendErrorResponse(res, 500, 'AuthRoutes::/signin::', err);
        }
    });

// validators.academy, validateHandlers.validatePayload
router.post('/academy', upload.fields([
    { name: 'logo', maxCount: 1 }]), async function (req, res, next) {
        try {
            const dataToValidate = {
                name: req.body.name,
                short_description: req.body.short_description,
                long_description: req.body.long_description
            };

            const { error, value } = academySchema.validate(dataToValidate);
            if (error) {
                sendErrorResponse(res, 400, error.details[0].message, 'Preferences Routes:: save academy');
            } else {
                if (req.files) {
                    const { logo } = req.files;
                    if (logo) {
                        req.body.logo = logo[0].location;
                    }
                }
                const response = await preferenceController.saveAcademy(req, res);
                if (response.message) {
                    sendErrorResponse(res, 400, 'AuthRoutes::/signin::', response.message);
                } else {
                    sendSuccessResponse(res, 'Success', response);
                }
            }
        } catch (err) {
            sendErrorResponse(res, 500, 'AuthRoutes::/signin::', err);
        }
    });
router.get('/academy', async function (req, res, next) {
    try {
        const response = await preferenceController.getAcademyById(req, res);
        if (response?.message) {
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
        const response = await preferenceController.resetPassword(req, res);
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
        const response = await preferenceController.forgotPassword(req, res);
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
        const response = await preferenceController.updatePassword(req, res);
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