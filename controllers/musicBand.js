const MusicBand = require('../models/musicBand');

exports.all = function (req, res) {
    MusicBand.all(function (err, docs) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
};

exports.findById = function (req, res) {
    MusicBand.findById(req.params.id, function (err,doc) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);

    })
};

exports.create = function (req, res) {
    const artist = {
        name: req.body.name
    };
    MusicBand.create(artist, function (err, result) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
};

exports.update = function (req, res) {
    MusicBand.update(req.params.id, {$set: {name: req.body.name}}, function (err, result) {
        if (err){
            console.log(err);
            return res.statusCode(500);
        }
        res.sendStatus(200);
    })
};

exports.delete = function (req, res) {
    MusicBand.delete(req.params.id, function (err,result) {
        if (err){
            console.log(err);
            return res.statusCode(500);
        }
        res.sendStatus(200);
        console.log('Object with id:'+ req.params.id+' delete');
    })
};
