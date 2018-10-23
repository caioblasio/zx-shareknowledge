const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = mongoose.model('User');


describe('User', () => {

    let userTest = testData.user;
    let userPayload =  {user: userTest};

    it('Registers User', done => {
        User.findOne({ username: userTest.username })
            .then(user => {
                assert(user != null);
                assert(user.username === userTest.username);
                assert(user.email === userTest.email);
                done();
            });
    });

    it('Registers duplicated user', done => {
            request(app)
            .post('/api/users')
            .send(userPayload)
            .end((err, response) => {
                assert(response.statusCode === 409);
                done();
            });
    });

    it('Gets an user', done => {
        request(app)
            .get('/api/users/user')
            .send(userPayload)
            .end((err, response) => {
                console.log(response);
                assert(response.statusCode === 422);
                done();
            });
    });
});