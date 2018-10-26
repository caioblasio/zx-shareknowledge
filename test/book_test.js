const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Book = mongoose.model('Book');

const testCategory = require('./global').category;

describe('Category', () => {

  let _book = {};

  beforeEach((done) => {
    request(app)
      .post('/api/bookas')
      .send({ category: testCategory })
      .end((err, response) => {
        _category.statusCode = response.statusCode
        done();
      });
  });

  it('Creates category', done => {
    Category.find({ name: testCategory.name })
      .then(category => {
        assert(category != null);
        assert(category[0].name === testCategory.name);
        assert(_category.statusCode === 200);
        done();
      })
  });

  it('Gets a category', done => {
    request(app)
    .get('/api/categories')
    .end((err, response) => {
        assert(response.body[0].name === testCategory.name);
        assert(response.statusCode === 200);
        done();
    });
  });

});