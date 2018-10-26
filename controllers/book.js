const mongoose = require('mongoose');
const Book = mongoose.model('Book');

exports.create = (req, res, next) => {

  let book = new Book();

  book.title = req.body.book.title;
  book.subtitle = req.body.book.subtitle;
  book.authors = req.body.book.authors;
  book.category = req.body.book.category;
  book.description = req.body.book.description;
  book.pageCount = req.body.book.pageCount;
  book.imageLink = req.body.book.imageLink;
  book.averageRating = req.body.book.averageRating;

  book.save().then(() => {
      return res.json(book.toJSON());
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

exports.getAll = (req, res, next) => {
  Category.find().then((categories) => {
    
    return res.json(categories.map(category => category.toJSON()));

  }).catch(next);
}