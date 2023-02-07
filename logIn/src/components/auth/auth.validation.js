const { body, validationResult, param } = require('express-validator')
const httpStatus = require('http-status')


const authUserValidation = () => {
  return [
    body('email')
      .exists().withMessage('email is required')
      .isEmail().withMessage('email must be a valid email'),
    body('password')
      .exists().withMessage('Password is required'),
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
  authUserValidation,
  validate,
}