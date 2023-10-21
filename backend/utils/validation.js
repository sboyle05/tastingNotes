const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  // console.log("*****************",validationErrors.array());
  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    if (errors.undefined) {
      console.error("Undefined key found in validation errors:", validationErrors.array());
    }

    return res.status(400).json(errors);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
