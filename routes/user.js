const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../services/auth');

router.get('/user', auth.required, (req, res, next) => {

  User.findById(req.payload.id).then(function(user){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);

});

router.post('/login', (req, res, next) => {

  passport.authenticate('local', {session: false}, (err, user, info) => {
    if(err){ return next(err); }
    
    if(user){

      return res.json({user: user.toAuthJSON()});
      
    } else {

      let err = {
        status: 422,
        code: 1001,
        message: info.errors
      }
      next(err);
    }

  })(req, res, next);
});

router.post('/', (req, res, next) => {
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
  
});

module.exports = router;