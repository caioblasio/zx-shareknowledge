const router = require('express').Router();
const auth = require('../services/auth');
const user_controller = require('../controllers/user');

router.get('/api/users/user', auth.required, user_controller.user);
router.post('/api/users/login', user_controller.login);
router.post('/api/users', user_controller.index);

// catch 404 and forward to error handler
router.use('*', (req, res, next) => {
  let err = {
    status: 404,
    message: 'Page Not Found',
    code: 1000
  }
  next(err);
})

module.exports = router;