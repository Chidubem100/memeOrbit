'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Withdrawal', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique:true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      method: {
        type: Sequelize.ENUM,
        values: ["btc","usdt"],
        defaultValue: "usdt",
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["pending", "approved"],
        defaultValue: "pending",
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      euEquAmount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      trxnId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      walletAdd: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Withdrawal');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
