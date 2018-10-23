const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

exports.index = (req, res, next) => {
    let user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);

    user.save().then(() => {
        return res.json({user: user.toAuthJSON()});
    }).catch(function(err) {

        let errors = {};

        for(let errorName in err.errors) {
            errors[errorName] = err.errors[errorName].message;
        }

        next({
            status: 409,
            code: 1002,
            message: errors
        });
    });
    
}

exports.user = (req, res, next) => {
    User.findById(req.payload.id).then(function(user){
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
   
    if(err) {
      return next(err); 
    }
    
    if(user) { 
      return res.json({user: user.toAuthJSON()});
    }
    
    next({
      status: 422,
      code: 1001,
      message: info.errors
    });

    })(req, res, next);
}