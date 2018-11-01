const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Book = mongoose.model('Book');

const testCategory = require('./global').category;
const testBook = require('./global').book;

describe('Book', () => {

  let _book = {};

  beforeEach((done) => {
    request(app)
      .post('/api/categories')
      .send({ category: testCategory })
      .end(() => {
        request(app)
        .post('/api/books')
        .send({ book: testBook })
        .end((err, response) => {
          _book.statusCode = response.statusCode;
          _book.id = response.body.book.id;
          done();
        });

      });
  });

  it('Creates book', done => {
    Book.find({ title: testBook.title })
      .then(book => {
        assert(book != null);
        assert(_book.statusCode === 200)
        done();
      });
  });

  it('Gets a book', done => {
    request(app)
        .get(`/api/books/${_book.id}`)
        .end((err, response) => {
          assert(response.body.book.id === _book.id)
          done();
        });
  });

  it('Gets all books', done => {
    request(app)
        .get('/api/books')
        .end((err, response) => {
          assert(response.body[0].id === _book.id)
          done();
        });
  });

});