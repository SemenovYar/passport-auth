
//Стратегия регистрации
const users = require('../models/users');
passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        findOrCreateUser = function(){
            // поиск пользователя в Mongo с помощью предоставленного имени пользователя
            users.findByEmail(,function(err, user) {
                // В случае любых ошибок - возврат
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // уже существует
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        req.flash('message','User Already Exists'));
                } else {
                    // если пользователя с таки адресом электронной почты
                    // в базе не существует, создать пользователя
                    var newUser = new users();
                    // установка локальных прав доступа пользователя
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.param('email');
                    newUser.firstName = req.param('firstName');
                    newUser.lastName = req.param('lastName');

                    // сохранения пользователя
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Отложить исполнение findOrCreateUser и выполнить
        // метод на следующем этапе цикла события
        process.nextTick(findOrCreateUser);
    });
);