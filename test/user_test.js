const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = mongoose.model('User');


describe('User', () => {
    it('Registers User', done => {
        request(app)
            .post('/api/users')
            .send({user: {email: 'test@test.com', username: 'test', password: '123456Ab'}})
            .end((err, response) => {
                User.findOne({ username: 'test' })
                    .then(user => {
                        assert(user != null);
                        assert(user.username === 'test');
                        done();
                    })
            })
    })
})