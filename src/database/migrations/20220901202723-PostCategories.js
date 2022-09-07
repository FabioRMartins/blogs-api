'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
        references: {
          model: 'BlogPosts',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PostCategories');
  }
};