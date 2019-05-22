const ObjectID = require('mongodb').ObjectID;
const db = require('../db');


exports.all = function (cb) {
    db.get().collection('musicBand').find().toArray(function (err, docs){
        cb(err, docs);
    })
};

exports.findById = function (id, cb) {
    db.get().collection('musicBand').findOne( {_id: ObjectID(id) }, function (err, doc) {
        cb(err, doc);
    })
};

exports.create = function (artist, cb) {
    db.get().collection('musicBand').insertOne(artist, function (err, result) {
        cb(err, result);
    })
};

exports.update = function (id, newData, cb) {
    db.get().collection('musicBand').updateOne({_id: ObjectID(id)},
        newData, function (err, result) {
            cb(err, result);
    })
};

exports.delete = function (id, cb) {
    db.get().collection('musicBand').deleteOne({_id: ObjectID(id)},
        function (err, result) {
            cb(err, result);
        })
};
