const Joi = require('joi');
const { User } = require('../database/models');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const validation = (req, res, next) => {
  const result = schema.validate(req.body);

  if (result.error) {
    const [{ message }] = result.error.details;
    return res.status(400).json({ message });
  }

  next();
};

const userValidation = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await User.findOne({ where: { email } });

    if (result) {
    throw new Error('User already registered');
    }
    next();
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

module.exports = [
  validation,
  userValidation,
];