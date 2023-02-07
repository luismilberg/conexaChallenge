const { body, validationResult, param } = require('express-validator')
const httpStatus = require('http-status')

const createUserValidation = () => {
  return [
    body('email')
      .exists().withMessage('email is required')
      .isEmail().withMessage('email must be a valid email'),
    body('password')
      .exists().withMessage('Password is required')
      .isString().withMessage('Password must be a string')
      .isLength({ min: 5 }).withMessage('Min lenght: 5 characters'),
  ]
}

const updateUserValidation = () => {
  return [
    body('email')
      .isemail().withMessage('email must be a valid email'),
    body('password')
      .isString().withMessage('Password must be a string')
      .isLength({ min: 5 }).withMessage('Min lenght: 5 characters'),
    param('userId')
      .exists().withMessage('userId is required')
      .isString().withMessage('userId must be a string'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(httpStatus.BAD_REQUEST).json({
    message: extractedErrors,
  });
}

module.exports = {
  createUserValidation,
  updateUserValidation,
  validate,
}