const { Category } = require('../database/models');
const CustomError = require('../errors/CustomError');

const createCategories = async (name) => {
  if (!name) {
    throw new CustomError(400, '"name" is required');
  }
    const result = await Category.create({ name });
  return result;
};
const getAllCategories = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = { createCategories, getAllCategories };