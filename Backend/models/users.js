'use strict'

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        name: {
            type: DataTypes.STRING,
            required: true
        },
        surname: {
            type: DataTypes.STRING,
            required: true
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'normal']

        }
    }
    );
    return User;
};