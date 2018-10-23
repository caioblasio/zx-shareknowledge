const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');

before(() => {
    mongoose.connect('mongodb://localhost/test_zx-shareknowledge',  {useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {console.log('Test DB Connected')})
        .on('error', error => {
            console.log('Warning', error);
        });
});

beforeEach((done) => {
   return request(app)
   .post('/api/users')
   .send({user: testData.user})
   .end((err, response) => {
        testData.user.token = response.body.user.token;
   });
});

afterEach((done) => {
    const { users } = mongoose.connection.collections;
    return users.drop(() => {
        testData.user.token = null;
    });
});

after(() => {
    mongoose.connection.dropDatabase();
});