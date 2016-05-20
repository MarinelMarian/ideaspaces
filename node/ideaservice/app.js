var server = require('./source/server').create();

server.register({
	register: require('hapi-cors'),
  options: {
      origins: ['*'],
      allowCredentials: 'true',
      exposeHeaders: ['content-type', 'content-length'],
      maxAge: 600,
      methods: ['POST, GET, DELETE, OPTIONS'],
      headers: ['Accept', 'Content-Type', 'Authorization']
  }
}, function(err){
	server.start(function(){
		console.log(server.info.uri);
	});
});
