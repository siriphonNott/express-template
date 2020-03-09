const { check } = require('express-validator')

module.exports = {
  get: [
    check('username')
      .notEmpty().withMessage('is empty')
      .isEmail().withMessage('must be email'),

    check('password')
      .notEmpty().withMessage('is empty')
 ]
}