'use strict'

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            required: true
        },
        body: {
            type: DataTypes.TEXT,
            required: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }
    // , {
    //         underscored: true
    //     }
    );
    return Comment;
};