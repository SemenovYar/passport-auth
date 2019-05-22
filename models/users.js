const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

//Новые модели для сохранения данных, приходящих из формы регистрации
// урок с сайта https://www.internet-technologies.ru
const mongoose = require('mongoose');
exports.userModel = mongoose.model('User',{
    email: String,
    password: String,
    secondname: String,
    firstname: String});



// урок с сайта https://www.internet-technologies.ru
exports.create = function (user, cb) {
    db.get().collection('users').insertOne(user, function (err, result) {
        cb(err, result);
        console.log('Создан новый юзер:');
        console.log(user);
    })
};
exports.findById = function (id, cb) {
    db.get().collection('users').findOne({_id: ObjectID(id)}, function (err, doc) {
        cb(err, doc);
    })
};

exports.findByEmail = function (email, cb) {
    db.get().collection('users').findOne({email: email}, function (err, doc) {
        cb(err, doc);
    })
};