const express = require('express');
const router = express.Router();
const kycController = require('../controllers/kycController');

const { sendSuccessResponse, sendErrorResponse } = require('../utils/sendResponse');
const createFileUploadMiddleware = require('../services/fileUploadService');
const common = require('../services/common');
const { kycSchema } = require('../services/joiValidator');

const upload = createFileUploadMiddleware('bookbo');

router.post('/', upload.fields([
    { name: 'id_proof', maxCount: 1 }]), async function (req, res, next) {
        try {
            const { id } = common.parseJwt(req.headers.authorization);
            const dataToValidate = {
                user_id: id,
                gst_number: req.body.gst_number,
                bank_account_number: req.body.bank_account_number,
                bank_account_name: req.body.bank_account_name,
                bank_branch: req.body.bank_branch,
                bank_ifsc_code: req.body.bank_ifsc_code,
            };

            const { error, value } = kycSchema.validate(dataToValidate);
            if (error) {
                sendErrorResponse(res, 400, error.details[0].message, 'Preferences Routes:: save academy');
            } else {
                req.body.user_id = id;
                if (req.files) {
                    const { id_proof } = req.files;
                    if (id_proof) {
                        req.body.id_proof = id_proof[0].location;
                    }
                }
                const response = await kycController.saveOrUpdateKyc(req, res);
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
router.get('/', async function (req, res, next) {
    try {
        const response = await kycController.getKycDetails(req, res);
        sendSuccessResponse(res, 'Success', response);
    } catch (err) {
        sendErrorResponse(res, 500, 'AuthRoutes::/signout::', err);
    }
});
module.exports = router;