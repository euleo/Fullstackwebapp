'use strict'

const usersModel = require('../config/db').users;
const bcrypt = require('bcrypt');

function login(data){
    return new Promise((resolve, reject, next) =>{
        usersModel.findAll({ where: {"email": data.email }}).then(res => {
            console.log("data.password",data.password);
            console.log("res[0].dataValues.password",res[0].dataValues.password);
            if(checkPassword(data.password, res[0].dataValues.password)) {
                console.log("Passwords match");// Passwords match
                resolve(res);
            }
            else {
                console.log("Passwords don't match");
                reject(res);
            }
        }).catch(err => {
            console.log(`errore nel recuperare utente: ${err};`);
            reject(err);
        })
    });
}

function getUsers(skip, limit){
    return new Promise((resolve, reject) => {
        usersModel.findAll({
            offset:skip,limit:limit
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`errore nel recuperare gli utenti: ${err};`);
            reject(err);
        })
    });
}

function getUserById(data) {
    return new Promise((resolve, reject) => {
        usersModel.findAll({
            where: { id: data.id }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`errore nel recuperare gli utenti: ${err};`);
            reject(err);
        })
    });
}

function insertUser(data){
    data.password = hashPassword(data.password);
    return new Promise((resolve, reject) =>{
        usersModel.create(data).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`errore nell'inserire un utente: ${err};`);
            reject(err);
        })
    });
}

function updateUser(data){
    data.password = hashPassword(data.password);
    return new Promise((resolve, reject) =>{
        usersModel.update(data, {
            where: { id:data.id }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`errore nel modificare un utente: ${err};`);
            reject(err);
        })
    });
}

function deleteUser(data){
    return new Promise((resolve, reject) => {    
        console.log("service data.id",data.id);   
        usersModel.destroy({where:{ id:data.id}}).then(res => {           
            resolve(res);
        }).catch(err => {            
            console.log(`errore nell'eliminare un utente: ${err};`);
            reject(err);
        });
    });
}

const checkPassword = (pwd1, pwd2) => {
    return bcrypt.compareSync(pwd1, pwd2);
}

const hashPassword = (pwd) => {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync());
}

function retornos(success, msg, data){    
    const retorno = {
        success: success,
        message: msg,
        details: data
    }        
    return retorno;
}

module.exports = {login, getUsers, getUserById, insertUser, updateUser, deleteUser};