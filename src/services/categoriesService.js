const { Category } = require('../database/models');

const createCategories = async (name) => {
  const result = await Category.create({ name });

  if (!name) {
    return null;
  }
  return result;
};

const getAllCategories = async () => {
    const result = await Category.findAll();
    return result;
  };
  
module.exports = { createCategories, getAllCategories };
