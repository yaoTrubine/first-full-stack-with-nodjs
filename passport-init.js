var LocalStrategy = require('passport-local').Strategy,
    bCrypt = require('bcrypt-nodejs'),
    mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    Post = mongoose.model('Posts');

//temporary data store
// var users = {};

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.username);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id,function(err, user){
            done(err, user);
        });
    });

    passport.use('login',new LocalStrategy({
            passReqToCallback : true
        },
        function(req,username,password,done){
            User.findOne({'username' : username},
            function(err, user){
               if (err)
					return done(err);
                if(!user){
                    console.log('User no found !' + username);
                    return done(null,false);
                }
                if(!isValidPassword(user, password)){
                    console.log('Invalid password');
                    return done(null, false);
                }
                return done(null, user);
            });

            // memory
            // if(!users[username]){
            //     console.log('User is not exist' + username);
            //     return done(null, false);
            // }
            // if(isValidPassword(users[username],password)){
            //     return done(null, users[username]);
            // }else{
            //     return done(null, false);
            // }
        })
    );

    passport.use('signup',new LocalStrategy({
            passReqToCallback : true
        },
        function(req,username,password,done){
            User.findOne({'username':username},function(err, user){
                if(err){
                    return done(null, false);
                }
                if(user){
                    console.log('user already exist'+ username);
                    return done(null, false);
                }else{
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = createHash(password);

                    newUser.save(function(err){
                        if(err){
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }

            });

            // memory
            // if(users[username]){
            //     console.log('User already exits with username:' + username);
            // }
            // users[username] = {
            //     username : username,
            //     password : createHash(password)
            // }
            // console.log(users);
            // console.log(users[username].username + 'Registration successful');
            // return done(null, users[username]);
        })
    );
    var isValidPassword = function(user,password){
        return bCrypt.compareSync(password,user.password)
    };
    var createHash = function(password){
        return bCrypt.hashSync(password,bCrypt.genSaltSync(10),null);
    };
};