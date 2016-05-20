var server = require('./source/server').create();

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
