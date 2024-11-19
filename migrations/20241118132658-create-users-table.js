'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      walletBalance: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      totalDeposit: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      totalWithdrawal: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      totalInvestment: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      referralLink: {
        type: Sequelize.STRING,
      },
      // Add other fields as required
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
    /**
     * Add reverting commands here.
     *
     * Example:
    await queryInterface.dropTable('users');
     */
  }
};

