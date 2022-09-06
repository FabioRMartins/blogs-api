module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define("PostCategory", {
      postId: {
        type: DataTypes.INTEGER 
      },
      categoryId: {
        type: DataTypes.INTEGER
      },
      }, { timeStamps: false},
    );
  
    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category,
        {
          as: "Category",
          through: PostCategory,
          foreignKey: "postId",
          otherKey: "categoryId",
        });
      models.Category.belongsToMany(models.BlogPost, {
        as: "post",
        through: PostCategory,
        foreignKey: "categoryId",
        otherKey: "postId",
      });
    };
  
    return PostCategory;
  };