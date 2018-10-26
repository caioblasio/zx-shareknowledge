const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = mongoose.model('User');

const testUser = require('./global').user;

describe('User', () => {

    it('Registers User', done => {
        User.findOne({ username: testUser.username })
            .then(user => {
                assert(user != null);
                assert(user.username === testUser.username);
                assert(user.email === testUser.email);
                done();
            });
    });

    it('Registers duplicated user', done => {
            request(app)
            .post('/api/users')
            .send({user: testUser})
            .end((err, response) => {
                assert(response.statusCode === 409);
                done();
            });
    });

    it('Gets an user', done => {

        request(app)
            .get('/api/users/user')
            .set('Authorization', `Token ${testUser.token}`)
            .end((err, response) => {
                assert(response.statusCode === 200);
                assert(response.body.user.token === testUser.token);
                done();
            });
    });
});