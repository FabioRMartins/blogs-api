const joi = require('joi');

const MISSING_MESSAGE = '400|Some required fields are missing';

const postSchema = joi.object().keys({
  title: joi.string().min(1).required().messages({
    'string.empty': MISSING_MESSAGE,
  }),
  content: joi.string().min(1).required().messages({
    'string.empty': MISSING_MESSAGE,
  }),
  categoryIds: joi.array().min(1).required().messages({
    'array.min': MISSING_MESSAGE,
  }),
});

const validation = (post) => {
  const result = postSchema.validate(post);
  return result;
};

const postValidation = (req, res, next) => {
  const post = req.body;
  const { error } = validation(post);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  next();
};

const postUpdateSchema = joi.object().keys({
  title: joi.string().min(1).required().messages({
    'string.empty': MISSING_MESSAGE,
  }),
  content: joi.string().min(1).required().messages({
    'string.empty': MISSING_MESSAGE,
  }),
});

const updateValidation = (req, res, next) => {
  const { title, content } = req.body;
  const post = { title, content };
  const { error } = postUpdateSchema.validate(post);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  next();
};

module.exports = { postValidation, updateValidation };
