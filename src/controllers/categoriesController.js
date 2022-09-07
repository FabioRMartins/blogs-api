const categoriesService = require('../services/categoriesService');

const createCategories = async (req, res) => {
  const { name } = req.body;
  const result = await categoriesService.createCategories(name);
  return res.status(201).json(result);
};

const getAllCategories = async (_req, res) => {
  const result = await categoriesService.getAllCategories();
  return res.status(200).json(result);
};

module.exports = { createCategories, getAllCategories };