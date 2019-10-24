'use strict'

const Sequelize = require('sequelize');

const sequelize = new Sequelize('fullstackwebapp', 'root', 'password', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true //evitare che di default i nomi delle tabelle siano al plurale
    }
})

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/users.js')(sequelize, Sequelize);
db.comments = require('../models/comments.js')(sequelize, Sequelize);

//Relations
db.comments.belongsTo(db.users, { onDelete: 'cascade' });
db.users.hasMany(db.comments, { onDelete: 'cascade' });

module.exports = db;