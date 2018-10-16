const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = mongoose.model('User');


describe('User', () => {

    let userPayload =  {user: {email: 'test@test.com', username: 'test', password: '123456Ab'}}


    it('Registers User', done => {
        request(app)
            .post('/api/users')
            .send(userPayload)
            .end((err, response) => {
                User.findOne({ username: 'test' })
                    .then(user => {
                        assert(user != null);
                        assert(user.username === 'test');
                        assert(user.email === 'test@test.com');
                        done();
                    })
            })
    });

    it('Registers duplicated user', done => {
        request(app)
            .post('/api/users')
            .send(userPayload)
            .end((err, response) => {
                assert(response.statusCode === 409);
                done();
            })
    });

    it('Gets an user', done => {
        request(app)
            .get('/api/users/user')
            .send(userPayload)
            .end((err, response) => {
                assert(response.statusCode === 409);
                done();
            })
    });
})