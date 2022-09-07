const joi = require('joi');

const userSchema = joi.object().keys({
  displayName: joi.string().min(8).required().messages({
    'string.min': '400|"displayName" length must be at least {#limit} characters long',
  }),
  email: joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': '400|"email" must be a valid email',
  }),
  password: joi.string().min(6).required().messages({
    'string.min': '400|"password" length must be at least {#limit} characters long',
  }),
  image: joi.string(),
});

const validation = (user) => {
  const result = userSchema.validate(user);
  return result;
};

const userValidation = (req, res, next) => {
  const user = req.body;
  const { error } = validation(user);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  next();
};

module.exports = { userValidation };