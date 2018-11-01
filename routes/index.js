const router = require('express').Router();
const auth = require('../services/auth');
const user_controller = require('../controllers/user');
const category_controller = require('../controllers/category');
const book_controller = require('../controllers/book');

//Users
router.get('/api/users/user', auth.required, user_controller.user);
router.post('/api/users/login', user_controller.login);
router.post('/api/users', user_controller.register);

//Categories
router.post('/api/categories', category_controller.create);
router.get('/api/categories', category_controller.getAll);

//Books
router.post('/api/books', book_controller.create);
router.get('/api/books', book_controller.getAll);
router.get('/api/books/:bookId', book_controller.getBook);

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