'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Withdrawal = sequelize.define('Withdrawal', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        method : {
            type: DataTypes.ENUM('btc', 'usdt'),
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
        trxnId: {
            type: DataTypes.STRING,
            allowNull:false
        },
        walletAdd: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { timestamps: true });

    return Withdrawal;
}

