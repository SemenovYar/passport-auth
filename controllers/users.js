const users = require('../models/users');
//Новые контроллеры для сохранения данных, приходящих из формы регистрации
exports.create = function (req, res) {
    const user = req.body;
    users.create(user, function (err, result) {
        if (err || !req.body){
            console.log(err);
            return res.sendStatus(500);
            //if(!req.body) return res.sendStatus(400);
            //console.log(req.body);
        }
        res.render('login') ; //??
    })
};

exports.findById = function (req, res) {
    users.findById(req.params.id, function (err,doc) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc); //??

    })
};