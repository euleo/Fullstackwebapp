'use strict'

const commentsModel = require('../config/db').comments;
const usersModel = require('../config/db').users;

function getComments() {
    return new Promise((resolve, reject) => {
        commentsModel.findAll({
            include: [
                {
                    model: usersModel
                }
            ]
        }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`errore nel recuperare i commenti: ${err};`);
            reject(err);
        })
    });
}

function getCommentsByUserId(data) {
    return new Promise((resolve, reject) => {
        commentsModel.findAll({
            where: { userId: data.id }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`errore nel recuperare gli utenti: ${err};`);
            reject(err);
        })
    });
}

function getCommentById(data) {
    return new Promise((resolve, reject) => {
        commentsModel.findAll({
            where: { id: data.id }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`errore nel recuperare gli utenti: ${err};`);
            reject(err);
        })
    });
}

function insertComment(data) {
    return new Promise((resolve, reject) => {
        commentsModel.create(data).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`errore nell'inserire un utente: ${err};`);
            reject(err);
        })
    });
}

function updateComment(data) {
    return new Promise((resolve, reject) => {
        commentsModel.update(data, {
            where: { id: data.id }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`errore nel modificare un utente: ${err};`);
            reject(err);
        })
    });
}

function deleteComment(data) {
    return new Promise((resolve, reject) => {
        console.log("service data.id", data.id);
        commentsModel.destroy({ where: { id: data.id } }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`errore nell'eliminare un utente: ${err};`);
            reject(err);
        });
    });
}

module.exports = { getComments, getCommentsByUserId, getCommentById, insertComment, updateComment, deleteComment };