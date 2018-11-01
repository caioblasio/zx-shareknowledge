const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const Category = mongoose.model('Category');


exports.create = (req, res, next) => {

  Category.findOne({ name: req.body.book.category }, '_id', (err, category) => {

    if (err) {

      return next({
        status: 409,
        code: 1002
      });
    }

    let book = new Book();
    book.title = req.body.book.title;
    book.subtitle = req.body.book.subtitle;
    book.authors = req.body.book.authors;
    book.description = req.body.book.description;
    book.pageCount = req.body.book.pageCount;
    book.imageLink = req.body.book.imageLink;
    book.averageRating = req.body.book.averageRating;
    book.category = category._id

    book.save((err) => {
      
      if(err){
          next({
            status: 409,
            code: 1002
        });
      }

      return res.json({book: book.toJSON()});
    })

  });

};

exports.getBook = (req, res, next) => {
  
  const bookId = req.params.bookId;

  Book.findById(bookId).then(book => {
    return res.json({book: book.toJSON()});
  }).catch(next)
}

exports.getAll = (req, res, next) => {
  Book.find().then((books) => {
    return res.json(books.map(book => book.toJSON()));
  }).catch(next);
}