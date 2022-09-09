const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const result = await postService.createPost({
    userId: req.userId,
    title,
    content,
    categoryIds,
  });
  return res.status(201).json(result);
};

const getAllPosts = async (_req, res) => {
  const result = await postService.getAllPosts();
  return res.status(200).json(result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getPostById(id);
  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(result);
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req;
  const { id } = req.params;
  const result = await postService.updatePost({ title, content, userId, id });
  if (!result) {
   return res.status(401).json({ message: 'Unauthorized user' });
  }
  return res.status(200).json(result);
};

const removePost = async (req, res) => {
  const { id } = req.params;
  const result = await postService.removePost(id);
  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
    return res.status(204).end();
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, removePost };
