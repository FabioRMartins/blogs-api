const joi = require('joi');

const userSchema = joi.object({
  name: joi.string().required(),
});

const validation = (req, res, next) => {
    const result = userSchema.validate(req.body);
  
    if (result.error) {
      const [{ message }] = result.error.details;
      return res.status(400).json({ message });
    }
  
    next();
  };

const categoriesValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: '"name" is required' });
  }  
  next();
};

module.exports = [validation, categoriesValidation];