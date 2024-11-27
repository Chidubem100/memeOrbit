'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Investment = sequelize.define('Investment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique:true
        },
        plans: {
            type: DataTypes.ENUM,
            values: ["basic plan", "moon plan", "boom plan"],
            defaultValue: 'basic plan',
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
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        investmentId: {
            type: DataTypes.STRING,
            allowNull:false
        },
        investmentDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: ["ongoing", "completed"],
            defaultValue: 'ongoing',
            allowNull: false,
        },
        returnOnInvestment: {
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: true,
        },
    }, { tableName: 'investment',timestamps: true });

    Investment.associate = (models) =>{
        Investment.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    }

    return Investment;
}

