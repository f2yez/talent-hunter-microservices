const { check, validationResult } = require("express-validator");

const RegisterValidation = async (req, res, next) => {
  await check("email").notEmpty().isEmail().run(req);
  await check("password").notEmpty().run(req);
  await check("fullName").notEmpty().run(req);
  await check("userName").notEmpty().run(req);
  await check("type").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  next();
};

const LoginValidation = async (req, res, next) => {
  await check("email").notEmpty().isEmail().run(req);
  await check("password").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  next();
};

module.exports = {
  RegisterValidation,
  LoginValidation,
};
