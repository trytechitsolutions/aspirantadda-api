const jwt = require('jsonwebtoken');
const config = require('../config/constants');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
// const Orders = require('../sequalizeModels/orders')
module.exports = {
    parseJwt: (token) => {
        const isVerified = jwt.verify(token, config.jwtSecretKey);
        if (isVerified) {
            return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        } else {
            return null;
        }
    },
    generateToken(data) {
        const token = jwt.sign({
            id: data.id,
            dbName: data.dbName,
            schemaName: data.schema_name,
            role: data.role
        },
            config.jwtSecretKey,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: config.expTime, // 24 hours
                // expiresIn: '1hr' //30 seconds
            });

        return token;
    },
    updateToken(oldToken) {
        const decodedToken = JSON.parse(Buffer.from(oldToken.split('.')[1], 'base64').toString());
        let data = {
            time: Date(),
            userId: decodedToken?.userId,
            userRoleId: decodedToken?.userRoleId,
            userRoleName: decodedToken?.userRoleName,
            userName: decodedToken?.userRoleName,
            userRoles: decodedToken?.userRoles,
            menuList: decodedToken?.menuList
        };
        const exp = {
            expiresIn: config.expTime // expires in 15 hours
        }

        const token = jwt.sign(data, config.jwtSecretKey, exp);

        return token;
    },
    async getHtmlTemplate(filePath, reqObj) {
        try {
            let htmlTemplate = await readFileAsync(filePath, 'utf8');
            const templateData = {
                name: `(` + reqObj.instituteName + `)`,
                institute: reqObj.instituteName,
                loginUrl: config.loginUrl
            };

            htmlTemplate = htmlTemplate.replace('{{name}}', templateData.name);
            htmlTemplate = htmlTemplate.replace('{{institute}}', templateData.institute);
            htmlTemplate = htmlTemplate.replace('{{loginUrl}}', templateData.loginUrl);
            htmlTemplate = htmlTemplate.replace('{{contactEmail}}', config.contactEmail);

            return htmlTemplate;
        } catch (err) {
            console.error('Error reading file:', err);
            throw err;
        }
    },
    async getforgotPasswordTemplate(filePath, reqObj) {
        try {
            let htmlTemplate = await readFileAsync(filePath, 'utf8');

            htmlTemplate = htmlTemplate.replace('{{otp}}', reqObj.otp);
            htmlTemplate = htmlTemplate.replace('{{user}}', reqObj.proposerFirstName?.charAt(0).toUpperCase() + reqObj?.proposerFirstName.slice(1).toLowerCase());

            return htmlTemplate;
        } catch (err) {
            console.error('Error reading file:', err);
            throw err;
        }
    },
    generateRandomPin() {
        // Generate a random number between 100000 and 999999
        const pin = Math.floor(Math.random() * 900000) + 100000;
        return pin.toString(); // Convert to string to ensure it's 6 digits
      },
    //   async generateOrderNumber() {
    //     const today = new Date();
    //     const year = today.getFullYear().toString().slice(2);
    //     const month = String(today.getMonth() + 1).padStart(2, '0');
    //     const day = String(today.getDate()).padStart(2, '0');
    
    //     // Find the maximum existing order number
    //     const maxOrderNumber = await Orders.max('orderNumber');
    //     if (maxOrderNumber) {
    //       // Increment the maximum order number
    //       const lastOrderNumber = parseInt(maxOrderNumber.split('-')[1], 10) + 1;
    //       return `${year}${month}${day}-${lastOrderNumber.toString().padStart(4, '0')}`;
    //     } else {
    //       // If there are no existing orders, start with '0001'
    //       return `${year}${month}${day}-0001`;
    //     }
    //   },
      getCurrentFormattedDate() {
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
      
        const today = new Date();
        const month = months[today.getMonth()];
        const day = today.getDate();
        const year = today.getFullYear();
      
        const formattedDate = `${month} ${day}, ${year}`;
      
        return formattedDate;
      }      
}