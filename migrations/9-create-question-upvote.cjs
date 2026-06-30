'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QuestionUpvotes', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      questionId: { type: Sequelize.UUID, allowNull: false, references: { model: 'questions', key: 'id' }, onDelete: 'CASCADE' },
      ip: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    await queryInterface.addIndex('QuestionUpvotes', ['questionId', 'ip'], { unique: true });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('QuestionUpvotes');
  }
};
