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

// development error handler will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    //console.log(err.stack);
    res.status(err.status || 500);
    delete err.status;
    res.json({
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  delete err.status;
  res.json({
    error: err
  });
});


if (isProduction) {
  //put production code here
}

app.listen(PORT, function() {
  console.log('server running....')
});

module.exports = app;