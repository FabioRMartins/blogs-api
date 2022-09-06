const categoriesService = require('../services/categoriesService');

const createCategories = async (req, res) => {
  const { name } = req.body;

  const result = await categoriesService.createCategories(name);
if (!result) {
  return res.status(400).json({ message: '"name" is required' });
}
  return res.status(201).json(result);
};

module.exports = { createCategories };
