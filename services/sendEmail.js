// const nodemailer = require('nodemailer');
// const genericService = require('./sequelizeGenericService');
// const Notifications = require('../sequalizeModels/notifications'); // Import Notifications model
// const logger = require('../logger');

// async function sendEmail(req, emailData, t) {
//   return new Promise(async (resolve, reject) => {
//     // Create a transporter using Gmail SMTP
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: 'trytechitsolutions@gmail.com',
//         pass: 'qnaq qnpv vnlu irvc',
//       },
//     });

//     // Define email content
//     const mailOptions = {
//       from: 'Admin',
//       to: emailData.toEmail,
//       subject: emailData.subject,
//       html: emailData.template,
//     };
  
//     // Send the email
//     let notificationStatus = '';

//     try {
//       const info = await transporter.sendMail(mailOptions);
//       notificationStatus = 'success';

//       const obj = {
//         userId: emailData.userId,
//         type: 'email',
//         status: notificationStatus,
//         payload: emailData.template,
//         subject: emailData.subject,
//         to: emailData.toEmail
//       };

//       // Create a document in Notifications collection
//       const result = await genericService.createRecord(req, Notifications, obj, t);
//       resolve(result);
//     } catch (error) {
//       notificationStatus = 'failed';
//       logger.error('SendEmail::Error sending email:', error);
//       reject(error);
//     }
//   });
// }

// module.exports = sendEmail;
