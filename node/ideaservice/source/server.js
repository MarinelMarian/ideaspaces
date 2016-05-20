var express = require('express');

module.exports.create = function() {
  var app = express();

  app.get('/', function(req, res){
    res.send('hello world');
  });

  return app;
};
