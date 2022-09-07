
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  }, {
    timestamps: false,
    tableName: 'PostCategories'
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'BlogPosts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }

  return PostCategory;
};