'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Deposit = sequelize.define('Deposit', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
            allowNull:false
        },
        method : {
            type: DataTypes.ENUM,
            values: ["btc","eth","usdt"],
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
        }
    }, { tableName: 'deposit',timestamps: true });

    Deposit.associate = (models) =>{
        Deposit.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    }

    return Deposit;
}
z
