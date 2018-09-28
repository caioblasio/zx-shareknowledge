const router = require('express').Router();

router.use('/api/users', require('./user'));
router.use('*', (req, res, next) => {console.log('oi'); return next();})

module.exports = router;