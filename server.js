const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const db = require('./db');
const musicBandController = require('./controllers/musicBand');
const app = express();
const expressSession = require('express-session');
//const fileStore = require('session-file-store')(session);
const passport = require('passport');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// урок с сайта https://www.internet-technologies.ru

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});






// урок с сайта https://www.internet-technologies.ru

app.set('view engine', 'ejs');
// Открываем html файл

app.get('/registration', function (req,res) {
    res.render('registrationForm');

});

//app.post('/registration', urlencodedParser, function (req,res) {



//});
//Отправляем данные из формы в контроллер
const usersController = require('./controllers/users');

//app.get('/musicBand/:id', musicBandController.findById);

app.post('/registration', urlencodedParser, usersController.create);

//Проверка пользователя с помощью паспорта
app.get('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + user.username);
        });
    })(req, res, next);
});
/*app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })
);
*/

/*app.use(session({
    secret: 'timoha',
    store: new fileStore(),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60*60*1000
    },
    resave: false,
    saveUninitialized: false
}));
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req,res) {
    console.log(req.session);
    res.send("Hello API");
});
// для аутентификации здесь
require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());



app.post('/login', function (req, res, next) {
    passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.send('Укажите правильный email или пароль!'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/admin');
        });
    })(req, res, next);
});

const auth = (req, res, next) => {
 if (req.isAuthenticated()){
     next();
 }else {
     return res.redirect('/');
 }
};

app.get('/admin', auth, function (req, res) {
    res.send("ADMIN PAGE");
});

// для аутентификации здесь
app.get('/musicBand', musicBandController.all);
app.get('/musicBand/:id', musicBandController.findById);

app.post('/musicBand', musicBandController.create);

app.put('/musicBand/:id', musicBandController.update);

app.delete('/musicBand/:id', musicBandController.delete);


db.connect('mongodb://localhost:27017/myapi', function (err) {
    if (err){
        return console.log(err);
    }
    app.listen(2121,function () {
        console.log('API app started');
    });
});