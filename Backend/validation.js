const { check, validationResult } = require('express-validator')

exports.validateUser = [
  
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
      check('password')
      .exists()
      .withMessage('Enter password!')
      .isLength({ min: 3 }),
      
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];
