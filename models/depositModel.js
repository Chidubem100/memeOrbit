'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Deposit = sequelize.define('Deposit', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        method : {
            type: DataTypes.ENUM('btc','usdt', 'eth'),
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
        }
    }, { timestamps: true });

    return Deposit;
}

