module.exports = (sequelize, DataTypes) => {
    const PostCategories = sequelize.define("PostCategories", {
      postId: {
        type: DataTypes.INTEGER 
      },
      categoryId: {
        type: DataTypes.INTEGER
      },
      }, { timeStamps: false},
    );
  
    PostCategories.associate = (models) => {
      models.BlogPost.belongsToMany(models.BlogPost,
        {
          as: "post",
          through: PostCategories,
          foreignKey: "categoryId",
          otherKey: "postId",
        });
      models.Category.belongsToMany(models.Category, {
        as: "Category",
        through: PostCategories,
        foreignKey: "postId",
        otherKey: "categoryId",
      });
    };
  
    return PostCategories;
  };