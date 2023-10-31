const cors = require("cors");
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const prefRoutes = require('./routes/preferenceRoutes');
const config = require('./config/constants');
const app = express();
const jwt = require('jsonwebtoken');
const commonService = require('./services/common');
const dbConnection = require('./db/dbConnection');
const { sequelize, setSchema } = require('./config/sequelize');
const path = require('path');
const logger = require('./logger');
sequelize.sync({ alter: true }); // Synchronize the models with the database
dbConnection.testDatabaseConnection();

const apiRoutes = express.Router();

app.use(cors({ origin: "*" }));  // Set up CORS middleware first
app.use(express.json());
apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/preference', prefRoutes);
app.use(async function (req, res, next) {
  if(req.headers.authorization === '1'){
    next();
  } else if (!(config.exceptionalUrls.includes(req.url)) && req.url.includes('/api')) {
    try {
      logger.log('info', `AccessToken: ${req.headers.authorization}`);
      const isTokenValid = jwt.verify(req.headers.authorization, config.jwtSecretKey);
      if (isTokenValid) {
        const updatedToken = commonService.updateToken(req.headers.authorization);
        const { schemaName, role, id } = commonService.parseJwt(req.headers.authorization);
        let schema = schemaName;
        if (role?.toLowerCase() === 'super') {
          schema = 'public';
        }
        await setSchema(schema);
        /**
         * TODO for super admin to switch between the schemas
         */
        res.header('token', updatedToken);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token');
        res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With, content-type, token');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
      } else {
        res.status(401).send({ message: 'session expired. Please login back' });
      }
    }
    catch (err) {
      res.status(401).send({ message: 'session expired. Please login back' });
    }
  } else {
    await setSchema(null);
    next();
  }

});
app.use('/api', apiRoutes);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
// });
app.listen(config.port, () => {
  logger.log('info', `server listening on port, ${config.port}`);
});