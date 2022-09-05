const joi = require('joi');
const { User } = require('../database/models');

const userSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const loginValidation = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
  if (error) {
   return res.status(400).json({ message: 'Some required fields are missing' });
  }
   next();
};

const userValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const result = await User.findOne({ where: { email } });
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long' });
  }
  if (result) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
};

module.exports = { loginValidation, userValidation };