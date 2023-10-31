
const { body, param } = require('express-validator');
module.exports = {
  login: [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  academy: [
    body('name').isString().isLength({min:3}).withMessage('Name required with Minimum 3 characters'),
    body('shortDescription').isString().isLength({min:3}).withMessage('shortDescription is required'),
    body('longDescription').isString().isLength({min:3}).withMessage('longDescription is required')
  ],
  addCategory:[
    body('title').isString().isLength({ min: 3 }).withMessage('Title is required with min 3 characters'), 
  ],
  addPublisher: [
    body('name').isString().isLength({ min: 3 }).withMessage('Name is required with min 3 characters'),
    body('address').isString().isLength({ min: 10 }).withMessage('address is required with min 10 characters'),
    body('contact').isString().isLength({ min: 10 }).withMessage('contact is required with min 10 characters'),
    body('email').isEmail().withMessage('Invalid email'),
  ],
  forgotPassword: [
    body('email').isEmail().withMessage('Invalid email'),
    body('type').isString().isLength({ min: 4 }).withMessage('Login as type is required with min 4 characters'),
  ],
  updatePassword: [
    body('email').isEmail().withMessage('Invalid email'),
    body('type').isString().isLength({ min: 4 }).withMessage('Login as type is required with min 4 characters'),  
    body('otp').isString().isLength({ equal: 6 }).withMessage('OTP is required with 6 characters'),
    body('password').isString().isLength({ min: 8 }).withMessage('password is required with min 8 characters'),
  ],
  resetPassword: [
    body('email').isEmail().withMessage('Invalid email'),
    body('type').isString().isLength({ min: 4 }).withMessage('Login as type is required with min 4 characters'),  
    body('newPassword').isString().isLength({ equal: 6 }).withMessage('OTP is required with 6 characters'),
    body('password').isString().isLength({ min: 8 }).withMessage('password is required with min 8 characters'),
  ],
  Users: [
    body('firstName').isString().isLength({ min: 4 }).withMessage('first name required with min 4 characters'),
    body('lastName').isString().isLength({ min: 4 }).withMessage('last name required with min 4 characters'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('mobilePhone').isMobilePhone().withMessage('invalid mobile number'),
    // body('role').isString().isLength({ min: 1 }).withMessage('user role required with min 4 characters'),
    body('password').isStrongPassword().withMessage('Please provide valid password'),
  ],
  comments: [
    body('rating').isString().isLength({ min: 1 }).withMessage('rating is required'),
    body('comment').isString().isLength({ min: 3 }).withMessage('comment required with min 3 characters'),
    body('userId').isString().isLength({ min: 1 }).withMessage('userId required'),
    body('productId').isString().isLength({ min: 1 }).withMessage('productId required'),
  ],
  cart: [
    body('price').isString().isLength({ min: 1 }).withMessage('price is required'),
    body('productId').isNumeric().withMessage('productId is required with min 1 characters'),
    body('userId').isNumeric().withMessage('userId required'),
    body('count').isNumeric().isLength({ min: 1 }).withMessage('count is required'),
  ],
  addBook: [
    body('title').isString().isLength({ min: 4 }).withMessage('title is required'),
    body('publisher').isString().isLength({ min: 4 }).withMessage('publisher name required with min 4 characters'),
    body('author').isString().isLength({ min: 4 }).withMessage('author name required with min 4 characters'),
    body('mrpPrice').isString().isLength({ min: 2 }).withMessage('mrp price is required'),
    body('offerPrice').isString().isLength({ min:2 }).withMessage('offer Price required'),
    body('medium').isString().isLength({ min: 5 }).withMessage('medium is required with min 5 characters'),
    body('category').isString().isLength({ min: 2 }).withMessage('category required with minimum 4 characters'),
    body('edition').isString().isLength({ min: 1 }).withMessage('edition required with minimum 4 characters'),
   ],
  preferences: [
    body('title').isString().isLength({ min: 4 }).withMessage('Institute title required with min 4 characters'),
    body('headerColor').isString().optional(),
    body('bgColor').isString().optional(),
    body('footerColor').isString().optional()
  ],
  components: [
    body('title').isString().isLength({ min: 4 }).withMessage('title required with min 4 characters'), 
    body('path').isString().isLength({ min: 4 }).withMessage('path required with min 4 characters')
  
  ],
  qualifications: [
    body('title').isString().isLength({ min: 4 }).withMessage('title required with min 4 characters')
  ],
  roles: [
    body('title').isString().isLength({ min: 4 }).withMessage('title required with min 4 characters'),
    body('payload').isObject().withMessage('Components should be mapped to each role')
  ]

}