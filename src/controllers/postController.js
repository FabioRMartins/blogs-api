const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const result = await postService.createPost({ userId: req.userId, title, content, categoryIds });
  return res.status(201).json(result);
};

module.exports = { createPost };