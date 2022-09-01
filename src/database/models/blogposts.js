module.exports = (sequelize, DataTypes) => {
    const BlogPosts = sequelize.define("BlogPosts", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    });
  
    return BlogPosts;
  };