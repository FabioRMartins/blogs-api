module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define("Categories", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    }, { timestamps: false });
  
    return Categories;
  };