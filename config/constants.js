module.exports = {

  awsS3AccessKeyId: 'AKIA6G3S35LIMH3X3IED',
  awsS3SecretAccessKey: "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",
  port: 1000,
  host: '127.0.0.1:',
  dbPort: '27017/',
  defaultDb: 'institute',
  preUrl: 'mongodb://',
  // url: `mongodb://127.0.0.1:27017/trytechitsolutions1_62eda21b-be4d-4473-8219-582094bcdf8a`,
  // const url = 'mongodb+srv://trytechitsolutions:8kY9O3URI3WByAPP@cluster0.gmp2pwh.mongodb.net/sample_training';
  // pwdSecret:'mysecret',
  expTime: '10d',
  jwtSecretKey: 'institute_sec_key',
  exceptionalUrls: ['/api/auth/signin', '/api/auth/register', '/api/health/check',
    // '/api/components', // for product admin 
    '/api/auth/forgot/password',
    '/api/auth/update/password',
    '/api/adminusers'
  ],
  loginUrl: 'http://academypulse.com',
  email: {
    InstituteCreatedSubject: 'Welcome to Academy Pulse!',
    forgotPasswordSubject: 'OTP to Reset your password',
    orderSubject:'Your Order Details'
  },
  registerEmailTemplatePath: 'templates/registration.html',
  forgotPasswordTemplatePath: 'templates/forgotPassword.html',
  contactEmail: 'trytechitsolutions@gmail.com',
  defaultComponentsForAdminLogin: [{
    "title": "Components",
    "path": "components",
  },
  {
    "title": "Institutes",
    "path": "institues",
  }]
}