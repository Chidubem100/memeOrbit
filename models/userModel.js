'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        walletBalance: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
        totalDeposit: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
        totalWithdrawal: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
        totalInvestment: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
        referralLink: {
            type: DataTypes.STRING,
        },
    }, { timestamps: true });

    return User;
};
