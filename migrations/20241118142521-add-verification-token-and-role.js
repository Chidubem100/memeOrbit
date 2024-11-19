'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("User", "verificationToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("User", "isVerified", {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn("User", "verificationDate", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("User", "passwordResetToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("User", "passwordResetExpires", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("User", "role", {
      type: Sequelize.ENUM,
      values: ["user", "admin"],
      defaultValue: "user",
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "profilePicture");
    await queryInterface.removeColumn("Users", "bio");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

