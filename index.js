const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

let isProduction = process.env.NODE_ENV === 'production';
let isTest = process.env.NODE_ENV === 'test';
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

if(!isTest){
  mongoose.connect(keys.mongoURI, { useNewUrlParser: true } );
}

const app = express();
app.use(bodyParser.json());

require('./models/User');
require('./services/passport');
app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  console.log(err);
  if(!err){
    var err = new Error('Not Found');
    err.status = 404;
  }
  console.log(err);
  next(err);
});


// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});


if (isProduction) {
  //put production code here
}

app.listen(PORT, function() {
  console.log('server running....')
});