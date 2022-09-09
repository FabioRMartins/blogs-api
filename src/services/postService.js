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

const updatePost = async ({ title, content, userId, id }) => {
  const post = await BlogPost.findByPk(id);
  if (post.userId !== userId) {
    return null;
  }
  await BlogPost.update({ title, content }, { where: { id } });
  const updatedPost = await BlogPost.findByPk(id,
     { include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category,
        as: 'categories',
      },
    ],
  });
  return updatedPost;
};

const removePost = async (id) => {
  const post = await getPostById(id);
  if (!post) return false;
  await BlogPost.destroy({ where: { id } });
  return true;
};

module.exports = {
  createPost,
  consultCategories,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
};
