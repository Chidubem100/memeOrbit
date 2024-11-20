'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Withdrawal = sequelize.define('Withdrawal', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        method : {
            type: DataTypes.ENUM,
            values: ["btc", "usdt"],
            defaultValue: 'usdt',
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: ["pending", "approved"],
            defaultValue: 'pending',
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        euEquAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        trxnId: {
            type: DataTypes.STRING,
            allowNull:false
        },
        walletAdd: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {tableName: 'withdrawal', timestamps: true });

    Withdrawal.associate = (models) =>{
        Withdrawal.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    }

    return Withdrawal;
}

