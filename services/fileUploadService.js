// fileUploadService.js
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const spacesEndpoint = new AWS.Endpoint('blr1.digitaloceanspaces.com'); // Replace with your Space's region endpoint
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: 'DO00B2PA7P6LHT42LJR6',
    secretAccessKey: '70ZAfs14M5sfg15C4CEz7d9IfAaN7gNAwpUp43qJKL8',
});

// Export a function that takes the bucket name as a parameter
const createFileUploadMiddleware = (bucketName) => {
    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: bucketName, // Use the provided bucket name
            acl: 'public-read',
            key: function (req, file, cb) {
                cb(null, Date.now() + '__' + file.originalname);
            },
            metadata: function (req, file, cb) {
                cb(null, { 'ContentType': file.mimetype, 'ContentDisposition': 'inline' });
            },
        }),
    });

    return upload;
};

module.exports = createFileUploadMiddleware;
