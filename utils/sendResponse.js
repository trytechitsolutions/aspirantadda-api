
// Utility function for sending success responses

const logger = require("../logger");

const sendSuccessResponse = (res, message, data) => {
    res.status(200).send({ success: true, message, data });
  };
  
  // Utility function for sending error responses
  const sendErrorResponse = (res, status, message, error) => {
    logger.error('Error:', error);
    res.status(status).send({ success: false, message, error });
  };
  
  module.exports={sendSuccessResponse,sendErrorResponse};