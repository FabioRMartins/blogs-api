const joi = require('joi');
const { BlogPost } = require('../database/models');

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

const removeValidation = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPost.findByPk(id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  next();
};

module.exports = { postValidation, updateValidation, removeValidation };
