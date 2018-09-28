const jwt = require('express-jwt');
const keys = require('../config/keys');

function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

var auth = {
  required: jwt({
    secret: keys.secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: keys.secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;