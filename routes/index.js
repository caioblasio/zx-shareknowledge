const router = require('express').Router();

router.use('/api/users', require('./user'));

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