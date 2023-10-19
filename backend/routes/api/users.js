// backend/routes/api/users.js
const express = require('express')

const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


///validate signup middleware
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName') // checking for first name
      .exists({ checkFalsy: true })
      .withMessage('Please provide a first name.'),
    check('lastName') // checking for last name
      .exists({ checkFalsy: true })
      .withMessage('Please provide a last name.'),
    handleValidationErrors
  ];

// Sign up
router.post(
  '',
  validateSignup,
  async (req, res) => {
    try {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      };

      await setTokenCookie(res, safeUser);
      return res.json({
        user: safeUser
      });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
          const errorMessages = {};
          err.errors.forEach(({ message, path }) => {
              errorMessages[path] = message;
          });
          return res.status(400).json(errorMessages);
      } else if (err.name === 'ValidationError') {
          return res.status(400).json(err.errors);
      }
      return res.status(500).json({ message: 'Internal server error' });
  }
  }
);

module.exports = router;
