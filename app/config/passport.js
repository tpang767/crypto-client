import User from '../user/userModel';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export function setPassport() {

  // passport session setup ==================================================
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP ============================================================
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {
    
    process.nextTick(function() {
      
      User.findOne({ username: username }, function (err, user) {
        if (err) 
          return done(err)
        if (user)
          return done(null, false, req.flash('signupMessage', 'Username Already Taken'))
        else {
          
          var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: username,
            password: '',
            created_at: Date.now(),
            updated_at: Date.now()
          })

          newUser.password = newUser.generateHash(password)
            
          newUser.save(function(err) {
            if (err) 
              throw err;
            else
              return done(null, newUser);
          })
        }
      });
    });
  }))

  // LOCAL LOGIN ============================================================
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  function(req, username, password, done) {
    
    process.nextTick(function () {

      User.findOne({ username: username }, function (err, user) {
        
        if (err) 
          return done(err)
        
        if (!user) 
          return done(null, false, req.flash('loginMessage', 'Invalid Username'))

        if(!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Password Invalid'))
        
        else {
          return done(null, user)
        }

      });
    });

  })

)}

