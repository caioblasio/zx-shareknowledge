const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Book = mongoose.model('Book');

const testBook = require('./global').book;

describe('Book', () => {

  let _book = {};

  beforeEach((done) => {
    request(app)
      .post('/api/books')
      .send({ book: testBook })
      .end((err, response) => {
        _book.statusCode = response.statusCode;
       // console.log(response)
        done();
      });
  });

  it('Creates book', done => {
    Book.find({ title: testBook.title })
      .then(book => {
        assert(book != null);
       // console.log(book);
        done();
      });
  });

  // it('Gets a category', done => {
  //   request(app)
  //   .get('/api/categories')
  //   .end((err, response) => {
  //       assert(response.body[0].name === testCategory.name);
  //       assert(response.statusCode === 200);
  //       done();
  //   });
  // });

});