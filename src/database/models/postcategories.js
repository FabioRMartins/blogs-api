module.exports = (sequelize, DataTypes) => {
    const PostCategories = sequelize.define("PostCategories", {
      postId: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    });
  
    PostCategories.associate = (models) => {
      models.BlogPosts.belongsToMany(models.BlogPosts,
        {
          as: "post",
          through: PostCategories,
          foreignKey: "categoryId",
          otherKey: "postId",
        });
      models.Categories.belongsToMany(models.Categories, {
        as: "categories",
        through: PostCategories,
        foreignKey: "postId",
        otherKey: "categoryId",
      }, { timestamps: false });
    };
  
    return PostCategories;
  };