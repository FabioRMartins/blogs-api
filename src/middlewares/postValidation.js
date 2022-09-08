const joi = require('joi');

const postSchema = joi.object().keys({
  title: joi.string().min(1).required().messages({
    'string.empty': '400|Some required fields are missing',
  }),
  content: joi.string().min(1).required().messages({
    'string.empty': '400|Some required fields are missing',
  }),
  categoryIds: joi.array().min(1).required().messages({
    'array.min': '400|Some required fields are missing',
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

module.exports = { postValidation };
