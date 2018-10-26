const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const testData = require('./global');

before(() => {
    mongoose.connect('mongodb://localhost/test_zx-shareknowledge',  {useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {console.log('Test DB Connected')})
        .on('error', error => {
            console.log('Warning', error);
        });
});

beforeEach((done) => {
   request(app)
   .post('/api/users')
   .send({user: testData.user})
   .end((err, response) => {
        testData.user.token = response.body.user.token;
        done();
   });
});

afterEach((done) => {
    const { users } = mongoose.connection.collections;
    users.drop(() => {
        testData.user.token = null;
        done();
    });
});

after(() => {
    mongoose.connection.dropDatabase();
});