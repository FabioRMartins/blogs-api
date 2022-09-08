const {
  BlogPost,
  Category,
  PostCategory,
  User,
  sequelize,
} = require('../database/models');
const CustomError = require('../errors/CustomError');

const consultCategories = async (id) => {
  const existingPost = await Category.findByPk(id);
  if (!existingPost) throw new CustomError(400, '"categoryIds" not found');
};

const createPost = async ({ title, content, categoryIds, userId }) => {
  await Promise.all(categoryIds.map((id) => consultCategories(id)));
  const transaction = await sequelize.transaction(async (action) => {
    const newPost = await BlogPost.create({
      title,
      content,
      categoryIds,
      userId,
    });
    const postCategories = categoryIds.map((id) => ({
      postId: newPost.id,
      categoryId: id,
    }));
    await PostCategory.bulkCreate(postCategories, { action });
    return newPost;
  });
  return transaction;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

const getPostById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });
  return result;
};

module.exports = { createPost, consultCategories, getAllPosts, getPostById };
